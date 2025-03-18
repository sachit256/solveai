document.addEventListener('DOMContentLoaded', async () => {
  const apiKeyInput = document.getElementById('apiKey');
  const emailInput = document.getElementById('email');
  const saveButton = document.getElementById('save');
  const testButton = document.getElementById('test');
  const verifyButton = document.getElementById('verify');
  const statusDiv = document.getElementById('status');
  const subscriptionStatusDiv = document.getElementById('subscription-status');

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
            `<a href="https://calm-horse-4892b7.netlify.app/pricing" 
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
}); 