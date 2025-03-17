let selectionMode = false;
let floatingButton = null;
let answerPopup = null;
let studentBoard = null;
let isInitialized = false;

// Create and initialize the floating action button
function createFloatingButton() {
  // Check if button already exists anywhere in the document
  const existingButton = document.querySelector('#solveai-fab');
  if (existingButton) {
    floatingButton = existingButton;
    return existingButton;
  }

  const button = document.createElement('div');
  button.id = 'solveai-fab';
  button.innerHTML = `
    <div class="fab-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="fab-label">Select Text</div>
  `;
  
  document.body.appendChild(button);
  floatingButton = button;
  
  // Add event listener
  button.addEventListener('click', toggleSelectionMode);
  
  return button;
}

// Create and show student board
function createStudentBoard() {
  if (document.querySelector('#solveai-student-board')) {
    return document.querySelector('#solveai-student-board');
  }

  const board = document.createElement('div');
  board.id = 'solveai-student-board';
  board.innerHTML = `
    <div class="student-board-content">
      <div class="board-header">
        <div class="logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/>
          </svg>
          <span>SolveAI</span>
        </div>
        <button class="close-board">&times;</button>
      </div>
      <div class="board-nav">
        <button class="nav-btn active" data-mode="lecture">Lecture Mode</button>
        <button class="nav-btn" data-mode="chatbot">Chatbot</button>
        <button class="manage-account">Manage Account</button>
      </div>
      <div class="board-content">
        <div class="feature-cards">
          <div class="feature-card">
            <h3>Instant Quizes</h3>
            <p>Solve your problem with record accuracy.</p>
          </div>
          <div class="feature-card">
            <h3>Flashcards that adapt</h3>
            <p>Solve your problem with record accuracy.</p>
          </div>
          <div class="feature-card">
            <h3>Summaries for you</h3>
            <p>Solve your problem with record accuracy.</p>
          </div>
          <div class="feature-card">
            <h3>Notes, notes, notes</h3>
            <p>Solve your problem with record accuracy.</p>
          </div>
        </div>
        <div class="input-section">
          <div class="input-container">
            <input type="text" placeholder="Enter Youtube link, or upload file...">
            <button class="attach-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M21.44 11.05l-9.19 9.19a6.003 6.003 0 01-8.49-8.49l9.19-9.19a4.002 4.002 0 015.66 5.66l-9.2 9.19a2.001 2.001 0 01-2.83-2.83l8.49-8.48" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <button class="submit-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(board);
  
  // Add event listeners
  const closeBtn = board.querySelector('.close-board');
  closeBtn.addEventListener('click', () => {
    board.style.display = 'none';
  });

  const navBtns = board.querySelectorAll('.nav-btn');
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  return board;
}

function showStudentBoard() {
  if (!studentBoard) {
    studentBoard = createStudentBoard();
  }
  studentBoard.style.display = 'block';
}

// Create and initialize the answer popup
function createAnswerPopup() {
  // Check if popup already exists anywhere in the document
  const existingPopup = document.querySelector('#solveai-popup');
  if (existingPopup) {
    answerPopup = existingPopup;
    return existingPopup;
  }

  const popup = document.createElement('div');
  popup.id = 'solveai-popup';
  document.body.appendChild(popup);
  answerPopup = popup;
  return popup;
}

// Toggle selection mode
function toggleSelectionMode() {
  selectionMode = !selectionMode;
  document.body.style.cursor = selectionMode ? 'crosshair' : 'default';
  floatingButton.classList.toggle('active', selectionMode);
  
  if (selectionMode) {
    floatingButton.querySelector('.fab-label').textContent = 'Cancel';
  } else {
    floatingButton.querySelector('.fab-label').textContent = 'Select Text';
    if (answerPopup) {
      answerPopup.style.display = 'none';
    }
  }
}

// Show the answer popup with loading state
function showAnswerPopup(x, y, text) {
  if (!answerPopup) {
    answerPopup = createAnswerPopup();
  }

  // Always position the popup on the right side of the screen
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const popupWidth = 400; // width from CSS
  const popupHeight = 500; // increased height estimation to account for explanation
  
  // Calculate the right position (20px from right edge)
  const rightPosition = 20;
  
  // Calculate y position based on selection, but ensure it stays within viewport
  // Add extra padding (80px) from the bottom to prevent clipping
  if (y + popupHeight > viewportHeight - 80) {
    y = viewportHeight - popupHeight - 80;
  }
  
  // If y is too small, ensure minimum padding from top
  y = Math.max(20, y);

  // Set position with right alignment
  answerPopup.style.right = `${rightPosition}px`;
  answerPopup.style.left = 'auto';
  answerPopup.style.top = `${y}px`;
  
  answerPopup.innerHTML = '<div class="popup-content"><div class="loading-spinner"></div>Generating answer...</div>';
  answerPopup.style.display = 'block';

  // Send message to background script to get answer
  try {
    chrome.runtime.sendMessage({
      type: 'GET_ANSWER',
      text: text
    }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Extension context invalidated:', chrome.runtime.lastError);
        if (answerPopup) {
          answerPopup.innerHTML = `
            <div class="popup-content">
              <div class="popup-header">
                <div class="popup-title">Error</div>
                <button class="popup-close">&times;</button>
              </div>
              <div class="popup-body">The extension needs to be reloaded. Please refresh the page and try again.</div>
            </div>
          `;
          
          const closeButton = answerPopup.querySelector('.popup-close');
          if (closeButton) {
            closeButton.addEventListener('click', () => {
              answerPopup.style.display = 'none';
              toggleSelectionMode();
            });
          }
        }
        return;
      }

      if (!answerPopup) return;

      if (response && response.answer) {
        answerPopup.innerHTML = `
          <div class="popup-content">
            <div class="popup-header">
              <div class="popup-title">Answer</div>
              <button class="popup-close">&times;</button>
            </div>
            <div class="popup-body">
              ${response.answer}
              <div class="explanation-section" style="margin-top: 12px; border-top: 1px solid var(--border-color);">
                <button class="explain-button">Explain Why</button>
                <div class="explanation-content" style="display: none; margin-top: 8px;"></div>
              </div>
            </div>
          </div>
        `;

        // Add explanation button functionality
        const explainButton = answerPopup.querySelector('.explain-button');
        const explanationContent = answerPopup.querySelector('.explanation-content');
        
        if (explainButton && explanationContent) {
          explainButton.addEventListener('click', () => {
            if (explanationContent.style.display === 'none') {
              explanationContent.style.display = 'block';
              explainButton.textContent = 'Hide Explanation';
              explanationContent.innerHTML = '<div class="loading-spinner"></div>Generating explanation...';
              
              // Get explanation from background script
              try {
                chrome.runtime.sendMessage({
                  type: 'GET_EXPLANATION',
                  text: text,
                  answer: response.answer
                }, (explanationResponse) => {
                  if (chrome.runtime.lastError) {
                    explanationContent.innerHTML = 'The extension needs to be reloaded. Please refresh the page and try again.';
                    return;
                  }
                  
                  if (explanationResponse && explanationResponse.explanation) {
                    explanationContent.innerHTML = explanationResponse.explanation;
                  } else {
                    explanationContent.innerHTML = 'Failed to generate explanation. Please try again.';
                  }
                });
              } catch (error) {
                explanationContent.innerHTML = 'Failed to generate explanation. Please refresh the page and try again.';
              }
            } else {
              explanationContent.style.display = 'none';
              explainButton.textContent = 'Explain Why';
            }
          });
        }

        // Add close button functionality
        const closeButton = answerPopup.querySelector('.popup-close');
        if (closeButton) {
          closeButton.addEventListener('click', () => {
            answerPopup.style.display = 'none';
            toggleSelectionMode();
          });
        }
      } else {
        answerPopup.innerHTML = `
          <div class="popup-content">
            <div class="popup-header">
              <div class="popup-title">Error</div>
              <button class="popup-close">&times;</button>
            </div>
            <div class="popup-body">${response?.error || 'Failed to generate answer. Please try again.'}</div>
          </div>
        `;

        // Add close button functionality for error state
        const closeButton = answerPopup.querySelector('.popup-close');
        if (closeButton) {
          closeButton.addEventListener('click', () => {
            answerPopup.style.display = 'none';
            toggleSelectionMode();
          });
        }
      }
    });
  } catch (error) {
    if (answerPopup) {
      answerPopup.innerHTML = `
        <div class="popup-content">
          <div class="popup-header">
            <div class="popup-title">Error</div>
            <button class="popup-close">&times;</button>
          </div>
          <div class="popup-body">The extension encountered an error. Please refresh the page and try again.</div>
        </div>
      `;
      
      const closeButton = answerPopup.querySelector('.popup-close');
      if (closeButton) {
        closeButton.addEventListener('click', () => {
          answerPopup.style.display = 'none';
          toggleSelectionMode();
        });
      }
    }
  }
}

// Initialize floating button
function initializeExtension() {
  if (isInitialized) {
    // Check if elements still exist in DOM
    const fabExists = document.querySelector('#solveai-fab');
    const popupExists = document.querySelector('#solveai-popup');
    
    if (!fabExists) {
      createFloatingButton();
    }
    if (!popupExists && answerPopup) {
      createAnswerPopup();
    }
    return;
  }

  createFloatingButton();
  isInitialized = true;
}

// Handle text selection
document.addEventListener('mouseup', (e) => {
  if (!selectionMode) return;
  
  // Don't process if clicking inside popup or floating button
  if (answerPopup && (answerPopup.contains(e.target) || floatingButton.contains(e.target))) {
    return;
  }

  const selection = window.getSelection();
  const selectedText = selection.toString().trim();

  if (selectedText.length > 10) {
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    
    // Position the popup below the selection
    const x = rect.left + window.scrollX;
    const y = rect.bottom + window.scrollY + 10;

    showAnswerPopup(x, y, selectedText);
  }
});

// Initialize when the DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeExtension);
} else {
  initializeExtension();
}

// Reinitialize when the document body changes (for single-page applications)
const observer = new MutationObserver((mutations) => {
  // Check if our elements are still in the DOM
  const fabExists = document.querySelector('#solveai-fab');
  const popupExists = document.querySelector('#solveai-popup');
  
  if (!fabExists || (answerPopup && !popupExists)) {
    initializeExtension();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Update the styles
const styles = document.createElement('style');
styles.textContent = `
  #solveai-fab {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 10000;
    background: transparent;
    border-radius: 8px;
    padding: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease;
    color: #4F46E5;
  }

  #solveai-fab:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  #solveai-fab.active {
    background: #4F46E5;
    color: white;
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
  }

  .fab-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .fab-label {
    font-size: 14px;
    font-weight: 500;
  }

  #solveai-popup {
    position: fixed;
    background: #1F2937;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    width: 400px;
    max-width: 90vw;
    z-index: 10001;
    display: none;
    right: 20px;
    color: #F3F4F6;
  }

  .popup-content {
    padding: 16px;
  }

  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    border-bottom: 1px solid #374151;
    padding-bottom: 12px;
  }

  .popup-title {
    font-weight: 600;
    color: #F9FAFB;
  }

  .popup-close {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #9CA3AF;
    padding: 4px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .popup-close:hover {
    background: #374151;
    color: #F9FAFB;
  }

  .popup-body {
    color: #D1D5DB;
    line-height: 1.6;
    font-size: 14px;
  }

  .loading-spinner {
    border: 3px solid #374151;
    border-top: 3px solid #4F46E5;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;
    margin: 0 auto 12px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  #solveai-student-board {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    z-index: 10001;
    display: none;
  }

  .student-board-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .board-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 24px;
    color: #4F46E5;
  }

  .close-board {
    background: none;
    border: none;
    font-size: 28px;
    cursor: pointer;
    color: #666;
  }

  .board-nav {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 32px;
  }

  .nav-btn {
    background: none;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    color: #666;
  }

  .nav-btn.active {
    color: #4F46E5;
  }

  .manage-account {
    margin-left: auto;
    background: #4F46E5;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
  }

  .feature-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 24px;
    margin-bottom: 32px;
  }

  .feature-card {
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .feature-card h3 {
    margin: 0 0 8px 0;
    color: #333;
  }

  .feature-card p {
    margin: 0;
    color: #666;
  }

  .input-section {
    display: flex;
    gap: 16px;
    margin-top: 32px;
  }

  .input-container {
    flex: 1;
    display: flex;
    align-items: center;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 8px 16px;
  }

  .input-container input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 16px;
  }

  .attach-btn, .submit-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    color: #4F46E5;
  }

  .submit-btn {
    background: #4F46E5;
    color: white;
    border-radius: 8px;
    padding: 12px;
  }
`;

document.head.appendChild(styles); 