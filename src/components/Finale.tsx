import React from 'react';
import { motion } from 'framer-motion';

const Finale: React.FC = () => {
  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-center bg-cinema overflow-hidden z-10">
      
      {/* Concentric Pulsing Rings */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        {[1, 2, 3, 4].map((ring) => (
          <motion.div
            key={ring}
            className="absolute rounded-full border border-ember"
            style={{
              width: `${ring * 22}vw`,
              height: `${ring * 22}vw`,
              borderWidth: `${5 - ring}px`,
            }}
            animate={{
              scale: [1, 1.06, 1],
              opacity: [0.08, 0.2, 0.08],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: ring * 0.6,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Ember glow center */}
      <div className="absolute w-40 h-40 rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(212,126,48,0.2) 0%, transparent 70%)' }} />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 text-center flex flex-col items-center px-6"
      >
        <span className="font-display text-bark tracking-[0.3em] text-xs uppercase block mb-6">The invitation</span>
        
        <h2 className="font-serif italic text-5xl md:text-7xl lg:text-8xl text-cream mb-4 leading-tight">
          Your cup<br/>is waiting.
        </h2>
        
        <p className="font-body text-cream/50 text-base mb-12 max-w-sm leading-relaxed">
          Pull up a chair. The chai is hot, the story is long, and there is no rush.
        </p>
        
        <button className="group relative px-12 py-5 overflow-hidden border border-cream/20 bg-transparent text-cream font-display tracking-[0.25em] uppercase text-sm md:text-base transition-colors duration-500 hover:text-cinema cursor-pointer">
          <span className="relative z-10">Steep the Experience</span>
          {/* Bottom-up directional fill */}
          <div className="absolute inset-0 bg-ember transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] z-0"></div>
        </button>
      </motion.div>

      {/* Footer line */}
      <div className="absolute bottom-8 font-body text-cream/20 text-xs tracking-[0.2em] uppercase">
        Chai ·&nbsp;{new Date().getFullYear()}
      </div>
    </section>
  );
};

export default Finale;
