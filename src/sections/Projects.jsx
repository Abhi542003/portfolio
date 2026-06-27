import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { FiCpu, FiGitPullRequest, FiActivity } from 'react-icons/fi';
import project1 from '../assets/project1.jpg';
import project2 from '../assets/project2.jpg';
import project3 from '../assets/project3.jpg';

const PROJECTS_DATA = [
  {
    title: 'Syra',
    desc: 'Performed comprehensive E2E functional testing and verification for the Syra platform. Designed detailed test suites covering user navigation paths, authentication boundaries, and data entries.',
    image: project1,
    icon: <FiCpu className="w-5 h-5 text-purple-400" />,
    tech: ['Manual Testing', 'Functional Testing', 'Jira', 'Bug Reporting', 'Test Case Design'],
    demo: '#',
    github: '#'
  },
  {
    title: 'HYKA',
    desc: 'Conducted regression testing and API payload validation for the HYKA platform. Authored REST API validation suites and verified status codes and payloads using Postman.',
    image: project2,
    icon: <FiGitPullRequest className="w-5 h-5 text-emerald-400" />,
    tech: ['API Testing', 'Postman', 'Regression Testing', 'SQL Databases', 'Jira Tracking'],
    demo: '#',
    github: '#'
  },
  {
    title: 'OTR',
    desc: 'Performed responsive UI/UX visual sanity sweeps and layout consistency checks for OTR. Executed cross-browser checks on layout boundaries and responsive mobile views.',
    image: project3,
    icon: <FiActivity className="w-5 h-5 text-cyan-400" />,
    tech: ['Sanity Testing', 'Cross-Browser', 'Mobile Testing', 'Responsive Audits'],
    demo: '#',
    github: '#'
  },
  {
    title: 'Internal QA Testing & Validation',
    desc: 'Created internal testing templates, verification checklists, and bug tracking schemas. Collaborated closely with devs to validate resolved fixes before staging releases.',
    image: project1,
    icon: <FiCpu className="w-5 h-5 text-purple-400" />,
    tech: ['Fix Validation', 'Agile Methodology', 'Jira Tracking', 'Dev Collaboration'],
    demo: '#',
    github: '#'
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
    
    // Tilt calculations (-8deg to 8deg max)
    const tiltX = (centerY - y) / 15;
    const tiltY = (x - centerX) / 15;
    
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative group"
    >
      {/* Glow Backdrop */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none"></div>

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-md group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-300 ease-out flex flex-col h-full transform-gpu glow-border"
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

            {/* CTA Buttons */}
            <div className="flex items-center space-x-4 pt-1 border-t border-slate-100 dark:border-slate-900">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 text-sm font-semibold text-slate-600 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400 transition-colors duration-200"
              >
                <FaGithub className="w-4 h-4" />
                <span>Source</span>
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 text-sm font-semibold text-slate-600 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400 transition-colors duration-200 ml-auto"
              >
                <FaExternalLinkAlt className="w-3.5 h-3.5" />
                <span>Live Demo</span>
              </a>
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
      
      {/* Background decorations */}
      <div className="absolute top-1/3 left-0 w-36 h-36 bg-purple-500/5 rounded-full blur-3xl floating-element"></div>
      <div className="absolute bottom-1/4 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl floating-element-slow"></div>

      <div className="text-center mb-16 space-y-2">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
          Featured <span className="bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-cyan-400 font-heading">Projects</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full"></div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS_DATA.map((project, idx) => (
          <ProjectCard key={idx} project={project} index={idx} />
        ))}
      </div>
    </section>
  );
};
export default Projects;
