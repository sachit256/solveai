import React from 'react';
import { Camera, Sparkles, Brain, Clock, Shield, BookOpen, MessageCircle, ChevronRight } from 'lucide-react';

export const FeaturesPage = () => {
  const mainFeatures = [
    {
      title: "Snap & Solve",
      description: "Take a photo of any question and get instant solutions",
      icon: <Camera className="w-8 h-8" />,
      details: [
        "Support for handwritten text",
        "Multiple question detection",
        "Auto-crop and enhance",
        "Works with textbooks and worksheets"
      ],
      demo: "/demo/snap-solve.gif"
    },
    {
      title: "AI-Powered Solutions",
      description: "Advanced AI understands and solves complex problems",
      icon: <Brain className="w-8 h-8" />,
      details: [
        "Step-by-step explanations",
        "Multiple solution methods",
        "Conceptual understanding",
        "Real-world examples"
      ],
      demo: "/demo/ai-solutions.gif"
    },
    {
      title: "Instant Results",
      description: "Get answers within seconds with detailed explanations",
      icon: <Clock className="w-8 h-8" />,
      details: [
        "Under 3-second response time",
        "Batch processing",
        "Priority queue for premium users"
      ],
      demo: "/demo/instant-results.gif"
    }
  ];

  const subjects = [
    { name: "Mathematics", icon: "➗", topics: ["Algebra", "Calculus", "Geometry", "Statistics"] },
    { name: "Physics", icon: "⚛️", topics: ["Mechanics", "Electricity", "Thermodynamics", "Quantum Physics"] },
    { name: "Chemistry", icon: "🧪", topics: ["Organic", "Inorganic", "Physical", "Analytical"] },
    { name: "Biology", icon: "🧬", topics: ["Anatomy", "Genetics", "Ecology", "Molecular Biology"] }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Transform How You Learn
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Powerful features designed to help you understand and master any subject
            </p>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {mainFeatures.map((feature, index) => (
            <div 
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-12 mb-24 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg text-primary-600 dark:text-primary-400">
                    {feature.icon}
                  </div>
                  <h2 className="text-3xl font-bold">{feature.title}</h2>
                </div>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-4">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <ChevronRight className="w-5 h-5 text-primary-600" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4">
                <div className="aspect-video rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  <img 
                    src={feature.demo} 
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Subjects Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Subject Coverage</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Get expert help across a wide range of academic subjects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {subjects.map((subject, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                <div className="text-4xl mb-4">{subject.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{subject.name}</h3>
                <ul className="space-y-2">
                  {subject.topics.map((topic, i) => (
                    <li key={i} className="text-gray-600 dark:text-gray-400">
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">More Powerful Features</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Everything you need to excel in your studies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
              <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg text-primary-600 dark:text-primary-400 w-fit mb-4">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Learning</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Ask follow-up questions and get detailed explanations for better understanding
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
              <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg text-primary-600 dark:text-primary-400 w-fit mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Practice</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get personalized practice problems based on your learning progress
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
              <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg text-primary-600 dark:text-primary-400 w-fit mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Solutions</h3>
              <p className="text-gray-600 dark:text-gray-400">
                All solutions are verified by our expert system for accuracy
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}; 