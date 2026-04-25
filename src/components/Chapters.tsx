import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const chaptersData = [
  {
    num: '01',
    hindiNum: 'अध्याय एक',
    englishNum: 'Chapter One',
    title: 'The infusion that changed everything.',
    subtext: 'Origin · Ritual · Warmth',
    content: [
      'Long before cafés and pour-overs, there was chai. Born in the kitchens of the subcontinent, it was never just a drink - it was a gesture of welcome, a pause in the day, a language shared between strangers.',
      'Every household has its recipe. Every recipe holds a memory. This is the story of the cup that refuses to be forgotten.'
    ],
  },
  {
    num: '02',
    hindiNum: 'अध्याय दो',
    englishNum: 'Chapter Two',
    title: 'A Symphony of Simmer.',
    subtext: 'Heat · Alchemy · Aroma',
    content: [
      'The boiling of milk, the bruising of cardamom, the slow dance of tea leaves turning water into amber. It is a patient process, one that rewards the watcher with the perfect steam.',
      'Fire is the alchemist here. It doesn\'t just boil; it transforms. The aroma that fills the room is the first sip, taken by the soul before the lips even touch the rim.'
    ],
  },
  {
    num: '03',
    hindiNum: 'अध्याय तीन',
    englishNum: 'Chapter Three',
    title: 'The Urban Pulse.',
    subtext: 'Community · Conversation · Connection',
    content: [
      'On every street corner, the \'tapri\' stands as a secular temple. Here, social hierarchies dissolve into the steam of a shared pot. It is the original social network, powered by ginger and steam.',
      'From rickshaw drivers to corporate visionaries, the clay cup - the kulhad - is the great equalizer. One cup, a thousand stories, and the pulse of a nation.'
    ],
  }
];

const Chapters: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      {
        translateX: 0,
      },
      {
        translateX: `-${(chaptersData.length - 1) * 100}vw`,
        ease: 'none',
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: `+=${chaptersData.length * 100}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      }
    );

    return () => {
      pin.kill();
    };
  }, []);

  return (
    <div id="chapter" ref={triggerRef} className="bg-cinema relative z-10 overflow-hidden">
      <div 
        ref={sectionRef} 
        className="flex md:h-screen h-[75svh] min-h-[500px] md:min-h-[700px] items-center"
        style={{ width: `${chaptersData.length * 100}vw` }}
      >
        {chaptersData.map((chapter, index) => (
          <section 
            key={chapter.num}
            className="relative w-screen h-full flex flex-col justify-center px-6 md:px-12 lg:px-24 py-16 md:py-20 overflow-hidden"
          >
            {/* Ghost Numeral */}
            <div 
              className="absolute top-[10%] md:top-1/2 left-[10%] md:left-1/2 -translate-x-0 md:-translate-x-1/2 -translate-y-0 md:-translate-y-1/2 text-[10rem] md:text-[25rem] lg:text-[35rem] font-serif italic text-cream opacity-[0.02] md:opacity-[0.03] leading-none pointer-events-none select-none z-0"
            >
              {chapter.num}
            </div>
            
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="mb-3 md:mb-4">
                  <span className="font-serif italic text-ember/40 text-sm md:text-lg block mb-1">{chapter.hindiNum}</span>
                  <span className="font-display text-bark tracking-[0.25em] text-[9px] md:text-xs uppercase block">{chapter.englishNum}</span>
                </div>
                <h2 className="font-serif italic text-2xl md:text-5xl lg:text-7xl text-ember leading-tight mb-3 md:mb-6">
                  {chapter.title}
                </h2>
                <div className="w-10 md:w-12 h-[1px] bg-bark mb-4 md:mb-8"></div>
                <p className="font-body text-cream/50 text-[10px] md:text-sm tracking-wide leading-relaxed md:leading-loose max-w-xs">
                  {chapter.subtext}
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="font-body text-cream/70 text-sm md:text-lg lg:text-xl leading-relaxed space-y-3 md:space-y-6"
              >
                {chapter.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </motion.div>
            </div>

            {/* Horizontal Progress bar for this section */}
            <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 text-cream/20 font-display text-[8px] md:text-[10px] tracking-[0.3em] uppercase">
               <span>01</span>
               <div className="w-24 md:w-48 h-[1px] bg-cream/10 relative">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-ember"
                    initial={{ width: 0 }}
                    animate={{ width: `${((index + 1) / chaptersData.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
               </div>
               <span>0{chaptersData.length}</span>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Chapters;
