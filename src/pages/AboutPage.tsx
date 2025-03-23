import React from 'react';
import { Brain, Users, Target, Award, User } from 'lucide-react';

export const AboutPage = () => {
  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Founder & CEO",
      bio: "Former AI researcher at Stanford, passionate about making education accessible to all."
    },
    {
      name: "Michael Rodriguez",
      role: "CTO",
      bio: "15+ years experience in EdTech, previously led engineering at Khan Academy."
    },
    {
      name: "Dr. Emily Patel",
      role: "Head of Education",
      bio: "PhD in Education Technology, focused on personalized learning systems."
    }
  ];

  const values = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Innovation",
      description: "Pushing the boundaries of AI in education"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Accessibility",
      description: "Making quality education available to everyone"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Excellence",
      description: "Maintaining the highest standards in our solutions"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Impact",
      description: "Creating meaningful change in students' lives"
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">
              Transforming Education Through AI
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              We're on a mission to make quality education accessible to everyone through innovative AI technology.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Founded in 2023, BrainlyAi emerged from a simple observation: students everywhere struggle with getting immediate, quality help when they need it most. Our team of educators and AI experts came together to create a solution that would be like having a personal tutor available 24/7.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Today, we serve millions of students worldwide, helping them understand complex concepts, solve challenging problems, and achieve their academic goals. Our AI technology continues to evolve, becoming smarter and more helpful with every interaction.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-primary-600 dark:text-primary-400">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                  <User className="w-16 h-16 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary-600 dark:text-primary-400 mb-2">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-400">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};