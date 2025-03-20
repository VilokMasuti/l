import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (heroRef.current) {
        // Parallax effect
        heroRef.current.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-4 pt-16 bg-cover bg-center"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background"></div>

      <div className="relative z-10 container mx-auto text-center max-w-4xl">
        <div className="inline-block animate-fade-in">
          <span className="px-3 py-1 text-xs font-medium tracking-wider uppercase rounded-full glass-morphism">
            Innovative Design Solutions
          </span>
        </div>

        <h1 className="mt-8 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-fade-up">
          <span className="block">Crafting Digital</span>
          <span className="block mt-2">Experiences with Precision</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto animate-fade-up animate-delay-200">
          Streamlined interfaces and responsive designs that elevate your digital presence.
          Built with care, delivered with confidence.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 animate-fade-up animate-delay-300">
          <button className="px-8 py-3 rounded-full text-primary-foreground bg-foreground font-medium transition-all duration-300 hover:shadow-xl">
            Get Started
          </button>
          <button className="px-8 py-3 rounded-full glass-morphism font-medium transition-all duration-300 hover:shadow-xl">
            Learn More
          </button>
        </div>
      </div>

      <button
        onClick={scrollToServices}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce p-2 rounded-full glass-morphism"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-6 w-6" />
      </button>
    </section>
  );
};

export default Hero;
