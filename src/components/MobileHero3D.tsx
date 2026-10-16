"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Scissors, Sparkles, MessageCircle, ArrowDown, ChevronRight } from "lucide-react";
import { SALON_CONFIG } from "@/config/salon.config";

export function MobileHero3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [activePill, setActivePill] = useState(0);

  const pillars = [
    { title: "Architectural Cut", tag: "HAUTE PRECISION" },
    { title: "Balayage & Color", tag: "FRENCH TECHNIQUE" },
    { title: "Silk Spa Ritual", tag: "SCALP DETOX" },
    { title: "Bespoke Grooming", tag: "SIGNATURE FINISH" },
  ];

  // Three.js 3D Floating Gold Emblem & Stardust Particles
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 6.5);

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
      renderer.toneMappingExposure = 1.3;
      mount.appendChild(renderer.domElement);
    } catch (e) {
      return;
    }

    // 2. Luxury Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfffaed, 1.2);
    scene.add(ambientLight);

    const goldKey = new THREE.DirectionalLight(0xd4af37, 3.5);
    goldKey.position.set(4, 5, 4);
    scene.add(goldKey);

    const rimLight = new THREE.DirectionalLight(0xc5a477, 2.8);
    rimLight.position.set(-4, -3, 3);
    scene.add(rimLight);

    const glintLight = new THREE.PointLight(0xffffff, 2.0, 10);
    glintLight.position.set(0, 3, 2);
    scene.add(glintLight);

    // High Polish Champagne Gold Material
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.96,
      roughness: 0.12,
    });

    // Platinum Steel Material
    const steelMaterial = new THREE.MeshStandardMaterial({
      color: 0xf4f4f5,
      metalness: 0.98,
      roughness: 0.1,
    });

    // Dark Obsidian Jewel Core Material
    const jewelMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a0a0c,
      metalness: 0.85,
      roughness: 0.2,
    });

    // 3. Central Salon Haute Coiffure Sculpture: Japanese Master Shears & Silk Hair Strand
    const coreGroup = new THREE.Group();

    // Pivot Screw with Obsidian Jewel
    const pivotBezelGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.1, 32);
    const pivotBezel = new THREE.Mesh(pivotBezelGeo, goldMaterial);
    pivotBezel.rotation.x = Math.PI / 2;
    coreGroup.add(pivotBezel);

    const pivotGemGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.12, 32);
    const pivotGem = new THREE.Mesh(pivotGemGeo, jewelMaterial);
    pivotGem.rotation.x = Math.PI / 2;
    coreGroup.add(pivotGem);

    // Shears Blade A (Convex Cutting Edge)
    const bladeGeo = new THREE.ConeGeometry(0.11, 2.7, 4);
    bladeGeo.scale(1, 1, 0.24);
    bladeGeo.translate(0, 1.35, 0);

    const bladeA = new THREE.Mesh(bladeGeo, steelMaterial);
    bladeA.rotation.z = 0.22;
    bladeA.position.set(0, 0, 0.03);
    coreGroup.add(bladeA);

    // Shears Blade B (Opposing Convex Cutting Edge)
    const bladeB = new THREE.Mesh(bladeGeo, steelMaterial);
    bladeB.rotation.z = -0.22;
    bladeB.position.set(0, 0, -0.03);
    coreGroup.add(bladeB);

    // Handle Shanks & Finger Rings
    const shankGeo = new THREE.CylinderGeometry(0.055, 0.045, 1.25, 16);
    shankGeo.translate(0, -0.62, 0);

    const shankA = new THREE.Mesh(shankGeo, goldMaterial);
    shankA.rotation.z = -0.28;
    coreGroup.add(shankA);

    const shankB = new THREE.Mesh(shankGeo, goldMaterial);
    shankB.rotation.z = 0.28;
    coreGroup.add(shankB);

    // Finger Loops
    const ringGeo = new THREE.TorusGeometry(0.3, 0.042, 16, 32);
    const fingerLoopA = new THREE.Mesh(ringGeo, goldMaterial);
    fingerLoopA.position.set(-0.36, -1.45, 0.03);
    fingerLoopA.rotation.y = 0.15;
    coreGroup.add(fingerLoopA);

    const fingerLoopB = new THREE.Mesh(ringGeo, goldMaterial);
    fingerLoopB.position.set(0.36, -1.45, -0.03);
    fingerLoopB.rotation.y = -0.15;
    coreGroup.add(fingerLoopB);

    // Japanese Pinky Tang (Salon Master Tool Rest)
    const tangGeo = new THREE.CylinderGeometry(0.02, 0.035, 0.42, 16);
    tangGeo.translate(0, -0.21, 0);
    const tang = new THREE.Mesh(tangGeo, goldMaterial);
    tang.position.set(0.62, -1.45, -0.03);
    tang.rotation.z = -0.65;
    coreGroup.add(tang);

    // Flowing Silk Hair Strand / Ribbon (Gracefully weaving past the blades)
    const hairCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.7, -1.3, -0.4),
      new THREE.Vector3(-1.1, -0.2, 0.35),
      new THREE.Vector3(-0.25, 0.75, 0.25),
      new THREE.Vector3(0.45, 1.35, -0.15),
      new THREE.Vector3(1.15, 0.35, 0.4),
      new THREE.Vector3(1.7, -0.75, -0.25),
    ]);
    const hairRibbonGeo = new THREE.TubeGeometry(hairCurve, 64, 0.032, 12, false);
    const hairRibbonMat = new THREE.MeshStandardMaterial({
      color: 0xe4c784,
      metalness: 0.88,
      roughness: 0.22,
      emissive: 0x8b6925,
      emissiveIntensity: 0.2,
    });
    const hairRibbon = new THREE.Mesh(hairRibbonGeo, hairRibbonMat);
    coreGroup.add(hairRibbon);

    scene.add(coreGroup);

    // 4. 120 Floating Golden Stardust Particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
      scales[i] = Math.random() * 0.8 + 0.2;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xc5a477,
      size: 0.05,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 5. Touch Tracking & Smooth Gyro Lerp
    let targetRotX = 0;
    let targetRotY = 0;

    const handleTouchMove = (e: TouchEvent) => {
      if (prefersReducedMotion || !e.touches[0]) return;
      const touch = e.touches[0];
      const rect = mount.getBoundingClientRect();
      const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.9;
      targetRotX = -y * 0.7;
    };

    mount.addEventListener("touchmove", handleTouchMove, { passive: true });

    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // 6. Animation Render Loop
    let rafId: number;
    const startTime = performance.now();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = (performance.now() - startTime) * 0.001;

      // Smooth floating rotation
      coreGroup.rotation.y += (targetRotY + t * 0.45 - coreGroup.rotation.y) * 0.06;
      coreGroup.rotation.x += (targetRotX + Math.sin(t * 0.8) * 0.15 - coreGroup.rotation.x) * 0.06;
      coreGroup.position.y = Math.sin(t * 1.2) * 0.12;

      // Subtle scissor blade breath / shear angle oscillation
      const snipAngle = 0.22 + Math.sin(t * 1.5) * 0.05;
      bladeA.rotation.z = snipAngle;
      bladeB.rotation.z = -snipAngle;

      // Subtle hair ribbon shimmer
      hairRibbon.rotation.z = Math.sin(t * 0.6) * 0.08;

      // Particle floating drift
      particles.rotation.y = t * 0.06;
      particles.rotation.x = Math.sin(t * 0.05) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      mount.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  const handleScrollToStudio = () => {
    const studio = document.getElementById("studio");
    if (studio) {
      studio.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="mobile-3d-hero"
      className="md:hidden relative w-full h-[100dvh] min-h-[100dvh] bg-obsidian-950 text-ivory-50 overflow-hidden flex flex-col justify-between pt-20 pb-6 px-4 select-none"
    >
      {/* 1. Ambient Lighting Halos */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-gradient-to-b from-champagne-400/20 via-champagne-500/10 to-transparent blur-[110px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/3 right-0 w-[240px] h-[240px] bg-champagne-500/10 blur-[90px] pointer-events-none rounded-full" />

      {/* 2. Interactive Three.js Canvas Centerpiece */}
      <div
        ref={mountRef}
        className="absolute inset-0 z-0 flex items-center justify-center opacity-85 touch-none"
        aria-label="Interactive 3D Atelier Emblem"
      />

      {/* 3. Floating 3D Perspective Content Layer */}
      <div
        ref={cardRef}
        className="relative z-10 flex flex-col justify-between h-full pointer-events-none space-y-4 pt-4"
      >
        {/* Center Editorial Haute Coiffure Headline */}
        <div className="space-y-3 my-auto text-center px-2 pointer-events-auto">
          <div className="inline-flex items-center gap-2 mx-auto">
            <span className="w-6 h-[1px] bg-champagne-400 inline-block" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-400 font-semibold drop-shadow-md">
              BHANU&apos;S THE HAIR STUDIO
            </span>
            <span className="w-6 h-[1px] bg-champagne-400 inline-block" />
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-light text-ivory-50 tracking-tight leading-[1.08] drop-shadow-[0_15px_30px_rgba(0,0,0,0.95)]">
            WHERE STYLE <br />
            BECOMES <span className="italic text-champagne-300 font-serif">ART.</span>
          </h1>

          <p className="text-[11px] tracking-[0.16em] uppercase text-ivory-100 font-light max-w-xs mx-auto drop-shadow-md leading-relaxed">
            Sculpted geometric precision, liquid silk textures & sensory calm across Indore.
          </p>

          <div className="pt-1 flex items-center justify-center gap-2 text-[10px] text-champagne-300 font-medium tracking-widest uppercase">
            <span>Bespoke Hair & Aesthetics Atelier · 3 Indore Studios</span>
          </div>
        </div>

        {/* Bottom Carousel Pillars & Direct CTAs */}
        <div className="space-y-3.5 pointer-events-auto pb-1">
          {/* Interactive Discipline Horizontal Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-1">
            {pillars.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActivePill(idx)}
                className={`shrink-0 px-3 py-2 rounded-full border text-[10px] uppercase tracking-wider font-mono transition-all duration-300 min-h-[36px] ${activePill === idx
                  ? "bg-champagne-400 text-obsidian-950 font-bold border-champagne-300 shadow-[0_0_15px_rgba(197,164,119,0.5)]"
                  : "glass-panel border-champagne-500/25 text-ivory-200 hover:text-white"
                  }`}
              >
                <span>{p.title}</span>
              </button>
            ))}
          </div>

          {/* Primary Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <a
              href={`https://wa.me/${SALON_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
                "Hello Bhanu's The Hair Studio, I would like to reserve a luxury salon appointment."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center gap-2 py-3.5 rounded-full overflow-hidden text-[11px] uppercase tracking-wider font-semibold text-obsidian-950 bg-gradient-to-r from-champagne-200 via-champagne-400 to-champagne-300 shadow-[0_0_25px_rgba(197,164,119,0.5)] active:scale-95 transition-all text-center min-h-[46px]"
            >
              <MessageCircle className="w-4 h-4 fill-obsidian-950" />
              <span>Book Session</span>
            </a>

            <button
              type="button"
              onClick={handleScrollToStudio}
              className="flex items-center justify-center gap-1.5 py-3.5 rounded-full text-[11px] uppercase tracking-wider font-light text-champagne-200 border border-champagne-500/35 glass-panel active:bg-champagne-500/10 active:scale-95 transition-all cursor-pointer"
            >
              <span>Explore</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
