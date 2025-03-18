document.addEventListener('DOMContentLoaded', async () => {
  const subscriptionStatusDiv = document.getElementById('subscription-status');
  const premiumContent = document.getElementById('premium-content');
  const freeContent = document.getElementById('free-content');

  // Update subscription status UI
  function updateSubscriptionUI(userData) {
    // Match the exact subscription status check from background.js
    const isPremium = userData.subscriptionStatus === 'premium' || userData.subscriptionStatus === 'team';
    
    // Update subscription status display
    subscriptionStatusDiv.className = `subscription-status ${isPremium ? 'premium' : 'free'}`;
    subscriptionStatusDiv.innerHTML = `
      <div class="subscription-icon ${isPremium ? 'premium' : 'free'}">
        ${isPremium ? '👑' : '👤'}
      </div>
      <div class="subscription-info">
        <h3>${isPremium ? 'Premium Plan' : 'Free Plan'}</h3>
        <p>${isPremium ? 
          `Full access enabled for ${userData.userEmail}` : 
          'Upgrade to premium for full access'}</p>
      </div>
    `;

    // Toggle content visibility
    premiumContent.style.display = isPremium ? 'block' : 'none';
    freeContent.style.display = isPremium ? 'none' : 'block';
  }

  // Get subscription status from storage
  chrome.storage.local.get(['subscriptionStatus', 'userEmail'], (result) => {
    updateSubscriptionUI({
      subscriptionStatus: result.subscriptionStatus || 'free',
      userEmail: result.userEmail || 'User'
    });
  });
}); 