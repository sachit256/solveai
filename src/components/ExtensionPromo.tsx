import React from 'react';
import { Chrome, MousePointer2, Sparkles, Download } from 'lucide-react';

export const ExtensionPromo = () => {
  const steps = [
    {
      icon: <Chrome className="w-6 h-6" />,
      title: "Install Extension",
      description: "Add BrainlyAi to Chrome in just one click"
    },
    {
      icon: <MousePointer2 className="w-6 h-6" />,
      title: "Drag to Select",
      description: "Simply drag over any question or problem on your screen"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Get Instant Answer",
      description: "Our AI analyzes and provides detailed solutions instantly"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-primary-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Get Answers Anywhere with Our Chrome Extension
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Transform any webpage into your personal AI tutor
            </p>
            <a
              href="https://chrome.google.com/webstore/detail/brainlyai/your-extension-id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
            >
              <Chrome className="w-5 h-5 mr-2" />
              Add extension to Chrome
            </a>
          </div>

          {/* How it Works Steps */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-primary-600 dark:text-primary-400">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Demo Video/Animation */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-16">
            <div className="aspect-video rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/demo/extension-demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold mb-2">Works Everywhere</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Use on any website, including textbooks, PDFs, and educational platforms
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold mb-2">Smart Selection</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Automatically detects questions and relevant context
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold mb-2">Instant Results</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get answers and explanations without leaving your current page
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 