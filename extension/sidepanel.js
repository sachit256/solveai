document.addEventListener('DOMContentLoaded', async () => {
  const loginScreen = document.getElementById('login-screen');
  const mainContent = document.getElementById('main-content');
  const loginButton = document.getElementById('login-button');
  const subscriptionStatusDiv = document.getElementById('subscription-status');
  const premiumContent = document.getElementById('premium-content');
  const freeContent = document.getElementById('free-content');
  const lastAnswerDiv = document.getElementById('last-answer');
  const settingsButtons = document.querySelectorAll('#settings');

  // Initialize display states
  loginScreen.style.display = 'none';
  mainContent.style.display = 'none';

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

  // Handle login button click
  if (loginButton) {
    loginButton.addEventListener('click', async () => {
      try {
        const tab = await chrome.tabs.create({
          url: 'http://localhost:5173/signin'
        });
        console.log('Opened signin page:', tab);
      } catch (error) {
        console.error('Error opening signin page:', error);
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

  // Handle successful signin
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

      // Show main content and update UI
      showMainContent();
      await checkSubscriptionStatus(userData.email);
    } catch (error) {
      console.error('Error handling sign-in success:', error);
      showLoginScreen();
    }
  }

  // Show login screen
  function showLoginScreen() {
    if (loginScreen && mainContent) {
      loginScreen.style.display = 'flex';
      mainContent.style.display = 'none';
    }
  }

  // Show main content
  function showMainContent() {
    if (loginScreen && mainContent) {
      loginScreen.style.display = 'none';
      mainContent.style.display = 'block';
      mainContent.classList.add('logged-in');
    }
  }

  // Update subscription status UI
  function updateSubscriptionUI(subscriptionStatus) {
    console.log('Updating UI with subscription status:', subscriptionStatus);
    
    if (subscriptionStatus === 'premium' || subscriptionStatus === 'team') {
      subscriptionStatusDiv.textContent = '✨ Premium Plan';
      subscriptionStatusDiv.classList.add('premium');
      premiumContent.style.display = 'block';
      freeContent.style.display = 'none';
    } else {
      subscriptionStatusDiv.textContent = '🔄 Free Plan';
      subscriptionStatusDiv.classList.remove('premium');
      premiumContent.style.display = 'none';
      freeContent.style.display = 'block';
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
      lastAnswerDiv.textContent = message.answer;
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