import React from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Stats } from '../components/Stats';
import { Testimonials } from '../components/Testimonials';
import { ExtensionPromo } from '../components/ExtensionPromo';

export const HomePage = () => {
  return (
    <main className="pt-16">
      <Hero />
      <ExtensionPromo />
      <Features />
      <Testimonials />
      <Stats />
    </main>
  );
}; 