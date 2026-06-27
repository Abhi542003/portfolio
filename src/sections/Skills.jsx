import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaClipboardCheck, FaRobot, FaDatabase, FaGitAlt, FaSyncAlt, 
  FaHistory, FaSlidersH, FaFire, FaHeartbeat, FaNetworkWired, FaBug
} from 'react-icons/fa';
import { SiSelenium, SiPostman, SiJira } from 'react-icons/si';
import { FiCheckSquare } from 'react-icons/fi';

const SKILLS_DATA = [
  {
    category: 'Testing Methodologies & Design',
    skills: [
      { name: 'Manual Testing', icon: <FaClipboardCheck />, color: 'red' },
      { name: 'Functional Testing', icon: <FaSlidersH />, color: 'green' },
      { name: 'Regression Testing', icon: <FaHistory />, color: 'cyan' },
      { name: 'Smoke Testing', icon: <FaFire />, color: 'red' },
      { name: 'Sanity Testing', icon: <FaHeartbeat />, color: 'purple' },
      { name: 'Test Case Design', icon: <FiCheckSquare />, color: 'green' },
      { name: 'Bug Reporting', icon: <FaBug />, color: 'purple' }
    ]
  },
  {
    category: 'Backend & Data Validation',
    skills: [
      { name: 'API Testing', icon: <FaNetworkWired />, color: 'cyan' },
      { name: 'Postman', icon: <SiPostman />, color: 'red' },
      { name: 'SQL Databases', icon: <FaDatabase />, color: 'purple' },
    ]
  },
  {
    category: 'QA Management & Processes',
    skills: [
      { name: 'Jira Software', icon: <SiJira />, color: 'cyan' },
      { name: 'Agile / Scrum', icon: <FaSyncAlt />, color: 'purple' },
      { name: 'Git & GitHub', icon: <FaGitAlt />, color: 'red' },
    ]
  },
  {
    category: 'Automation (Learning)',
    skills: [
      { name: 'Automation Testing', icon: <FaRobot />, color: 'purple', currentlyLearning: true },
      { name: 'Selenium WebDriver', icon: <SiSelenium />, color: 'cyan', currentlyLearning: true },
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20 } 
  }
};

const getGlowClass = (color) => {
  switch (color) {
    case 'purple': return 'hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] dark:hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]';
    case 'cyan': return 'hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] dark:hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]';
    case 'green': return 'hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(52,211,153,0.2)] dark:hover:shadow-[0_0_30px_rgba(52,211,153,0.3)]';
    case 'red': return 'hover:border-red-500/40 hover:shadow-[0_0_20px_rgba(248,113,113,0.2)] dark:hover:shadow-[0_0_30px_rgba(248,113,113,0.3)]';
    default: return 'hover:border-purple-500/40';
  }
};

const getIconColorClass = (color) => {
  switch (color) {
    case 'purple': return 'text-purple-600 dark:text-purple-400';
    case 'cyan': return 'text-cyan-600 dark:text-cyan-400';
    case 'green': return 'text-emerald-600 dark:text-emerald-400';
    case 'red': return 'text-red-600 dark:text-red-400';
    default: return 'text-purple-600';
  }
};

export const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden">
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-0 w-28 h-28 bg-purple-500/5 rounded-full blur-2xl floating-element"></div>
      <div className="absolute bottom-5 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl floating-element-slow"></div>

      <div className="text-center mb-16 space-y-2">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
          Skills &amp; <span className="bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-cyan-400 font-heading">Toolkit</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full"></div>
      </div>

      <div className="space-y-12">
        {SKILLS_DATA.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-4">
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 font-heading pl-2 border-l-2 border-purple-500">
              {group.category}
            </h3>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
            >
              {group.skills.map((skill, idx) => (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  whileHover={{ y: -6, scale: 1.03 }}
                  className={`glass-panel glow-border p-5 rounded-2xl flex flex-col items-center justify-center text-center border border-slate-200 dark:border-slate-800 transition-all duration-300 cursor-default group relative ${getGlowClass(skill.color)}`}
                >
                  {skill.currentlyLearning && (
                    <span className="absolute top-2.5 right-2.5 text-[8px] font-bold py-0.5 px-1.5 rounded-md bg-purple-500/10 border border-purple-500/25 text-purple-600 dark:text-purple-400 uppercase tracking-wider scale-90">
                      Learning
                    </span>
                  )}
                  <div className={`text-3xl mb-3 transform group-hover:scale-115 group-hover:rotate-6 transition-transform duration-300 ${getIconColorClass(skill.color)}`}>
                    {skill.icon}
                  </div>
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 font-heading leading-tight">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Skills;
