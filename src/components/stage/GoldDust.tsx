"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePerfTier } from "@/lib/usePerfTier";

export function GoldDust() {
  const { tier } = usePerfTier();
  const pointsRef = useRef<THREE.Points>(null);

  const count = tier === "high" ? 120 : tier === "mid" ? 50 : 0;

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const scl = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      scl[i] = Math.random() * 0.08 + 0.04;
    }

    return [pos, scl];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current || count === 0) return;
    const time = state.clock.getElapsedTime();
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      // Gentle floating drift
      positions[i * 3 + 1] -= delta * 0.25;
      positions[i * 3 + 0] += Math.sin(time + i) * 0.003;

      // Wrap around bounds
      if (positions[i * 3 + 1] < -8) {
        positions[i * 3 + 1] = 8;
        positions[i * 3 + 0] = (Math.random() - 0.5) * 16;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  if (count === 0) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-scale"
          args={[scales, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#E4C784"
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
