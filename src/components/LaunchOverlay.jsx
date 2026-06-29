import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useLaunch } from '../context/LaunchContext';
import { playIgnition, playExplosion, playGlassCrack, playWhoosh } from '../utils/soundEffects';
import * as THREE from 'three';

// 3D Spacecraft component built procedurally with banking roll rotation and dynamic flames
const Spacecraft = ({ progress }) => {
  const groupRef = useRef();
  
  useFrame(() => {
    if (!groupRef.current) return;
    
    // Custom progress curve: slow start, gradual gain, final boost
    const p = Math.min(1, progress);
    let t = p;
    if (p < 0.3) {
      t = p * 0.3; // Starts slowly
    } else if (p < 0.8) {
      const nt = (p - 0.3) / 0.5;
      t = 0.09 + nt * 0.51; // Gradually gains speed
    } else {
      const nt = (p - 0.8) / 0.2;
      const ease = nt * nt * nt;
      t = 0.6 + ease * 0.4; // Final boost just before impact
    }
    
    // Trajectory coordinates (behind profile -> swoops right -> loops down-left -> accelerates straight to camera)
    const getPathPoint = (val) => {
      if (val < 0.2) {
        const nt = val / 0.2;
        return new THREE.Vector3().lerpVectors(new THREE.Vector3(0, 0.4, -6), new THREE.Vector3(2.5, 1.5, -4), nt);
      } else if (val < 0.45) {
        const nt = (val - 0.2) / 0.25;
        return new THREE.Vector3().lerpVectors(new THREE.Vector3(2.5, 1.5, -4), new THREE.Vector3(-2.0, -1.0, -3), nt);
      } else if (val < 0.72) {
        const nt = (val - 0.45) / 0.27;
        return new THREE.Vector3().lerpVectors(new THREE.Vector3(-2.0, -1.0, -3), new THREE.Vector3(1.6, -0.2, -2.5), nt);
      } else {
        const nt = (val - 0.72) / 0.28;
        return new THREE.Vector3().lerpVectors(new THREE.Vector3(1.6, -0.2, -2.5), new THREE.Vector3(0, 0, 4.3), nt);
      }
    };

    const currentPos = getPathPoint(t);
    const nextPos = getPathPoint(Math.min(1, t + 0.008));
    
    groupRef.current.position.copy(currentPos);
    groupRef.current.lookAt(nextPos);
    
    // Dynamic banking roll rotation proportional to turning velocity
    const deltaX = nextPos.x - currentPos.x;
    groupRef.current.rotation.z = -deltaX * 3.5;
  });

  // Dynamic engine trail scaling
  const flameScale = 0.4 + progress * 1.5;

  return (
    <group ref={groupRef}>
      {/* Fuselage White Hull */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.12, 1.0, 10]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Cockpit Glass Shield - Dark Cyan */}
      <mesh position={[0, 0.04, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshPhysicalMaterial color="#06b6d4" roughness={0.0} metalness={0.2} transmission={0.9} />
      </mesh>

      {/* Left Wing (Swept-back style) */}
      <mesh position={[-0.32, 0, -0.15]} rotation={[0, -Math.PI / 8, -Math.PI / 15]}>
        <boxGeometry args={[0.5, 0.015, 0.25]} />
        <meshStandardMaterial color="#6366f1" roughness={0.3} />
        {/* QA-01 Wing Decal */}
        <Text position={[-0.1, 0.01, 0.05]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} fontSize={0.05} color="#ffffff">
          QA-01
        </Text>
      </mesh>

      {/* Right Wing (Swept-back style) */}
      <mesh position={[0.32, 0, -0.15]} rotation={[0, Math.PI / 8, Math.PI / 15]}>
        <boxGeometry args={[0.5, 0.015, 0.25]} />
        <meshStandardMaterial color="#6366f1" roughness={0.3} />
        {/* TEST ENGINE Wing Decal */}
        <Text position={[0.1, 0.01, 0.05]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} fontSize={0.035} color="#ffffff">
          TEST ENGINE
        </Text>
      </mesh>

      {/* Rear Thrusters & Dynamic Flame Trails */}
      <group position={[0, 0, -0.5]}>
        <mesh position={[-0.06, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.035, 0.04, 0.12, 8]} />
          <meshPhysicalMaterial color="#0c0e14" emissive="#a855f7" emissiveIntensity={3} />
        </mesh>
        <mesh position={[0.06, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.035, 0.04, 0.12, 8]} />
          <meshPhysicalMaterial color="#0c0e14" emissive="#a855f7" emissiveIntensity={3} />
        </mesh>

        {/* Engine flame meshes scaling with speed */}
        <mesh position={[-0.06, 0, -0.22]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.035, 0.25 * flameScale, 8]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.85} />
        </mesh>
        <mesh position={[0.06, 0, -0.22]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.035, 0.25 * flameScale, 8]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.85} />
        </mesh>

        {/* Engine glow point light */}
        <pointLight distance={2} intensity={1.5 + progress * 8.0} color="#22d3ee" />
      </group>
    </group>
  );
};

// Custom Glass Fragment with opacity fade decay physics
const Shard = ({ id, startPos }) => {
  const meshRef = useRef();
  const materialRef = useRef();

  // Randomized angular and linear ejection velocities
  const [velocity] = useState(() => {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 0.12 + 0.05;
    return {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed,
      z: Math.random() * 0.15 + 0.08, // Explode outward toward user
      rx: Math.random() * 0.2 - 0.1,
      ry: Math.random() * 0.2 - 0.1,
      rz: Math.random() * 0.2 - 0.1,
    };
  });

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.position.x += velocity.x;
    meshRef.current.position.y += velocity.y;
    meshRef.current.position.z += velocity.z;
    meshRef.current.rotation.x += velocity.rx * 1.5;
    meshRef.current.rotation.y += velocity.ry * 1.5;
    meshRef.current.rotation.z += velocity.rz;

    // Decelerate shards slightly
    velocity.x *= 0.985;
    velocity.y *= 0.985;

    // Slower fade of opacity instead of shrinking scale
    if (materialRef.current) {
      materialRef.current.opacity = Math.max(0, materialRef.current.opacity - 0.0035);
    }
  });

  // Glass physical properties with reflections
  const color = id % 3 === 0 ? "#a855f7" : id % 3 === 1 ? "#22d3ee" : "#d8b4fe";

  return (
    <mesh ref={meshRef} position={startPos}>
      <coneGeometry args={[Math.random() * 0.18 + 0.08, Math.random() * 0.4 + 0.15, 3]} />
      <meshPhysicalMaterial
        ref={materialRef}
        transmission={0.92}
        ior={1.62}
        roughness={0.02}
        metalness={0.15}
        color={color}
        transparent
        opacity={0.75}
      />
    </mesh>
  );
};

// Scene camera controller wrapper to implement camera zoom, shake and recoil
const SceneWrapper = ({ launchState, progress, children }) => {
  const { camera } = useThree();

  useFrame(() => {
    const width = window.innerWidth;
    let baseZ = 4.8;
    if (width < 768) baseZ = 5.2;
    else if (width < 1024) baseZ = 5.0;

    if (launchState === 'flying' || launchState === 'launching') {
      // Zoom in camera as spaceship gains progress
      camera.position.z = baseZ - progress * 0.8;
      
      // Near impact slight camera jitter
      if (progress > 0.82) {
        const jitter = (progress - 0.82) * 0.12;
        camera.position.x = (Math.random() - 0.5) * jitter;
        camera.position.y = (Math.random() - 0.5) * jitter;
      } else {
        camera.position.x = 0;
        camera.position.y = 0;
      }
    } else if (launchState === 'impact') {
      // Strong screen collision shake
      const shakeRange = 0.24;
      camera.position.x = (Math.random() - 0.5) * shakeRange;
      camera.position.y = (Math.random() - 0.5) * shakeRange;
      camera.position.z = baseZ - 0.8;
    } else if (launchState === 'shatter') {
      // Recoil: jump back slightly and settle smoothly to home view
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, baseZ, 0.05);
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0, 0.1);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0, 0.1);
    }
  });

  return <>{children}</>;
};

export const LaunchOverlay = () => {
  const { launchState, setLaunchState, finishLaunch } = useLaunch();
  const [flightProgress, setFlightProgress] = useState(0);
  const [impactFlash, setImpactFlash] = useState(false);
  const [shards, setShards] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [showCrack, setShowCrack] = useState(false);
  const [crackOpacity, setCrackOpacity] = useState(0.85);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Controls flight and sound triggers
  useEffect(() => {
    if (launchState !== 'launching') return;

    playIgnition();

    const flightTimer = setTimeout(() => {
      setLaunchState('flying');
    }, 150);

    return () => clearTimeout(flightTimer);
  }, [launchState, setLaunchState]);

  // Handles slow flight curve & collision trigger
  useEffect(() => {
    if (launchState !== 'flying') return;

    let start = null;
    const duration = 2800; // Slowed down by 50% for heavy cinematic flight (2.8s)
    let animFrame;
    let whooshTriggered = false;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(1, elapsed / duration);
      setFlightProgress(progress);

      // Trigger whoosh sound sweep at 60% of trajectory
      if (progress > 0.6 && !whooshTriggered) {
        playWhoosh();
        whooshTriggered = true;
      }

      if (progress < 1) {
        animFrame = requestAnimationFrame(step);
      } else {
        // Hit screen impact!
        setLaunchState('impact');
        playExplosion();
        playGlassCrack();
        setImpactFlash(true);
        setShowCrack(true);

        // Generate 100 glass shards with random ejection coordinates
        const shardCount = isMobile ? 55 : 100;
        const pieces = [];
        for (let i = 0; i < shardCount; i++) {
          pieces.push({
            id: i,
            startPos: [
              (Math.random() - 0.5) * 1.6,
              (Math.random() - 0.5) * 1.6,
              4.0 // Eject close to camera
            ]
          });
        }
        setShards(pieces);

        // 1-frame screen flash
        setTimeout(() => {
          setImpactFlash(false);
          setLaunchState('shatter');
        }, 120);
      }
    };

    animFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrame);
  }, [launchState, setLaunchState, isMobile]);

  // Slowly fade out glass crack graphics and complete unmount
  useEffect(() => {
    if (launchState !== 'shatter') return;

    let crackInterval = setInterval(() => {
      setCrackOpacity((prev) => Math.max(0, prev - 0.025));
    }, 45);

    const timer = setTimeout(() => {
      clearInterval(crackInterval);
      setShowCrack(false);
      finishLaunch();
    }, 2400); // Shards fly and fade for 2.4s

    return () => {
      clearInterval(crackInterval);
      clearTimeout(timer);
    };
  }, [launchState, finishLaunch]);

  if (launchState === 'open' || launchState === 'preloader') return null;

  return (
    <div className="fixed inset-0 z-[99998] pointer-events-none select-none">
      
      {/* Space starfield & purple fog background stays visible at ALL times */}
      {(launchState === 'initial' || launchState === 'launching' || launchState === 'flying' || launchState === 'impact' || launchState === 'shatter') && (
        <div className="absolute inset-0 bg-[#030303]/95 z-[-1] transition-all duration-1000">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:35px_35px] pointer-events-none opacity-40"></div>
          <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] rounded-full bg-purple-950/20 blur-[150px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] rounded-full bg-cyan-950/20 blur-[150px] animate-pulse"></div>
        </div>
      )}

      {/* 3D Canvas rendering flight and shards explosion */}
      {(launchState === 'flying' || launchState === 'launching' || launchState === 'impact' || launchState === 'shatter') && (
        <div className="absolute inset-0 z-50 w-full h-full bg-[#030303]/20">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, isMobile ? 1 : 1.5]}
          >
            <ambientLight intensity={0.9} />
            <pointLight position={[5, 5, 5]} intensity={1.5} color="#a855f7" />
            <pointLight position={[-5, -5, 5]} intensity={1.5} color="#22d3ee" />
            
            <SceneWrapper launchState={launchState} progress={flightProgress}>
              {/* Spaceship element */}
              {(launchState === 'flying' || launchState === 'launching') && (
                <Spacecraft progress={flightProgress} />
              )}

              {/* Glass shards */}
              {(launchState === 'shatter' || launchState === 'impact') && (
                <group>
                  {shards.map((piece) => (
                    <Shard key={piece.id} id={piece.id} startPos={piece.startPos} />
                  ))}
                </group>
              )}

              {/* Floating space dust particles */}
              <group>
                {Array.from({ length: 45 }).map((_, i) => {
                  const x = (Math.random() - 0.5) * 10;
                  const y = (Math.random() - 0.5) * 10;
                  const z = (Math.random() - 0.5) * 8 - 4;
                  return (
                    <mesh key={i} position={[x, y, z]}>
                      <sphereGeometry args={[0.02, 6, 6]} />
                      <meshBasicMaterial color="#22d3ee" transparent opacity={0.35} />
                    </mesh>
                  );
                })}
              </group>
            </SceneWrapper>
          </Canvas>
        </div>
      )}

      {/* SVG Crack Overlay radiating from center (50, 50) */}
      {showCrack && (
        <svg 
          style={{ opacity: crackOpacity, transition: 'opacity 0.1s ease-out' }}
          className="absolute inset-0 w-full h-full pointer-events-none z-[999]" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          {/* Main web cracks */}
          <path d="M 50 50 L 52 36 L 68 25 M 52 36 L 40 30 L 18 25 M 50 50 L 45 66 L 30 80 M 45 66 L 62 74 L 82 88 M 50 50 L 64 48 L 80 52 M 50 50 L 34 48 L 15 56 M 50 50 L 55 60 L 46 72 M 52 36 L 60 32 M 40 30 L 44 18" stroke="#e2e8f0" strokeWidth="0.8" fill="none" />
          <path d="M 50 50 L 46 40 L 30 35 M 50 50 L 56 54 L 70 58 M 50 50 L 54 60 L 68 68 M 50 50 L 40 54 L 32 64 M 50 50 L 56 44 L 64 36" stroke="#a855f7" strokeWidth="0.5" fill="none" />
          {/* Concentric crack loops */}
          <path d="M 45 42 L 53 38 L 58 48 L 52 54 L 43 54 L 44 43 L 45 42" stroke="#22d3ee" strokeWidth="0.4" fill="none" />
          <path d="M 38 32 L 52 28 L 62 46 L 52 62 L 35 60 L 32 40 L 38 32" stroke="#6366f1" strokeWidth="0.3" fill="none" />
        </svg>
      )}

      {/* Screen flash frame */}
      {impactFlash && (
        <div className="fixed inset-0 z-[999999] bg-white animate-[flash-white_0.06s_ease-out_forwards] pointer-events-none">
          <div className="absolute inset-0 bg-purple-600/90 animate-[flash-purple_0.08s_0.04s_ease-out_forwards]" />
        </div>
      )}
    </div>
  );
};

export default LaunchOverlay;
