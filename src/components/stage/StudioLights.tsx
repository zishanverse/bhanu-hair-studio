"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { stageState } from "@/lib/stageState";
import { damp } from "maath/easing";

export function StudioLights() {
  const glintLightRef = useRef<THREE.PointLight>(null);

  useFrame((_, delta) => {
    if (glintLightRef.current) {
      damp(glintLightRef.current.position, "x", stageState.glint.x, 0.25, delta);
      damp(glintLightRef.current.position, "y", stageState.glint.y, 0.25, delta);
      damp(glintLightRef.current.position, "z", stageState.glint.z, 0.25, delta);
      damp(glintLightRef.current, "intensity", stageState.glint.intensity, 0.2, delta);
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} color="#FFFFFF" />

      {/* Dynamic Moving Glint Light for Japanese steel specular sweep */}
      <pointLight
        ref={glintLightRef}
        position={[0, 4, 3]}
        color="#F8FAFC"
        intensity={2.5}
        distance={18}
        decay={2}
      />

      {/* Procedural High-End Environment with Local Lightformers (Zero CDN fetches) */}
      <Environment resolution={256}>
        {/* Warm Master Key Lightformer */}
        <Lightformer
          form="rect"
          intensity={4.0}
          color="#FFFAED"
          scale={[10, 5, 1]}
          position={[5, 6, 6]}
          target={[0, 0, 0]}
        />

        {/* Rich Champagne Gold Rim Softbox */}
        <Lightformer
          form="ring"
          intensity={3.5}
          color="#E4C784"
          scale={[8, 8, 1]}
          position={[-6, -4, 4]}
          target={[0, 0, 0]}
        />

        {/* Precision Honed Edge Glint Strip */}
        <Lightformer
          form="rect"
          intensity={5.0}
          color="#DBEAFE"
          scale={[1, 14, 1]}
          position={[0, 8, -2]}
          target={[0, 0, 0]}
        />

        {/* Deep Obsidian Ground Fill */}
        <Lightformer
          form="circle"
          intensity={1.2}
          color="#0E0E12"
          scale={[12, 12, 1]}
          position={[0, -10, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </Environment>
    </>
  );
}
