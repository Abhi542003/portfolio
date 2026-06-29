import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Edges, Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useMousePosition } from '../hooks/useMousePosition';

const QACube = ({ mousePos }) => {
  const meshRef = useRef();
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Rotate and float the cube based on time and mouse position
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Rotate cube
    const baseRotationSpeed = hovered ? 0.6 : 0.2;
    if (meshRef.current) {
      meshRef.current.rotation.x = time * baseRotationSpeed;
      meshRef.current.rotation.y = time * (baseRotationSpeed * 0.8);
      meshRef.current.rotation.z = time * 0.05;
    }

    // Parallax tilt from mouse
    if (groupRef.current) {
      const targetX = mousePos.x * 0.5;
      const targetY = mousePos.y * 0.5;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetY, 0.1);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer Orbit Ring 1 - Vertical Cyan */}
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[2.0, 0.008, 4, 24]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.25} />
      </mesh>

      {/* Outer Orbit Ring 2 - Horizontal Purple */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.3, 0.008, 4, 24]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.25} />
      </mesh>

      {/* Outer Orbit Ring 3 - Tilted Green */}
      <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[1.7, 0.006, 4, 20]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0.15} />
      </mesh>

      {/* The Central QA Cube */}
      <group
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <mesh ref={meshRef}>
          <boxGeometry args={[1.6, 1.6, 1.6]} />
          {/* Glass Material */}
          <meshPhysicalMaterial
            roughness={0.1}
            metalness={0.1}
            transmission={0.8}
            ior={1.5}
            thickness={1.0}
            transparent
            opacity={0.3}
            color={hovered ? "#d8b4fe" : "#ffffff"}
          />
          {/* Neon Glowing Edges */}
          <Edges
            threshold={15}
            color={hovered ? "#c084fc" : "#a855f7"}
            thickness={2.5}
          />

          {/* Internal Glow light */}
          <pointLight distance={3} intensity={5} color={hovered ? "#22d3ee" : "#a855f7"} />

          {/* Text labels on each face of the cube */}
          {/* Front Face (+Z) */}
          <Text
            position={[0, 0, 0.81]}
            fontSize={0.4}
            color="#a855f7"
            anchorX="center"
            anchorY="middle"
          >
            Q
          </Text>

          {/* Back Face (-Z) */}
          <Text
            position={[0, 0, -0.81]}
            rotation={[0, Math.PI, 0]}
            fontSize={0.4}
            color="#22d3ee"
            anchorX="center"
            anchorY="middle"
          >
            A
          </Text>

          {/* Top Face (+Y) */}
          <Text
            position={[0, 0.81, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.4}
            color="#34d399"
            anchorX="center"
            anchorY="middle"
          >
            ✓
          </Text>

          {/* Bottom Face (-Y) */}
          <Text
            position={[0, -0.81, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            fontSize={0.4}
            color="#f87171"
            anchorX="center"
            anchorY="middle"
          >
            ✗
          </Text>

          {/* Right Face (+X) */}
          <Text
            position={[0.81, 0, 0]}
            rotation={[0, Math.PI / 2, 0]}
            fontSize={0.2}
            color="#e2e8f0"
            anchorX="center"
            anchorY="middle"
          >
            BUG
          </Text>

          {/* Left Face (-X) */}
          <Text
            position={[-0.81, 0, 0]}
            rotation={[0, -Math.PI / 2, 0]}
            fontSize={0.2}
            color="#fbbf24"
            anchorX="center"
            anchorY="middle"
          >
            TEST
          </Text>
        </mesh>
      </group>
    </group>
  );
};

export const HeroCanvas = () => {
  const mousePos = useMousePosition();
  return (
    <div className="w-full h-[400px] md:h-[550px] relative">
      <Canvas camera={{ position: [0, 0, 5.8], fov: 50 }} gl={{ antialias: true }}>
        {/* Volumetric Soft Lighting */}
        <ambientLight intensity={0.7} />
        <pointLight position={[0, 0, 0]} intensity={2.0} color="#a855f7" distance={8} />
        <pointLight position={[5, 4, 3]} intensity={3.5} color="#22d3ee" distance={10} />
        <pointLight position={[-5, -4, 3]} intensity={2.0} color="#34d399" distance={10} />
        <directionalLight position={[0, 8, 2]} intensity={1.5} color="#ffffff" />
        
        {/* 1. Main QA Cube */}
        <Float speed={2.2} rotationIntensity={0.6} floatIntensity={1.2}>
          <QACube mousePos={mousePos} />
        </Float>

        {/* 2. Floating Orbiting Glass Torus (Left-Top) */}
        <Float speed={1.5} floatIntensity={1.6} rotationIntensity={1.5} position={[-2.3, 1.4, -0.5]}>
          <mesh>
            <torusGeometry args={[0.26, 0.06, 4, 16]} />
            <meshPhysicalMaterial
              roughness={0.1}
              metalness={0.2}
              transmission={0.9}
              transparent
              opacity={0.35}
              color="#22d3ee"
            />
            <Edges threshold={15} color="#22d3ee" thickness={1.5} />
          </mesh>
        </Float>

        {/* 3. Floating Wireframe Octahedron (Right-Bottom) */}
        <Float speed={1.8} floatIntensity={1.4} rotationIntensity={2.0} position={[2.3, -1.1, 0.5]}>
          <mesh>
            <octahedronGeometry args={[0.4]} />
            <meshPhysicalMaterial
              roughness={0.2}
              metalness={0.1}
              transmission={0.8}
              transparent
              opacity={0.25}
              color="#a855f7"
            />
            <Edges threshold={15} color="#a855f7" thickness={2.0} />
          </mesh>
        </Float>

        {/* 4. Floating Small Glass Sphere (Left-Bottom) */}
        <Float speed={1.2} floatIntensity={1.0} rotationIntensity={0.5} position={[-1.8, -1.4, 0.8]}>
          <mesh>
            <sphereGeometry args={[0.22, 12, 12]} />
            <meshPhysicalMaterial
              roughness={0.05}
              metalness={0.3}
              transmission={0.9}
              transparent
              opacity={0.45}
              color="#34d399"
            />
          </mesh>
        </Float>

        {/* 5. Floating Glowing Small Cone (Right-Top) */}
        <Float speed={2.0} floatIntensity={1.8} rotationIntensity={1.8} position={[1.8, 1.6, -0.8]}>
          <mesh rotation={[Math.PI / 4, 0, Math.PI / 4]}>
            <coneGeometry args={[0.18, 0.45, 4]} />
            <meshPhysicalMaterial
              roughness={0.1}
              metalness={0.1}
              transmission={0.8}
              transparent
              opacity={0.3}
              color="#f87171"
            />
            <Edges threshold={15} color="#f87171" thickness={1.5} />
          </mesh>
        </Float>
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>
      {/* Decorative Neon Rings overlay */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border border-purple-500/10 blur-[8px] animate-pulse absolute"></div>
        <div className="w-80 h-80 md:w-[400px] md:h-[400px] rounded-full border border-cyan-500/5 blur-[16px] absolute"></div>
      </div>
    </div>
  );
};
export default HeroCanvas;
