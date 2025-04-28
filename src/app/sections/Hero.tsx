'use client';

import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-primary-color">
            Hello, I&apos;m Min Hwang
          </h1>
          <p className="text-xl md:text-2xl mb-12 leading-relaxed text-text-color">
            A passionate developer crafting elegant solutions through code.
            <br />
            Specializing in modern web applications that push the boundaries of what&apos;s possible.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-accent-color text-white rounded-full hover:bg-accent-color/90 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-accent-color text-white rounded-full hover:bg-accent-color/90 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:your.email@example.com"
              className="px-6 py-3 bg-accent-color text-white rounded-full hover:bg-accent-color/90 transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 