import React from 'react';
import { motion } from 'framer-motion';

const ChapterIntro: React.FC = () => {
  return (
    <section className="relative w-full py-32 px-6 md:px-12 lg:px-24 flex justify-center bg-cinema z-10 overflow-hidden">
      {/* Ghost Numeral */}
      <div className="absolute top-0 left-4 md:left-24 text-[18rem] md:text-[28rem] font-serif italic text-cream opacity-[0.03] leading-none pointer-events-none select-none">
        01
      </div>
      
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="font-display text-bark tracking-[0.25em] text-xs uppercase block mb-4">Chapter One</span>
          <h2 className="font-serif italic text-4xl md:text-5xl text-ember leading-tight mb-6">
            The infusion that<br/>changed everything.
          </h2>
          <div className="w-12 h-[1px] bg-bark mb-8"></div>
          <p className="font-body text-cream/50 text-sm tracking-wide leading-loose max-w-xs">
            Origin · Ritual · Warmth
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="font-body text-cream/70 text-lg md:text-xl leading-relaxed space-y-6"
        >
          <p>
            Long before cafés and pour-overs, there was chai. Born in the kitchens of the subcontinent, 
            it was never just a drink - it was a gesture of welcome, a pause in the day, a language shared between strangers.
          </p>
          <p>
            Every household has its recipe. Every recipe holds a memory. This is the story of the cup that 
            refuses to be forgotten.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ChapterIntro;
