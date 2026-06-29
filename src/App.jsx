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
import { LaunchProvider, useLaunch } from './context/LaunchContext';
import Preloader from './components/Preloader';
import LaunchOverlay from './components/LaunchOverlay';

function PortfolioContent() {
  const { launchState } = useLaunch();
  const isOpen = launchState === 'open';
  const showPortfolio = launchState === 'open' || launchState === 'shatter';

  return (
    <div className={`relative min-h-screen bg-slate-50 dark:bg-[#030303] text-slate-900 dark:text-slate-100 selection:bg-purple-500/30 selection:text-purple-900 dark:selection:text-purple-300 transition-colors duration-500 ${!isOpen ? 'h-screen overflow-hidden' : ''}`}>
      
      {/* Custom Noise Overlay */}
      <div className="noise-overlay" />

      {/* Custom pointer glow & follower trail */}
      <CursorFollower />

      {/* Console Boot Preloader Screen */}
      <Preloader />

      {/* Space Flight R3F Animation Overlay */}
      <LaunchOverlay />

      {/* Global Ambient Neon Glow Orbs */}
      <div className="ambient-bg" style={{ opacity: showPortfolio ? 1 : 0, transition: 'opacity 1.5s ease-in-out' }}>
        <div className="ambient-orb orb-1"></div>
        <div className="ambient-orb orb-2"></div>
        <div className="ambient-orb orb-3"></div>
      </div>

      {/* Geometric Matrix Pattern Overlay */}
      <div className="grid-overlay" style={{ opacity: showPortfolio ? 0.5 : 0, transition: 'opacity 1.5s ease-in-out' }}></div>

      {/* Header Navigation */}
      <div style={{ opacity: showPortfolio ? 1 : 0, pointerEvents: showPortfolio ? 'auto' : 'none', transition: 'opacity 1s ease-in-out' }}>
        <Navbar />
      </div>

      {/* Sections */}
      <main className="relative z-10">
        <Hero />
        
        {/* Wrap subsequent sections to animate and reveal smoothly after launch shatter */}
        <div style={{
          opacity: showPortfolio ? (launchState === 'shatter' ? 0.35 : 1) : 0,
          transform: showPortfolio ? 'translateY(0)' : 'translateY(40px)',
          pointerEvents: showPortfolio ? 'auto' : 'none',
          transition: 'opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1), transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
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
          
          {/* Footer */}
          <Footer />
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <LaunchProvider>
      <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothTouch: false }}>
        <PortfolioContent />
      </ReactLenis>
    </LaunchProvider>
  );
}

export default App;
