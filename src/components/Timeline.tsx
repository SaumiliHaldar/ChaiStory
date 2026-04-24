import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const milestones = [
  {
    year: '2000 BC',
    title: 'The First Steep',
    desc: 'Ancient Ayurvedic texts describe herbal infusions with ginger and spice as medicine for the soul.',
  },
  {
    year: '1800s',
    title: 'The British Intervention',
    desc: 'Colonial tea plantations in Assam and Darjeeling flood the subcontinent with black leaf. The spices were already waiting.',
  },
  {
    year: '1920s',
    title: 'Chai on the Rails',
    desc: 'Chaiwallahs become a staple on Indian railways. The culture of the clay cup - the kulhad - begins.',
  },
  {
    year: '1980s',
    title: 'Every Street Corner',
    desc: 'The tapri becomes a social institution. Philosophers, rickshaw drivers, and poets share the same cup.',
  },
  {
    year: 'Today',
    title: 'A Global Ritual',
    desc: 'From Mumbai to Manhattan, the masala chai refuses to be gentrified. It remains exactly what it always was.',
  },
];

const Timeline: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="w-full py-32 px-6 bg-cinema relative z-10">
      <div className="max-w-6xl mx-auto mb-20">
        <span className="font-display text-bark tracking-[0.25em] text-xs uppercase block mb-4">A Living History</span>
        <h2 className="font-serif italic text-4xl md:text-5xl text-cream">The story of a cup.</h2>
        <div className="w-12 h-[1px] bg-ember mt-6"></div>
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* The Track */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-bark/15 transform md:-translate-x-1/2"></div>
        
        {/* Animated Line */}
        <motion.div 
          className="absolute left-4 md:left-1/2 top-0 w-[1px] bg-ember transform md:-translate-x-1/2 origin-top"
          style={{ height: lineHeight }}
        />

        <div className="space-y-28 py-8">
          {milestones.map((evt, idx) => (
            <div key={idx} className={`relative flex items-start ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              
              {/* Dot */}
              <div className="group absolute left-4 md:left-1/2 transform -translate-x-[5px] md:-translate-x-1/2 mt-1 z-10 cursor-pointer">
                <div className="w-3 h-3 bg-cinema border border-ember rounded-full transition-all duration-300 group-hover:bg-ember">
                </div>
                <motion.div
                  className="absolute inset-[-4px] rounded-full border border-ember/40"
                  animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                />
              </div>

              {/* Content */}
              <div className={`ml-12 md:ml-0 w-full md:w-[45%] ${idx % 2 === 0 ? 'md:mr-auto md:pr-16' : 'md:ml-auto md:pl-16'}`}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="font-display text-ember tracking-widest text-lg block mb-2">{evt.year}</span>
                  <h3 className="font-serif italic text-2xl md:text-3xl text-cream mb-3">{evt.title}</h3>
                  <p className="font-body text-cream/60 text-base leading-relaxed">{evt.desc}</p>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
