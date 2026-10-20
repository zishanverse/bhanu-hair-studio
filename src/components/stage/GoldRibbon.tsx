"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { stageState } from "@/lib/stageState";
import { damp } from "maath/easing";

export function GoldRibbon() {
  const leftHalfRef = useRef<THREE.Mesh>(null);
  const rightHalfRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!leftHalfRef.current || !rightHalfRef.current) return;

    const cut = stageState.ribbon.cut; // 0 to 1
    const opacity = stageState.ribbon.opacity;
    const time = state.clock.getElapsedTime();

    // Gentle wave on uncut ribbon
    const wave = Math.sin(time * 2) * 0.05;

    if (cut > 0.85) {
      // Split and fall away
      const fall = (cut - 0.85) * 6;
      damp(leftHalfRef.current.position, "x", -1.8 - fall * 1.5, 0.25, delta);
      damp(leftHalfRef.current.position, "y", -fall * 2, 0.25, delta);
      damp(leftHalfRef.current.rotation, "z", -fall * 0.8, 0.25, delta);

      damp(rightHalfRef.current.position, "x", 1.8 + fall * 1.5, 0.25, delta);
      damp(rightHalfRef.current.position, "y", -fall * 2, 0.25, delta);
      damp(rightHalfRef.current.rotation, "z", fall * 0.8, 0.25, delta);
    } else {
      // Intact ribbon spanning the scene
      leftHalfRef.current.position.set(-1.2, wave, -0.5);
      leftHalfRef.current.rotation.set(0, 0, 0);

      rightHalfRef.current.position.set(1.2, -wave, -0.5);
      rightHalfRef.current.rotation.set(0, 0, 0);
    }

    const matL = leftHalfRef.current.material as THREE.MeshStandardMaterial;
    const matR = rightHalfRef.current.material as THREE.MeshStandardMaterial;
    if (matL && matR) {
      damp(matL, "opacity", opacity, 0.2, delta);
      damp(matR, "opacity", opacity, 0.2, delta);
    }
  });

  return (
    <group>
      {/* Left Ribbon Half */}
      <mesh ref={leftHalfRef} position={[-1.2, 0, -0.5]}>
        <planeGeometry args={[2.4, 0.45, 12, 4]} />
        <meshPhysicalMaterial
          color="#D6B46B"
          metalness={0.88}
          roughness={0.25}
          clearcoat={0.5}
          side={THREE.DoubleSide}
          transparent
          opacity={0}
        />
      </mesh>

      {/* Right Ribbon Half */}
      <mesh ref={rightHalfRef} position={[1.2, 0, -0.5]}>
        <planeGeometry args={[2.4, 0.45, 12, 4]} />
        <meshPhysicalMaterial
          color="#D6B46B"
          metalness={0.88}
          roughness={0.25}
          clearcoat={0.5}
          side={THREE.DoubleSide}
          transparent
          opacity={0}
        />
      </mesh>
    </group>
  );
}
