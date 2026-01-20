import type { EventFilter } from "./filter-events";

const VALID_CITIES = ["lille", "paris", "lyon", "remote"] as const;
const VALID_TYPES = [
  "all",
  "meetup",
  "webinar",
  "workshop",
  "conference",
] as const;
const VALID_PERIODS = ["all", "upcoming", "replays"] as const;

type ValidCity = (typeof VALID_CITIES)[number];
type ValidType = (typeof VALID_TYPES)[number];
type ValidPeriod = (typeof VALID_PERIODS)[number];

/**
 * Parse les query params de l'URL en filtres
 */
export function parseFiltersFromURL(
  searchParams: URLSearchParams
): EventFilter {
  // Parse cities (multi-sélection, séparées par des virgules)
  const citiesParam = searchParams.get("cities");
  const cities: string[] = citiesParam
    ? citiesParam
        .split(",")
        .map((c) => c.trim().toLowerCase())
        .filter((c): c is ValidCity => VALID_CITIES.includes(c as ValidCity))
        .filter((c, index, arr) => arr.indexOf(c) === index) // Supprimer les doublons
    : [];

  // Parse type (single-sélection)
  const typeParam = searchParams.get("type");
  const type: EventFilter["type"] =
    typeParam && VALID_TYPES.includes(typeParam.toLowerCase() as ValidType)
      ? (typeParam.toLowerCase() as EventFilter["type"])
      : "all";

  // Parse period (single-sélection)
  const periodParam = searchParams.get("period");
  const period: EventFilter["period"] =
    periodParam && VALID_PERIODS.includes(periodParam.toLowerCase() as ValidPeriod)
      ? (periodParam.toLowerCase() as EventFilter["period"])
      : "all";

  // Parse search (recherche textuelle)
  const searchParam = searchParams.get("search");
  const searchQuery = searchParam ? decodeURIComponent(searchParam).trim() : undefined;

  return { cities, type, period, searchQuery };
}

/**
 * Convertit les filtres en query params pour l'URL
 */
export function filtersToURLParams(filters: EventFilter): URLSearchParams {
  const params = new URLSearchParams();

  // Ajouter cities si non vide
  if (filters.cities.length > 0) {
    params.set("cities", filters.cities.join(","));
  }

  // Ajouter type si différent de "all"
  if (filters.type !== "all") {
    params.set("type", filters.type);
  }

  // Ajouter period si différent de "all"
  if (filters.period !== "all") {
    params.set("period", filters.period);
  }

  // Ajouter search si présent et non vide
  if (filters.searchQuery && filters.searchQuery.trim().length > 0) {
    params.set("search", encodeURIComponent(filters.searchQuery.trim()));
  }

  return params;
}

/**
 * Génère l'URL avec les filtres
 */
export function buildEventsURL(filters: EventFilter): string {
  const params = filtersToURLParams(filters);
  const queryString = params.toString();
  return queryString ? `/events?${queryString}` : "/events";
}
