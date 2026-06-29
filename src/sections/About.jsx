import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiCheckCircle, FiCpu, FiServer, FiLayers, FiGitBranch } from 'react-icons/fi';
import { FaBug } from 'react-icons/fa';
import profilePic from '../assets/profile_picture.jpg';
import ScrollReveal from '../components/ScrollReveal';

const QA_PILLARS = [
  {
    icon: <FiCpu className="w-6 h-6 text-purple-500" />,
    title: 'Automation Testing',
    desc: 'Developing E2E suites with Selenium and Playwright to automate regression testing.'
  },
  {
    icon: <FiCheckCircle className="w-6 h-6 text-emerald-500" />,
    title: 'Manual Testing',
    desc: 'Exploratory, functional, and smoke test suites to ensure edge-case safety.'
  },
  {
    icon: <FiServer className="w-6 h-6 text-cyan-500" />,
    title: 'API Testing',
    desc: 'Validating payload schemas, backend endpoints, and rate filters in Postman.'
  },
  {
    icon: <FaBug className="w-6 h-6 text-red-500" />,
    title: 'Bug Tracking',
    desc: 'Creating clear bug reports, lifecycle defect logs, and trace matrices in Jira.'
  },
  {
    icon: <FiLayers className="w-6 h-6 text-amber-500" />,
    title: 'Agile Methodology',
    desc: 'Participating in sprint cycles, daily standups, and shift-left QA sweeps.'
  },
  {
    icon: <FiGitBranch className="w-6 h-6 text-blue-500" />,
    title: 'CI/CD Pipelines',
    desc: 'Integrating automated testing pipelines directly into GitHub Actions.'
  }
];

export const About = () => {
  const photoRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ["start end", "end start"]
  });

  // Dynamic scroll-bound rotation (moves up to 15 degrees)
  const scrollRotate = useTransform(scrollYProgress, [0.1, 0.8], [-5, 10]);

  // Interactive 3D mouse follower tilt
  const handleMouseMove = (e) => {
    if (!photoRef.current) return;
    const el = photoRef.current;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Tilt limit to 18 degrees
    const rotateX = -(y / rect.height) * 18;
    const rotateY = (x / rect.width) * 18;
    
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const handleMouseLeave = () => {
    if (!photoRef.current) return;
    photoRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden">
      <ScrollReveal>
        
        {/* Decorative background vectors */}
        <div className="absolute top-10 right-5 w-24 h-24 bg-purple-500/5 rounded-full blur-xl animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-10 left-5 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none"></div>

        <div className="text-center mb-16 space-y-2">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            About <span className="bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-cyan-400 font-heading">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Side: Bio Glass Card + 3D Tilt Image Side-by-Side */}
          <div className="w-full lg:w-1/2 flex flex-col md:flex-row items-center gap-8">
            {/* Interactive 3D Photo */}
            <motion.div
              ref={photoRef}
              style={{ rotate: scrollRotate, transition: "transform 0.1s ease-out" }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-44 h-56 md:w-52 md:h-64 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(168,85,247,0.15)] dark:shadow-[0_20px_50px_rgba(168,85,247,0.25)] border border-slate-200 dark:border-slate-800 p-1 bg-black flex-shrink-0 cursor-crosshair group select-none"
            >
              {/* Glowing Bezel */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-cyan-400 opacity-20 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none z-0" />
              <img
                src={profilePic}
                alt="About Abhijit"
                className="w-full h-full object-cover rounded-2xl relative z-10 filter grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </motion.div>

            {/* Description */}
            <div className="flex-1 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                My Passion for Quality
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Currently working as a QA Intern at UncannyCS (Odoo Silver Partner), testing enterprise systems like Syra, HYKA, and OTR. I approach quality testing with analytic workflows and structural detail.
              </p>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                I construct detailed test cases, verify payload data filters, and log life-cycle bugs inside Jira. My focus is validating fixes before staging builds.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-purple-500/5 dark:bg-purple-500/10 border border-purple-500/10 text-center">
                  <span className="block text-xl font-extrabold text-purple-600 dark:text-purple-400 font-heading">150+</span>
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Bugs Reported</span>
                </div>
                <div className="p-3 rounded-xl bg-cyan-500/5 dark:bg-cyan-500/10 border border-cyan-500/10 text-center">
                  <span className="block text-xl font-extrabold text-cyan-600 dark:text-cyan-400 font-heading">100+</span>
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Test Cases</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Pillars Grid */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {QA_PILLARS.map((pillar, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -6, scale: 1.03, boxShadow: "0 10px 20px rgba(168,85,247,0.15)", borderColor: "rgba(168,85,247,0.4)" }}
                transition={{ type: 'spring', stiffness: 250, damping: 15 }}
                className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 transition-colors duration-305 flex flex-col space-y-3 group"
              >
                <div className="p-3 w-fit rounded-xl bg-slate-100 dark:bg-slate-900/80 group-hover:scale-110 transition-transform duration-300">
                  {pillar.icon}
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                  {pillar.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};
export default About;
