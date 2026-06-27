import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiCpu, FiServer, FiLayers, FiGitBranch } from 'react-icons/fi';
import { FaBug } from 'react-icons/fa';

const QA_PILLARS = [
  {
    icon: <FiCpu className="w-6 h-6 text-purple-500" />,
    title: 'Automation Testing',
    desc: 'Developing robust E2E testing suites using Selenium, Cypress, and Playwright to automate regression testing.'
  },
  {
    icon: <FiCheckCircle className="w-6 h-6 text-emerald-500" />,
    title: 'Manual Testing',
    desc: 'Meticulous exploratory, smoke, functional, and sanity testing to find complex edge-case user workflow issues.'
  },
  {
    icon: <FiServer className="w-6 h-6 text-cyan-500" />,
    title: 'API Testing',
    desc: 'Verifying backend endpoints, payload structures, schema safety, and load rates with Postman and REST-Assured.'
  },
  {
    icon: <FaBug className="w-6 h-6 text-red-500" />,
    title: 'Bug Tracking',
    desc: 'Creating clear, detailed logs, defect life-cycle tracking, and test execution evidence in Jira and TestRail.'
  },
  {
    icon: <FiLayers className="w-6 h-6 text-amber-500" />,
    title: 'Agile Methodology',
    desc: 'Participating in daily standups, sprint planning, and retrospective meetings to ensure early testing and shift-left QA.'
  },
  {
    icon: <FiGitBranch className="w-6 h-6 text-blue-500" />,
    title: 'CI/CD Pipelines',
    desc: 'Integrating automated test sweeps directly into GitHub Actions or Jenkins to block unstable deployments.'
  }
];

export const About = () => {
  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden">
      
      {/* Decorative floating geometric shapes */}
      <div className="absolute top-10 right-5 w-24 h-24 bg-purple-500/5 rounded-full blur-xl floating-element-slow"></div>
      <div className="absolute bottom-10 left-5 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl floating-element"></div>

      <div className="text-center mb-16 space-y-2">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
          About <span className="bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-cyan-400 font-heading">Me</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full"></div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Side: Bio Glass Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 glass-panel p-8 md:p-10 rounded-3xl glow-border border border-slate-200 dark:border-slate-800 space-y-6"
        >
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">
            My Passion for Quality Assurance
          </h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            I am currently working as a QA Intern at UncannyCS (an Odoo Silver Partner), where I have gained hands-on practical experience testing real-world applications including Syra, HYKA, and OTR. I believe software testing is the foundation of digital experiences, and I approach it with analytical thinking and attention to detail.
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Focusing on software quality, team collaboration, and continuous learning, I write detailed test cases, run functional and regression sweeps, and log issues in Jira. My goal is to work closely with developers to validate fixes before they go to production.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-purple-500/5 dark:bg-purple-500/10 border border-purple-500/10 text-center">
              <span className="block text-3xl font-extrabold text-purple-600 dark:text-purple-400 font-heading">150+</span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Bugs Reported</span>
            </div>
            <div className="p-4 rounded-2xl bg-cyan-500/5 dark:bg-cyan-500/10 border border-cyan-500/10 text-center">
              <span className="block text-3xl font-extrabold text-cyan-600 dark:text-cyan-400 font-heading">100+</span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Test Cases</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Pillars Grid */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {QA_PILLARS.map((pillar, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-purple-500/40 dark:hover:border-purple-500/40 transition-colors duration-300 flex flex-col space-y-3 group"
            >
              <div className="p-3 w-fit rounded-xl bg-slate-100 dark:bg-slate-900/80 group-hover:scale-110 transition-transform duration-300">
                {pillar.icon}
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                {pillar.title}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
export default About;
