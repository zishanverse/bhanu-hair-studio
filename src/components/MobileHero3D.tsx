"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Scissors, Sparkles, MessageCircle, ArrowDown, ChevronRight, Compass } from "lucide-react";
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

    // 3. Central 3D Sculpture: Interlocking Golden Rings & Stylized Master Shears
    const coreGroup = new THREE.Group();

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

    // Outer Armillary Ring 1 (Gold)
    const ring1Geo = new THREE.TorusGeometry(1.6, 0.045, 16, 64);
    const ring1 = new THREE.Mesh(ring1Geo, goldMaterial);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    // Outer Armillary Ring 2 (Steel)
    const ring2Geo = new THREE.TorusGeometry(1.4, 0.04, 16, 64);
    const ring2 = new THREE.Mesh(ring2Geo, steelMaterial);
    ring2.rotation.y = Math.PI / 3;
    ring2.rotation.x = -Math.PI / 6;
    coreGroup.add(ring2);

    // Center Faceted Gem Diamond (Haute Coiffure Emblem)
    const gemGeo = new THREE.OctahedronGeometry(0.75, 1);
    const gemMesh = new THREE.Mesh(gemGeo, goldMaterial);
    coreGroup.add(gemMesh);

    // Center Dark Core Sphere
    const coreSphereGeo = new THREE.SphereGeometry(0.42, 32, 32);
    const coreSphere = new THREE.Mesh(coreSphereGeo, jewelMaterial);
    coreGroup.add(coreSphere);

    // Crossed Stylized Blades
    const bladeGeo = new THREE.ConeGeometry(0.08, 2.6, 4);
    bladeGeo.scale(1, 1, 0.3);

    const blade1 = new THREE.Mesh(bladeGeo, steelMaterial);
    blade1.position.set(0, 0, 0.08);
    blade1.rotation.z = Math.PI / 4;
    coreGroup.add(blade1);

    const blade2 = new THREE.Mesh(bladeGeo, steelMaterial);
    blade2.position.set(0, 0, -0.08);
    blade2.rotation.z = -Math.PI / 4;
    coreGroup.add(blade2);

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

      // Rotate armillary rings in opposite axes
      ring1.rotation.z = t * 0.5;
      ring2.rotation.z = -t * 0.4;
      gemMesh.rotation.y = t * 0.8;

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
        className="relative z-10 flex flex-col justify-between h-full pointer-events-none space-y-4"
      >
        {/* Top Eyebrow Badge */}
        <div className="flex items-center justify-between pointer-events-auto pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-champagne-500/30 backdrop-blur-xl shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
            <span className="w-1.5 h-1.5 rounded-full bg-champagne-400 animate-pulse" />
            <span className="text-[9px] tracking-ultra uppercase text-champagne-300 font-mono font-medium">
              PALSIKAR COLONY · OPEN TILL 10 PM
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-champagne-500/20 text-[9px] font-mono text-champagne-400/80 bg-obsidian-950/60 backdrop-blur-md">
            <Compass className="w-2.5 h-2.5" />
            <span>INDORE</span>
          </div>
        </div>

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
            Sculpted geometric precision, liquid silk textures & sensory calm in Palsikar Colony.
          </p>

          <div className="pt-1 flex items-center justify-center gap-2 text-[9px] text-champagne-400/70 font-mono tracking-widest uppercase">
            <span>TOUCH & SWIPE 3D EMBLEM</span>
          </div>
        </div>

        {/* Bottom Carousel Pillars & Direct CTAs */}
        <div className="space-y-3.5 pointer-events-auto">
          {/* Interactive Discipline Horizontal Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-1">
            {pillars.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActivePill(idx)}
                className={`shrink-0 px-3 py-1.5 rounded-full border text-[9px] uppercase tracking-wider font-mono transition-all duration-300 ${
                  activePill === idx
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
                "Hello Bhanu's The Hair Studio Palsikar, I would like to reserve a luxury hair experience."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center gap-2 py-3.5 rounded-full overflow-hidden text-[11px] uppercase tracking-wider font-semibold text-obsidian-950 bg-gradient-to-r from-champagne-200 via-champagne-400 to-champagne-300 shadow-[0_0_25px_rgba(197,164,119,0.5)] active:scale-95 transition-all text-center"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-obsidian-950" />
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
