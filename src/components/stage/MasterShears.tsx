"use client";

import React, { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { stageState } from "@/lib/stageState";
import { damp, dampE } from "maath/easing";

export function MasterShears() {
  const { pointer } = useThree();
  const rootGroupRef = useRef<THREE.Group>(null);
  const fingerPivotRef = useRef<THREE.Group>(null);
  const thumbPivotRef = useRef<THREE.Group>(null);
  const pivotAssemblyRef = useRef<THREE.Group>(null);

  // Individual explode parts
  const fingerMeshRef = useRef<THREE.Mesh>(null);
  const thumbMeshRef = useRef<THREE.Mesh>(null);
  const bumperMeshRef = useRef<THREE.Mesh>(null);
  const dialOuterRef = useRef<THREE.Mesh>(null);
  const dialBevelRef = useRef<THREE.Mesh>(null);
  const jewelMeshRef = useRef<THREE.Mesh>(null);
  const rearNutRef = useRef<THREE.Mesh>(null);
  const rearHexRef = useRef<THREE.Mesh>(null);

  // 1. High-Precision Extrusion Settings
  const extrudeSettings: THREE.ExtrudeGeometryOptions = useMemo(
    () => ({
      depth: 0.065,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 1,
      bevelSize: 0.026,
      bevelThickness: 0.026,
    }),
    []
  );

  // 2. Anatomical 2D Shears Paths
  const { fingerGeo, thumbGeo } = useMemo(() => {
    // Finger Half (Still Blade with Pinky Tang)
    const s1 = new THREE.Shape();
    s1.moveTo(0.02, 0.35);
    s1.quadraticCurveTo(0.04, 1.8, 0.0, 3.65); // Needle-sharp Japanese tip
    s1.quadraticCurveTo(-0.06, 3.45, -0.12, 3.1);
    s1.quadraticCurveTo(-0.28, 1.8, -0.24, 0.5);
    s1.lineTo(-0.32, 0.15);
    s1.quadraticCurveTo(-0.36, -0.2, -0.28, -0.45);
    s1.quadraticCurveTo(-0.22, -1.0, -0.32, -1.5);
    s1.quadraticCurveTo(-0.38, -1.75, -0.52, -1.88);
    // Pinky Tang
    s1.quadraticCurveTo(-0.78, -1.98, -1.02, -2.18);
    s1.quadraticCurveTo(-1.38, -2.42, -1.58, -2.2);
    s1.quadraticCurveTo(-1.48, -2.05, -1.28, -2.08);
    s1.quadraticCurveTo(-0.95, -2.12, -0.82, -2.32);
    // Loop
    s1.quadraticCurveTo(-0.88, -2.75, -0.68, -3.15);
    s1.quadraticCurveTo(-0.38, -3.42, -0.12, -3.05);
    s1.quadraticCurveTo(0.05, -2.68, -0.08, -2.18);
    s1.quadraticCurveTo(-0.14, -1.55, -0.08, -0.95);
    s1.quadraticCurveTo(-0.04, -0.35, 0.0, 0.0);
    s1.lineTo(0.02, 0.35);

    const hole1 = new THREE.Path();
    hole1.moveTo(-0.46, -2.32);
    hole1.quadraticCurveTo(-0.66, -2.32, -0.66, -2.66);
    hole1.quadraticCurveTo(-0.66, -2.98, -0.46, -2.98);
    hole1.quadraticCurveTo(-0.26, -2.98, -0.26, -2.66);
    hole1.quadraticCurveTo(-0.26, -2.32, -0.46, -2.32);
    s1.holes.push(hole1);

    // Thumb Half (Moving Blade with Crane Shank)
    const s2 = new THREE.Shape();
    s2.moveTo(-0.02, 0.35);
    s2.quadraticCurveTo(-0.04, 1.8, 0.0, 3.65);
    s2.quadraticCurveTo(0.06, 3.45, 0.12, 3.1);
    s2.quadraticCurveTo(0.28, 1.8, 0.24, 0.5);
    s2.lineTo(0.32, 0.15);
    s2.quadraticCurveTo(0.36, -0.2, 0.28, -0.45);
    s2.quadraticCurveTo(0.24, -0.95, 0.38, -1.45);
    s2.quadraticCurveTo(0.5, -1.72, 0.72, -1.88);
    s2.quadraticCurveTo(0.98, -2.15, 0.9, -2.75);
    s2.quadraticCurveTo(0.76, -3.18, 0.42, -2.98);
    s2.quadraticCurveTo(0.18, -2.75, 0.22, -2.18);
    s2.quadraticCurveTo(0.16, -1.5, 0.08, -0.95);
    s2.quadraticCurveTo(0.04, -0.35, 0.0, 0.0);
    s2.lineTo(-0.02, 0.35);

    const hole2 = new THREE.Path();
    hole2.moveTo(0.56, -2.28);
    hole2.quadraticCurveTo(0.38, -2.28, 0.38, -2.58);
    hole2.quadraticCurveTo(0.38, -2.88, 0.56, -2.88);
    hole2.quadraticCurveTo(0.74, -2.88, 0.74, -2.58);
    hole2.quadraticCurveTo(0.74, -2.28, 0.56, -2.28);
    s2.holes.push(hole2);

    const geo1 = new THREE.ExtrudeGeometry(s1, extrudeSettings);
    geo1.computeVertexNormals();

    const geo2 = new THREE.ExtrudeGeometry(s2, extrudeSettings);
    geo2.computeVertexNormals();

    return { fingerGeo: geo1, thumbGeo: geo2 };
  }, [extrudeSettings]);

  // 3. Materials - Honed Japanese Hitachi 440C Mirror Polish
  const steelMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#F8F9FA"),
        metalness: 0.99,
        roughness: 0.08,
        clearcoat: 0.95,
        clearcoatRoughness: 0.04,
        reflectivity: 1.0,
        envMapIntensity: 2.2,
      }),
    []
  );

  const goldMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#D6B46B"),
        metalness: 0.96,
        roughness: 0.18,
        clearcoat: 0.4,
        envMapIntensity: 1.8,
      }),
    []
  );

  const jewelMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#08080B"),
        metalness: 0.85,
        roughness: 0.04,
        clearcoat: 0.9,
        envMapIntensity: 1.5,
      }),
    []
  );

  const rubberMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#18181B"),
        roughness: 0.92,
        metalness: 0.05,
      }),
    []
  );

  // 4. Per-Frame Motion & Interaction Logic
  useFrame((state, delta) => {
    if (!rootGroupRef.current) return;

    const time = state.clock.getElapsedTime();
    const timeSinceSnip = (performance.now() - stageState.lastSnipTime) * 0.001;

    // Pointer Parallax (subtle: max 6 degrees = ~0.1 rad)
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const targetParallaxX = isTouch ? Math.sin(time * 0.8) * 0.06 : pointer.y * 0.12;
    const targetParallaxY = isTouch ? Math.cos(time * 0.7) * 0.08 : pointer.x * 0.14;

    // Damp root position, rotation, and scale toward stageState
    damp(rootGroupRef.current.position, "x", stageState.shears.x, 0.2, delta);
    damp(rootGroupRef.current.position, "y", stageState.shears.y, 0.2, delta);
    damp(rootGroupRef.current.position, "z", stageState.shears.z, 0.2, delta);

    dampE(
      rootGroupRef.current.rotation,
      [
        stageState.shears.rx - targetParallaxX,
        stageState.shears.ry + targetParallaxY,
        stageState.shears.rz,
      ],
      0.2,
      delta
    );

    const s = stageState.shears.scale;
    damp(rootGroupRef.current.scale, "x", s, 0.2, delta);
    damp(rootGroupRef.current.scale, "y", s, 0.2, delta);
    damp(rootGroupRef.current.scale, "z", s, 0.2, delta);

    // Blade Snip Choreography
    let targetAngle = 0.02;
    if (timeSinceSnip < 0.45) {
      // Snappy double-snip action
      const p = timeSinceSnip / 0.45;
      const wave = Math.sin(p * Math.PI * 2.5);
      targetAngle = Math.abs(wave) * 0.36;
      stageState.glint.intensity = 2.5 + Math.sin(p * Math.PI) * 4.0;
    } else {
      // Idle breathing + scroll-driven opening
      const breathing = Math.max(0, Math.sin(time * 1.6)) * 0.08;
      targetAngle = stageState.shears.bladeOpen + breathing;
    }

    if (fingerPivotRef.current && thumbPivotRef.current) {
      damp(fingerPivotRef.current.rotation, "z", -targetAngle * 0.6, 0.15, delta);
      damp(thumbPivotRef.current.rotation, "z", targetAngle * 0.6, 0.15, delta);
    }

    // Exploded View Assembly Translation
    const exp = stageState.shears.explode;
    if (fingerMeshRef.current) {
      damp(fingerMeshRef.current.position, "z", 0.015 - exp * 0.4, 0.2, delta);
    }
    if (thumbMeshRef.current) {
      damp(thumbMeshRef.current.position, "z", -0.075 - exp * 0.75, 0.2, delta);
    }
    if (dialOuterRef.current) {
      damp(dialOuterRef.current.position, "z", 0.08 + exp * 0.45, 0.2, delta);
    }
    if (dialBevelRef.current) {
      damp(dialBevelRef.current.position, "z", 0.13 + exp * 0.85, 0.2, delta);
    }
    if (jewelMeshRef.current) {
      damp(jewelMeshRef.current.position, "z", 0.16 + exp * 1.3, 0.2, delta);
    }
    if (rearNutRef.current) {
      damp(rearNutRef.current.position, "z", -0.09 - exp * 0.9, 0.2, delta);
    }
    if (rearHexRef.current) {
      damp(rearHexRef.current.position, "z", -0.095 - exp * 1.25, 0.2, delta);
    }
    if (bumperMeshRef.current) {
      damp(bumperMeshRef.current.position, "x", -0.1 - exp * 0.3, 0.2, delta);
      damp(bumperMeshRef.current.position, "y", -2.42 - exp * 0.25, 0.2, delta);
    }
  });

  return (
    <group ref={rootGroupRef}>
      {/* Finger Half Assembly */}
      <group ref={fingerPivotRef}>
        <mesh ref={fingerMeshRef} geometry={fingerGeo} material={steelMat} position={[0, 0, 0.015]} />
        <mesh
          ref={bumperMeshRef}
          material={rubberMat}
          position={[-0.1, -2.42, 0.04]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.08, 0.08, 0.16, 24]} />
        </mesh>
      </group>

      {/* Thumb Half Assembly */}
      <group ref={thumbPivotRef}>
        <mesh ref={thumbMeshRef} geometry={thumbGeo} material={steelMat} position={[0, 0, -0.075]} />
      </group>

      {/* Precision Tension Dial Assembly */}
      <group ref={pivotAssemblyRef} position={[0, 0.22, 0]}>
        {/* Outer Notched Dial */}
        <mesh ref={dialOuterRef} material={goldMat} position={[0, 0, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.36, 0.38, 0.08, 36]} />
        </mesh>

        {/* Stepped Bevel Ring */}
        <mesh ref={dialBevelRef} material={goldMat} position={[0, 0, 0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.24, 0.32, 0.06, 32]} />
        </mesh>

        {/* Polished Obsidian Jewel */}
        <mesh ref={jewelMeshRef} material={jewelMat} position={[0, 0, 0.16]} scale={[1, 1, 0.5]}>
          <sphereGeometry args={[0.14, 24, 24]} />
        </mesh>

        {/* Spring Ring */}
        <mesh material={goldMat} position={[0, 0, 0.042]}>
          <ringGeometry args={[0.18, 0.34, 32]} />
        </mesh>

        {/* Rear Countersunk Nut */}
        <mesh ref={rearNutRef} material={goldMat} position={[0, 0, -0.09]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.07, 32]} />
        </mesh>

        {/* Rear Hex Socket */}
        <mesh ref={rearHexRef} material={jewelMat} position={[0, 0, -0.095]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.09, 6]} />
        </mesh>
      </group>
    </group>
  );
}
