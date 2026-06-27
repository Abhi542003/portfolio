import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Particles = ({ count = 400 }) => {
  const pointsRef = useRef();

  // Create random positions and movement characteristics
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sp = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30; // X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30; // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15; // Z
      sp[i] = Math.random() * 0.01 + 0.003;
    }
    return [pos, sp];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime() * 0.02;
    // Rotate the particle system as a single GPU mesh
    pointsRef.current.rotation.y = time;
    pointsRef.current.rotation.x = time * 0.3;
    pointsRef.current.rotation.z = time * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#a855f7"
        size={0.05}
        sizeAttenuation={true}
        transparent
        opacity={0.35}
        depthWrite={false}
      />
    </points>
  );
};

export const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 -z-5 pointer-events-none w-full h-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ antialias: true }}>
        <ambientLight intensity={0.5} />
        <Particles />
      </Canvas>
    </div>
  );
};
export default ParticleBackground;
