import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ImageSequence from './canvas/ImageSequence';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Timeline for the scroll animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=300%', // Increased scroll distance for smooth progression
          scrub: 1.5,
          pin: true,
          onUpdate: (self) => {
            setAnimationProgress(self.progress);
          },
        },
      });

      // Animate text reveal
      tl.fromTo(
        '.hero-headline',
        { opacity: 0, y: 100, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' },
        0.1
      )
      .fromTo(
        '.hero-subtext',
        { opacity: 0, y: 20, filter: 'blur(5px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' },
        0.3
      )
      .fromTo(
        '.hero-cta',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' },
        0.5
      );

      // Subtle parallax/zoom effect on the canvas container
      tl.to('.hero-canvas-container', {
        scale: 1.05,
        ease: 'none',
      }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen bg-cinema overflow-hidden"
    >
      {/* Cinematic Image Sequence */}
      <ImageSequence 
        progress={animationProgress}
        frameCount={120}
        imagePath="/chai-hero/ezgif-frame-"
        imageExtension=".jpg"
      />

      {/* Radial Gradient Overlay for Depth */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-cinema/40 via-transparent to-cinema/80" />
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.4)_100%)]" />

      {/* Hero Content Overlay */}
      <div 
        ref={containerRef}
        className="hero-content relative z-20 w-full h-full flex flex-col justify-center items-center px-6 text-center"
      >
        <div className="max-w-4xl space-y-8">
          <div className="space-y-2">
            <h1 className="hero-headline font-serif italic text-7xl md:text-[10rem] lg:text-[13rem] text-cream leading-none tracking-tight">
              Chai
            </h1>
            <p className="hero-subtext font-body text-cream/60 text-lg md:text-xl tracking-[0.2em] uppercase">
              The Essence of Steam and Soul
            </p>
          </div>

          <div className="hero-cta pt-12">
            <button className="premium-button">
              Explore CHAI
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4">
          <span className="font-body text-[10px] tracking-[0.4em] uppercase text-cream/30">Scroll to Steep</span>
          <div className="w-[1px] h-12 bg-cream/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-ember animate-scroll-line" />
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scroll-line {
          animation: scroll-line 2s infinite linear;
        }
      `}} />
    </section>
  );
};

export default Hero;

