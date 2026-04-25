import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Origin', hindi: 'उद्गम', href: '#chapter' },
  { label: 'The Fire', hindi: 'अग्नि', href: '#visual' },
  { label: 'Masala', hindi: 'मसाला', href: '#spice' },
  { label: 'Recipe', hindi: 'विधि', href: '#recipe' },
  { label: 'History', hindi: 'इतिहास', href: '#timeline' },
];

const MobileMenu: React.FC<{ 
  isOpen: boolean; 
  onClose: (href: string) => void; 
  links: typeof navLinks 
}> = ({ isOpen, onClose, links }) => {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="mobile-menu-overlay"
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[105] bg-cinema flex flex-col pt-32 px-10"
        >
          {/* Background Watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[12rem] text-cream/[0.03] pointer-events-none select-none z-0">
            चाय
          </div>

          <div className="relative z-10 flex flex-col h-full">
            {/* Menu Items */}
            <div className="flex flex-col gap-8">
              {links.map((link, i) => (
                <motion.button
                  key={`mobile-${link.href}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + (i * 0.05), duration: 0.5 }}
                  onClick={() => onClose(link.href)}
                  className="group flex flex-col items-start w-fit"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-serif italic text-5xl text-cream/40 group-hover:text-ember transition-all duration-500">
                      {link.label}
                    </span>
                  </div>
                  <span className="font-serif text-lg text-ember/60 lowercase mt-1">
                    {link.hindi}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Decorative Overlay */}
          <div className="absolute inset-0 pointer-events-none border-[1px] border-ember/10 m-4 opacity-50" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[110] transition-all duration-700 ${
          scrolled
            ? 'py-4 bg-cinema/80 backdrop-blur-xl border-b border-bark/10'
            : 'py-8 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group relative flex items-center gap-2 cursor-pointer"
          >
            <span className="font-serif italic text-3xl text-cream group-hover:text-ember transition-colors duration-500">
              Chai
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-ember transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100" />
          </button>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-12">
            {navLinks.map((link, i) => (
              <motion.li 
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + (i * 0.1), duration: 0.8 }}
              >
                <button
                  onClick={() => handleNav(link.href)}
                  className="font-body text-cream/40 hover:text-cream text-[11px] tracking-[0.2em] uppercase transition-all duration-500 cursor-pointer relative group flex items-center"
                >
                  <span className="relative">
                    {link.label}
                    <span className="text-[9px] lowercase text-ember opacity-70 group-hover:opacity-100 transition-all duration-500 font-serif italic ml-2">
                      - {link.hindi}
                    </span>
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-ember group-hover:w-full transition-all duration-500" />
                  </span>
                </button>
              </motion.li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:block">
            <button className="group relative px-6 py-2.5 overflow-hidden border border-ember/30 bg-transparent text-ember font-display tracking-[0.2em] uppercase text-[10px] transition-colors duration-500 hover:text-cream hover:border-ember/60 cursor-pointer">
              <span className="relative z-10 group-hover:text-cream transition-colors duration-500">Steep Now</span>
              <div className="absolute inset-0 bg-ember transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] z-0"></div>
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 cursor-pointer z-[120]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-[1px] bg-cream transition-all duration-500 ${menuOpen ? 'rotate-45 translate-y-[7px] bg-ember' : ''}`} />
            <span className={`block w-4 h-[1px] bg-cream self-end transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-[1px] bg-cream transition-all duration-500 ${menuOpen ? '-rotate-45 -translate-y-[7px] bg-ember' : ''}`} />
          </button>
        </div>
      </motion.nav>

      <MobileMenu 
        isOpen={menuOpen} 
        onClose={handleNav} 
        links={navLinks} 
      />
    </div>
  );
};

export default Navbar;
