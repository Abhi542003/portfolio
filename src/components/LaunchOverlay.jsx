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

// Creates a flat irregular glass triangle shard
const makeShardGeometry = () => {
  const geo = new THREE.BufferGeometry();

  // 3–5 sided irregular flat polygon (all in XY plane, thin on Z)
  const sides = Math.floor(Math.random() * 3) + 3; // 3,4 or 5 sides
  const positions = [];
  const normals = [];
  const uvs = [];

  // Center vertex + ring of outer vertices = fan triangles
  const rBase = Math.random() * 0.55 + 0.3;  // large: 0.3 to 0.85 units
  const verts = [[0, 0, 0]];
  for (let i = 0; i <= sides; i++) {
    const angle = (i / sides) * Math.PI * 2 + (Math.random() - 0.5) * 0.7;
    const r = rBase * (0.65 + Math.random() * 0.6);
    verts.push([Math.cos(angle) * r, Math.sin(angle) * r, 0]);
  }

  for (let i = 1; i < verts.length - 1; i++) {
    // Front face
    positions.push(...verts[0], ...verts[i], ...verts[i + 1]);
    normals.push(0, 0, 1,  0, 0, 1,  0, 0, 1);
    uvs.push(0.5, 0.5,  0, 1,  1, 1);
    // Back face (flip winding for double sided)
    positions.push(...verts[0], ...verts[i + 1], ...verts[i]);
    normals.push(0, 0, -1,  0, 0, -1,  0, 0, -1);
    uvs.push(0.5, 0.5,  1, 1,  0, 1);
  }

  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('normal',   new THREE.Float32BufferAttribute(normals, 3));
  geo.setAttribute('uv',       new THREE.Float32BufferAttribute(uvs, 2));
  return geo;
};

// Flat triangular glass shard with crystal-clear material
const Shard = ({ id, startPos }) => {
  const meshRef = useRef();
  const materialRef = useRef();

  const [geo] = useState(() => makeShardGeometry());

  // Randomized angular and linear ejection velocities — strong outward burst
  const [velocity] = useState(() => {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 0.22 + 0.07;
    const zSpeed = Math.random() * 0.28 + 0.06; // Explode hard toward viewer
    return {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed,
      z: zSpeed,
      rx: (Math.random() - 0.5) * 0.14,
      ry: (Math.random() - 0.5) * 0.14,
      rz: (Math.random() - 0.5) * 0.08,
    };
  });

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.position.x += velocity.x;
    meshRef.current.position.y += velocity.y;
    meshRef.current.position.z += velocity.z;
    meshRef.current.rotation.x += velocity.rx;
    meshRef.current.rotation.y += velocity.ry;
    meshRef.current.rotation.z += velocity.rz;

    // Gravity pull & deceleration
    velocity.y -= 0.0012;
    velocity.x *= 0.988;
    velocity.z *= 0.975;

    // Fade opacity gradually — keep visible longer
    if (materialRef.current) {
      materialRef.current.opacity = Math.max(0, materialRef.current.opacity - 0.0022);
    }
  });

  // Crystal-clear glass look — very slight tint, mostly transparent
  const tint = id % 5 === 0 ? '#cce4ff'
    : id % 5 === 1 ? '#e8d8ff'
    : id % 5 === 2 ? '#ddf5ff'
    : id % 5 === 3 ? '#ffffff'
    : '#d4c8ff';

  return (
    <mesh ref={meshRef} position={startPos} geometry={geo}>
      <meshPhysicalMaterial
        ref={materialRef}
        color={tint}
        transmission={0.96}
        ior={1.72}
        thickness={0.04}
        roughness={0.04}
        metalness={0.08}
        reflectivity={1.0}
        transparent
        opacity={0.88}
        side={THREE.DoubleSide}
        envMapIntensity={2.5}
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

        // Generate 130 flat glass shards spread across full screen
        const shardCount = isMobile ? 65 : 130;
        const pieces = [];
        for (let i = 0; i < shardCount; i++) {
          // Spread from center outward in a radial pattern + random scatter
          const angle = (i / shardCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
          const dist = Math.random() * 2.2; // 0 to 2.2 units from center
          pieces.push({
            id: i,
            startPos: [
              Math.cos(angle) * dist * 0.9 + (Math.random() - 0.5) * 0.4,
              Math.sin(angle) * dist * 0.7 + (Math.random() - 0.5) * 0.4,
              3.8 + Math.random() * 0.4 // Eject from near camera plane
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
      
      {/* Ambient glow ALWAYS visible — no black, just purple/cyan fog */}
      {(launchState === 'initial' || launchState === 'launching' || launchState === 'flying' || launchState === 'impact' || launchState === 'shatter') && (
        <div className="absolute inset-0 z-[-1] transition-all duration-1000" style={{ backdropFilter: launchState === 'flying' || launchState === 'launching' ? 'blur(2px)' : 'none' }}>
          {/* Grid scanlines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:35px_35px] pointer-events-none opacity-50"></div>
          {/* Purple and cyan fog orbs — bright enough to be clearly visible */}
          <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-purple-600/20 blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/15 blur-[120px] animate-pulse" style={{animationDelay:'1.2s'}}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-700/10 blur-[180px]"></div>
        </div>
      )}

      {/* 3D Canvas rendering flight and shards — transparent background */}
      {(launchState === 'flying' || launchState === 'launching' || launchState === 'impact' || launchState === 'shatter') && (
        <div className="absolute inset-0 z-50 w-full h-full">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, isMobile ? 1 : 1.5]}
          >
            <ambientLight intensity={1.4} />
            <pointLight position={[0, 3, 3]} intensity={4.0} color="#ffffff" />
            <pointLight position={[5, 5, 5]} intensity={3.0} color="#a855f7" />
            <pointLight position={[-5, -5, 5]} intensity={3.0} color="#22d3ee" />
            <pointLight position={[0, 0, 2]} intensity={2.5} color="#8b5cf6" />
            
            <SceneWrapper launchState={launchState} progress={flightProgress}>
              {/* Spaceship element */}
              {(launchState === 'flying' || launchState === 'launching') && (
                <Spacecraft progress={flightProgress} />
              )}

              {/* Glass shards — with bright impact light at center */}
              {(launchState === 'shatter' || launchState === 'impact') && (
                <group>
                  {/* Bright white-purple impact glow at impact point */}
                  <pointLight position={[0, 0, 3.5]} intensity={6} color="#ffffff" distance={8} />
                  <pointLight position={[0, 0, 3.5]} intensity={4} color="#a855f7" distance={6} />
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
