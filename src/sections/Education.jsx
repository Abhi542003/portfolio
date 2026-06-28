import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa';
import { FiAward, FiCalendar, FiBookOpen } from 'react-icons/fi';

const EDUCATION_DATA = [
  {
    degree: 'Master of Computer Applications (MCA)',
    specialization: 'Software Engineering & Databases',
    institution: 'LDRP Institute of Technology and Research (LDRP-ITR)',
    duration: '2024 – 2026',
    achievements: [
      '• CGPA: 7.0 / 10',
      '• Advanced Java & Python Programming',
      '• Android & iOS Application Development (Basics)',
      '• Database Management Systems & Software Engineering',
      '• Data Structures, Algorithms & Operating Systems'
    ]
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    specialization: 'Computer Application & Programming',
    institution: 'BK Mehta IT Center',
    duration: '2021 – 2024',
    achievements: [
      '• Graduated First Class with Distinction, CGPA: 6.6 / 10',
      '• C, C++, Java & Python Programming',
      '• HTML, CSS, JavaScript & PHP Development',
      '• MySQL Database & Object-Oriented Programming',
      '• Computer Networks & Software Fundamentals'
    ]
  }
];

// Interactive 3D Card wrapper for Education Timeline
const EducationCard = ({ edu, idx }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Smooth 3D tilt calculation (-8deg to 8deg)
    const tiltX = (centerY - y) / 25;
    const tiltY = (x - centerX) / 25;
    
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.015, 1.015, 1.015)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, delay: idx * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.15s ease-out' }}
      className={`glass-panel p-8 rounded-3xl border transition-all duration-500 flex flex-col justify-between relative overflow-hidden group ${
        isHovered 
          ? 'border-purple-500/35 dark:border-purple-500/35 bg-purple-500/[0.02] dark:bg-purple-950/[0.05] shadow-[0_0_25px_rgba(168,85,247,0.12)] ring-1 ring-purple-500/10' 
          : 'border-slate-200 dark:border-slate-800 bg-white/5 dark:bg-slate-950/20 hover:border-blue-500/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.06)]'
      }`}
    >
      {/* Background Cap Watermark */}
      <div className="absolute -right-6 -bottom-6 text-slate-100 dark:text-slate-900/10 text-9xl pointer-events-none group-hover:scale-105 transition-transform duration-500 select-none">
        <FaGraduationCap />
      </div>

      {/* 3D Rotating Mesh Cube (Top Right) */}
      <div className="absolute top-6 right-6 z-20 pointer-events-none select-none">
        <div className="cube-container">
          <div className="cube-mesh">
            <div className={`cube-mesh-face front ${!isHovered ? 'cube-blue' : ''}`} />
            <div className={`cube-mesh-face back ${!isHovered ? 'cube-blue' : ''}`} />
            <div className={`cube-mesh-face left ${!isHovered ? 'cube-blue' : ''}`} />
            <div className={`cube-mesh-face right ${!isHovered ? 'cube-blue' : ''}`} />
            <div className={`cube-mesh-face top ${!isHovered ? 'cube-blue' : ''}`} />
            <div className={`cube-mesh-face bottom ${!isHovered ? 'cube-blue' : ''}`} />
          </div>
        </div>
      </div>

      <div>
        {/* Icon & Title */}
        <div className="flex items-center space-x-4 mb-6 mr-8">
          <div className={`p-3.5 rounded-2xl transition-all duration-300 ${
            isHovered 
              ? 'bg-purple-500/15 text-purple-500 dark:text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.2)] scale-105' 
              : 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
          }`}>
            <FaGraduationCap className="w-7 h-7" />
          </div>
          <div>
            <h3 className={`text-xl md:text-2xl font-bold font-heading leading-tight transition-colors duration-300 ${isHovered ? 'text-slate-900 dark:text-white' : 'text-slate-850 dark:text-slate-200'}`}>
              {edu.degree}
            </h3>
            <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 mt-1 rounded-full border transition-all duration-300 ${
              isHovered 
                ? 'bg-purple-500/10 border-purple-500/20 text-purple-605 dark:text-purple-400' 
                : 'bg-cyan-500/10 border-transparent text-cyan-600 dark:text-cyan-400'
            }`}>
              {edu.specialization}
            </span>
          </div>
        </div>

        {/* Institution details */}
        <div className="space-y-2 mb-6">
          <p className="text-slate-800 dark:text-slate-250 font-medium font-heading">
            {edu.institution}
          </p>
          <p className="flex items-center text-xs text-slate-500 dark:text-slate-400 gap-1.5 font-body">
            <FiCalendar className="w-3.5 h-3.5" />
            <span>{edu.duration}</span>
          </p>
        </div>

        {/* Achievements */}
        <div className="space-y-3 relative z-10 font-body">
          <h4 className={`text-sm font-semibold font-heading flex items-center gap-2 transition-colors duration-300 ${isHovered ? 'text-purple-600 dark:text-purple-400' : 'text-slate-700 dark:text-slate-350'}`}>
            <FiAward className="w-4 h-4 text-purple-500" /> Key Accomplishments
          </h4>
          <ul className="space-y-2">
            {edu.achievements.map((ach, aIdx) => (
              <li key={aIdx} className="flex items-start text-sm text-slate-600 dark:text-slate-400">
                <FiBookOpen className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 mr-2.5 mt-1 shrink-0" />
                <span>{ach}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export const Education = () => {
  return (
    <section id="education" className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute top-1/4 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl floating-element-slow pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-28 h-28 bg-purple-500/5 rounded-full blur-2xl floating-element pointer-events-none"></div>

      <div className="text-center mb-16 space-y-2">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
          Education &amp; <span className="bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-cyan-400 font-heading">Credentials</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {EDUCATION_DATA.map((edu, idx) => (
          <EducationCard key={idx} edu={edu} idx={idx} />
        ))}
      </div>
    </section>
  );
};
export default Education;
