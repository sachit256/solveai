document.addEventListener('DOMContentLoaded', () => {
  const apiKeyInput = document.getElementById('apiKey');
  const saveButton = document.getElementById('save');
  const statusDiv = document.getElementById('status');
  const testButton = document.getElementById('test');

  // Load saved API key
  chrome.storage.sync.get(['openaiKey'], (result) => {
    if (result.openaiKey) {
      apiKeyInput.value = result.openaiKey;
    }
  });

  // Save API key
  saveButton.addEventListener('click', () => {
    const apiKey = apiKeyInput.value.trim();
    
    if (!apiKey) {
      showStatus('Please enter an API key', 'error');
      return;
    }

    chrome.storage.sync.set({ openaiKey: apiKey }, () => {
      showStatus('Settings saved successfully!', 'success');
    });
  });

  // Test API key
  testButton.addEventListener('click', async () => {
    const apiKey = apiKeyInput.value.trim();
    
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
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: "Hello! This is a test message."
            }
          ],
          max_tokens: 50
        })
      });

      const data = await response.json();

      if (data.error) {
        showStatus(`API Error: ${data.error.message}`, 'error');
      } else if (data.choices && data.choices[0]) {
        showStatus('API key is valid!', 'success');
      } else {
        showStatus('Invalid response from API', 'error');
      }
    } catch (error) {
      showStatus('Failed to connect to OpenAI API', 'error');
    }
  });

  function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    statusDiv.style.display = 'block';

    if (type !== 'info') {
      setTimeout(() => {
        statusDiv.style.display = 'none';
      }, 3000);
    }
  }
}); 