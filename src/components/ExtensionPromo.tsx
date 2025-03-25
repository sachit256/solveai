import React from 'react';
import { Chrome, MousePointer2, Sparkles, Download, ArrowRight } from 'lucide-react';

export const ExtensionPromo = () => {
  const steps = [
    {
      icon: <Chrome className="w-6 h-6" />,
      title: "Install Extension",
      description: "Add BrainlyAi to Chrome in just one click - it's completely free"
    },
    {
      icon: <MousePointer2 className="w-6 h-6" />,
      title: "Drag to Select",
      description: "Simply drag over any question or problem on your screen to get started"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Get Instant Answer",
      description: "Our advanced AI analyzes and provides detailed solutions within seconds"
    }
  ];

  const features = [
    {
      title: "Universal Compatibility",
      description: "Works seamlessly on textbooks, PDFs, and all educational platforms"
    },
    {
      title: "Smart Selection",
      description: "Advanced AI automatically detects questions and relevant context"
    },
    {
      title: "Real-time Results",
      description: "Get instant answers without leaving your current webpage"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgb(79,70,229)]/5 to-transparent dark:from-[rgb(79,70,229)]/10" />
      <div className="absolute -top-1/2 left-0 w-full h-full bg-gradient-to-br from-[rgb(79,70,229)]/10 via-transparent to-transparent transform rotate-12 dark:from-[rgb(79,70,229)]/20" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-2 text-[rgb(79,70,229)] mb-4">
              <span className="text-sm font-semibold uppercase tracking-wider">Chrome Extension</span>
              <ArrowRight className="w-4 h-4" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600">
              Transform Any Webpage Into Your AI Tutor
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Get instant answers and explanations for any question, anywhere on the web
            </p>
            <a
              href="https://chrome.google.com/webstore/detail/brainlyai/your-extension-id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-[rgb(79,70,229)] hover:bg-[rgb(79,70,229)]/90 text-white rounded-full font-medium text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <Chrome className="w-5 h-5 mr-2" />
              Add to Chrome - It's Free
            </a>
          </div>

          {/* How it Works Steps */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[rgb(79,70,229)]/5 to-transparent dark:from-[rgb(79,70,229)]/10 rounded-2xl transform transition-transform group-hover:scale-105 duration-300" />
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                  <div className="w-16 h-16 bg-[rgb(79,70,229)]/10 dark:bg-[rgb(79,70,229)]/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[rgb(79,70,229)] transition-colors duration-300">
                    <div className="text-[rgb(79,70,229)] group-hover:text-white transition-colors duration-300">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Demo Video Section */}
          <div className="relative mb-20">
            <div className="absolute inset-0 bg-gradient-to-r from-[rgb(79,70,229)]/20 to-purple-500/20 rounded-3xl blur-2xl" />
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
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
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-lg font-semibold mb-3 text-[rgb(79,70,229)]">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 