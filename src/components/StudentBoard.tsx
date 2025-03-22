import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Upload, ArrowRight, BookOpen, MessageSquare, FileText, Zap, Edit, Code, BookOpen as Book, List, Gift, Send } from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
}

const StudentBoard: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'lecture' | 'chatbot'>('lecture');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check for dark mode preference
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const htmlElement = document.documentElement;
    
    const updateTheme = () => {
      const isDark = htmlElement.classList.contains('dark') || 
                    darkModeMediaQuery.matches;
      setIsDarkMode(isDark);
    };

    updateTheme();
    
    // Listen for changes in the theme
    const observer = new MutationObserver(updateTheme);
    observer.observe(htmlElement, { attributes: true, attributeFilter: ['class'] });
    
    darkModeMediaQuery.addEventListener('change', updateTheme);
    
    return () => {
      observer.disconnect();
      darkModeMediaQuery.removeEventListener('change', updateTheme);
    };
  }, []);

  // Initialize bot welcome message
  useEffect(() => {
    if (activeMode === 'chatbot' && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          type: 'bot',
          content: "I'm your AI Assistant, ready to help you with a variety of tasks. Here are some ways we can work together:"
        }
      ]);
    }
  }, [activeMode, messages.length]);

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: `I've received your question: "${inputValue}". Here's my response...`
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const createNewChat = () => {
    setMessages([]);
    setSelectedChat('new-chat-' + Date.now());
  };

  // Render suggestion buttons for the chatbot
  const renderSuggestionButtons = () => {
    const suggestions = [
      { icon: <Brain className="w-5 h-5" />, text: 'Brainstorm ideas' },
      { icon: <Code className="w-5 h-5" />, text: 'Write & explain code' },
      { icon: <Book className="w-5 h-5" />, text: 'Explain concepts' },
      { icon: <List className="w-5 h-5" />, text: 'Summarize text' },
      { icon: <Gift className="w-5 h-5" />, text: 'Surprise me' },
      { icon: <FileText className="w-5 h-5" />, text: 'Make a plan' }
    ];

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6 mb-8">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            className="flex items-center gap-2 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
            onClick={() => setInputValue(suggestion.text)}
          >
            <div className="text-primary-600 dark:text-primary-400">
              {suggestion.icon}
            </div>
            <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
              {suggestion.text}
            </span>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Mode selector tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-10 p-1.5 inline-flex items-center">
        <button 
          onClick={() => setActiveMode('lecture')}
          className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2
            ${activeMode === 'lecture' 
              ? 'bg-primary-600 text-white shadow-sm' 
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
        >
          <BookOpen className="w-4 h-4" />
          Lecture Mode
        </button>
        <button 
          onClick={() => setActiveMode('chatbot')}
          className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2
            ${activeMode === 'chatbot' 
              ? 'bg-primary-600 text-white shadow-sm' 
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
        >
          <MessageSquare className="w-4 h-4" />
          Chatbot
        </button>
      </div>

      {activeMode === 'lecture' ? (
        /* Lecture Mode Content */
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Learn from any lecture
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-3xl">
            Upload a lecture video or paste a YouTube link to get instant notes, summaries, and quizzes.
          </p>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg w-fit mb-4">
                <Zap className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Instant Quizzes</h3>
              <p className="text-gray-600 dark:text-gray-400">Generate quizzes from any lecture to test your knowledge.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg w-fit mb-4">
                <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Adaptive Flashcards</h3>
              <p className="text-gray-600 dark:text-gray-400">Flashcards that adapt to your learning progress.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg w-fit mb-4">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Smart Summaries</h3>
              <p className="text-gray-600 dark:text-gray-400">Get concise summaries of key lecture points.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg w-fit mb-4">
                <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Comprehensive Notes</h3>
              <p className="text-gray-600 dark:text-gray-400">Detailed notes organized by topic and subtopic.</p>
            </div>
          </div>

          {/* Input section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Upload or link a lecture
            </h2>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex items-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3">
                <input
                  type="text"
                  placeholder="Enter YouTube link or upload a video file..."
                  className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
                <button className="text-primary-600 dark:text-primary-400 p-2 hover:text-primary-700 dark:hover:text-primary-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Upload className="w-5 h-5" />
                </button>
              </div>
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm hover:shadow flex items-center justify-center gap-2 md:w-auto w-full">
                Process Lecture
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Chatbot UI */
        <div className="flex h-[calc(100vh-12rem)]">
          {/* Left sidebar - chat history */}
          <div className="w-64 bg-white dark:bg-gray-800 rounded-l-xl border-r border-gray-200 dark:border-gray-700 hidden md:block">
            <div className="p-4">
              <button 
                onClick={createNewChat}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm hover:shadow flex items-center justify-center gap-2"
              >
                New Chat
              </button>
              
              <div className="mt-6">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Recent chats</div>
                <div className="space-y-1">
                  <button 
                    className="w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    onClick={() => setSelectedChat('chat-1')}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <div className="truncate">Let's brainstorm ideas about...</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main chat area */}
          <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 rounded-r-xl overflow-hidden">
            {/* Chat header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Talk to ChatBot
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Ask any question and receive instant answers from AI tutor.
              </p>
            </div>
            
            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4">
              {messages.length > 0 ? (
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`rounded-lg px-4 py-3 ${
                          message.type === 'user' 
                            ? 'bg-primary-600 text-white' 
                            : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center">
                  <div className="max-w-md text-center">
                    {renderSuggestionButtons()}
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Just type your question below or click one of the suggestions above to get started!
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Input area */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex items-end gap-2">
                <div className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3">
                  <textarea
                    rows={1}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type here..."
                    className="w-full bg-transparent border-none focus:ring-0 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                  />
                </div>
                <button 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className={`p-3 rounded-lg ${
                    inputValue.trim() 
                      ? 'bg-primary-600 hover:bg-primary-700 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  } transition-colors`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentBoard; 