"use client";

import { useState } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { MapMarker } from "./map-marker";
import eventLocations from "@/data/event-locations.json";
import type { EventLocation } from "@/lib/map-utils";

const locations = eventLocations.locations as EventLocation[];

export function FranceMap() {
  const [tooltip, setTooltip] = useState<string>("");

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3 text-white/90">
          Notre Communauté à travers la France
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto">
          Découvrez où se déroulent nos événements et rejoignez la communauté GenAI Builders.
        </p>
      </div>

      {/* Map Container */}
      <div className="relative max-w-4xl mx-auto">
        <div className="aspect-[4/3] md:aspect-[16/10] border border-white/20 bg-black/60 backdrop-blur-md rounded-lg overflow-hidden">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              center: [2.5, 46.8],
              scale: 2400,
            }}
            className="w-full h-full"
          >
            <ZoomableGroup
              zoom={1}
              minZoom={1}
              maxZoom={4}
              center={[2.5, 46.8]}
            >
              <Geographies geography="/maps/france.json">
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="hsl(var(--card))"
                      stroke="hsl(var(--border))"
                      strokeWidth={0.5}
                      className="transition-all duration-200 hover:fill-white/10 hover:stroke-white/30 outline-none"
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none" },
                        pressed: { outline: "none" }
                      }}
                    />
                  ))
                }
              </Geographies>

              {/* Markers for event locations */}
              {locations.map((location) => (
                <MapMarker
                  key={location.id}
                  coordinates={location.coordinates}
                  city={location.city}
                  eventCount={location.eventCount}
                  onMouseEnter={() =>
                    setTooltip(`${location.city}: ${location.eventCount} événement${location.eventCount > 1 ? "s" : ""}`)
                  }
                  onMouseLeave={() => setTooltip("")}
                />
              ))}
            </ZoomableGroup>
          </ComposableMap>
        </div>

        {/* Tooltip */}
        {tooltip && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-lg text-white/90 text-sm font-medium pointer-events-none z-10">
            {tooltip}
          </div>
        )}

        {/* Zoom Controls */}
        <div className="absolute bottom-4 right-4 text-xs text-white/60">
          <p>Utilisez la molette de la souris pour zoomer</p>
        </div>

        {/* Accessible alternative */}
        <div className="sr-only">
          <h3>Lieux des événements</h3>
          <ul>
            {locations.map((location) => (
              <li key={location.id}>
                {location.city}, {location.region}: {location.eventCount} événement
                {location.eventCount > 1 ? "s" : ""}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
