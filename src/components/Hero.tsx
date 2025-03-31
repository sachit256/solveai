import React from 'react';
import { Camera, Chrome, ArrowRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[rgb(79,70,229)]/5 via-transparent to-transparent dark:from-[rgb(79,70,229)]/10" />

        {/* Large circular gradients */}
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-[rgb(79,70,229)]/10 to-transparent rounded-full blur-3xl dark:from-[rgb(79,70,229)]/20" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-[rgb(79,70,229)]/10 to-transparent rounded-full blur-3xl dark:from-[rgb(79,70,229)]/20" />

        {/* Additional subtle decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-[rgb(79,70,229)]/10 rounded-full blur-xl dark:bg-[rgb(79,70,229)]/20" />
        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-[rgb(79,70,229)]/10 rounded-full blur-xl dark:bg-[rgb(79,70,229)]/20" />
      </div>

      <div className="mt-16 max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center">
          {/* Chrome Store Badge */}
          {/* TEMP COMMENTED <div className="inline-flex items-center backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-full px-6 py-3 mb-12 relative group cursor-pointer hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[rgb(79,70,229)]/10 to-purple-500/10 opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[rgb(79,70,229)]/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Chrome className="w-5 h-5 text-[rgb(79,70,229)] mr-3" />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              Available on Chrome Web Store
            </span>
            <ArrowRight className="w-4 h-4 ml-2 text-[rgb(79,70,229)]" />
          </div> */}

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 leading-[1.2] md:leading-[1.2]">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600">
              Get Instant Solutions
              <br />
              with a Simple{' '}
            </span>
            <span className="relative inline-block text-gray-900 dark:text-white">
              Drag
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,10 Q50,20 100,10"
                  stroke="rgb(79,70,229)"
                  strokeWidth="4"
                  fill="none"
                  className="dark:opacity-90"
                  strokeLinecap="round"
                  style={{
                    filter: 'drop-shadow(0 1px 2px rgba(79,70,229,0.3))',
                  }}
                />
              </svg>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Just drag over any question on your screen and get instant answers
            with detailed explanations powered by AI.
          </p>

          {/* CTA Button */}
          {/* TEMP COMMENTED  <a
            href="https://chrome.google.com/webstore/detail/brainlyai/your-extension-id"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-[rgb(79,70,229)] hover:bg-[rgb(79,70,229)]/90 text-white rounded-full font-medium text-lg mb-16 space-x-3 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <Chrome className="w-6 h-6" />
            <span>Add to Chrome - It's Powerful</span>
          </a> */}

          {/* Demo Video Container */}
          <div className="relative mb-20">
            <div className="absolute inset-0 bg-gradient-to-r from-[rgb(79,70,229)]/20 to-purple-500/20 rounded-3xl blur-2xl" />
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 group">
              <div className="aspect-video rounded-lg overflow-hidden relative">
                {/* Light theme image */}
                <img
                  src="/demo/image4.jpeg"
                  alt="BrainlyAi Extension Demo - Light Theme"
                  className="w-full h-full object-cover absolute inset-0 transition-all duration-500 ease-in-out group-hover:scale-105 block dark:opacity-0"
                />
                {/* Dark theme image */}
                <img
                  src="/demo/image3.jpeg"
                  alt="BrainlyAi Extension Demo - Dark Theme"
                  className="w-full h-full object-cover absolute inset-0 transition-all duration-500 ease-in-out group-hover:scale-105 opacity-0 dark:opacity-100"
                />
              </div>

              {/* Floating Add to Chrome Button */}
              {/* <div className="absolute bottom-4 right-4 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                <button className="flex items-center gap-2 px-4 py-2 bg-[rgb(79,70,229)] text-white rounded-lg hover:bg-[rgb(79,70,229)]/90 transition-colors shadow-lg">
                  <Chrome className="w-5 h-5" />
                  Add to Chrome - It's Free
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
