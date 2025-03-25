import React from 'react';
import { Brain, Users, Target, Award, ArrowRight, Sparkles, Globe } from 'lucide-react';

export const AboutPage = () => {
  const values = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Learning",
      description: "Leveraging cutting-edge artificial intelligence to provide personalized learning experiences"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Access",
      description: "Making quality education accessible to students worldwide, breaking down geographical barriers"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Innovation First",
      description: "Continuously evolving our technology to stay at the forefront of educational advancement"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Student Success",
      description: "Focused on delivering measurable improvements in student understanding and achievement"
    }
  ];

  const stats = [
    { number: "1M+", label: "Students Helped" },
    { number: "150+", label: "Countries Reached" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgb(79,70,229)]/10 via-transparent to-transparent dark:from-[rgb(79,70,229)]/20" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600 bg-clip-text text-transparent leading-[1.2] md:leading-[1.2]">
              Revolutionizing Education Through AI
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              We're building the future of learning, where every student has access to personalized, 
              intelligent educational support at their fingertips.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-[rgb(79,70,229)] mb-2">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 text-[rgb(79,70,229)] mb-4">
              <span className="text-sm font-semibold uppercase tracking-wider">Our Journey</span>
              <ArrowRight className="w-4 h-4" />
            </div>
            <h2 className="text-3xl font-bold mb-8">Transforming How Students Learn</h2>
            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300">
              <p>
                Founded in 2023, BrainlyAi emerged from a simple yet powerful vision: to make expert-level 
                educational support accessible to every student, anywhere, anytime. We recognized that 
                traditional tutoring methods weren't keeping pace with modern learning needs.
              </p>
              <p>
                Our AI-powered platform represents a breakthrough in educational technology, combining 
                advanced artificial intelligence with deep pedagogical understanding. We've created a 
                system that not only answers questions but helps students truly understand concepts.
              </p>
              <p>
                Today, we're proud to serve millions of students worldwide, helping them overcome 
                academic challenges and achieve their full potential. Our technology continues to 
                evolve, becoming more intelligent and helpful with every interaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 text-[rgb(79,70,229)] mb-4">
              <span className="text-sm font-semibold uppercase tracking-wider">Our Values</span>
              <ArrowRight className="w-4 h-4" />
            </div>
            <h2 className="text-3xl font-bold">What Drives Us Forward</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div key={index} 
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-800"
              >
                <div className="w-12 h-12 bg-[rgb(79,70,229)]/10 dark:bg-[rgb(79,70,229)]/20 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-[rgb(79,70,229)]">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[rgb(79,70,229)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Learning?</h2>
            <p className="text-lg mb-8 opacity-90">
              Join millions of students who are already experiencing the future of education.
            </p>
            <button className="bg-white text-[rgb(79,70,229)] px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200 shadow-lg">
              Get Started Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};