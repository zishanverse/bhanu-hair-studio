"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { stageState } from "@/lib/stageState";
import { usePerfTier } from "@/lib/usePerfTier";

interface StrandState {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  rx: number;
  ry: number;
  rz: number;
  vrx: number;
  vry: number;
  life: number;
  active: boolean;
}

export function HairStrands() {
  const { tier } = usePerfTier();
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const count = tier === "high" ? 80 : tier === "mid" ? 36 : 0;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Pool of strand states
  const strands = useRef<StrandState[]>([]);

  useEffect(() => {
    strands.current = Array.from({ length: count }, () => ({
      x: 0,
      y: 0,
      z: 0,
      vx: 0,
      vy: 0,
      vz: 0,
      rx: 0,
      ry: 0,
      rz: 0,
      vrx: 0,
      vry: 0,
      life: 0,
      active: false,
    }));
  }, [count]);

  // Subscribe to snip events to emit fresh strands from blade tip
  useEffect(() => {
    if (count === 0) return;

    const unsubscribe = stageState.subscribe(() => {
      const emitCount = Math.min(24, count);
      let emitted = 0;

      for (let i = 0; i < strands.current.length && emitted < emitCount; i++) {
        const s = strands.current[i];
        if (!s.active || s.life <= 0) {
          s.active = true;
          s.life = 1.0;
          // Blade tip origin approx
          s.x = stageState.shears.x + (Math.random() - 0.5) * 0.4;
          s.y = stageState.shears.y + 1.2 + (Math.random() - 0.5) * 0.3;
          s.z = stageState.shears.z + (Math.random() - 0.5) * 0.3;
          // Initial velocity: spread outwards and fall with gravity
          s.vx = (Math.random() - 0.5) * 1.8;
          s.vy = Math.random() * 0.8 + 0.2;
          s.vz = (Math.random() - 0.5) * 1.2;
          s.rx = Math.random() * Math.PI;
          s.ry = Math.random() * Math.PI;
          s.rz = Math.random() * Math.PI;
          s.vrx = (Math.random() - 0.5) * 4.0;
          s.vry = (Math.random() - 0.5) * 4.0;
          emitted++;
        }
      }
    });

    return unsubscribe;
  }, [count]);

  useFrame((_, delta) => {
    if (!meshRef.current || count === 0) return;

    for (let i = 0; i < strands.current.length; i++) {
      const s = strands.current[i];
      if (s.active && s.life > 0) {
        // Physics update
        s.vy -= 4.5 * delta; // Gravity
        s.x += s.vx * delta;
        s.y += s.vy * delta;
        s.z += s.vz * delta;
        s.rx += s.vrx * delta;
        s.ry += s.vry * delta;
        s.life -= delta * 0.75;

        dummy.position.set(s.x, s.y, s.z);
        dummy.rotation.set(s.rx, s.ry, s.rz);
        const scale = Math.max(0.001, s.life * 0.8);
        dummy.scale.set(scale, scale * 3.5, scale);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      } else {
        dummy.position.set(0, -999, 0);
        dummy.scale.set(0, 0, 0);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  if (count === 0) return null;

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <cylinderGeometry args={[0.008, 0.008, 0.4, 6]} />
      <meshStandardMaterial
        color="#2A2421"
        roughness={0.65}
        metalness={0.1}
      />
    </instancedMesh>
  );
}
