"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePerfTier } from "@/lib/usePerfTier";

/**
 * ProceduralSanctum.tsx (Quiet Luxury / Minimalist Edition)
 * Replaces dense wireframe clutter with an expansive, zoomed-out,
 * serene architectural sanctum: monumental soft horizon rings in deep space,
 * deep velvet floor reflection, and delicate ambient particles.
 */
export function ProceduralSanctum() {
  const { tier } = usePerfTier();
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  // Sparse, subtle ambient golden dust
  const emberCount = tier === "high" ? 45 : 20;
  const [emberPositions, emberScales] = useMemo(() => {
    const pos = new Float32Array(emberCount * 3);
    const scl = new Float32Array(emberCount);
    for (let i = 0; i < emberCount; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = -Math.random() * 25;
      scl[i] = Math.random() * 0.04 + 0.02;
    }
    return [pos, scl];
  }, [emberCount]);

  const embersRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Very slow, majestic rotation for distant horizon rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = time * 0.02;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -time * 0.015;
    }

    // Gentle vertical particle drift
    if (embersRef.current && emberCount > 0) {
      const posArr = embersRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < emberCount; i++) {
        posArr[i * 3 + 1] += delta * 0.12;
        if (posArr[i * 3 + 1] > 8) {
          posArr[i * 3 + 1] = -6;
          posArr[i * 3 + 0] = (Math.random() - 0.5) * 20;
        }
      }
      embersRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Deep Obsidian Atmospheric Fog */}
      <fogExp2 attach="fog" args={["#030304", 0.022]} />

      {/* 2. Distant Monumental Architectural Horizon Arcs */}
      <group position={[0, -0.5, -20]}>
        {/* Outer Grand Slender Champagne Ring */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[11, 0.035, 16, 96]} />
          <meshBasicMaterial
            color="#C8A252"
            transparent
            opacity={0.35}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Inner Delicate Horizon Halo */}
        <mesh ref={ring2Ref} position={[0, 0, -8]}>
          <torusGeometry args={[16, 0.025, 16, 96]} />
          <meshBasicMaterial
            color="#E6CA85"
            transparent
            opacity={0.2}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* 3. Pure Velvet Reflective Floor Plane (No Grid Lines, Just Smooth Specular Sheen) */}
      <mesh position={[0, -5.2, -12]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[36, 60]} />
        <meshStandardMaterial
          color="#060608"
          metalness={0.94}
          roughness={0.35}
        />
      </mesh>

      {/* 4. Subtle, Non-Distracting Golden Embers */}
      {emberCount > 0 && (
        <points ref={embersRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[emberPositions, 3]}
            />
            <bufferAttribute
              attach="attributes-scale"
              args={[emberScales, 1]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.05}
            color="#DFBF7A"
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      )}
    </group>
  );
}

export default ProceduralSanctum;
