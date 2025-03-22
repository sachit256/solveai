document.addEventListener('DOMContentLoaded', async () => {
  const loginScreen = document.getElementById('login-screen');
  const mainContent = document.getElementById('main-content');
  const settingsContent = document.getElementById('settings-content');
  const loginButton = document.getElementById('login-button');
  const signoutButton = document.getElementById('signout-button');
  const subscriptionStatusDiv = document.getElementById('subscription-status');
  const premiumContent = document.getElementById('premium-content');
  const freeContent = document.getElementById('free-content');
  const lastAnswerDiv = document.getElementById('last-answer');
  const settingsButtons = document.querySelectorAll('#settings');

  // Initialize display states with animation
  loginScreen.style.display = 'none';
  mainContent.style.display = 'none';
  settingsContent.style.display = 'none';
  mainContent.style.opacity = '0';
  mainContent.style.transform = 'translateY(10px)';

  // Add animation classes
  function addAnimation(element) {
    element.style.transition = 'all 0.3s ease-out';
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  }

  // Handle sign out with animation
  if (signoutButton) {
    signoutButton.addEventListener('click', async () => {
      try {
        // Add loading state
        signoutButton.disabled = true;
        signoutButton.innerHTML = `
          <svg class="loading" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            <path d="M9 12l2 2 4-4"></path>
          </svg>
          Signing out...
        `;

        // Clear all stored data
        await chrome.storage.local.clear();
        console.log('Cleared all storage data');
        
        // Fade out main content
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(10px)';
        
        // Wait for animation to complete
        setTimeout(() => {
          showLoginScreen();
        }, 300);
      } catch (error) {
        console.error('Error during sign out:', error);
        // Reset button state
        signoutButton.disabled = false;
        signoutButton.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Sign Out
        `;
      }
    });
  }

  // Check if user is already logged in
  chrome.storage.local.get(['userEmail', 'subscriptionStatus', 'access_token'], async (result) => {
    console.log('Checking stored user data:', { 
      hasEmail: !!result.userEmail, 
      hasToken: !!result.access_token,
      subscriptionStatus: result.subscriptionStatus 
    });

    if (result.userEmail && result.access_token) {
      showMainContent();
      await checkSubscriptionStatus(result.userEmail);
    } else {
      console.log('No valid session found, showing login screen');
      showLoginScreen();
    }
  });

  // Handle login button click with loading state
  if (loginButton) {
    loginButton.addEventListener('click', async () => {
      try {
        // Add loading state
        loginButton.disabled = true;
        loginButton.innerHTML = `
          <svg class="loading" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            <path d="M9 12l2 2 4-4"></path>
          </svg>
          Opening sign in...
        `;

        const tab = await chrome.tabs.create({
          url: 'http://localhost:5173/signin'
        });
        console.log('Opened signin page:', tab);
      } catch (error) {
        console.error('Error opening signin page:', error);
        // Reset button state
        loginButton.disabled = false;
        loginButton.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
            <polyline points="10 17 15 12 10 7"></polyline>
            <line x1="15" y1="12" x2="3" y2="12"></line>
          </svg>
          Sign In
        `;
      }
    });
  } else {
    console.error('Login button not found in the DOM');
  }

  // Listen for messages from the signin page
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Received message:', message);
    if (message.type === 'SIGNIN_SUCCESS') {
      handleSigninSuccess(message.userData);
    }
  });

  // Handle successful signin with animation
  async function handleSigninSuccess(userData) {
    console.log('Handling sign-in success:', {
      ...userData,
      access_token: userData.access_token ? '[HIDDEN]' : undefined
    });
    
    try {
      if (!userData.email || !userData.access_token) {
        console.error('Missing required user data:', { 
          hasEmail: !!userData.email, 
          hasToken: !!userData.access_token 
        });
        showLoginScreen();
        return;
      }

      // Store user data
      await chrome.storage.local.set({
        userEmail: userData.email,
        subscriptionStatus: userData.subscriptionStatus,
        userId: userData.userId,
        access_token: userData.access_token
      });

      // Show main content with animation
      showMainContent();
      await checkSubscriptionStatus(userData.email);
    } catch (error) {
      console.error('Error handling sign-in success:', error);
      showLoginScreen();
    }
  }

  // Show login screen with animation
  function showLoginScreen() {
    if (loginScreen && mainContent) {
      // Hide all other content first
      mainContent.style.display = 'none';
      settingsContent.style.display = 'none';
      premiumContent.style.display = 'none';
      freeContent.style.display = 'none';
      
      // Show login screen with animation
      loginScreen.style.display = 'flex';
      loginScreen.style.opacity = '0';
      loginScreen.style.transform = 'translateY(10px)';
      
      // Trigger animation
      setTimeout(() => {
        loginScreen.style.transition = 'all 0.3s ease-out';
        loginScreen.style.opacity = '1';
        loginScreen.style.transform = 'translateY(0)';
      }, 50);
    }
  }

  // Show main content with animation
  function showMainContent() {
    if (loginScreen && mainContent) {
      loginScreen.style.display = 'none';
      mainContent.style.display = 'block';
      mainContent.style.opacity = '0';
      mainContent.style.transform = 'translateY(10px)';
      
      // Trigger animation
      setTimeout(() => {
        addAnimation(mainContent);
      }, 50);
    }
  }

  // Update subscription status UI with animation
  function updateSubscriptionUI(subscriptionStatus) {
    console.log('Updating UI with subscription status:', subscriptionStatus);
    
    const isPremium = subscriptionStatus === 'premium' || subscriptionStatus === 'team';
    
    // Update subscription status display with animation
    subscriptionStatusDiv.className = `subscription-status ${isPremium ? 'premium' : 'free'}`;
    subscriptionStatusDiv.innerHTML = `
      <div class="subscription-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          ${isPremium ? 
            '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>' :
            '<path d="M12 2v20M2 12h20"></path>'
          }
        </svg>
      </div>
      <div class="subscription-info">
        <h3>${isPremium ? 'Premium Plan' : 'Free Plan'}</h3>
        <p>${isPremium ? 'Full access to all features' : 'Upgrade to unlock all features'}</p>
      </div>
    `;

    // Toggle content visibility with animation
    if (isPremium) {
      premiumContent.style.display = 'block';
      premiumContent.style.opacity = '0';
      premiumContent.style.transform = 'translateY(10px)';
      setTimeout(() => addAnimation(premiumContent), 100);
      
      freeContent.style.display = 'none';
      freeContent.style.opacity = '0';
    } else {
      freeContent.style.display = 'block';
      freeContent.style.opacity = '0';
      freeContent.style.transform = 'translateY(10px)';
      setTimeout(() => addAnimation(freeContent), 100);
      
      premiumContent.style.display = 'none';
      premiumContent.style.opacity = '0';
    }
  }

  // Check subscription status
  async function checkSubscriptionStatus(email) {
    try {
      console.log('Checking subscription status for:', email);
      
      const { subscriptionStatus } = await chrome.storage.local.get(['subscriptionStatus']);
      console.log('Stored subscription status:', subscriptionStatus);
      
      updateSubscriptionUI(subscriptionStatus || 'free');
    } catch (error) {
      console.error('Error checking subscription:', error);
      updateSubscriptionUI('free');
    }
  }

  // Listen for messages from content script
  chrome.runtime.onMessage.addListener((message) => {
    console.log('Received message in side panel:', message);
    
    if (message.type === 'UPDATE_ANSWER') {
      // Animate the last answer update
      lastAnswerDiv.style.opacity = '0';
      lastAnswerDiv.style.transform = 'translateY(5px)';
      
      setTimeout(() => {
        lastAnswerDiv.textContent = message.answer;
        lastAnswerDiv.style.transition = 'all 0.3s ease-out';
        lastAnswerDiv.style.opacity = '1';
        lastAnswerDiv.style.transform = 'translateY(0)';
      }, 150);
    } else if (message.type === 'SIGNIN_SUCCESS') {
      console.log('Sign-in success message received:', message);
      checkSubscriptionStatus(message.userData.email);
    }
  });

  // Handle settings button clicks
  settingsButtons.forEach(button => {
    button.addEventListener('click', () => {
      chrome.runtime.openOptionsPage();
    });
  });

  // Add sidebar functionality
  const homeIcon = document.getElementById('home-icon');
  const chatIcon = document.getElementById('chat-icon');
  const settingsIcon = document.getElementById('settings-icon');
  const rateIcon = document.getElementById('rate-icon');
  const logoutIcon = document.getElementById('logout-icon');

  // Function to set active icon
  function setActiveIcon(activeElement) {
    [homeIcon, chatIcon, settingsIcon, rateIcon, logoutIcon].forEach(icon => {
      icon.classList.remove('active');
    });
    activeElement.classList.add('active');
  }

  // Home icon click handler
  homeIcon.addEventListener('click', () => {
    setActiveIcon(homeIcon);
    showContent(mainContent);
    hideContent(settingsContent);
    
    // Show premium or free content based on subscription
    chrome.storage.local.get(['subscriptionStatus'], (result) => {
      const isPremium = result.subscriptionStatus === 'premium' || result.subscriptionStatus === 'team';
      if (isPremium) {
        showContent(premiumContent);
        hideContent(freeContent);
      } else {
        showContent(freeContent);
        hideContent(premiumContent);
      }
    });
  });

  // Chat icon click handler
  chatIcon.addEventListener('click', () => {
    setActiveIcon(chatIcon);
    // Open webapp in new tab
    chrome.tabs.create({ url: 'http://localhost:5173/student' });
  });

  // Settings icon click handler
  settingsIcon.addEventListener('click', () => {
    setActiveIcon(settingsIcon);
    showContent(settingsContent);
    hideContent(mainContent);
    hideContent(premiumContent);
    hideContent(freeContent);
  });

  // Rate icon click handler
  rateIcon.addEventListener('click', () => {
    setActiveIcon(rateIcon);
    // Open Chrome Web Store in new tab
    chrome.tabs.create({ 
      url: 'https://chrome.google.com/webstore/detail/solveai/your-extension-id/reviews'
    });
  });

  // Logout icon click handler
  logoutIcon.addEventListener('click', async () => {
    try {
      // Reset active icon
      setActiveIcon(homeIcon);
      
      // Hide all content sections first
      hideContent(mainContent);
      hideContent(settingsContent);
      hideContent(premiumContent);
      hideContent(freeContent);
      
      // Clear all stored data
      await chrome.storage.local.clear();
      
      // Show loading state
      logoutIcon.innerHTML = `
        <div class="loading"></div>
      `;
      
      // Reset login button state
      if (loginButton) {
        loginButton.disabled = false;
        loginButton.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
            <polyline points="10 17 15 12 10 7"></polyline>
            <line x1="15" y1="12" x2="3" y2="12"></line>
          </svg>
          Sign In
        `;
      }
      
      // Show login screen after a short delay
      setTimeout(() => {
        showLoginScreen();
        
        // Reset logout icon
        logoutIcon.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        `;
      }, 300);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  });

  // Initialize settings functionality
  const darkModeToggle = document.getElementById('darkMode');
  const sidebarShortcutToggle = document.getElementById('showSidebarShortcut');
  const reportBug = document.getElementById('report-bug');
  const terms = document.getElementById('terms');
  const privacy = document.getElementById('privacy');
  const logoutBtn = document.getElementById('logout');

  // Dark mode toggle
  if (darkModeToggle) {
    darkModeToggle.addEventListener('change', () => {
      chrome.storage.local.set({ darkMode: darkModeToggle.checked });
      updateTheme(darkModeToggle.checked);
    });
  }

  // Sidebar shortcut toggle
  if (sidebarShortcutToggle) {
    sidebarShortcutToggle.addEventListener('change', async () => {
      // Save the preference
      const isChecked = sidebarShortcutToggle.checked;
      await chrome.storage.local.set({ showSidebarShortcut: isChecked });
      
      // Send message to all tabs
      try {
        const tabs = await chrome.tabs.query({});
        for (const tab of tabs) {
          try {
            await chrome.tabs.sendMessage(tab.id, {
              type: 'TOGGLE_SIDEBAR_SHORTCUT',
              show: isChecked
            });
          } catch (error) {
            // Ignore errors for tabs where content script is not running
            console.log(`Could not send message to tab ${tab.id}:`, error);
          }
        }
      } catch (error) {
        console.error('Error toggling sidebar shortcut:', error);
      }
    });
  }

  // Load saved settings
  chrome.storage.local.get(['darkMode', 'showSidebarShortcut'], (result) => {
    if (darkModeToggle) darkModeToggle.checked = result.darkMode || false;
    if (sidebarShortcutToggle) {
      // Default to true unless explicitly set to false
      sidebarShortcutToggle.checked = result.showSidebarShortcut !== false;
    }
    if (result.darkMode) updateTheme(true);
  });

  // Add keyboard shortcut for toggling sidebar
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + B to toggle sidebar
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault();
      settingsIcon.click();
    }
  });

  // Report bug link
  if (reportBug) {
    reportBug.addEventListener('click', () => {
      chrome.tabs.create({
        url: 'https://calm-horse-4892b7.netlify.app/report-bug'
      });
    });
  }

  // Terms link
  if (terms) {
    terms.addEventListener('click', () => {
      chrome.tabs.create({
        url: 'https://calm-horse-4892b7.netlify.app/terms'
      });
    });
  }

  // Privacy link
  if (privacy) {
    privacy.addEventListener('click', () => {
      chrome.tabs.create({
        url: 'https://calm-horse-4892b7.netlify.app/privacy'
      });
    });
  }

  // Logout button
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      try {
        // Clear all stored data
        await chrome.storage.local.clear();
        showLoginScreen();
      } catch (error) {
        console.error('Error during logout:', error);
      }
    });
  }

  // Function to show content with animation
  function showContent(element) {
    if (element) {
      element.style.display = 'block';
      element.style.opacity = '0';
      element.style.transform = 'translateY(10px)';
      setTimeout(() => addAnimation(element), 50);
    }
  }

  // Function to hide content
  function hideContent(element) {
    if (element) {
      element.style.display = 'none';
      element.style.opacity = '0';
    }
  }
});

// Function to update theme
function updateTheme(isDark) {
  if (isDark) {
    document.documentElement.style.setProperty('--bg-primary', '#1f2937');
    document.documentElement.style.setProperty('--bg-secondary', '#111827');
    document.documentElement.style.setProperty('--text-primary', '#f9fafb');
    document.documentElement.style.setProperty('--text-secondary', '#9ca3af');
    document.documentElement.style.setProperty('--border-color', '#374151');
  } else {
    document.documentElement.style.setProperty('--bg-primary', '#ffffff');
    document.documentElement.style.setProperty('--bg-secondary', '#f9fafb');
    document.documentElement.style.setProperty('--text-primary', '#1f2937');
    document.documentElement.style.setProperty('--text-secondary', '#6b7280');
    document.documentElement.style.setProperty('--border-color', '#e5e7eb');
  }
} 