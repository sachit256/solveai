document.addEventListener('DOMContentLoaded', async () => {
  const loginScreen = document.getElementById('login-screen');
  const mainContent = document.getElementById('main-content');
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
      mainContent.style.display = 'none';
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
        <h3>${isPremium ? '✨ Premium Plan' : '🔄 Free Plan'}</h3>
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
}); 