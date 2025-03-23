// Load environment variables
let SUPABASE_URL;
let SUPABASE_ANON_KEY;
let OPENAI_API_KEY;

// Function to load environment variables
async function loadEnvVariables() {
  try {
    const response = await fetch(chrome.runtime.getURL('.env'));
    const text = await response.text();
    
    // Parse .env file
    const envVars = text.split('\n').reduce((acc, line) => {
      const [key, value] = line.split('=');
      if (key && value) {
        acc[key.trim()] = value.trim();
      }
      return acc;
    }, {});

    // Set variables
    SUPABASE_URL = envVars.SUPABASE_URL;
    SUPABASE_ANON_KEY = envVars.SUPABASE_ANON_KEY;
    OPENAI_API_KEY = envVars.OPENAI_API_KEY;
    
    console.log('Environment variables loaded successfully');
  } catch (error) {
    console.error('Error loading environment variables:', error);
  }
}

// Load environment variables when extension starts
loadEnvVariables();

// Track sidepanel state
let isSidePanelOpen = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Received internal message:', request);
  console.log('From sender:', sender);
  
  if (request.type === 'GET_ANSWER') {
    handleGetAnswer(request.text, sendResponse);
    return true; // Keep the message channel open for async response
  } else if (request.type === 'GET_EXPLANATION') {
    handleGetExplanation(request.text, request.answer, sendResponse);
    return true; // Keep the message channel open for async response
  }
});

// Toggle side panel when extension icon is clicked
chrome.action.onClicked.addListener(async (tab) => {
  console.log('Extension icon clicked, toggling side panel');
  try {
    // Always open the side panel - Chrome will handle the toggle behavior automatically
    await chrome.sidePanel.open({ windowId: tab.windowId });
  } catch (error) {
    console.error('Error opening sidepanel:', error);
  }
});

// Handle keyboard shortcut
chrome.commands.onCommand.addListener((command) => {
  if (command === '_execute_action') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.action.onClicked.dispatch(tabs[0]);
      }
    });
  }
});

// Handle messages from web page
chrome.runtime.onMessageExternal.addListener(
  async (request, sender, sendResponse) => {
    console.log('=== External Message Debug ===');
    console.log('Received external message:', {
      type: request.type,
      sender: sender,
      origin: sender.origin,
      url: sender.url,
      request: request
    });

    if (request.type === 'SIGNIN_SUCCESS' || request.type === 'STORE_SESSION') {
      console.log('Processing signin/session data:', request);
      try {
        // Store user data
        const dataToStore = request.type === 'SIGNIN_SUCCESS' ? {
          userEmail: request.userData.email,
          subscriptionStatus: request.userData.subscriptionStatus,
          userId: request.userData.userId,
          access_token: request.userData.access_token
        } : {
          userEmail: request.session.user.email,
          subscriptionStatus: request.session.user.subscriptionStatus,
          userId: request.session.user.id,
          access_token: request.session.access_token,
          refresh_token: request.session.refresh_token
        };

        console.log('Storing data:', dataToStore);
        await chrome.storage.local.set(dataToStore);
        console.log('Successfully stored data');

        // Notify all extension views (including side panel)
        console.log('Forwarding message to extension views...');
        chrome.runtime.sendMessage({
          type: 'SIGNIN_SUCCESS',
          userData: {
            email: dataToStore.userEmail,
            subscriptionStatus: dataToStore.subscriptionStatus,
            userId: dataToStore.userId,
            access_token: dataToStore.access_token
          }
        });
        console.log('Successfully forwarded message');
        
        // Send response back to the website
        console.log('Sending success response back to website');
        sendResponse({ success: true });
      } catch (error) {
        console.error('Error processing data:', {
          message: error.message,
          stack: error.stack,
          error
        });
        sendResponse({ success: false, error: error.message });
      }
      return true; // Keep the message channel open for async response
    } else {
      console.warn('Received unknown external message type:', request.type);
      sendResponse({ success: false, error: 'Unknown message type' });
    }
  }
);

// Initialize session on extension load
chrome.runtime.onInstalled.addListener(async () => {
  console.log('Extension installed/updated, checking stored session...');
  const { session, userEmail, subscriptionStatus, userId, access_token } = await chrome.storage.local.get([
    'session',
    'userEmail',
    'subscriptionStatus',
    'userId',
    'access_token'
  ]);

  if (session && access_token) {
    console.log('Found stored session, initializing...');
    console.log('Session initialized with user:', userEmail);
  }
});

async function checkSubscriptionStatus() {
  try {
    const { subscriptionStatus, userEmail, access_token, userId } = await chrome.storage.local.get([
      'subscriptionStatus',
      'userEmail',
      'access_token',
      'userId'
    ]);
    
    console.log('Checking subscription with stored data:', {
      subscriptionStatus,
      userEmail,
      hasAccessToken: !!access_token,
      userId
    });

    if (!userEmail || !access_token || !userId) {
      console.log('Missing required user data');
      return false;
    }

    // Check if user has premium access based on stored subscription status
    const isPremium = subscriptionStatus === 'premium' || subscriptionStatus === 'team';
    console.log('Subscription check result:', { isPremium, plan: subscriptionStatus });
    
    return isPremium;
  } catch (error) {
    console.error('Error in checkSubscriptionStatus:', error);
    return false;
  }
}

async function handleGetAnswer(text, sendResponse) {
  try {
    // Check subscription status
    const isPremium = await checkSubscriptionStatus();
    if (!isPremium) {
      sendResponse({ 
        error: 'Premium subscription required',
        requiresUpgrade: true
      });
      return;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a direct and concise answer provider. Give only the specific answer without additional explanations or context. Keep responses brief and to the point.'
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0.3,
        max_tokens: 150
      })
    });

    const data = await response.json();
    
    if (data.error) {
      sendResponse({ error: data.error.message });
      return;
    }

    sendResponse({ answer: data.choices[0].message.content.trim() });
  } catch (error) {
    sendResponse({ error: 'Failed to generate answer. Please try again.' });
  }
}

async function handleGetExplanation(text, answer, sendResponse) {
  try {
    // Check subscription status
    const isPremium = await checkSubscriptionStatus();
    if (!isPremium) {
      sendResponse({ 
        error: 'Premium subscription required',
        requiresUpgrade: true
      });
      return;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an explanation validator. Your role is to explain why the provided answer is correct by:\n1. Identifying the key principles or concepts that make it correct\n2. Providing specific evidence or logical reasoning\n3. Citing relevant rules, formulas, or authoritative sources when applicable\nKeep the explanation clear and focused on validating the answer\'s correctness.'
          },
          {
            role: 'user',
            content: `Question: ${text}\nAnswer: ${answer}\n\nExplain why this answer is correct using evidence and reasoning.`
          }
        ],
        temperature: 0.5,
        max_tokens: 200
      })
    });

    const data = await response.json();
    
    if (data.error) {
      sendResponse({ error: data.error.message });
      return;
    }

    sendResponse({ explanation: data.choices[0].message.content.trim() });
  } catch (error) {
    sendResponse({ error: 'Failed to generate explanation. Please try again.' });
  }
} 