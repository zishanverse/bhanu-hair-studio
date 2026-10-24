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
import { ProceduralSanctum } from "./ProceduralSanctum";
import { stageState } from "@/lib/stageState";
import { useStageScroll } from "@/lib/useStageScroll";
import { usePerfTier } from "@/lib/usePerfTier";
import { damp } from "maath/easing";

function DroneCameraController() {
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    // Subtle mouse sway for organic FPV drone feel
    const mouseX = state.pointer.x * 0.45;
    const mouseY = state.pointer.y * 0.3;

    // 1. Position Damping (X, Y, Z)
    damp(state.camera.position, "x", stageState.camera.x + mouseX, 0.22, delta);
    damp(state.camera.position, "y", stageState.camera.y + mouseY, 0.22, delta);
    damp(state.camera.position, "z", stageState.camera.z, 0.22, delta);

    // 2. Dynamic LookAt Targeting
    targetLookAt.current.set(
      stageState.camera.targetX,
      stageState.camera.targetY,
      stageState.camera.targetZ
    );
    currentLookAt.current.lerp(targetLookAt.current, 0.1);
    state.camera.lookAt(currentLookAt.current);

    // 3. Drone Roll (Z-rotation tilt on banked turns)
    const targetRoll = stageState.camera.roll - mouseX * 0.05;
    state.camera.rotation.z = THREE.MathUtils.lerp(state.camera.rotation.z, targetRoll, 0.1);

    // 4. FOV Zoom Transitions
    const cam = state.camera as THREE.PerspectiveCamera;
    if (cam.fov !== stageState.camera.fov) {
      damp(cam, "fov", stageState.camera.fov, 0.2, delta);
      cam.updateProjectionMatrix();
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
        <DroneCameraController />
        <StudioLights />
        <ProceduralSanctum />
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
