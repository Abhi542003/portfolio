import React from 'react';
import { motion } from 'framer-motion';

export const HeroVisual = () => {
  return (
    <div className="relative w-full h-[450px] md:h-[600px] flex items-center justify-center select-none">
      
      {/* Decorative Shifting Orbs inside canvas space */}
      <div className="absolute w-[350px] h-[350px] rounded-full bg-purple-500/10 dark:bg-purple-500/15 blur-3xl absolute-center pointer-events-none"></div>
      <div className="absolute w-[250px] h-[250px] rounded-full bg-cyan-500/10 dark:bg-cyan-500/10 blur-3xl absolute-center pointer-events-none translate-x-12 translate-y-12"></div>

      {/* Holographic Concentric Glowing Stand (Base) */}
      <div className="absolute bottom-16 w-80 h-16 rounded-full border border-purple-500/20 bg-purple-500/5 shadow-[0_0_30px_rgba(168,85,247,0.25)] flex items-center justify-center transform rotateX-70 scale-x-110">
        <div className="w-[85%] h-[85%] rounded-full border border-cyan-500/30 bg-cyan-500/5 shadow-[0_0_20px_rgba(34,211,238,0.2)] animate-pulse"></div>
        <div className="absolute w-[60%] h-[60%] rounded-full border border-purple-500/40 border-dashed animate-spin-slow"></div>
      </div>

      {/* Main Container for Laptop and Floating elements */}
      <div className="relative w-[340px] md:w-[460px] h-full flex items-center justify-center">
        
        {/* ================= LAPTOP MOCKUP ================= */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="relative z-10 w-[240px] md:w-[320px] aspect-[16/10] mt-10"
        >
          {/* Laptop Screen Bezel */}
          <div className="relative w-full h-[94%] bg-slate-950 dark:bg-slate-900 rounded-t-2xl p-2 border-t border-x border-slate-800 shadow-[0_15px_30px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden">
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-10"></div>
            
            {/* Screen Content (QA Glow) */}
            <div className="w-full h-full rounded-lg bg-black flex items-center justify-center relative overflow-hidden">
              {/* Matrix Code background */}
              <div className="absolute inset-0 opacity-10 flex flex-col justify-around text-[6px] text-purple-400 font-mono text-left p-2 overflow-hidden leading-tight">
                <div>{"const runTests = async () => {"}</div>
                <div>{"  await selenium.init();"}</div>
                <div>{"  expect(response.status).toBe(200);"}</div>
                <div>{"  log('Test coverage: 100%');"}</div>
                <div>{"}"}</div>
              </div>
              {/* Center "QA" Text */}
              <span className="text-4xl md:text-6xl font-extrabold tracking-widest bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] font-heading">
                QA
              </span>
            </div>
          </div>
          
          {/* Laptop Base (Keyboard Part) */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[114%] h-[6%] bg-slate-850 dark:bg-slate-800 rounded-t-sm rounded-b-xl border-b border-slate-700 shadow-2xl">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-slate-900 rounded-b-md"></div>
          </div>
        </motion.div>

        {/* ================= MAGNIFYING GLASS ================= */}
        <motion.div
          animate={{ 
            y: [0, -6, 0],
            x: [0, 4, 0]
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="absolute z-20 left-4 bottom-28 w-16 h-16 pointer-events-none"
        >
          {/* Magnifier Glass Head */}
          <div className="w-10 h-10 rounded-full border-2 border-cyan-400/80 bg-cyan-400/10 backdrop-blur-[2px] shadow-[0_0_15px_rgba(34,211,238,0.25)] relative flex items-center justify-center">
            {/* Lens Reflection */}
            <div className="absolute top-1 left-1.5 w-2 h-2 rounded-full bg-white/40"></div>
          </div>
          {/* Magnifier Handle */}
          <div className="absolute top-9 left-9 w-6 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 origin-top-left rotate-45 shadow-[0_0_8px_rgba(168,85,247,0.3)]"></div>
        </motion.div>


        {/* ================= FLOATING GLASS CARDS ================= */}

        {/* 1. Test Cases (Top Left) */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5.0, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="absolute z-20 -left-6 top-10 glass-panel p-3.5 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 w-[125px] md:w-[150px] shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
        >
          <div className="flex items-center space-x-2 mb-1.5">
            <span className="p-1 rounded-lg bg-purple-500/20 text-purple-400">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-heading">Test Cases</span>
          </div>
          <div className="text-sm md:text-base font-bold text-slate-900 dark:text-white font-heading">100+</div>
          {/* Micro Mini SVG Line Chart */}
          <div className="w-full h-4 mt-2">
            <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
              <path d="M 0,25 Q 20,5 40,20 T 80,10 T 100,5" fill="none" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </motion.div>

        {/* 2. Bugs Reported (Top Right) */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          className="absolute z-20 -right-6 top-6 glass-panel p-3.5 rounded-2xl border border-pink-500/20 hover:border-pink-500/40 w-[125px] md:w-[155px] shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
        >
          <div className="flex items-center space-x-2 mb-1.5">
            <span className="p-1 rounded-lg bg-pink-500/25 text-pink-400">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="10" rx="2" />
                <path d="M12 2v9" />
                <path d="M8 5h8" />
                <path d="M6 14v4" />
                <path d="M18 14v4" />
              </svg>
            </span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-heading">Bugs Reported</span>
          </div>
          <div className="text-sm md:text-base font-bold text-slate-900 dark:text-white font-heading">150+</div>
        </motion.div>

        {/* 3. Manual Testing (Mid Left) */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          className="absolute z-20 -left-12 top-48 glass-panel p-3.5 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 w-[110px] md:w-[130px] shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-left"
        >
          <div className="flex items-center space-x-1.5">
            <span className="p-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-heading">Manual Testing</span>
          </div>
          <div className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 mt-1 pl-5">Test Design</div>
        </motion.div>

        {/* 4. API Testing (Mid Right) */}
        <motion.div
          animate={{ y: [0, -11, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
          whileHover={{ scale: 1.05 }}
          className="absolute z-20 -right-12 top-44 glass-panel p-3.5 rounded-xl border border-blue-500/20 hover:border-blue-500/40 w-[120px] md:w-[145px] shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-left"
        >
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded-lg bg-blue-500/20 text-blue-400">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
              </svg>
            </span>
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider font-heading">API Testing</span>
          </div>
          <div className="text-[11px] font-semibold text-slate-850 dark:text-slate-200 mt-1.5 pl-6 font-heading">Postman</div>
        </motion.div>

        {/* 5. Testing Projects (Bottom Center) */}
        <motion.div
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          whileHover={{ scale: 1.05 }}
          className="absolute z-20 left-16 bottom-8 glass-panel p-3.5 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 w-[145px] md:w-[175px] shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
        >
          <div className="flex items-center space-x-2 mb-1">
            <span className="p-1 rounded-lg bg-purple-500/25 text-purple-400">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-heading">Testing Projects</span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200 tracking-tight">Syra | Hyka | OTR</span>
          </div>
        </motion.div>

         

{/* 6. QA Radar Scanner (Bottom Right) */}
<motion.div
  animate={{
    y: [0, -10, 0],
    rotate: [0, 5, -5, 0],
  }}
  transition={{
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  whileHover={{
    scale: 1.12,
    rotate: 10,
  }}
  className="absolute z-20 right-4 bottom-20 w-12 h-12 rounded-xl glass-panel border border-cyan-500/30 flex items-center justify-center overflow-hidden"
>

  {/* Rotating Scanner Ring */}
  <motion.div
    animate={{ rotate: 360 }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "linear",
    }}
    className="absolute w-8 h-8 rounded-full border-2 border-cyan-400/60"
  >
    <div className="absolute top-0 left-1/2 w-[2px] h-4 -translate-x-1/2 bg-cyan-400 rounded-full shadow-[0_0_12px_#22d3ee]" />
  </motion.div>

  {/* Center Dot */}
  <motion.div
    animate={{
      scale: [1, 1.4, 1],
      opacity: [0.8, 1, 0.8],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
    }}
    className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]"
  />
</motion.div>

      </div>
    </div>
  );
};
export default HeroVisual;
