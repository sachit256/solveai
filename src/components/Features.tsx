import React from 'react';
import { Camera, MessageCircle, Zap, BookOpen, Clock, Check, Brain, Shield, ArrowRight, Sparkles, Star, Laptop } from 'lucide-react';

// Chrome Web Store URL constant
const CHROME_STORE_URL = 'https://chrome.google.com/webstore/detail/brainlyai/ipkfbbjjlklmccnlhebanolgjhhjdidg';

export const Features = () => {
  const mainFeatures = [
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Snap & Solve",
      description: "Upload a photo of your question and get instant, accurate solutions powered by advanced AI technology"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Learning",
      description: "Our intelligent system adapts to your learning style, providing personalized explanations and guidance"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Interactive Help",
      description: "Get step-by-step explanations with visual aids and engage in real-time problem-solving sessions"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Smart Solutions",
      description: "Experience precise answers and detailed explanations that help you truly understand the concepts"
    }
  ];

  const learningFeatures = [
    {
      icon: <Star className="w-6 h-6" />,
      title: "Personalized Learning Path",
      description: "AI-driven system that adapts to your unique learning style and pace"
    },
    {
      icon: <Laptop className="w-6 h-6" />,
      title: "Cross-Platform Access",
      description: "Seamlessly access your learning materials across all devices"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Verified Content",
      description: "All solutions are thoroughly verified for accuracy and clarity"
    }
  ];

  const subjects = [
    {
      category: "Mathematics",
      topics: ["Algebra", "Calculus", "Geometry", "Statistics", "Trigonometry"]
    },
    {
      category: "Sciences",
      topics: ["Physics", "Chemistry", "Biology", "Computer Science"]
    },
    {
      category: "Humanities",
      topics: ["History", "Literature", "Economics", "Philosophy"]
    }
  ];

  const handleTryItNow = () => {
    window.open(CHROME_STORE_URL, '_blank');
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgb(79,70,229)]/10 via-transparent to-transparent dark:from-[rgb(79,70,229)]/20" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 text-[rgb(79,70,229)] mb-4">
              <span className="text-sm font-semibold uppercase tracking-wider">Features</span>
              <ArrowRight className="w-4 h-4" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Unlock Your Learning Potential
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Experience the power of AI-driven learning with our comprehensive suite of features
            </p>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {mainFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 group hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-[rgb(79,70,229)]/10 dark:bg-[rgb(79,70,229)]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[rgb(79,70,229)] group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Features */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 text-[rgb(79,70,229)] mb-4">
              <span className="text-sm font-semibold uppercase tracking-wider">Learning Tools</span>
              <ArrowRight className="w-4 h-4" />
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-8">Advanced Learning Features</h2>
                <div className="space-y-8">
                  {learningFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4 group">
                      <div className="w-12 h-12 bg-[rgb(79,70,229)]/10 dark:bg-[rgb(79,70,229)]/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[rgb(79,70,229)] group-hover:text-white transition-colors">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-800">
                <h3 className="text-2xl font-bold mb-8">Supported Subjects</h3>
                <div className="space-y-6">
                  {subjects.map((subject, index) => (
                    <div key={index} className="space-y-3">
                      <h4 className="text-lg font-semibold text-[rgb(79,70,229)]">{subject.category}</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {subject.topics.map((topic, topicIndex) => (
                          <div key={topicIndex} className="flex items-center space-x-2">
                            <Check className="w-5 h-5 text-[rgb(79,70,229)]" />
                            <span className="text-gray-600 dark:text-gray-400">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[rgb(79,70,229)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Start Learning Smarter Today</h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of students who are already experiencing the future of education.
            </p>
            <button 
              onClick={handleTryItNow}
              className="bg-white text-[rgb(79,70,229)] px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2 mx-auto"
            >
              Try It Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}; 