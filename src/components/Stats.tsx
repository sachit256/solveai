import React from 'react';

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

  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-900/10 rounded-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2 animate-count">1M+</div>
            <p className="text-gray-600 dark:text-gray-400">Active Students</p>
          </div>
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-900/10 rounded-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2 animate-count">6M+</div>
            <p className="text-gray-600 dark:text-gray-400">Questions Solved</p>
          </div>
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-900/10 rounded-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2 animate-count">98%</div>
            <p className="text-gray-600 dark:text-gray-400">Accuracy Rate</p>
          </div>
        </div>

        {/* Universities Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Trusted by Students From</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join students from world-renowned institutions who use BrainlyAi to enhance their learning experience
          </p>
        </div>

        {/* Infinite Scrolling Logos */}
        <div className="relative overflow-hidden py-4">
          <div className="flex animate-scroll">
            {[...universities, ...universities].map((university, index) => (
              <div
                key={index}
                className="flex-none mx-6 w-24 group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300">
                  <img
                    src={university.logo}
                    alt={university.name}
                    className="h-12 w-auto object-contain mx-auto filter dark:brightness-0 dark:invert opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <div className="mt-2 text-center">
                  <p className="text-[10px] font-medium text-gray-600 dark:text-gray-400 truncate">{university.name}</p>
                </div>
              </div>
            ))}
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
            animation: scroll 25s linear infinite;
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