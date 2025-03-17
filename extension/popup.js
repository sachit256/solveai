document.addEventListener('DOMContentLoaded', () => {
  const settingsButton = document.getElementById('settings');
  
  settingsButton.addEventListener('click', () => {
    // Open options page
    chrome.runtime.openOptionsPage();
  });
}); 