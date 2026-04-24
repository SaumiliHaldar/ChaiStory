import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Origin', href: '#chapter' },
  { label: 'The Fire', href: '#visual' },
  { label: 'Masala', href: '#spice' },
  { label: 'Recipe', href: '#recipe' },
  { label: 'History', href: '#timeline' },
];

const Nav: React.FC = () => {
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
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? 'py-4 bg-cinema/90 backdrop-blur-md border-b border-bark/20'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-serif italic text-2xl text-cream hover:text-ember transition-colors duration-300 cursor-pointer"
          >
            Chai
          </button>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNav(link.href)}
                  className="font-body text-cream/60 hover:text-ember text-sm tracking-[0.12em] uppercase transition-colors duration-300 cursor-pointer relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-ember group-hover:w-full transition-all duration-300" />
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button className="hidden md:block font-display tracking-[0.2em] text-xs uppercase text-ember border border-ember/40 px-5 py-2 hover:bg-ember hover:text-cinema transition-all duration-300 cursor-pointer">
            Steep Now
          </button>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-[1px] bg-cream transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block w-6 h-[1px] bg-cream transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-[1px] bg-cream transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 bottom-0 z-[99] bg-cinema/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="font-serif italic text-3xl text-cream hover:text-ember transition-colors duration-300 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <button className="mt-6 font-display tracking-[0.2em] text-sm uppercase text-ember border border-ember/40 px-8 py-3 hover:bg-ember hover:text-cinema transition-all duration-300">
              Steep Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
