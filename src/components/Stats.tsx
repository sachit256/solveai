import React from 'react';

export const Stats = () => {
  const universities = [
    {
      name: "UC Berkeley",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Seal_of_University_of_California%2C_Berkeley.svg/150px-Seal_of_University_of_California%2C_Berkeley.svg.png"
    },
    {
      name: "Stanford",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Stanford_Cardinal_logo.svg/150px-Stanford_Cardinal_logo.svg.png"
    },
    {
      name: "Harvard",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Harvard_shield_wreath.svg/150px-Harvard_shield_wreath.svg.png"
    },
    {
      name: "MIT",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/150px-MIT_logo.svg.png"
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex justify-center gap-12 mb-12">
            <div>
              <h3 className="text-4xl font-bold text-primary-600">1M+</h3>
              <p className="text-gray-600 dark:text-gray-400">Active Users</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary-600">6M+</h3>
              <p className="text-gray-600 dark:text-gray-400">Questions Solved</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary-600">98%</h3>
              <p className="text-gray-600 dark:text-gray-400">Accuracy Rate</p>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mb-8">Trusted by Students From</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-75">
            {universities.map((university, index) => (
              <img
                key={index}
                src={university.logo}
                alt={university.name}
                className="h-12 w-auto grayscale hover:grayscale-0 transition-all"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 