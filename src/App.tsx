import { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Chapters from './components/Chapters';
import VisualBlocks from './components/VisualBlocks';
import SpiceGrid from './components/SpiceGrid';
import Timeline from './components/Timeline';
import Finale from './components/Finale';
import CustomCursor from './components/CustomCursor';
import { Analytics } from "@vercel/analytics/react";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="bg-cinema text-cream min-h-screen">
      <CustomCursor />
      <Navbar />
      <Hero />
      <Chapters />
      <VisualBlocks />
      <SpiceGrid />
      <Timeline />
      <Finale />
      <Analytics />
    </main>
  );
}

export default App;
