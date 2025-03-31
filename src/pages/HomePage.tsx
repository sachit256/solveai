import React from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Stats } from '../components/Stats';
import { Testimonials } from '../components/Testimonials';
import { ExtensionPromo } from '../components/ExtensionPromo';

export const HomePage = () => {
  return (
    <main className="bg-gradient-to-b from-primary-50/50 to-transparent dark:from-gray-900/50 dark:to-transparent">
      <Hero />
      <ExtensionPromo />
      <Features />
      <Testimonials />
      <Stats />
    </main>
  );
};
