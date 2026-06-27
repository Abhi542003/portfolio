import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiCheckSquare, FiTrendingUp, FiSettings } from 'react-icons/fi';

// Intersection-aware Count-up Component
const AnimatedNumber = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const end = parseInt(value, 10);
    if (start === end) return;

    const totalMiliseconds = duration;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 1);
    
    // For large numbers, step in increments to finish within duration
    const stepSize = Math.max(Math.floor(end / (totalMiliseconds / 16)), 1);

    const timer = setInterval(() => {
      start += stepSize;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16); // ~60fps

    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

const STATS = [
  {
    icon: <FiClock className="w-8 h-8 text-purple-500" />,
    value: 2026,
    suffix: '',
    label: 'Internship Since',
    desc: 'QA Intern at UncannyCS'
  },
  {
    icon: <FiCheckSquare className="w-8 h-8 text-cyan-500" />,
    value: 4,
    suffix: '',
    label: 'Projects Worked On',
    desc: 'Syra, HYKA, OTR & Validation'
  },
  {
    icon: <FiTrendingUp className="w-8 h-8 text-red-500" />,
    value: 150,
    suffix: '+',
    label: 'Bugs Reported',
    desc: 'Logged and traced in Jira'
  },
  {
    icon: <FiSettings className="w-8 h-8 text-emerald-500" />,
    value: 100,
    suffix: '+',
    label: 'Test Cases Written',
    desc: 'Exploratory & functional scripts'
  }
];

const StatCard = React.memo(({ stat, idx }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 text-center hover:border-purple-500/20 transition-all duration-300 group"
    >
      {/* Centered Glowing Icon */}
      <div className="mx-auto w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-900/80 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-inner">
        {stat.icon}
      </div>

      {/* Stat Values */}
      <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight mb-2">
        <AnimatedNumber value={stat.value} />
        <span className="text-purple-600 dark:text-purple-400">{stat.suffix}</span>
      </h3>

      {/* Label */}
      <h4 className="text-base font-bold text-slate-800 dark:text-slate-200 font-heading mb-1">
        {stat.label}
      </h4>

      {/* Description */}
      <p className="text-xs text-slate-500 dark:text-slate-400">
        {stat.desc}
      </p>
    </motion.div>
  );
});

export const Achievements = () => {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto relative overflow-hidden">
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl floating-element-slow"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {STATS.map((stat, idx) => (
          <StatCard key={idx} stat={stat} idx={idx} />
        ))}
      </div>
    </section>
  );
};
export default Achievements;
