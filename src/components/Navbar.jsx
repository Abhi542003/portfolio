import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);
const OBSERVER_OPTIONS = { threshold: 0.25 };

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ScrollSpy to highlight active nav link
  const activeSection = useIntersectionObserver(SECTION_IDS, OBSERVER_OPTIONS);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 85;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed left-1/2 -translate-x-1/2 w-[92%] max-w-7xl z-50 rounded-2xl transition-all duration-300 ${
        scrolled
          ? 'top-3 h-16 glass-panel border border-slate-200/50 dark:border-slate-800/80 shadow-xl'
          : 'top-5 h-20 bg-slate-900/5 dark:bg-slate-950/20 border border-transparent'
      }`}
    >
      <div className="w-full h-full px-6 flex items-center justify-between">
        {/* Logo Shield & Text branding */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className="flex items-center space-x-3 text-slate-900 dark:text-white group"
        >
          <span className="p-2 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300 flex items-center justify-center border border-purple-500/20">
            <svg className="w-5 h-5 text-purple-500 dark:text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 11 2 2 4-4" />
            </svg>
          </span>
          <div className="flex flex-col text-left">
            <span className="font-bold text-sm tracking-wide text-slate-900 dark:text-white font-heading">
              Abhijit Rajpurohit
            </span>
            <span className="text-[9px] text-slate-500 dark:text-slate-400 font-bold tracking-wider uppercase font-heading -mt-0.5">
              QA Engineer
            </span>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`text-sm font-semibold tracking-wide transition-all duration-300 relative py-1 hover:text-purple-600 dark:hover:text-purple-400 ${
                activeSection === item.id
                  ? 'text-purple-600 dark:text-purple-400'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-purple-500 dark:bg-purple-400 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Mobile Toggle & Menu Controls */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-slate-705 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border border-slate-200/50 dark:border-slate-800 absolute top-full left-0 w-full overflow-hidden rounded-b-2xl shadow-xl mt-1"
          >
            <div className="px-6 py-5 flex flex-col space-y-3 bg-white/85 dark:bg-slate-950/85">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`text-base font-semibold tracking-wide transition-all duration-300 block py-2 px-3 rounded-lg ${
                    activeSection === item.id
                      ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-900/50'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
export default Navbar;
