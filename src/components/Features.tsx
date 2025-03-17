import React from 'react';
import { Camera, MessageCircle, Zap, BookOpen, Clock, Check, Brain, Shield } from 'lucide-react';

export const Features = () => {
  const mainFeatures = [
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Snap & Solve",
      description: "Take a photo of your question and get instant solutions"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Detailed Explanations",
      description: "Get step-by-step explanations for better understanding"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Results",
      description: "Get answers within seconds using our AI technology"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Multiple Subjects",
      description: "Support for Math, Science, History, and more"
    }
  ];

  const additionalFeatures = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24/7 Availability",
      description: "Get help anytime, anywhere with our always-on AI system"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Smart Learning",
      description: "AI adapts to your learning style and provides personalized explanations"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Verified Answers",
      description: "All solutions are verified for accuracy and completeness"
    }
  ];

  const subjects = [
    "Mathematics", "Physics", "Chemistry", "Biology",
    "Computer Science", "History", "Literature", "Economics"
  ];

  return (
    <>
      <section className="py-24 bg-gray-50 dark:bg-gray-800" id="features">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Get answers to your questions in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {mainFeatures.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-primary-600 dark:text-primary-400">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Advanced Features</h2>
                <div className="space-y-6">
                  {additionalFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center flex-shrink-0">
                        <div className="text-primary-600 dark:text-primary-400">
                          {feature.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">Supported Subjects</h3>
                <div className="grid grid-cols-2 gap-4">
                  {subjects.map((subject, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="w-5 h-5 text-primary-600" />
                      <span>{subject}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}; 