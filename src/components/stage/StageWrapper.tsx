"use client";

import dynamic from "next/dynamic";
import React from "react";

const StageCanvas = dynamic(() => import("./StageCanvas"), {
  ssr: false,
});

export function StageWrapper() {
  return <StageCanvas />;
}

export default StageWrapper;
