import React, { useEffect, useState } from 'react';
import { useLaunch } from '../context/LaunchContext';
import { motion } from 'framer-motion';

export const Preloader = () => {
  const { launchState, setLaunchState, progress, setProgress } = useLaunch();
  const [lines, setLines] = useState([]);

  useEffect(() => {
    if (launchState !== 'preloader') return;

    const messages = [
      { text: 'INITIALIZING QA SYSTEM...', delay: 100 },
      { text: 'Loading Modules...', delay: 350 },
      { text: '✔ Test Engine Loaded', delay: 550 },
      { text: '✔ Bug Tracker Loaded', delay: 750 },
      { text: '✔ API Validator Loaded', delay: 950 },
      { text: '✔ Automation Core Loaded', delay: 1150 },
      { text: 'SYSTEM READY. BOOT COMPLETED.', delay: 1350 }
    ];

    // Build line displays
    messages.forEach((msg) => {
      setTimeout(() => {
        setLines((prev) => [...prev, msg.text]);
      }, msg.delay);
    });

    // Loading Bar Progress
    let count = 0;
    const interval = setInterval(() => {
      count += 2;
      if (count >= 100) {
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setLaunchState('initial');
        }, 500); // Small pause for completeness
      } else {
        setProgress(count);
      }
    }, 25);

    return () => {
      clearInterval(interval);
    };
  }, [launchState, setLaunchState, setProgress]);

  if (launchState !== 'preloader') return null;

  return (
    <div className="fixed inset-0 bg-[#030303] z-[999999] flex flex-col justify-between p-8 md:p-16 font-mono text-xs md:text-sm select-none relative overflow-hidden">
      {/* Scanlines & Grid Texture Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none opacity-40"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_50%,rgba(34,211,238,0.03)_50%)] bg-[size:100%_4px] pointer-events-none"></div>

      {/* Top Header */}
      <div className="flex items-center justify-between text-slate-500 uppercase tracking-widest text-[9px] md:text-xs">
        <span className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
          <span className="text-cyan-400 font-bold">QA Core System v1.0.4</span>
        </span>
        <span>Secure Session</span>
      </div>

      {/* Center Console Log */}
      <div className="flex-1 my-8 overflow-hidden text-left flex flex-col justify-center max-w-md mx-auto w-full space-y-3.5">
        {lines.map((line, idx) => {
          const isSystemReady = line.includes('READY');
          const isHeader = line.includes('INITIALIZING');
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={`leading-relaxed tracking-wide ${
                isSystemReady 
                  ? 'text-emerald-400 font-black shadow-[0_0_12px_rgba(52,211,153,0.25)]'
                  : isHeader 
                    ? 'text-purple-400 font-bold'
                    : 'text-slate-300'
              }`}
            >
              {line}
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Loading Bar */}
      <div className="max-w-md w-full mx-auto space-y-2">
        <div className="flex items-center justify-between text-slate-500 text-[10px] uppercase font-bold tracking-wider">
          <span>Loading Modules...</span>
          <span className="text-cyan-400 font-black">{progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-900/80 border border-slate-800/60 rounded-full overflow-hidden relative">
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 transition-all duration-75"
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
