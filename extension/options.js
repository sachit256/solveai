document.addEventListener('DOMContentLoaded', async () => {
  const apiKeyInput = document.getElementById('apiKey');
  const emailInput = document.getElementById('email');
  const saveButton = document.getElementById('save');
  const testButton = document.getElementById('test');
  const verifyButton = document.getElementById('verify');
  const statusDiv = document.getElementById('status');
  const subscriptionStatusDiv = document.getElementById('subscription-status');
  const darkModeToggle = document.getElementById('darkMode');
  const notificationsToggle = document.getElementById('notifications');
  const autoExpandToggle = document.getElementById('autoExpand');
  const userEmailElement = document.getElementById('userEmail');
  const subscriptionStatusElement = document.getElementById('subscriptionStatus');
  const logoutButton = document.getElementById('logout');

  // Load saved API key
  chrome.storage.local.get(['apiKey', 'userEmail', 'subscriptionStatus'], (result) => {
    if (result.apiKey) {
      apiKeyInput.value = result.apiKey;
    }
    if (result.userEmail) {
      emailInput.value = result.userEmail;
      checkSubscriptionStatus(result.userEmail);
    } else {
      updateSubscriptionUI(null);
    }
  });

  // Load saved settings
  chrome.storage.local.get([
    'darkMode',
    'notifications',
    'autoExpand',
    'userEmail',
    'subscriptionStatus'
  ], (result) => {
    // Update toggles
    darkModeToggle.checked = result.darkMode || false;
    notificationsToggle.checked = result.notifications !== false; // Default to true
    autoExpandToggle.checked = result.autoExpand || false;

    // Update account info
    userEmailElement.textContent = result.userEmail || 'Not signed in';
    subscriptionStatusElement.textContent = 
      result.subscriptionStatus === 'premium' ? '✨ Premium Plan' :
      result.subscriptionStatus === 'team' ? '👥 Team Plan' :
      'Free Plan';
  });

  // Update subscription status UI
  function updateSubscriptionUI(subscriptionStatus) {
    const isPremium = subscriptionStatus === 'premium' || subscriptionStatus === 'team';
    
    const html = `
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="font-size: 24px;">${isPremium ? '👑' : '👤'}</div>
        <div>
          <h3 style="margin: 0 0 4px 0;">${isPremium ? 'Premium Plan' : 'Free Plan'}</h3>
          <p style="margin: 0; color: #6B7280;">
            ${isPremium ? 
              'You have full access to all features' : 
              'Upgrade to premium for full access to all features'}
          </p>
          ${!isPremium ? 
            `<a href="https://brainlyai.in/pricing" 
                target="_blank" 
                style="color: #4F46E5; text-decoration: none; font-weight: 500; display: inline-block; margin-top: 8px;">
              Upgrade to Premium
            </a>` : 
            ''}
        </div>
      </div>
    `;
    
    subscriptionStatusDiv.className = `subscription-status ${isPremium ? 'premium' : 'free'}`;
    subscriptionStatusDiv.innerHTML = html;
  }

  // Check subscription status
  async function checkSubscriptionStatus(email) {
    try {
      if (!window.supabase) {
        throw new Error('Supabase client not initialized');
      }

      const { data: userData, error: userError } = await window.supabase
        .from('users')
        .select('id')
        .eq('email', email);

      if (userError) throw userError;

      if (!userData) {
        updateSubscriptionUI(null);
        return false;
      }

      const { data: subscriptionData, error: subscriptionError } = await window.supabase
        .from('subscriptions')
        .select('plan_id')
        .eq('user_id', userData.id);

      if (subscriptionError) throw subscriptionError;

      const planId = subscriptionData?.plan_id || 'free';
      updateSubscriptionUI(planId);
      
      // Store subscription status
      chrome.storage.local.set({ 
        subscriptionStatus: planId,
        userEmail: email
      });
      
      return planId === 'premium' || planId === 'team';
    } catch (error) {
      console.error('Error checking subscription:', error);
      showStatus('Error checking subscription status', 'error');
      return false;
    }
  }

  // Show status message
  function showStatus(message, type = 'info') {
    const status = document.getElementById('status');
    status.textContent = message;
    status.className = `status ${type}`;
    status.style.display = 'block';
    setTimeout(() => {
      status.style.display = 'none';
    }, 3000);
  }

  // Handle email verification
  verifyButton.addEventListener('click', async () => {
    const email = emailInput.value.trim();
    if (!email) {
      showStatus('Please enter your email', 'error');
      return;
    }

    showStatus('Verifying subscription...', 'info');
    const isPremium = await checkSubscriptionStatus(email);
    
    if (isPremium) {
      showStatus('Premium subscription verified!', 'success');
    } else {
      showStatus('No premium subscription found', 'error');
    }
  });

  // Handle API key saving
  saveButton.addEventListener('click', async () => {
    const apiKey = apiKeyInput.value.trim();
    const email = emailInput.value.trim();

    // Check subscription status before saving API key
    const isPremium = await checkSubscriptionStatus(email);
    
    if (!isPremium) {
      showStatus('Premium subscription required to use API key', 'error');
      return;
    }

    if (!apiKey) {
      showStatus('Please enter an API key', 'error');
      return;
    }

    chrome.storage.local.set({ apiKey }, () => {
      showStatus('API key saved successfully', 'success');
    });
  });

  // Handle API key testing
  testButton.addEventListener('click', async () => {
    const apiKey = apiKeyInput.value.trim();
    const email = emailInput.value.trim();

    // Check subscription status before testing API key
    const isPremium = await checkSubscriptionStatus(email);
    
    if (!isPremium) {
      showStatus('Premium subscription required to test API key', 'error');
      return;
    }

    if (!apiKey) {
      showStatus('Please enter an API key', 'error');
      return;
    }

    showStatus('Testing API key...', 'info');
    
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: 'Hello!' }],
          max_tokens: 5
        })
      });
      
      const data = await response.json();
      
      if (data.error) {
        showStatus('Invalid API key', 'error');
      } else {
        showStatus('API key is valid', 'success');
      }
    } catch (error) {
      showStatus('Error testing API key', 'error');
    }
  });

  // Save settings when changed
  darkModeToggle.addEventListener('change', () => {
    chrome.storage.local.set({ darkMode: darkModeToggle.checked });
    updateTheme(darkModeToggle.checked);
  });

  notificationsToggle.addEventListener('change', () => {
    chrome.storage.local.set({ notifications: notificationsToggle.checked });
  });

  autoExpandToggle.addEventListener('change', () => {
    chrome.storage.local.set({ autoExpand: autoExpandToggle.checked });
  });

  // Handle logout
  logoutButton.addEventListener('click', async () => {
    try {
      // Add loading state
      logoutButton.disabled = true;
      logoutButton.innerHTML = `
        <svg class="loading" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        Signing out...
      `;

      // Clear all stored data
      await chrome.storage.local.clear();

      // Close the options page and open the login page
      window.close();
      chrome.tabs.create({ url: 'http://localhost:5173/signin' });
    } catch (error) {
      console.error('Error during logout:', error);
      // Reset button state
      logoutButton.disabled = false;
      logoutButton.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
        Sign Out
      `;
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
}); 