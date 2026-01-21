"use client";

import { Marker } from "@vnedyalk0v/react19-simple-maps";
import { calculateMarkerSize, formatLocationTooltip } from "@/lib/map-utils";

interface MapMarkerProps {
  coordinates: [number, number];
  city: string;
  eventCount: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function MapMarker({
  coordinates,
  city,
  eventCount,
  onMouseEnter,
  onMouseLeave,
}: MapMarkerProps) {
  const markerSize = calculateMarkerSize(eventCount);

  return (
    <Marker coordinates={[coordinates[1], coordinates[0]]} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <g className="cursor-pointer transition-all duration-200 hover:scale-110">
        <circle
          r={markerSize}
          fill="hsl(var(--primary))"
          stroke="hsl(var(--background))"
          strokeWidth={2}
          style={{
            filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))",
          }}
          className="animate-pulse"
        />
        <title>{formatLocationTooltip(city, eventCount)}</title>
      </g>
    </Marker>
  );
}
