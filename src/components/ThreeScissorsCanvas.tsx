"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface ThreeScissorsCanvasProps {
  className?: string;
}

export function ThreeScissorsCanvas({ className = "" }: ThreeScissorsCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8.4);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35;
      mount.appendChild(renderer.domElement);
    } catch (e) {
      setIsSupported(false);
      return;
    }

    // 2. High-End Studio Lighting for Polished Japanese Steel Reflections
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    // Warm Key Light (Highlighting blade edges)
    const keyLight = new THREE.DirectionalLight(0xfffaed, 3.2);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    // Gold Champagne Rim Light
    const goldRim = new THREE.DirectionalLight(0xc5a477, 3.8);
    goldRim.position.set(-5, -4, 4);
    scene.add(goldRim);

    // Cool Specular Blade Glint Light
    const glintLight = new THREE.DirectionalLight(0xdbeafe, 2.2);
    glintLight.position.set(0, 7, -3);
    scene.add(glintLight);

    // Bottom Fill Light
    const fillLight = new THREE.DirectionalLight(0xffffff, 1.0);
    fillLight.position.set(0, -6, 4);
    scene.add(fillLight);

    // 3. Materials
    // Mirror Polished 440C Japanese Hitachi Steel Material
    const steelMaterial = new THREE.MeshStandardMaterial({
      color: 0xeeeeee,
      metalness: 0.98,
      roughness: 0.08,
      envMapIntensity: 1.5,
    });

    // Satin Cutting Edge Material (Honed Hamaguri-ba line)
    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.94,
      roughness: 0.16,
    });

    // Luxury Gold Jewel Pivot Screw Material
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.96,
      roughness: 0.18,
    });

    // Deep Obsidian Jewel Center
    const jewelMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a0a0c,
      metalness: 0.9,
      roughness: 0.12,
    });

    // Soft Rubber Stopper Material
    const rubberMaterial = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.05,
      roughness: 0.92,
    });

    // 4. Master Barber Shear 2D Path Definitions (Extruded into PBR Solids)
    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.065,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.024,
      bevelThickness: 0.024,
    };

    // Half A: Finger Ring Half with Integrated Pinky Tang Rest (Still Blade)
    const createFingerHalfShape = () => {
      const s = new THREE.Shape();
      // Inner Cutting Edge
      s.moveTo(0.02, 0.35);
      s.quadraticCurveTo(0.04, 1.8, 0.0, 3.6); // Sharp needle point tip

      // Outer Spine / Clamshell Convex Ridge
      s.quadraticCurveTo(-0.06, 3.45, -0.12, 3.1);
      s.quadraticCurveTo(-0.28, 1.8, -0.24, 0.5);
      s.lineTo(-0.32, 0.15); // Pivot boss outer flare
      s.quadraticCurveTo(-0.36, -0.2, -0.28, -0.45);

      // Ergonomic Neck / Shank to Finger Ring
      s.quadraticCurveTo(-0.22, -1.0, -0.32, -1.5);
      s.quadraticCurveTo(-0.38, -1.75, -0.52, -1.88);

      // Curved Pinky Tang Finger Rest
      s.quadraticCurveTo(-0.78, -1.98, -1.02, -2.18);
      s.quadraticCurveTo(-1.38, -2.42, -1.58, -2.2); // Tang sculpted tip
      s.quadraticCurveTo(-1.48, -2.05, -1.28, -2.08);
      s.quadraticCurveTo(-0.95, -2.12, -0.82, -2.32);

      // Outer Perimeter of Finger Loop
      s.quadraticCurveTo(-0.88, -2.75, -0.68, -3.15);
      s.quadraticCurveTo(-0.38, -3.42, -0.12, -3.05);
      s.quadraticCurveTo(0.05, -2.68, -0.08, -2.18);

      // Return Up Inside Shank
      s.quadraticCurveTo(-0.14, -1.55, -0.08, -0.95);
      s.quadraticCurveTo(-0.04, -0.35, 0.0, 0.0);
      s.lineTo(0.02, 0.35);

      // Anatomical Finger Ring Hole
      const hole = new THREE.Path();
      hole.moveTo(-0.46, -2.32);
      hole.quadraticCurveTo(-0.66, -2.32, -0.66, -2.66);
      hole.quadraticCurveTo(-0.66, -2.98, -0.46, -2.98);
      hole.quadraticCurveTo(-0.26, -2.98, -0.26, -2.66);
      hole.quadraticCurveTo(-0.26, -2.32, -0.46, -2.32);
      s.holes.push(hole);

      return s;
    };

    // Half B: Thumb Ring Half with Crane Handle (Moving Blade)
    const createThumbHalfShape = () => {
      const s = new THREE.Shape();
      // Inner Cutting Edge
      s.moveTo(-0.02, 0.35);
      s.quadraticCurveTo(-0.04, 1.8, 0.0, 3.6); // Tip

      // Outer Spine / Clamshell Ridge
      s.quadraticCurveTo(0.06, 3.45, 0.12, 3.1);
      s.quadraticCurveTo(0.28, 1.8, 0.24, 0.5);
      s.lineTo(0.32, 0.15); // Pivot boss outer flare
      s.quadraticCurveTo(0.36, -0.2, 0.28, -0.45);

      // Ergonomic Crane Handle Shank
      s.quadraticCurveTo(0.24, -0.95, 0.38, -1.45);
      s.quadraticCurveTo(0.5, -1.72, 0.72, -1.88);

      // Outer Perimeter of Thumb Loop
      s.quadraticCurveTo(0.98, -2.15, 0.9, -2.75);
      s.quadraticCurveTo(0.76, -3.18, 0.42, -2.98);
      s.quadraticCurveTo(0.18, -2.75, 0.22, -2.18);

      // Return Up Inside Shank
      s.quadraticCurveTo(0.16, -1.5, 0.08, -0.95);
      s.quadraticCurveTo(0.04, -0.35, 0.0, 0.0);
      s.lineTo(-0.02, 0.35);

      // Thumb Ring Hole
      const hole = new THREE.Path();
      hole.moveTo(0.56, -2.28);
      hole.quadraticCurveTo(0.38, -2.28, 0.38, -2.58);
      hole.quadraticCurveTo(0.38, -2.88, 0.56, -2.88);
      hole.quadraticCurveTo(0.74, -2.88, 0.74, -2.58);
      hole.quadraticCurveTo(0.74, -2.28, 0.56, -2.28);
      s.holes.push(hole);

      return s;
    };

    // 5. Construct 3D Assemblies
    const masterScissorsGroup = new THREE.Group();

    // Finger Half Assembly (Base Pivot at 0,0,0)
    const fingerPivotGroup = new THREE.Group();
    const fingerGeo = new THREE.ExtrudeGeometry(createFingerHalfShape(), extrudeSettings);
    fingerGeo.computeVertexNormals();
    const fingerMesh = new THREE.Mesh(fingerGeo, steelMaterial);
    fingerMesh.position.set(0, 0, 0.015);
    fingerPivotGroup.add(fingerMesh);

    // Rubber Silencer Bumper mounted between rings
    const bumperGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.16, 24);
    const bumperMesh = new THREE.Mesh(bumperGeo, rubberMaterial);
    bumperMesh.position.set(-0.1, -2.42, 0.04);
    bumperMesh.rotation.z = Math.PI / 2;
    fingerPivotGroup.add(bumperMesh);

    // Thumb Half Assembly (Base Pivot at 0,0,0)
    const thumbPivotGroup = new THREE.Group();
    const thumbGeo = new THREE.ExtrudeGeometry(createThumbHalfShape(), extrudeSettings);
    thumbGeo.computeVertexNormals();
    const thumbMesh = new THREE.Mesh(thumbGeo, steelMaterial);
    thumbMesh.position.set(0, 0, -0.075);
    thumbPivotGroup.add(thumbMesh);

    // 6. Luxury Precision Click-Tension Gold Dial Assembly
    const pivotAssembly = new THREE.Group();
    pivotAssembly.position.set(0, 0.22, 0);

    // Gold Outer Notched Tension Dial
    const dialOuterGeo = new THREE.CylinderGeometry(0.36, 0.38, 0.08, 36);
    const dialOuter = new THREE.Mesh(dialOuterGeo, goldMaterial);
    dialOuter.rotation.x = Math.PI / 2;
    dialOuter.position.z = 0.08;
    pivotAssembly.add(dialOuter);

    // Gold Stepped Bevel Ring
    const dialBevelGeo = new THREE.CylinderGeometry(0.24, 0.32, 0.06, 32);
    const dialBevel = new THREE.Mesh(dialBevelGeo, goldMaterial);
    dialBevel.rotation.x = Math.PI / 2;
    dialBevel.position.z = 0.13;
    pivotAssembly.add(dialBevel);

    // Polished Obsidian Jewel Core with Gold Retainer
    const jewelGeo = new THREE.SphereGeometry(0.14, 24, 24);
    jewelGeo.scale(1, 1, 0.5);
    const jewelMesh = new THREE.Mesh(jewelGeo, jewelMaterial);
    jewelMesh.position.z = 0.16;
    pivotAssembly.add(jewelMesh);

    // Gold Flat Tension Spring Ring (Under dial)
    const springRingGeo = new THREE.RingGeometry(0.18, 0.34, 32);
    const springRing = new THREE.Mesh(springRingGeo, goldMaterial);
    springRing.position.z = 0.042;
    pivotAssembly.add(springRing);

    // Rear Countersunk Gold Nut
    const rearNutGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.07, 32);
    const rearNut = new THREE.Mesh(rearNutGeo, goldMaterial);
    rearNut.rotation.x = Math.PI / 2;
    rearNut.position.z = -0.09;
    pivotAssembly.add(rearNut);

    // Rear Screw Hex Socket
    const rearHexGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.09, 6);
    const rearHex = new THREE.Mesh(rearHexGeo, jewelMaterial);
    rearHex.rotation.x = Math.PI / 2;
    rearHex.position.z = -0.095;
    pivotAssembly.add(rearHex);

    // Assemble complete master shear
    masterScissorsGroup.add(fingerPivotGroup);
    masterScissorsGroup.add(thumbPivotGroup);
    masterScissorsGroup.add(pivotAssembly);

    // Dramatic Editorial Angle
    masterScissorsGroup.rotation.z = THREE.MathUtils.degToRad(-28);
    masterScissorsGroup.rotation.x = THREE.MathUtils.degToRad(14);
    masterScissorsGroup.rotation.y = THREE.MathUtils.degToRad(12);
    masterScissorsGroup.scale.set(0.92, 0.92, 0.92);

    scene.add(masterScissorsGroup);

    // 7. Interactive Controls & Pointer Tracking
    let targetRotX = 0.2;
    let targetRotY = 0.15;
    let targetRotZ = -0.48;
    let pointerVelocity = 0;
    let lastPointerX = 0;
    let isInteracting = false;

    const handlePointerMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const rect = mount.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      pointerVelocity = Math.abs(x - lastPointerX);
      lastPointerX = x;
      isInteracting = true;

      targetRotY = x * 0.55;
      targetRotX = -y * 0.45 + 0.2;
      targetRotZ = -0.48 + x * 0.18;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (prefersReducedMotion || !e.touches[0]) return;
      const touch = e.touches[0];
      const rect = mount.getBoundingClientRect();
      const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);

      pointerVelocity = Math.abs(x - lastPointerX);
      lastPointerX = x;
      isInteracting = true;

      targetRotY = x * 0.55;
      targetRotX = -y * 0.45 + 0.2;
      targetRotZ = -0.48 + x * 0.18;
    };

    const handlePointerLeave = () => {
      isInteracting = false;
    };

    window.addEventListener("mousemove", handlePointerMove);
    mount.addEventListener("touchmove", handleTouchMove, { passive: true });
    mount.addEventListener("mouseleave", handlePointerLeave);

    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // 8. Fluid Animation Loop with Realistic Barber Snip Ritual
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Smooth floating idle posture
      masterScissorsGroup.rotation.x +=
        (targetRotX + Math.sin(elapsedTime * 0.7) * 0.04 - masterScissorsGroup.rotation.x) * 0.05;
      masterScissorsGroup.rotation.y +=
        (targetRotY + Math.cos(elapsedTime * 0.6) * 0.04 - masterScissorsGroup.rotation.y) * 0.05;
      masterScissorsGroup.rotation.z +=
        (targetRotZ - masterScissorsGroup.rotation.z) * 0.05;

      // Realistic scissor blade action:
      // Combines a slow rhythmic breathing opening with responsive snip snip reaction to pointer interaction
      const baseSnipCycle = Math.sin(elapsedTime * 1.8);
      // Half-wave rectified snip: mostly closed/slight open, opens gracefully then snips shut
      const openAmount = Math.max(0, baseSnipCycle) * 0.16 + (isInteracting ? pointerVelocity * 0.35 : 0.02);
      const clampedAngle = THREE.MathUtils.clamp(openAmount, 0.015, 0.22);

      fingerPivotGroup.rotation.z = -clampedAngle * 0.6;
      thumbPivotGroup.rotation.z = clampedAngle * 0.6;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handlePointerMove);
      mount.removeEventListener("touchmove", handleTouchMove);
      mount.removeEventListener("mouseleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  if (!isSupported) {
    return (
      <div className={`flex items-center justify-center p-6 ${className}`}>
        <div className="w-16 h-16 rounded-full border border-champagne-500/30 flex items-center justify-center">
          <span className="text-xs uppercase tracking-widest text-champagne-300">BHANU 3D</span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full min-h-[350px] cursor-grab active:cursor-grabbing ${className}`}
      aria-label="Interactive 3D Master Barber Shears"
    />
  );
}
