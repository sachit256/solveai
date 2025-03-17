import React from 'react';
import { Camera, Chrome } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="max-w-5xl mx-auto text-center pb-24">
      <div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-full px-4 py-2 mb-8 mt-5 relative before:absolute before:inset-0 before:rounded-full before:border before:border-gray-200 dark:before:border-gray-700 before:transition-all hover:before:scale-105 before:duration-300 after:absolute after:inset-0 after:rounded-full after:border after:border-primary-400/50 dark:after:border-primary-500/50 after:transition-all hover:after:scale-110 after:duration-500">
        <Chrome className="w-5 h-5 text-primary-600 mr-2" />
        <span className="text-sm text-gray-600 dark:text-gray-300">Available on Chrome Web Store</span>
      </div>
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
        Get Instant Solutions
        <br />
        with a Simple <span className="relative">
          Drag
          <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path d="M0,10 Q50,20 100,10" stroke="#4F46E5" strokeWidth="4" fill="none"/>
          </svg>
        </span>
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        Just drag over any question on your screen and get instant answers with detailed explanations.
      </p>
      <a
        href="https://chrome.google.com/webstore/detail/answersai/your-extension-id"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium text-lg mb-16 space-x-2"
      >
        <Chrome className="w-6 h-6" />
        <span>Add extension to Chrome</span>
      </a>
      
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="aspect-video rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/demo/drag-select-demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}; 