import React from 'react';

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Sophia jack",
      role: "IIT Student",
      content: "Brainly makes studying simple with peer-to-peer learning support."
    },
    {
      name: "Sam",
      role: "IIT Student",
      content: "Brainly connects students for fast, reliable homework help and collaborative learning."
    },
    {
      name: "Olivia Green",
      role: "IIT Student",
      content: "Homework help is just a question away with Brainly."
    }
  ];

  // Calculate positions for vertical staggered layout
  const getPosition = (index: number) => {
    switch (index) {
      case 0: // First card - Left side, top
        return { left: '13%', top: '30px' };
      case 1: // Second card - Middle, lower
        return { left: '50%', top: '500px' };
      case 2: // Third card - Right side, middle
        return { left: '85%', top: '150px' };
      default:
        return { left: '0%', top: '0px' };
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-primary-50/20 to-white dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient circles */}
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-primary-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-primary-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-gradient-to-r from-primary-100/20 to-transparent rounded-full blur-2xl" />
        
        {/* Additional decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-primary-100/20 rounded-full blur-xl" />
        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-indigo-100/20 rounded-full blur-xl" />
        <div className="absolute top-1/3 left-1/3 w-16 h-16 bg-primary-200/20 rounded-full blur-lg" />
        <div className="absolute bottom-1/3 right-1/3 w-20 h-20 bg-indigo-200/20 rounded-full blur-lg" />
        
        {/* Floating shapes */}
        <div className="absolute top-20 left-[20%] w-8 h-8 border-2 border-primary-200/30 rounded-lg rotate-12" />
        <div className="absolute bottom-32 right-[25%] w-6 h-6 border-2 border-indigo-200/30 rounded-full" />
        <div className="absolute top-1/2 left-[15%] w-4 h-4 bg-primary-300/20 rotate-45" />
        <div className="absolute bottom-1/4 right-[30%] w-5 h-5 bg-indigo-300/20 rounded-full" />
      </div>

      <div className="container mx-auto px-4">
        {/* Header section */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Join thousands of students who trust BrainlyAi for their learning journey
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="max-w-[1400px] mx-auto relative min-h-[700px]">
          <div className="relative z-10">
            {testimonials.map((testimonial, index) => {
              const position = getPosition(index);
              return (
                <div
                  key={index}
                  className="absolute w-full max-w-[420px] transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
                  style={{
                    left: position.left,
                    top: position.top,
                    transform: `translateX(-50%)`
                  }}
                >
                  <div className="bg-white/90 dark:bg-gray-800/90 rounded-[32px] p-8 shadow-xl backdrop-blur-sm">
                    {/* Avatar and info */}
                    <div className="absolute -top-4 -right-4 flex items-center gap-3 bg-white dark:bg-gray-800 rounded-full p-3 shadow-md">
                      <div className="w-14 h-14 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                        <span className="text-xl font-semibold text-primary-600 dark:text-primary-400">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-base">{testimonial.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>

                    {/* Testimonial content */}
                    <div className="relative">
                      <div className="absolute -left-3 -top-3 text-6xl text-primary-200/50 dark:text-primary-800/50">"</div>
                      <p className="text-xl font-medium mt-10 mb-8 relative z-10 text-gray-800 dark:text-gray-200">{testimonial.content}</p>
                      <div className="absolute -right-3 bottom-0 text-6xl text-primary-200/50 dark:text-primary-800/50">"</div>
                    </div>

                    {/* Stars */}
                    <div className="flex gap-2 mt-6">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-6 h-6 text-indigo-600 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}; 