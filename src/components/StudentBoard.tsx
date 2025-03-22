import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Upload, ArrowRight, BookOpen, MessageSquare, FileText, Zap, Edit, Code, BookOpen as Book, List, Gift, Send, Copy, ThumbsUp, ThumbsDown, RotateCcw, Brain as BrainIcon } from 'lucide-react';
import { LectureMode } from './LectureMode';
import { nanoid } from 'nanoid';
import { generateChatResponse } from '../lib/openai';
import toast from 'react-hot-toast';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: string;
}

interface SuggestionCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  examples?: string[];
}

const suggestionCards = [
  {
    icon: <BrainIcon className="w-6 h-6" />,
    title: "Brainstorm Ideas",
    description: "Get creative suggestions and explore new concepts",
    examples: ["Help me brainstorm ideas for my research paper on climate change"]
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: "Code Explanation",
    description: "Get help understanding and writing code",
    examples: ["Explain how async/await works in JavaScript"]
  },
  {
    icon: <Book className="w-6 h-6" />,
    title: "Study Concepts",
    description: "Learn and understand complex topics",
    examples: ["Explain quantum entanglement in simple terms"]
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Summarize Content",
    description: "Get concise summaries of complex materials",
    examples: ["Summarize this research paper on machine learning"]
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Practice Speaking",
    description: "Improve language and communication skills",
    examples: ["Help me practice English conversation"]
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Quick Solutions",
    description: "Get instant help with problems",
    examples: ["Help me debug this error in my code"]
  }
];

const StudentBoard: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'lecture' | 'chatbot'>('lecture');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [retryingMessage, setRetryingMessage] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [processingContent, setProcessingContent] = useState(false);
  const [activeStudyTab, setActiveStudyTab] = useState<'quiz' | 'flashcards' | 'summary' | 'notes'>('flashcards');

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
      setShowSuggestions(true);
    }
  }, [activeMode, messages.length]);

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('Message copied to clipboard');
  };

  const handleThumbsUp = (messageId: string) => {
    toast.success('Thanks for your feedback!');
    // Here you could implement feedback tracking
  };

  const handleThumbsDown = (messageId: string) => {
    toast.success('Thanks for your feedback!');
    // Here you could implement feedback tracking
  };

  const handleRetry = async (messageId: string) => {
    const messageIndex = messages.findIndex(m => m.id === messageId);
    if (messageIndex === -1) return;

    // Get the user message that triggered this response
    const userMessage = messages[messageIndex - 1];
    if (!userMessage || userMessage.type !== 'user') return;

    setRetryingMessage(messageId);
    try {
      const response = await generateChatResponse([
        ...messages.slice(0, messageIndex - 1).map(msg => ({
          role: msg.type === 'user' ? 'user' as const : 'assistant' as const,
          content: msg.content
        })),
        { role: 'user' as const, content: userMessage.content }
      ]);

      // Replace the old bot message with the new one
      const newMessages = [...messages];
      newMessages[messageIndex] = {
        id: nanoid(),
        type: 'bot',
        content: response || "I apologize, but I couldn't generate a response. Please try again.",
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(newMessages);
      toast.success('Generated new response');
    } catch (error) {
      console.error('Error retrying response:', error);
      toast.error('Failed to generate new response');
    } finally {
      setRetryingMessage(null);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    setLoading(true);
    const timestamp = new Date().toLocaleTimeString();

    // Add user message
    const newUserMessage: ChatMessage = {
      id: nanoid(),
      type: 'user',
      content: inputValue,
      timestamp
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    
    try {
      const response = await generateChatResponse([
        ...messages.map(msg => ({
          role: msg.type === 'user' ? 'user' as const : 'assistant' as const,
          content: msg.content
        })),
        { role: 'user' as const, content: inputValue }
      ]);

      const botResponse: ChatMessage = {
        id: nanoid(),
        type: 'bot',
        content: response || "I apologize, but I couldn't generate a response. Please try again.",
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botResponse]);
      setShowSuggestions(false);
    } catch (error) {
      console.error('Error getting chat response:', error);
      toast.error('Failed to get response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: SuggestionCard) => {
    if (suggestion.examples && suggestion.examples.length > 0) {
      const randomExample = suggestion.examples[Math.floor(Math.random() * suggestion.examples.length)];
      setInputValue(randomExample);
    }
  };

  const renderSuggestionButtons = () => {
    const borderColors = [
      'border-indigo-200 hover:border-indigo-400',
      'border-purple-200 hover:border-purple-400',
      'border-blue-200 hover:border-blue-400',
      'border-green-200 hover:border-green-400',
      'border-amber-200 hover:border-amber-400',
      'border-rose-200 hover:border-rose-400'
    ];

    const iconColors = [
      'text-indigo-500',
      'text-purple-500',
      'text-blue-500',
      'text-green-500',
      'text-amber-500',
      'text-rose-500'
    ];

    return (
      <div className="grid grid-cols-2 gap-2 px-2">
        {suggestionCards.map((card, index) => (
          <button
            key={index}
            onClick={() => handleSuggestionClick(card)}
            className={`flex items-start p-2 bg-white dark:bg-gray-800 rounded-md border ${borderColors[index]} dark:border-opacity-25 dark:hover:border-opacity-50 transition-all duration-200 text-left group hover:shadow-sm w-full`}
          >
            <div className={`flex-shrink-0 p-1 ${iconColors[index]} dark:text-opacity-90 group-hover:scale-110 transition-transform`}>
              {card.icon}
            </div>
            <div className="ml-2 min-w-0">
              <h3 className="text-xs font-medium text-gray-900 dark:text-white line-clamp-1">{card.title}</h3>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-1">
                {card.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const createNewChat = () => {
    // Clear messages and show suggestions
    setMessages([]);
    setSelectedChat('new-chat-' + Date.now());
    setInputValue('');
  };

  const handleProcessContent = (type: string) => {
    setProcessingContent(true);
    // Simulate processing delay
    setTimeout(() => {
      setProcessingContent(false);
      setActiveStudyTab(type as 'quiz' | 'flashcards' | 'summary' | 'notes');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Mode selector tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-10 p-1.5 inline-flex items-center sticky top-20 z-10">
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

          {/* LectureMode Component */}
          <LectureMode onProcessContent={handleProcessContent} />
        </div>
      ) : (
        /* Chatbot UI */
        <div className="flex h-[calc(100vh-12rem)]">
          {/* Left sidebar - chat history */}
          <div className="w-64 bg-white dark:bg-gray-800 rounded-l-xl border-r border-gray-200 dark:border-gray-700 hidden md:block">
            <div className="p-4">
              <button 
                onClick={createNewChat}
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2.5 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                New Chat
              </button>
              
              <div className="mt-4">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 px-1">Recent chats</div>
                <div className="space-y-1">
                  <button 
                    className="w-full text-left px-3 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-300 group transition-colors"
                    onClick={() => setSelectedChat('chat-1')}
                  >
                    <MessageSquare className="w-4 h-4 text-indigo-500" />
                    <div className="truncate">Let's brainstorm ideas...</div>
                  </button>
                </div>
              </div>
              
              {/* Chat Info Section */}
              <div className="mt-4 space-y-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500" />
                    Chat Tips
                  </h3>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                      Press Enter to send
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                      Shift + Enter for new line
                    </li>
                  </ul>
                </div>
                
                <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-green-500" />
                    Session Stats
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center justify-between">
                      <span>Messages</span>
                      <span className="font-medium bg-white dark:bg-gray-700 px-2 py-1 rounded">
                        {messages.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Duration</span>
                      <span className="font-medium bg-white dark:bg-gray-700 px-2 py-1 rounded">
                        {messages.length > 0 ? '10m' : '0m'}
                      </span>
                    </div>
                  </div>
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
              {/* Suggestion cards with reduced margin */}
              <div className="mb-2">
                {renderSuggestionButtons()}
                <p className="text-gray-500 dark:text-gray-400 text-[10px] mt-2 text-center">
                  Click a suggestion above to get started, or type your own question below!
                </p>
              </div>
              
              {/* Chat messages */}
              {messages.length > 0 ? (
                <>
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
                              : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 max-w-3xl'
                          }`}
                        >
                          <div className="flex-1">
                            <div className={message.type === 'user' ? 'text-white' : 'text-gray-900 dark:text-gray-100'}>
                              {message.content}
                            </div>
                            <div className="flex items-center gap-4 mt-2">
                              <button 
                                className={`${
                                  message.type === 'user'
                                    ? 'text-white/60 hover:text-white'
                                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                                } transition-colors`}
                                onClick={() => handleCopyMessage(message.content)}
                                title="Copy message"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                              <button 
                                className={`${
                                  message.type === 'user'
                                    ? 'text-white/60 hover:text-white'
                                    : 'text-gray-400 hover:text-green-500'
                                } transition-colors`}
                                onClick={() => handleThumbsUp(message.id)}
                                title="This was helpful"
                              >
                                <ThumbsUp className="w-4 h-4" />
                              </button>
                              <button 
                                className={`${
                                  message.type === 'user'
                                    ? 'text-white/60 hover:text-white'
                                    : 'text-gray-400 hover:text-red-500'
                                } transition-colors`}
                                onClick={() => handleThumbsDown(message.id)}
                                title="This wasn't helpful"
                              >
                                <ThumbsDown className="w-4 h-4" />
                              </button>
                              <button 
                                className={`${
                                  message.type === 'user'
                                    ? 'text-white/60 hover:text-white'
                                    : 'text-gray-400 hover:text-primary-500'
                                } transition-colors ${retryingMessage === message.id ? 'animate-spin' : ''}`}
                                onClick={() => handleRetry(message.id)}
                                disabled={retryingMessage === message.id}
                                title="Regenerate response"
                              >
                                <RotateCcw className={`w-4 h-4 ${retryingMessage === message.id ? 'animate-spin' : ''}`} />
                              </button>
                              <span className={`text-xs ${
                                message.type === 'user'
                                  ? 'text-white/60'
                                  : 'text-gray-400'
                              }`}>
                                {message.timestamp}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div ref={messagesEndRef} />
                </>
              ) : (
                <div ref={messagesEndRef} />
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

export default StudentBoard