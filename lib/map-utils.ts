/**
 * Map utilities for France interactive map
 */

export interface EventLocation {
  id: string;
  city: string;
  region: string;
  coordinates: [number, number]; // [latitude, longitude]
  eventCount: number;
  eventIds: string[];
}

/**
 * Extract city name from location string
 * Example: "123 rue Example, Wambrechies" -> "Wambrechies"
 */
export function extractCityFromLocation(location: string): string {
  const parts = location.split(',');
  if (parts.length > 1) {
    return parts[parts.length - 1].trim();
  }
  return location.trim();
}

/**
 * French city coordinates for future expansion
 * Format: [latitude, longitude]
 */
export const CITY_COORDINATES: Record<string, [number, number]> = {
  lille: [50.6292, 3.0573],
  paris: [48.8566, 2.3522],
  lyon: [45.7640, 4.8357],
  marseille: [43.2965, 5.3698],
  toulouse: [43.6047, 1.4442],
  bordeaux: [44.8378, -0.5792],
  nantes: [47.2184, -1.5536],
  strasbourg: [48.5734, 7.7521],
  nice: [43.7102, 7.2620],
  rennes: [48.1173, -1.6778],
};

/**
 * Calculate marker size based on event count
 * Returns radius for circle marker
 */
export function calculateMarkerSize(eventCount: number): number {
  return 6 + Math.min(eventCount, 5) * 1.5;
}

/**
 * Format tooltip text for event location
 */
export function formatLocationTooltip(city: string, eventCount: number): string {
  return `${city}: ${eventCount} événement${eventCount > 1 ? 's' : ''}`;
}
