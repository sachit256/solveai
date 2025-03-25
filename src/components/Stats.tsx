import React from 'react';
import { ArrowRight } from 'lucide-react';

export const Stats = () => {
  const universities = [
    {
      name: "Stanford University",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Stanford_Cardinal_logo.svg/80px-Stanford_Cardinal_logo.svg.png",
      country: "USA"
    },
    {
      name: "University of Oxford",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Oxford-University-Circlet.svg/80px-Oxford-University-Circlet.svg.png",
      country: "UK"
    },
    {
      name: "MIT",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/80px-MIT_logo.svg.png",
      country: "USA"
    },
    {
      name: "Harvard University",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Harvard_University_logo.svg/80px-Harvard_University_logo.svg.png",
      country: "USA"
    },
    {
      name: "ETH Zürich",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/ETH_Z%C3%BCrich_Logo.svg/80px-ETH_Z%C3%BCrich_Logo.svg.png",
      country: "Switzerland"
    },
    {
      name: "University of Cambridge",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Cambridge_University_Crest.svg/80px-Cambridge_University_Crest.svg.png",
      country: "UK"
    }
  ];

  const stats = [
    {
      number: "1M+",
      label: "Active Students",
      description: "Students actively using our platform"
    },
    {
      number: "6M+",
      label: "Questions Solved",
      description: "Successfully answered questions"
    },
    {
      number: "95%",
      label: "Success Rate",
      description: "Accuracy in problem-solving"
    },
    {
      number: "24/7",
      label: "Support",
      description: "Round-the-clock assistance"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgb(79,70,229)]/5 to-transparent dark:from-[rgb(79,70,229)]/10" />
      <div className="absolute -top-1/2 right-0 w-full h-full bg-gradient-to-bl from-[rgb(79,70,229)]/10 via-transparent to-transparent transform -rotate-12 dark:from-[rgb(79,70,229)]/20" />
      
      <div className="container mx-auto px-4 relative">
        {/* Stats Grid */}
        <div className="max-w-7xl mx-auto mb-24">
          <div className="flex items-center gap-2 text-[rgb(79,70,229)] mb-4 justify-center">
            <span className="text-sm font-semibold uppercase tracking-wider">Our Impact</span>
            <ArrowRight className="w-4 h-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[rgb(79,70,229)]/5 to-transparent dark:from-[rgb(79,70,229)]/10 rounded-2xl transform transition-transform group-hover:scale-105 duration-300" />
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-lg border border-gray-100 dark:border-gray-700">
                  <div className="text-4xl font-bold text-[rgb(79,70,229)] mb-2 animate-count">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold mb-2">{stat.label}</div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {stat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Universities Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center gap-2 text-[rgb(79,70,229)] mb-4 justify-center">
              <span className="text-sm font-semibold uppercase tracking-wider">Trusted Globally</span>
              <ArrowRight className="w-4 h-4" />
            </div>
            <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600">
              Used by Students Worldwide
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              Join students from world-renowned institutions who use BrainlyAi to enhance their learning experience
            </p>
          </div>

          {/* Infinite Scrolling Logos */}
          <div className="relative overflow-hidden py-8">
            <div className="flex animate-scroll">
              {[...universities, ...universities].map((university, index) => (
                <div
                  key={index}
                  className="flex-none mx-8 w-32 group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                    <img
                      src={university.logo}
                      alt={university.name}
                      className="h-12 w-auto object-contain mx-auto filter dark:brightness-0 dark:invert opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{university.name}</p>
                    <p className="text-xs text-[rgb(79,70,229)]">{university.country}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-scroll {
            animation: scroll 30s linear infinite;
          }

          @keyframes countUp {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          .animate-count {
            animation: countUp 1s ease-out forwards;
          }
        `}
      </style>
    </section>
  );
};