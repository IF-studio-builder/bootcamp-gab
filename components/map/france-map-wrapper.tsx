"use client";

import dynamic from "next/dynamic";

// Dynamically import FranceMap with SSR disabled to avoid prerender errors
// The Geographies component tries to fetch JSON during SSR which fails
const FranceMap = dynamic(() => import("./france-map").then(mod => ({ default: mod.FranceMap })), {
  ssr: false,
});

export function FranceMapWrapper() {
  return <FranceMap />;
}
