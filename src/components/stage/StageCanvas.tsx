"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { StudioLights } from "./StudioLights";
import { MasterShears } from "./MasterShears";
import { GoldDust } from "./GoldDust";
import { HairStrands } from "./HairStrands";
import { GoldRibbon } from "./GoldRibbon";
import { PearlDroplet } from "./PearlDroplet";
import { stageState } from "@/lib/stageState";
import { useStageScroll } from "@/lib/useStageScroll";
import { usePerfTier } from "@/lib/usePerfTier";
import { damp } from "maath/easing";

function CameraController() {
  useFrame((state, delta) => {
    damp(state.camera.position, "y", stageState.camera.y, 0.2, delta);
    damp(state.camera.position, "z", stageState.camera.z, 0.2, delta);
    if ((state.camera as THREE.PerspectiveCamera).fov !== stageState.camera.fov) {
      damp(state.camera as THREE.PerspectiveCamera, "fov", stageState.camera.fov, 0.2, delta);
      state.camera.updateProjectionMatrix();
    }
  });
  return null;
}

export function StageCanvas() {
  useStageScroll();
  const { tier, isTouch, isReducedMotion } = usePerfTier();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dpr, setDpr] = useState<[number, number]>([1, 1.75]);

  useEffect(() => {
    if (isTouch || tier === "low") {
      setDpr([1, 1.25]);
    } else {
      setDpr([1, 1.75]);
    }
  }, [isTouch, tier]);

  // Sync container opacity with stageState.canvasOpacity
  useEffect(() => {
    let animId: number;
    const checkOpacity = () => {
      if (containerRef.current) {
        containerRef.current.style.opacity = `${stageState.canvasOpacity}`;
        // Hide completely from rendering when opacity is zero
        containerRef.current.style.visibility = stageState.canvasOpacity <= 0.01 ? "hidden" : "visible";
      }
      animId = requestAnimationFrame(checkOpacity);
    };
    animId = requestAnimationFrame(checkOpacity);
    return () => cancelAnimationFrame(animId);
  }, []);

  // In low-tier devices with reduced motion, skip 3D canvas entirely for performance
  if (isReducedMotion) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-500 ease-out"
      aria-hidden="true"
    >
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 8.5], fov: 38, near: 0.1, far: 100 }}
        gl={{
          antialias: tier !== "low",
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.25,
        }}
      >
        <CameraController />
        <StudioLights />
        <MasterShears />
        <GoldDust />
        <HairStrands />
        <GoldRibbon />
        <PearlDroplet />
      </Canvas>
    </div>
  );
}

export default StageCanvas;
