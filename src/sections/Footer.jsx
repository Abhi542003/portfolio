import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { FiCheckSquare, FiArrowUp } from 'react-icons/fi';

const QUICK_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export const Footer = () => {
  const handleNavClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 80;
      window.scrollTo({
        top: element.offsetTop - navbarHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#060608] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo & Slogan */}
        <div className="flex flex-col items-center md:items-start space-y-2">
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
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center md:text-left">
            Securing code stability and testing user workflows.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {QUICK_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className="text-xs font-semibold text-slate-500 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Social Bar & Copyright */}
        <div className="flex flex-col items-center md:items-end space-y-3">
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <FaGithub className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-purple-500 dark:text-slate-500 dark:hover:text-purple-400 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:abhijit.rajpurohit.qa@example.com"
              className="text-slate-400 hover:text-purple-500 dark:text-slate-500 dark:hover:text-purple-400 transition-colors"
              aria-label="Email"
            >
              <FaEnvelope className="w-4 h-4" />
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-purple-600 dark:text-slate-500 dark:hover:text-purple-400 hover:scale-110 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:-translate-y-0.5 transition-all duration-300 ml-2"
              aria-label="Back to Top"
            >
              <FiArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-[10px] text-slate-400 dark:text-slate-600">
            &copy; {new Date().getFullYear()} Rajpurohit Abhijit. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};
export default Footer;
