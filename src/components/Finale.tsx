import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const AromaParticle = ({ mouseX, mouseY, isMobile }: { mouseX: any; mouseY: any; isMobile: boolean }) => {
  const randomX = Math.random() * 100;
  const randomDelay = Math.random() * 5;
  const randomSize = isMobile ? (5 + Math.random() * 20) : (10 + Math.random() * 40);
  
  // Parallax based on mouse - only on desktop
  const px = useTransform(mouseX, [0, window.innerWidth], [5, -5]);
  const py = useTransform(mouseY, [0, window.innerHeight], [5, -5]);

  return (
    <motion.div
      initial={{ opacity: 0, y: '110vh', x: `${randomX}vw`, scale: 0 }}
      animate={{ 
        opacity: [0, 0.15, 0], 
        y: '-20vh',
        scale: [0.5, 1.5, 2],
        x: [`${randomX}vw`, `${randomX + (Math.random() * 10 - 5)}vw`]
      }}
      transition={{ 
        duration: 8 + Math.random() * 4, 
        repeat: Infinity, 
        delay: randomDelay,
        ease: "linear"
      }}
      className={`absolute rounded-full bg-cream pointer-events-none ${isMobile ? 'blur-xl' : 'blur-3xl'}`}
      style={{ 
        x: isMobile ? 0 : px, 
        y: isMobile ? 0 : py,
        width: randomSize, 
        height: randomSize,
        left: 0,
        top: 0
      }}
    />
  );
};

const Finale: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse movement
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Parallax transforms
  const bgX = useTransform(smoothX, [0, typeof window !== 'undefined' ? window.innerWidth : 1920], [15, -15]);
  const bgY = useTransform(smoothY, [0, typeof window !== 'undefined' ? window.innerHeight : 1080], [15, -15]);
  
  const spice1X = useTransform(smoothX, [0, 1920], [40, -40]);
  const spice1Y = useTransform(smoothY, [0, 1080], [40, -40]);
  const spice1Rotate = useTransform(smoothX, [0, 1920], [-10, 10]);

  const spice2X = useTransform(smoothX, [0, 1920], [-60, 60]);
  const spice2Y = useTransform(smoothY, [0, 1080], [-60, 60]);
  const spice2Rotate = useTransform(smoothY, [0, 1080], [15, -15]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth >= 768) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen flex flex-col bg-cinema overflow-hidden z-10"
    >
      {/* Content Area */}
      <div className="relative flex-grow flex flex-col justify-center items-center py-10 md:py-14">
        {/* Background Layer with Parallax - Now confined to content area */}
        <motion.div 
          style={!isMobile ? { x: bgX, y: bgY, scale: 1.1 } : { scale: 1 }}
          className="absolute inset-0 z-0 opacity-40 grayscale-[0.3] contrast-[1.2]"
        >
          <img 
            src="/images/finale_bg.png" 
            alt="Steeping Chai" 
            className="w-full h-full object-cover"
          />
          {/* Enhanced Cinematic Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-cinema/80 via-transparent to-cinema/90"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-cinema/40 via-transparent to-cinema/40"></div>
          <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]"></div>
        </motion.div>

        {/* Aroma Particle System */}
        <div className="absolute inset-0 z-1 pointer-events-none">
          {Array.from({ length: isMobile ? 4 : 12 }).map((_, i) => (
            <AromaParticle key={i} mouseX={smoothX} mouseY={smoothY} isMobile={isMobile} />
          ))}
        </div>

        {/* Floating Spices */}
        <motion.div 
          style={!isMobile ? { x: spice1X, y: spice1Y, rotate: spice1Rotate } : {}}
          className={`absolute top-[10%] right-[5%] w-48 md:w-64 h-48 md:h-64 z-2 pointer-events-none opacity-10 ${isMobile ? 'hidden' : 'blur-[2px]'}`}
        >
          <img src="/images/Cardamom.png" alt="" className="w-full h-full object-contain" />
        </motion.div>

        <motion.div 
          style={!isMobile ? { x: spice2X, y: spice2Y, rotate: spice2Rotate } : {}}
          className={`absolute bottom-[15%] left-[2%] w-64 md:w-80 h-64 md:h-80 z-2 pointer-events-none opacity-10 ${isMobile ? 'hidden' : 'blur-[4px]'}`}
        >
          <img src="/images/Cinnamon.png" alt="" className="w-full h-full object-contain" />
        </motion.div>

        {/* Main Content */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-center flex flex-col items-center px-6"
        >
          <motion.span 
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            whileInView={{ opacity: 0.4, letterSpacing: '0.4em' }}
            transition={{ duration: 2, delay: 0.5 }}
            className="font-display text-cream tracking-[0.4em] text-[10px] md:text-xs uppercase block mb-4"
          >
            The Last Drop
          </motion.span>
          
          <h2 className="font-serif italic text-5xl md:text-6xl lg:text-7xl text-cream mb-2 md:mb-4 leading-tight select-none">
            Your cup<br/>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="text-ember inline-block"
            >
              is waiting.
            </motion.span>
          </h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="font-body text-cream text-xs md:text-sm mb-6 md:mb-8 max-w-md leading-relaxed opacity-70"
          >
            The story of CHAI never truly ends. It just settles, deep and warm, waiting for the next pour.
          </motion.p>
          
          <motion.button 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="group relative px-10 py-4 overflow-hidden border border-cream/20 bg-transparent text-cream font-display tracking-[0.4em] uppercase text-[10px] md:text-xs cursor-pointer z-20 backdrop-blur-sm"
          >
            <span className="relative z-10 group-hover:text-cinema transition-colors duration-500">Steep the Experience</span>
            <div className="absolute inset-0 bg-ember transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] z-0"></div>
          </motion.button>
        </motion.div>
      </div>

        {/* Integrated Credits Layer - Now part of flex flow to prevent overlap */}
        <div className="relative w-full px-8 md:px-20 pb-8 md:pb-10 pt-4 md:pt-12 flex flex-col items-center gap-6 md:gap-8 z-20">
          {/* Poetic Sign-off */}
          <div className="flex flex-col items-center gap-1">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1.8 }}
              className="font-serif italic text-xl md:text-3xl text-ember lowercase tracking-[0.1em] select-none"
            >
              फिर मिलेंगे
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.3 }}
              transition={{ duration: 1, delay: 2.2 }}
              className="font-body text-[7px] md:text-[8px] tracking-[0.8em] text-cream uppercase"
            >
              Until the next steep
            </motion.div>
          </div>

          {/* Minimalist Meta Info */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 items-center max-w-7xl gap-4 md:gap-0 border-t border-cream/10 pt-6 md:pt-8 opacity-50">
            <div className="font-body text-cream text-[7px] md:text-[8px] tracking-[0.4em] uppercase text-center md:text-left">
              CHAI © 2026 · ALL RIGHTS RESERVED
            </div>
            
            <div className="hidden md:flex justify-center items-center gap-3">
              <div className="w-6 h-[1px] bg-cream/20" />
              <div className="font-serif italic text-cream text-[10px] tracking-widest lowercase">est. in tradition</div>
              <div className="w-6 h-[1px] bg-cream/20" />
            </div>

            <div className="font-body text-cream text-[7px] md:text-[8px] tracking-[0.4em] uppercase text-center md:text-right">
              CRAFTED WITH SOUL
            </div>
          </div>
        </div>

      {/* Screen edge grain/texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50"></div>
    </section>
  );
};

export default Finale;
