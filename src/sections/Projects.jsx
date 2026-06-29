import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiCpu, FiGitPullRequest, FiActivity } from 'react-icons/fi';
import project1 from '../assets/project1.jpg';
import project2 from '../assets/project2.jpg';
import project3 from '../assets/project3.jpg';
import ScrollReveal from '../components/ScrollReveal';

const PROJECTS_DATA = [
  {
    title: 'Syra',
    desc: 'Performed end-to-end Manual QA testing for the Syra Admin Panel and Mobile Application. Executed Functional, Regression, Smoke, and Sanity testing while validating production releases. Designed detailed test cases, reported defects through Jira, verified bug fixes, and collaborated closely with developers to ensure a stable and high-quality user experience.',
    image: project1,
    icon: <FiCpu className="w-5 h-5 text-purple-400" />,
    tech: ['Manual Testing', 'Regression Testing', 'Smoke Testing', 'Jira', 'Test Case Design'],
    badge: '✔ Production Validated',
    environment: 'Production | Staging'
  },
  {
    title: 'HYKA',
    desc: 'Performed comprehensive testing of ERP modules including user management, dashboards, reporting, and business workflows. Conducted API validation using Postman, verified business logic, executed regression testing, and ensured smooth production deployment through detailed QA validation.',
    image: project2,
    icon: <FiGitPullRequest className="w-5 h-5 text-emerald-400" />,
    tech: ['API Testing', 'Postman', 'Functional Testing', 'SQL', 'Bug Reporting'],
    badge: '✔ Successfully Validated',
    environment: 'UAT | Staging'
  },
  {
    title: 'OTR',
    desc: 'Validated the complete Return Authorization workflow including responsive UI, business rules, approval process, form validations, and production verification. Performed cross-browser compatibility testing and responsive testing to deliver a seamless user experience.',
    image: project3,
    icon: <FiActivity className="w-5 h-5 text-cyan-400" />,
    tech: ['UI Testing', 'Cross Browser', 'Responsive Testing', 'Validation', 'Regression Testing'],
    badge: '✔ Production Ready',
  }
];

// Interactive 3D Tilt Card
const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Tilt calculations (-8deg to 8deg max) with 1.03x scale and -6px lift
    const tiltX = (centerY - y) / 12;
    const tiltY = (x - centerX) / 12;
    
    card.style.transform = `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.03, 1.03, 1.03) translate3d(0, -6px, 0)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translate3d(0, 0, 0)`;
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const initialAnim = isMobile
    ? { opacity: 0, y: 60, scale: 0.95 }
    : { opacity: 0, scale: 0.7, y: 120, rotateX: 20, rotateY: -15, filter: "blur(12px)" };

  const whileInViewAnim = isMobile
    ? { opacity: 1, y: 0, scale: 1 }
    : { opacity: 1, scale: 1, y: 0, rotateX: 0, rotateY: 0, filter: "blur(0px)" };

  return (
    <motion.div
      initial={initialAnim}
      whileInView={whileInViewAnim}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ 
        type: "spring", 
        stiffness: 90, 
        damping: 12, 
        mass: 0.8,
        delay: index * 0.22 
      }}
      style={{ transformPerspective: 1200 }}
      className="relative group h-full"
    >
      {/* Stronger Glow Backdrop */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 pointer-events-none"></div>

      {/* Floating particles inside the card on hover */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-1/2 left-[10%] w-1.5 h-1.5 rounded-full bg-cyan-400 blur-[0.5px] animate-ping" />
        <div className="absolute top-1/4 right-[15%] w-1 h-1 rounded-full bg-purple-400 blur-[0.5px] animate-ping" style={{ animationDelay: '0.4s' }} />
        <div className="absolute bottom-[20%] left-[30%] w-1.5 h-1.5 rounded-full bg-purple-400 blur-[0.5px] animate-ping" style={{ animationDelay: '0.8s' }} />
        <div className="absolute bottom-[35%] right-[25%] w-1 h-1 rounded-full bg-cyan-400 blur-[0.5px] animate-ping" style={{ animationDelay: '1.2s' }} />
      </div>

      {/* Animated Glowing border accent on hover */}
      <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-purple-500/35 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-500 pointer-events-none z-30" />

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-md hover:shadow-[0_30px_60px_rgba(168,85,247,0.18)] transition-all duration-300 ease-out flex flex-col h-full transform-gpu glow-border"
      >
        {/* Project Image Wrapper */}
        <div className="relative h-48 md:h-56 overflow-hidden">
          <div className="absolute inset-0 bg-slate-950/20 z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transform scale-100 group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out"
          />
          {/* Top Floating Badge */}
          <div className="absolute top-4 left-4 z-20 flex items-center space-x-2 py-1.5 px-3 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 text-white text-xs font-semibold">
            {project.icon}
            <span>{project.tech[0]}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col justify-between flex-grow space-y-6">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {project.desc}
            </p>
          </div>

          <div className="space-y-5">
            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="py-1 px-2.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Bottom Info Section */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-900/80 text-xs">
              <span className="font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                {project.badge}
              </span>
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                {project.environment || "Production Ready"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden">
      <ScrollReveal>
        
        {/* Background decorations */}
        <div className="absolute top-1/3 left-0 w-36 h-36 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none"></div>

        <div className="text-center mb-16 space-y-2">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            <span className="bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-cyan-400 font-heading">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full"></div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS_DATA.map((project, idx) => (
            <ProjectCard key={idx} project={project} index={idx} />
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
};
export default Projects;
