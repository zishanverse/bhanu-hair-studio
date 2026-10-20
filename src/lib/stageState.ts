/**
 * stageState.ts
 * Module-level mutable state object for the persistent 3D Stage.
 * Scrolling and interactions mutate this state directly;
 * R3F's useFrame reads it and damps toward targets.
 * This guarantees zero React re-renders during scrolling.
 */

export interface StageState {
  // Shears 3D Transform
  shears: {
    x: number;
    y: number;
    z: number;
    rx: number; // in radians
    ry: number;
    rz: number;
    scale: number;
    bladeOpen: number; // 0 (closed) to 1 (fully open)
    explode: number; // 0 (assembled) to 1 (fully disassembled)
    opacity: number;
  };

  // Camera
  camera: {
    y: number;
    z: number;
    fov: number;
  };

  // Glint / Lighting
  glint: {
    x: number;
    y: number;
    z: number;
    intensity: number;
  };

  // Gold Ribbon finale
  ribbon: {
    cut: number; // 0 to 1
    opacity: number;
  };

  // Pearl droplet for Skincare
  pearl: {
    opacity: number;
    tint: string;
    y: number;
  };

  // Global stage canvas visibility
  canvasOpacity: number;
  isFrameloopActive: boolean;

  // Snip trigger
  snipCount: number;
  lastSnipTime: number;
  snip: () => void;
  listeners: Set<() => void>;
  subscribe: (fn: () => void) => () => void;
}

export const stageState: StageState = {
  shears: {
    x: 1.8,
    y: 0,
    z: 0,
    rx: 0.22,
    ry: -0.28,
    rz: -0.45,
    scale: 0.95,
    bladeOpen: 0.05,
    explode: 0,
    opacity: 1,
  },
  camera: {
    y: 0,
    z: 8.5,
    fov: 38,
  },
  glint: {
    x: 0,
    y: 4,
    z: 3,
    intensity: 2.5,
  },
  ribbon: {
    cut: 0,
    opacity: 0,
  },
  pearl: {
    opacity: 0,
    tint: "#F8F6F2",
    y: 0,
  },
  canvasOpacity: 1,
  isFrameloopActive: true,
  snipCount: 0,
  lastSnipTime: 0,

  snip() {
    this.snipCount++;
    this.lastSnipTime = performance.now();
    this.listeners.forEach((fn) => fn());
  },

  listeners: new Set(),
  subscribe(fn: () => void) {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  },
};
