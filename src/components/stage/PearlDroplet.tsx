"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { stageState } from "@/lib/stageState";
import { damp } from "maath/easing";

export function PearlDroplet() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const opacity = stageState.pearl.opacity;
    if (opacity <= 0.01) {
      meshRef.current.visible = false;
      return;
    }
    meshRef.current.visible = true;

    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = stageState.pearl.y + Math.sin(time * 1.5) * 0.12;

    const mat = meshRef.current.material as THREE.MeshPhysicalMaterial;
    if (mat) {
      damp(mat, "opacity", opacity, 0.25, delta);
    }
  });

  return (
    <mesh ref={meshRef} position={[2.2, 0, 0]} scale={[0.45, 0.55, 0.45]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhysicalMaterial
        color="#F8F6F2"
        roughness={0.1}
        metalness={0.15}
        clearcoat={1.0}
        clearcoatRoughness={0.05}
        transmission={0.6}
        ior={1.45}
        transparent
        opacity={0}
      />
    </mesh>
  );
}
