import React from 'react';
import { ReactLenis } from 'lenis/react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Projects from './sections/Projects';
import Achievements from './sections/Achievements';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import CursorFollower from './components/CursorFollower';

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothTouch: false }}>
      <div className="relative min-h-screen bg-slate-50 dark:bg-[#030303] text-slate-900 dark:text-slate-100 selection:bg-purple-500/30 selection:text-purple-900 dark:selection:text-purple-300 transition-colors duration-500">
        
        {/* Custom Noise Overlay */}
        <div className="noise-overlay" />

        {/* Custom pointer glow & follower trail */}
        <CursorFollower />

        {/* Global Ambient Neon Glow Orbs */}
        <div className="ambient-bg">
          <div className="ambient-orb orb-1"></div>
          <div className="ambient-orb orb-2"></div>
          <div className="ambient-orb orb-3"></div>
        </div>

        {/* Geometric Matrix Pattern Overlay */}
        <div className="grid-overlay"></div>

        {/* Header Navigation */}
        <Navbar />

        {/* Sections */}
        <main className="relative z-10">
          <Hero />
          
          <div className="max-w-7xl mx-auto px-6">
            <div className="border-t border-slate-200/50 dark:border-slate-900/50"></div>
          </div>
          
          <About />
          
          <div className="max-w-7xl mx-auto px-6">
            <div className="border-t border-slate-200/50 dark:border-slate-900/50"></div>
          </div>
          
          <Skills />
          
          <div className="max-w-7xl mx-auto px-6">
            <div className="border-t border-slate-200/50 dark:border-slate-900/50"></div>
          </div>
          
          <Experience />
          
          <div className="max-w-7xl mx-auto px-6">
            <div className="border-t border-slate-200/50 dark:border-slate-900/50"></div>
          </div>
          
          <Education />
          
          <div className="max-w-7xl mx-auto px-6">
            <div className="border-t border-slate-200/50 dark:border-slate-900/50"></div>
          </div>
          
          <Projects />
          
          <Achievements />
          
          <div className="max-w-7xl mx-auto px-6">
            <div className="border-t border-slate-200/50 dark:border-slate-900/50"></div>
          </div>
          
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
        
      </div>
    </ReactLenis>
  );
}

export default App;
