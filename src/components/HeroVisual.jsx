import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Premium under-laptop ambient glow texture builder
const glowTexture = (() => {
  if (typeof window === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  
  const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  gradient.addColorStop(0, 'rgba(34, 211, 238, 0.75)'); // Cyan center
  gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.35)'); // Purple mid-glow
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);
  
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
})();

const PHASES = [
  {
    key: 'smoke',
    title: 'Smoke Test Suite',
    command: 'npm run test:smoke',
    status: 'RUNNING',
    successLabel: 'Passed',
    statLabel1: 'Response Time',
    statValue1: '14ms',
    statLabel2: 'Checked',
    statValue2: '12/12 Endpoints',
    logs: [
      '🚀 Initiating Smoke Test suite...',
      '🔍 GET /health -> 200 OK (8ms)',
      '🔍 GET /auth/session -> 200 OK (16ms)',
      '🔍 POST /order/checkout -> 201 Created (120ms)',
      '✅ All smoke tests passed successfully.'
    ]
  },
  {
    key: 'regression',
    title: 'Regression Suite',
    command: 'npm run test:regression',
    status: 'RUNNING',
    successLabel: 'Passed',
    statLabel1: 'Executed',
    statValue1: '142 / 142',
    statLabel2: 'Bugs Found',
    statValue2: '0',
    logs: [
      '⚡ Running regression suite...',
      '✔ OAuth2 Login flow... PASSED',
      '✔ Cart persistence... PASSED',
      '✔ Payment integration... PASSED',
      '✅ Regression suite run clean.'
    ]
  },
  {
    key: 'build',
    title: 'Build Verification',
    command: 'npm run build:verify',
    status: 'VERIFYING',
    successLabel: 'Verified',
    statLabel1: 'Image Hash',
    statValue1: 'sha256:ea21c',
    statLabel2: 'Bundle Size',
    statValue2: '1.24 MB',
    logs: [
      '📦 Verifying build artifacts...',
      'Checking JS bundle maps... OK',
      'Oxlint syntax check... 0 errors',
      'Docker container compilation... OK',
      '✅ Build artifacts validated.'
    ]
  },
  {
    key: 'deploy',
    title: 'Deployment Stage',
    command: 'npm run deploy:prod',
    status: 'DEPLOYING',
    successLabel: 'Success',
    statLabel1: 'Pods Active',
    statValue1: '3 / 3',
    statLabel2: 'Traffic Route',
    statValue2: 'Canary 100%',
    logs: [
      '🚢 Uploading assets to CDN...',
      'Updating Kubernetes replica sets...',
      'Verifying cluster pods health... OK',
      'Traffic routing update complete...',
      '🚀 Deployment successful!'
    ]
  }
];

// 3D Laptop with embedded interactive dashboard
const Laptop = () => {
  const [hovered, setHovered] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [consoleLogs, setConsoleLogs] = useState([]);

  const currentPhase = PHASES[phaseIndex];

  useEffect(() => {
    let timer;
    const activePhase = PHASES[phaseIndex];
    setProgress(0);
    setConsoleLogs([`root@QA-01:~$ ${activePhase.command}`]);
    
    const duration = 4500;
    const intervalTime = 100;
    const steps = duration / intervalTime;
    let currentStep = 0;
    
    timer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(100, Math.floor((currentStep / steps) * 100));
      setProgress(currentProgress);
      
      const logMilestones = activePhase.logs;
      const visibleLogsCount = Math.min(
        logMilestones.length,
        Math.floor((currentProgress / 100) * (logMilestones.length + 1))
      );
      
      const activeLogs = logMilestones.slice(0, visibleLogsCount);
      setConsoleLogs([
        `root@QA-01:~$ ${activePhase.command}`,
        ...activeLogs
      ]);
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setPhaseIndex((prev) => (prev + 1) % PHASES.length);
        }, 1000);
      }
    }, intervalTime);
    
    return () => {
      clearInterval(timer);
    };
  }, [phaseIndex]);

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
          roughness={0.15}
          metalness={0.85}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          emissive="#22d3ee"
          emissiveIntensity={hovered ? 0.45 : 0.15}
        />
      </mesh>

      {/* Laptop Keyboard Area */}
      <mesh position={[0, -0.39, 0.02]}>
        <boxGeometry args={[2.2, 0.015, 0.65]} />
        <meshStandardMaterial color="#161b2c" roughness={0.5} />
      </mesh>

      {/* Laptop Trackpad */}
      <mesh position={[0, -0.39, 0.55]}>
        <boxGeometry args={[0.55, 0.015, 0.35]} />
        <meshStandardMaterial color="#2c354e" roughness={0.35} />
      </mesh>

      {/* Screen Hinge */}
      <mesh position={[0, -0.39, -0.65]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.035, 0.035, 2.1, 16]} />
        <meshStandardMaterial color="#0a0e1a" roughness={0.4} />
      </mesh>

      {/* Screen Bezel & Lid (slightly tilted back) */}
      <group position={[0, -0.39, -0.65]} rotation={[-Math.PI / 9.5, 0, 0]}>
        {/* Screen Bezel Frame */}
        <mesh position={[0, 0.76, -0.02]}>
          <boxGeometry args={[2.4, 1.52, 0.04]} />
          <meshPhysicalMaterial 
            color="#0b0f19" 
            roughness={0.15} 
            metalness={0.85}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            emissive="#a855f7"
            emissiveIntensity={hovered ? 0.45 : 0.18}
          />
        </mesh>

        {/* Screen Display Panel */}
        <mesh position={[0, 0.76, 0.005]}>
          <boxGeometry args={[2.3, 1.42, 0.015]} />
          <meshStandardMaterial color="#020205" roughness={0.95} />
        </mesh>

        {/* Glow backdrop behind lid */}
        <mesh position={[0, 0.76, -0.04]}>
          <planeGeometry args={[2.3, 1.4]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={hovered ? 0.45 : 0.16} />
        </mesh>

        {/* Dynamic Point Light from Screen to Keyboard */}
        <pointLight
          position={[0, 0.76, 0.2]}
          intensity={hovered ? 1.8 : 1.0}
          distance={3.5}
          color="#22d3ee"
        />

        {/* Interactive HTML Dashboard */}
        <Html
          transform
          distanceFactor={1.2}
          position={[0, 0.76, 0.02]}
          style={{
            width: '360px',
            height: '216px',
            pointerEvents: 'auto',
          }}
        >
          <div className="w-[360px] h-[216px] rounded bg-black border border-slate-900/60 flex flex-col justify-between p-3.5 font-mono text-[9px] tracking-tight relative overflow-hidden select-none shadow-[inset_0_0_15px_rgba(34,211,238,0.05)] text-white">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none opacity-40 z-0"></div>
            
            {/* Top Row: System Status */}
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-900 pb-1.5 z-10">
              <span className="flex items-center space-x-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${progress < 100 ? "bg-cyan-400 animate-ping" : "bg-emerald-500 animate-pulse"}`}></span>
                <span className={`font-bold uppercase text-[7px] ${progress < 100 ? "text-cyan-400" : "text-emerald-400"}`}>
                  {progress < 100 ? currentPhase.status : currentPhase.successLabel}
                </span>
              </span>
              <span className="py-0.5 px-1.5 rounded bg-purple-500/10 text-purple-400 text-[6.5px] font-extrabold border border-purple-500/25 uppercase tracking-widest">
                PROD ENV
              </span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-left my-auto z-10 pl-1">
              <div className="flex flex-col">
                <span className="text-slate-500 text-[6.5px] font-bold uppercase">{currentPhase.statLabel1}</span>
                <span className="text-[11px] text-purple-400 font-black tracking-wide">
                  {currentPhase.statValue1}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-550 text-[6.5px] font-bold uppercase">{currentPhase.statLabel2}</span>
                <span className="text-[11px] text-cyan-400 font-black tracking-wide">
                  {currentPhase.statValue2}
                </span>
              </div>
            </div>

            {/* Progress & Lower Bar */}
            <div className="w-full space-y-1.5 z-10 pt-1 border-t border-slate-900">
              {/* Progress bar */}
              <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden relative">
                <div
                  style={{ width: `${progress}%`, transition: 'width 0.12s ease-out' }}
                  className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400"
                />
              </div>
              {/* Terminal Console Text */}
              <div className="flex flex-col space-y-0.5 font-mono text-[6px] text-slate-400 bg-slate-950/80 border border-slate-900/80 p-1.5 rounded h-[65px] overflow-hidden text-left">
                {consoleLogs.map((log, idx) => (
                  <div key={idx} className="truncate">
                    <span className="text-cyan-400 mr-1">root@QA-01:~$</span>
                    <span>{log.startsWith('root@QA-01') ? log.replace('root@QA-01:~$ ', '') : log}</span>
                  </div>
                ))}
                {progress < 100 && (
                  <div className="text-cyan-400 flex items-center">
                    <span className="mr-1">root@QA-01:~$</span>
                    <span className="animate-pulse">_</span>
                  </div>
                )}
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

    // Base premium 3D profile rotations
    const baseRotX = 0.14; // Look slightly down on keyboard
    const baseRotY = -0.22; // Rotate slightly to the right for 3D side profile

    // Auto swaying rotation and breathing float
    const time = state.clock.getElapsedTime();
    const autoRotY = Math.sin(time * 0.4) * 0.03;
    const autoRotX = Math.cos(time * 0.4) * 0.015;

    // Very subtle mouse parallax camera tilt + base 3D angle
    const targetRotX = mouse.y * 0.06 + baseRotX + autoRotX;
    const targetRotY = mouse.x * 0.06 + baseRotY + autoRotY;
    
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.06;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.06;

    // Dynamic responsive scale (+10-15% size increase)
    const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
    let baseScale = 1.42;
    if (width < 480) baseScale = 0.70;
    else if (width < 768) baseScale = 0.84;
    else if (width < 1200) baseScale = 1.06;

    // Floating breathing animation + upward position adjustment (0.08 units higher)
    const breatheY = Math.sin(time * 0.6) * 0.05 + 0.08;

    const targetScale = active ? baseScale : 0.15;
    const targetY = active ? breatheY : -2;

    groupRef.current.scale.x += (targetScale - groupRef.current.scale.x) * 0.05;
    groupRef.current.scale.y += (targetScale - groupRef.current.scale.y) * 0.05;
    groupRef.current.scale.z += (targetScale - groupRef.current.scale.z) * 0.05;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {/* Soft Cyan and Purple Glow Plane Under Laptop */}
      {glowTexture && (
        <mesh position={[0, -0.45, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.2, 2.2]} />
          <meshBasicMaterial
            map={glowTexture}
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      )}
      {/* 3D Laptop is the ONLY centerpiece mesh */}
      <Laptop />
    </group>
  );
};

// 3D Hover & Floating Card component with premium physics
const HoverCard = ({ children, className, style, delay, initialAnim, whileInViewAnim }) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Calculate rotation angles (max 8 degrees)
    const rX = -(mouseY / (height / 2)) * 8;
    const rY = (mouseX / (width / 2)) * 8;
    
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={initialAnim}
      animate={whileInViewAnim}
      transition={{ type: "spring", stiffness: 70, damping: 11, mass: 0.95, delay }}
      style={{
        ...style,
        transformPerspective: 1000,
      }}
      className={className}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          rotate: isHovered ? 0 : [0.8, -0.8, 0.8], // 1-2 degrees subtle rotate
          scale: isHovered ? 1.05 : 1,
          y: isHovered ? -4 : [0, -8, 0],
          boxShadow: isHovered 
            ? "0 12px 30px rgba(168, 85, 247, 0.25)" 
            : [
                "0 8px 32px rgba(0,0,0,0.15)",
                "0 8px 32px rgba(168, 85, 247, 0.08)",
                "0 8px 32px rgba(0,0,0,0.15)"
              ]
        }}
        transition={isHovered ? { type: "tween", ease: "easeOut", duration: 0.25 } : {
          y: { duration: 5 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 6 + Math.random() * 3, repeat: Infinity, ease: "easeInOut" },
          boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotateX: { type: "spring", stiffness: 80, damping: 12 },
          rotateY: { type: "spring", stiffness: 80, damping: 12 },
          scale: { type: "spring", stiffness: 100, damping: 15 }
        }}
        className="h-full w-full pointer-events-auto"
      >
        {children}
      </motion.div>
    </motion.div>
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
    ? { opacity: 0, y: 60, scale: 0.6 }
    : { opacity: 0, scale: 0.7, y: 120, rotateX: 20, rotateY: -15, filter: "blur(12px)" };

  const whileInViewAnim = isMobile
    ? { opacity: 1, y: 0, scale: 0.72 }
    : { opacity: 1, scale: 1, y: 0, rotateX: 0, rotateY: 0, filter: "blur(0px)" };

  return (
    <div className="relative w-full h-[520px] md:h-[600px] flex items-center justify-center select-none overflow-hidden">

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
          <directionalLight position={[0, 5, 5]} intensity={0.65} color="#ffffff" />

          <SceneContent />
        </Canvas>
      </div>

      {/* ================= WIDGETS AND CARDS LAYER ================= */}
      <div
        key={isMobile ? 'mobile' : 'desktop'}
        className="relative w-full max-w-[370px] sm:max-w-[420px] md:max-w-[460px] lg:max-w-[490px] xl:max-w-[510px] h-full flex items-center justify-center pointer-events-none z-10"
      >

        {/* ================= TESTING PIPELINE (Centered at bottom to prevent overlaps) ================= */}
        <motion.div
          initial={initialAnim}
          animate={whileInViewAnim}
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

        {/* ================= FUTURISTIC QA SCANNER (Left Side decoration, positioned between top/bottom cards) ================= */}
        <motion.div
          initial={initialAnim}
          animate={whileInViewAnim}
          transition={{ type: "spring", stiffness: 90, damping: 12, delay: 1.2 }}
          style={{ transformPerspective: 1200 }}
          className="absolute z-20 left-[-4px] sm:left-1 top-[160px] md:top-[170px] w-12 h-12 flex items-center justify-center cursor-none group transition-all duration-305 pointer-events-auto"
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

        {/* ================= FLOATING GLASS CARDS (Symmetrical natural layout around the laptop) ================= */}

        {/* 1. Test Cases (Top Center) */}
        <HoverCard
          initialAnim={initialAnim}
          whileInViewAnim={whileInViewAnim}
          delay={0.8}
          className="absolute z-20 left-1/2 -translate-x-1/2 top-[6px] md:top-[15px] pointer-events-auto"
        >
          <div className="glass-panel p-3 rounded-2xl border border-purple-500/20 w-[120px] md:w-[150px] shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] dark:hover:shadow-[0_0_25px_rgba(168,85,247,0.25)] transition-all duration-300">
            <div className="flex items-center space-x-1.5 mb-1.5">
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
          </div>
        </HoverCard>

        {/* 2. Manual Testing (Top Left) */}
        <HoverCard
          initialAnim={initialAnim}
          whileInViewAnim={whileInViewAnim}
          delay={1.0}
          className="absolute z-20 left-[-8px] sm:left-4 top-[35px] md:top-[60px] pointer-events-auto"
        >
          <div className="glass-panel p-3 rounded-2xl border border-cyan-500/20 w-[110px] md:w-[130px] shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-left hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] dark:hover:shadow-[0_0_25px_rgba(34,211,238,0.25)] transition-all duration-300">
            <div className="flex items-center space-x-1.5 mb-1.5">
              <span className="p-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-heading">Manual Test</span>
            </div>
            <div className="text-[10px] font-bold text-slate-800 dark:text-slate-200 pl-5">Test Design</div>
          </div>
        </HoverCard>

        {/* 3. Testing Projects Card (Bottom Left) */}
        <HoverCard
          initialAnim={initialAnim}
          whileInViewAnim={whileInViewAnim}
          delay={1.3}
          className="absolute z-20 left-[-12px] sm:left-0 top-[260px] md:top-[280px] pointer-events-auto"
        >
          <div className="glass-panel p-3.5 rounded-2xl border border-purple-500/20 w-[145px] md:w-[185px] shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] dark:hover:shadow-[0_0_25px_rgba(168,85,247,0.25)] transition-all duration-305 backdrop-blur-md">
            <div className="flex items-center space-x-1.5 mb-1.5 border-b border-slate-900 pb-1">
              <span className="p-0.5 rounded bg-purple-500/20 text-purple-400">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </span>
              <span className="text-[8.5px] font-extrabold text-slate-355 uppercase tracking-wider font-heading">Projects</span>
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
                  animate={{ opacity: 1, x: 0, scale: 1 }}
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
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.2 }}
              className="mt-2 pt-1 border-t border-slate-900 flex items-center justify-between text-[7px]"
            >
              <span className="font-bold text-slate-500 uppercase tracking-wider">Prod Ready</span>
              <span className="py-0.5 px-1 rounded-full bg-emerald-500/10 text-emerald-400 font-extrabold border border-emerald-500/20">3 Validated</span>
            </motion.div>
          </div>
        </HoverCard>

        {/* 4. Bugs Reported (Top Right) */}
        <HoverCard
          initialAnim={initialAnim}
          whileInViewAnim={whileInViewAnim}
          delay={1.0}
          className="absolute z-20 right-[-8px] sm:right-4 top-[35px] md:top-[60px] pointer-events-auto"
        >
          <div className="glass-panel p-3 rounded-2xl border border-pink-500/20 w-[120px] md:w-[150px] shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:border-pink-500/40 hover:shadow-[0_0_20px_rgba(244,63,94,0.15)] dark:hover:shadow-[0_0_25px_rgba(244,63,94,0.25)] transition-all duration-300">
            <div className="flex items-center space-x-1.5 mb-1.5">
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
          </div>
        </HoverCard>

        {/* 5. API Testing (Right) */}
        <HoverCard
          initialAnim={initialAnim}
          whileInViewAnim={whileInViewAnim}
          delay={1.1}
          className="absolute z-25 right-[-12px] sm:right-0 top-[165px] md:top-[190px] pointer-events-auto"
        >
          <div className="glass-panel p-3 rounded-2xl border border-blue-500/20 w-[115px] md:w-[140px] shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-left hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] dark:hover:shadow-[0_0_25px_rgba(59,130,246,0.25)] transition-all duration-305">
            <div className="flex items-center space-x-1.5">
              <span className="p-0.5 rounded bg-blue-500/20 text-blue-400">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                </svg>
              </span>
              <span className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider font-heading">API Testing</span>
            </div>
            <div className="text-[10px] font-semibold text-slate-850 dark:text-slate-200 mt-1.5 pl-5 font-heading">Postman</div>
          </div>
        </HoverCard>

        {/* ================= QA RADAR SCANNER (Right Side decoration, positioned under API card) ================= */}
        <motion.div
          initial={initialAnim}
          animate={whileInViewAnim}
          transition={{ type: "spring", stiffness: 90, damping: 12, delay: 1.4 }}
          style={{ transformPerspective: 1200 }}
          className="absolute z-20 right-[4px] sm:right-2 top-[260px] md:top-[280px] pointer-events-auto"
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

        {/* ================= DECORATIVE FLOATING SEARCH & QA ICONS ================= */}
        {/* Magnifying Glass (Search Icon) */}
        <motion.div
          initial={initialAnim}
          animate={whileInViewAnim}
          transition={{ type: "spring", stiffness: 90, damping: 12, delay: 1.5 }}
          className="absolute z-20 left-[-15px] sm:left-2 top-[105px] md:top-[115px] pointer-events-auto magnetic"
          style={{ transformPerspective: 1200 }}
        >
          <motion.div
            animate={{
              y: [0, -6, 0],
              rotate: [0, 360],
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 4px 12px rgba(34, 211, 238, 0.1)",
                "0 4px 20px rgba(34, 211, 238, 0.25)",
                "0 4px 12px rgba(34, 211, 238, 0.1)"
              ]
            }}
            transition={{
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{
              scale: 1.15,
              rotate: 15,
              borderColor: "rgba(34,211,238,0.5)",
              boxShadow: "0 0 25px rgba(34,211,238,0.45)"
            }}
            className="w-9 h-9 rounded-xl glass-panel border border-cyan-500/25 flex items-center justify-center transition-all duration-300"
          >
            <svg className="w-4.5 h-4.5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </motion.div>
        </motion.div>

        {/* QA Check Icon */}
        <motion.div
          initial={initialAnim}
          animate={whileInViewAnim}
          transition={{ type: "spring", stiffness: 90, damping: 12, delay: 1.7 }}
          className="absolute z-20 right-[-15px] sm:right-2 top-[225px] md:top-[235px] pointer-events-auto magnetic"
          style={{ transformPerspective: 1200 }}
        >
          <motion.div
            animate={{
              y: [0, 6, 0],
              rotate: [0, -360],
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 4px 12px rgba(168, 85, 247, 0.1)",
                "0 4px 20px rgba(168, 85, 247, 0.25)",
                "0 4px 12px rgba(168, 85, 247, 0.1)"
              ]
            }}
            transition={{
              y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 24, repeat: Infinity, ease: "linear" },
              scale: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
              boxShadow: { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{
              scale: 1.15,
              rotate: -15,
              borderColor: "rgba(168,85,247,0.5)",
              boxShadow: "0 0 25px rgba(168,85,247,0.45)"
            }}
            className="w-9 h-9 rounded-xl glass-panel border border-purple-500/25 flex items-center justify-center transition-all duration-300"
          >
            <svg className="w-4.5 h-4.5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};
export default HeroVisual;
