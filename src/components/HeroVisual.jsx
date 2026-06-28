import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { motion } from 'framer-motion';

// 3D Laptop with embedded interactive dashboard
const Laptop = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <group 
      position={[0, -0.4, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
    >
      {/* Laptop Base (Body) */}
      <mesh position={[0, -0.42, 0.1]}>
        <boxGeometry args={[2.4, 0.05, 1.5]} />
        <meshPhysicalMaterial
          color="#0b0f19"
          roughness={0.35}
          metalness={0.85}
          emissive="#22d3ee"
          emissiveIntensity={hovered ? 0.25 : 0.08}
        />
      </mesh>

      {/* Laptop Keyboard Area */}
      <mesh position={[0, -0.39, 0.02]}>
        <boxGeometry args={[2.2, 0.015, 0.65]} />
        <meshStandardMaterial color="#161b2c" roughness={0.6} />
      </mesh>

      {/* Laptop Trackpad */}
      <mesh position={[0, -0.39, 0.55]}>
        <boxGeometry args={[0.55, 0.015, 0.35]} />
        <meshStandardMaterial color="#2c354e" roughness={0.4} />
      </mesh>

      {/* Screen Hinge */}
      <mesh position={[0, -0.39, -0.65]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.035, 0.035, 2.1, 16]} />
        <meshStandardMaterial color="#0b0f19" roughness={0.5} />
      </mesh>

      {/* Screen Bezel & Lid (slightly tilted back) */}
      <group position={[0, -0.39, -0.65]} rotation={[-Math.PI / 9.5, 0, 0]}>
        {/* Screen Bezel Frame */}
        <mesh position={[0, 0.76, -0.02]}>
          <boxGeometry args={[2.4, 1.52, 0.04]} />
          <meshPhysicalMaterial color="#0b0f19" roughness={0.4} metalness={0.8} />
        </mesh>

        {/* Screen Display Panel */}
        <mesh position={[0, 0.76, 0.005]}>
          <boxGeometry args={[2.3, 1.42, 0.015]} />
          <meshStandardMaterial color="#000000" roughness={0.9} />
        </mesh>

        {/* Glow backdrop behind lid */}
        <mesh position={[0, 0.76, -0.04]}>
          <planeGeometry args={[2.3, 1.4]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={hovered ? 0.35 : 0.12} />
        </mesh>

        {/* Interactive HTML Dashboard */}
        <Html
          transform
          distanceFactor={1.38}
          position={[0, 0.76, 0.02]}
          style={{
            width: '300px',
            height: '180px',
            pointerEvents: 'auto',
          }}
        >
          <div className="w-[300px] h-[180px] rounded bg-black border border-slate-900 flex flex-col justify-between p-2.5 font-mono text-[8px] tracking-tight relative overflow-hidden select-none">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none opacity-50 z-0"></div>
            
            {/* Top Row: System Status */}
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-900 pb-1.5 z-10">
              <span className="flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-emerald-400 font-bold uppercase text-[7px]">Pipeline active</span>
              </span>
              <span className="py-0.5 px-1.5 rounded bg-purple-500/20 text-purple-400 text-[6.5px] font-extrabold border border-purple-500/30 uppercase tracking-widest">
                PROD ENV
              </span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-left my-auto z-10 pl-1">
              <div className="flex flex-col">
                <span className="text-slate-500 text-[6px] font-bold uppercase">Passed</span>
                <span className="text-[10px] text-emerald-400 font-black">142</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-500 text-[6px] font-bold uppercase">Failed</span>
                <span className="text-[10px] text-rose-500 font-black">0</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-500 text-[6px] font-bold uppercase">Running</span>
                <span className="text-[10px] text-cyan-400 font-black animate-pulse">Active</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-500 text-[6px] font-bold uppercase">API Response</span>
                <span className="text-[10px] text-emerald-400 font-bold">200 OK</span>
              </div>
            </div>

            {/* Progress & Lower Bar */}
            <div className="w-full space-y-1 z-10 pt-1 border-t border-slate-900">
              <div className="flex items-center justify-between text-[7px] text-slate-500 font-bold uppercase">
                <span>Smoke Test Status:</span>
                <span className="text-emerald-400 font-bold">Passed</span>
              </div>
              {/* Progress bar */}
              <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden relative">
                <motion.div
                  animate={{
                    width: ["0%", "100%"]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400"
                />
              </div>
            </div>
          </div>
        </Html>
      </group>
    </group>
  );
};

// Canvas Content Wrapper to handle parallax tilt & float breathing
const SceneContent = () => {
  const groupRef = useRef();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Triggers R3F scene entry load rise
    const t = setTimeout(() => setActive(true), 150);
    const handleMouseMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(t);
    };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Auto swaying rotation to look alive on mobile/touch interfaces
    const autoRotY = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.04;

    // Smoothed parallax camera tilt
    const targetRotX = mouse.y * 0.04;
    const targetRotY = mouse.x * 0.04 + autoRotY;
    
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.06;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.06;

    // Scale and Position Rise entry loads
    const targetScale = active ? 1.05 : 0.15;
    const targetY = active ? (Math.sin(state.clock.getElapsedTime() * 0.5) * 0.04 - 0.2) : -2;

    groupRef.current.scale.x += (targetScale - groupRef.current.scale.x) * 0.05;
    groupRef.current.scale.y += (targetScale - groupRef.current.scale.y) * 0.05;
    groupRef.current.scale.z += (targetScale - groupRef.current.scale.z) * 0.05;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {/* 3D Laptop is the ONLY centerpiece mesh */}
      <Laptop />
    </group>
  );
};

export const HeroVisual = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Performance-optimized entry settings for Mobile vs Desktop
  const initialAnim = isMobile
    ? { opacity: 0, y: 60, scale: 0.9 }
    : { opacity: 0, scale: 0.7, y: 120, rotateX: 20, rotateY: -15, filter: "blur(12px)" };

  const whileInViewAnim = isMobile
    ? { opacity: 1, y: 0, scale: 1 }
    : { opacity: 1, scale: 1, y: 0, rotateX: 0, rotateY: 0, filter: "blur(0px)" };

  return (
    <div className="relative w-full h-[480px] md:h-[600px] flex items-center justify-center select-none overflow-hidden">
      
      {/* Shifting Orbs inside canvas space */}
      <div className="absolute w-[350px] h-[350px] rounded-full bg-purple-500/10 dark:bg-purple-500/15 blur-3xl absolute-center pointer-events-none z-0"></div>
      <div className="absolute w-[250px] h-[250px] rounded-full bg-cyan-500/10 dark:bg-cyan-500/10 blur-3xl absolute-center pointer-events-none translate-x-12 translate-y-12 z-0"></div>

      {/* ================= 3D CANVAS SCENE ================= */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Canvas
          camera={{ position: [0, 0, 4.3], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, isMobile ? 1 : 1.5]}
        >
          {/* Volumetric Lights */}
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 6, 4]} intensity={0.9} color="#22d3ee" />
          <pointLight position={[-5, 6, 4]} intensity={0.9} color="#a855f7" />
          <pointLight position={[0, -2, 2]} intensity={0.5} color="#6366f1" />
          
          <SceneContent />
        </Canvas>
      </div>

      {/* ================= WIDGETS AND CARDS LAYER ================= */}
      <div className="relative w-full max-w-[340px] sm:max-w-[480px] md:max-w-[560px] lg:max-w-[660px] xl:max-w-[700px] h-full flex items-center justify-center pointer-events-none z-10">
        
        {/* ================= TESTING PIPELINE (Centered at bottom to prevent overlaps) ================= */}
        <motion.div
          initial={initialAnim}
          whileInView={whileInViewAnim}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 90, damping: 12, delay: 0.6 }}
          style={{ transformPerspective: 1200 }}
          className="absolute z-20 bottom-2 md:bottom-6 left-1/2 -translate-x-1/2 w-[215px] md:w-[270px] bg-slate-950/90 dark:bg-slate-950/80 border border-slate-800/80 rounded-2xl p-2.5 shadow-2xl backdrop-blur-md text-left pointer-events-auto"
        >
          <div className="flex justify-between items-center mb-1 text-[8px] font-bold text-slate-400 uppercase tracking-widest font-heading">
            <span>Testing Pipeline</span>
            <span className="text-purple-400 animate-pulse text-[7.5px]">Running</span>
          </div>

          <div className="grid grid-cols-4 gap-1 text-center text-[7px] text-slate-500 font-extrabold uppercase tracking-wider mb-1.5">
            <span className="text-purple-400">Plan</span>
            <span className="text-blue-400">Execute</span>
            <span className="text-cyan-400">Validate</span>
            <span className="text-emerald-400">Deploy</span>
          </div>

          <div className="relative w-full h-1 bg-slate-900 rounded-full overflow-hidden">
            <motion.div
              animate={{
                left: ["-100%", "100%"]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-purple-500 via-blue-500 via-cyan-400 to-emerald-400"
            />
          </div>
        </motion.div>

        {/* ================= FUTURISTIC QA SCANNER ================= */}
        <motion.div
          initial={initialAnim}
          whileInView={whileInViewAnim}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 90, damping: 12, delay: 1.2 }}
          style={{ transformPerspective: 1200 }}
          className="absolute z-20 left-1 md:-left-12 lg:-left-20 xl:-left-24 top-28 md:top-36 w-12 h-12 flex items-center justify-center cursor-none group transition-all duration-305 pointer-events-auto"
        >
          <motion.div
            animate={{ 
              y: [0, -6, 0],
              x: [0, 4, 0]
            }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 0 20px rgba(34,211,238,0.5)"
            }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-4px] rounded-full border border-dashed border-cyan-400/40 pointer-events-none"
            />

            <div className="w-10 h-10 rounded-full border-2 border-cyan-400 bg-cyan-950/20 backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.3)] relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-cyan-400/5 animate-pulse"></div>
              
              <motion.div
                animate={{
                  y: [-12, 12, -12]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute left-0 w-full h-[1px] bg-cyan-400 shadow-[0_0_8px_#22d3ee] z-10"
              />
              
              <div className="w-3 h-3 rounded-full border border-cyan-400/80 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-cyan-400 animate-ping"></div>
              </div>
            </div>
            
            <div className="absolute top-9 left-9 w-6 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 origin-top-left rotate-45 shadow-[0_0_10px_rgba(34,211,238,0.4)]"></div>
          </motion.div>
        </motion.div>

        {/* ================= FLOATING GLASS CARDS (Left-Side vertical stack layout to avoid pipeline overlap) ================= */}

        {/* 1. Test Cases (Top Left) */}
        <motion.div
          initial={initialAnim}
          whileInView={whileInViewAnim}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 90, damping: 12, delay: 0.8 }}
          style={{ transformPerspective: 1200 }}
          className="absolute z-20 left-2 md:-left-16 lg:-left-28 xl:-left-36 top-2 md:top-6 pointer-events-auto"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5.0, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{
              scale: 1.05,
              rotateY: 8,
              rotateX: -5,
              borderColor: "rgba(168,85,247,0.45)",
              boxShadow: "0 15px 30px rgba(168,85,247,0.25)"
            }}
            className="glass-panel p-3 rounded-2xl border border-purple-500/20 w-[120px] md:w-[150px] shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-all duration-305"
          >
            <div className="flex items-center space-x-1.5 mb-1">
              <span className="p-0.5 rounded-lg bg-purple-500/20 text-purple-400">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-heading">Test Cases</span>
            </div>
            <div className="text-xs md:text-sm font-bold text-slate-900 dark:text-white font-heading">100+</div>
            <div className="w-full h-3 mt-1.5">
              <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                <path d="M 0,25 Q 20,5 40,20 T 80,10 T 100,5" fill="none" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          </motion.div>
        </motion.div>

        {/* 2. Manual Testing (Mid Left) */}
        <motion.div
          initial={initialAnim}
          whileInView={whileInViewAnim}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 90, damping: 12, delay: 1.0 }}
          style={{ transformPerspective: 1200 }}
          className="absolute z-20 left-0 md:-left-24 lg:-left-36 xl:-left-44 top-[110px] md:top-[125px] pointer-events-auto"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{
              scale: 1.05,
              rotateY: 8,
              rotateX: 5,
              borderColor: "rgba(34,211,238,0.45)",
              boxShadow: "0 15px 30px rgba(34,211,238,0.25)"
            }}
            className="glass-panel p-3 rounded-xl border border-cyan-500/20 w-[110px] md:w-[130px] shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-left transition-all duration-305"
          >
            <div className="flex items-center space-x-1">
              <span className="p-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-heading">Manual Test</span>
            </div>
            <div className="text-[10px] font-semibold text-slate-800 dark:text-slate-200 mt-1 pl-4">Test Design</div>
          </motion.div>
        </motion.div>

        {/* 3. Testing Projects Card (Bottom Left) */}
        <motion.div
          initial={initialAnim}
          whileInView={whileInViewAnim}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 85, damping: 10, delay: 1.3 }}
          style={{ transformPerspective: 1200 }}
          className="absolute z-20 left-2 md:-left-14 lg:-left-24 xl:-left-32 top-[200px] md:top-[225px] pointer-events-auto"
        >
          <motion.div
            animate={{ y: [0, -9, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{
              scale: 1.05,
              rotateY: 5,
              rotateX: -5,
              borderColor: "rgba(168,85,247,0.45)",
              boxShadow: "0 15px 30px rgba(168,85,247,0.25)"
            }}
            className="glass-panel p-3.5 rounded-2xl border border-purple-500/20 w-[145px] md:w-[185px] shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-305 backdrop-blur-md"
          >
            <div className="flex items-center space-x-1.5 mb-1.5 border-b border-slate-900 pb-1">
              <span className="p-0.5 rounded bg-purple-500/20 text-purple-400">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </span>
              <span className="text-[8.5px] font-extrabold text-slate-350 uppercase tracking-wider font-heading">Projects</span>
            </div>

            {/* Checkmarks pop one-by-one */}
            <div className="space-y-0.5 font-mono text-[8px] md:text-[9px] text-slate-300 text-left">
              {[
                { label: 'Syra', delay: 1.6 },
                { label: 'HYKA', delay: 1.8 },
                { label: 'OTR', delay: 2.0 }
              ].map((proj, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10, scale: 0.8 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, damping: 9, delay: proj.delay }}
                  className="flex items-center space-x-1"
                >
                  <span className="text-emerald-400">✔</span>
                  <span>{proj.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Production Ready details fades in */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 2.2 }}
              className="mt-2 pt-1 border-t border-slate-900 flex items-center justify-between text-[7px]"
            >
              <span className="font-bold text-slate-500 uppercase tracking-wider">Prod Ready</span>
              <span className="py-0.5 px-1 rounded-full bg-emerald-500/10 text-emerald-400 font-extrabold border border-emerald-500/20">3 Validated</span>
            </motion.div>
          </motion.div>
        </motion.div>


        {/* ================= FLOATING GLASS CARDS (Right-Side vertical stack layout to avoid pipeline overlap) ================= */}

        {/* 4. Bugs Reported (Top Right) */}
        <motion.div
          initial={initialAnim}
          whileInView={whileInViewAnim}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 90, damping: 12, delay: 1.0 }}
          style={{ transformPerspective: 1200 }}
          className="absolute z-20 right-2 md:-right-16 lg:-right-28 xl:-right-36 top-2 md:top-6 pointer-events-auto"
        >
          <motion.div
            animate={{ y: [0, -9, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{
              scale: 1.05,
              rotateY: -8,
              rotateX: -5,
              borderColor: "rgba(244,63,94,0.45)",
              boxShadow: "0 15px 30px rgba(244,63,94,0.25)"
            }}
            className="glass-panel p-3 rounded-2xl border border-pink-500/20 w-[120px] md:w-[150px] shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-all duration-305"
          >
            <div className="flex items-center space-x-1.5 mb-1">
              <span className="p-0.5 rounded-lg bg-pink-500/25 text-pink-400">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="11" width="18" height="10" rx="2" />
                  <path d="M12 2v9" />
                  <path d="M8 5h8" />
                </svg>
              </span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-heading">Bugs Logged</span>
            </div>
            <div className="text-xs md:text-sm font-bold text-slate-900 dark:text-white font-heading">150+</div>
          </motion.div>
        </motion.div>

        {/* 5. API Testing (Mid Right) */}
        <motion.div
          initial={initialAnim}
          whileInView={whileInViewAnim}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 90, damping: 12, delay: 1.1 }}
          style={{ transformPerspective: 1200 }}
          className="absolute z-20 right-0 md:-right-24 lg:-right-36 xl:-right-44 top-[100px] md:top-[115px] pointer-events-auto"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{
              scale: 1.05,
              rotateY: -8,
              rotateX: 5,
              borderColor: "rgba(59,130,246,0.45)",
              boxShadow: "0 15px 30px rgba(59,130,246,0.25)"
            }}
            className="glass-panel p-3 rounded-xl border border-blue-500/20 w-[115px] md:w-[140px] shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-left transition-all duration-305"
          >
            <div className="flex items-center space-x-1.5">
              <span className="p-0.5 rounded bg-blue-500/20 text-blue-400">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                </svg>
              </span>
              <span className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider font-heading">API Testing</span>
            </div>
            <div className="text-[10px] font-semibold text-slate-850 dark:text-slate-200 mt-1 pl-4 font-heading">Postman</div>
          </motion.div>
        </motion.div>

        {/* 6. QA Radar Scanner (Bottom Right) */}
        <motion.div
          initial={initialAnim}
          whileInView={whileInViewAnim}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 90, damping: 12, delay: 1.4 }}
          style={{ transformPerspective: 1200 }}
          className="absolute z-20 right-2 md:-right-14 lg:-right-24 xl:-right-32 top-[180px] md:top-[200px] pointer-events-auto"
        >
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.08,
              rotate: 10,
              borderColor: "rgba(34,211,238,0.5)",
              boxShadow: "0 15px 30px rgba(34,211,238,0.3)"
            }}
            className="w-12 h-12 rounded-xl glass-panel border border-cyan-500/30 flex items-center justify-center overflow-hidden transition-all duration-350"
          >
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
        </motion.div>

      </div>
    </div>
  );
};
export default HeroVisual;
