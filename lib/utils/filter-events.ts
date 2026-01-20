import type { Event } from "@/lib/supabase/types";

export type EventFilter = {
  cities: string[];
  type: "all" | "meetup" | "webinar" | "workshop" | "conference";
  period: "all" | "upcoming" | "replays";
  searchQuery?: string;
};

/**
 * Filtre les événements selon les critères fournis
 * Logique : AND entre les différents types de filtres, OR entre les villes
 */
export function filterEvents(
  events: Event[],
  filters: EventFilter
): Event[] {
  const now = new Date();

  // Normaliser les villes pour la comparaison (insensible à la casse)
  const normalizeCity = (city: string) => city.toLowerCase();
  const normalizedFilterCities = filters.cities.map(normalizeCity);

  return events.filter((event) => {
    // Filtre ville (OR logique si plusieurs villes sélectionnées)
    const cityMatch =
      filters.cities.length === 0 ||
      (event.city && normalizedFilterCities.includes(normalizeCity(event.city)));

    // Filtre type (AND logique)
    const typeMatch =
      filters.type === "all" || event.event_type === filters.type;

    // Filtre période (AND logique)
    const eventDate = new Date(event.event_date);
    let periodMatch = true;

    if (filters.period === "upcoming") {
      periodMatch = eventDate >= now;
    } else if (filters.period === "replays") {
      periodMatch = eventDate < now && event.replay_url !== null;
    }

    // Filtre recherche textuelle (AND logique)
    let searchMatch = true;
    if (filters.searchQuery && filters.searchQuery.trim().length > 0) {
      const searchLower = filters.searchQuery.toLowerCase().trim();
      const searchTerms = searchLower.split(/\s+/).filter((term) => term.length > 0);
      
      if (searchTerms.length > 0) {
        // Recherche dans titre et description
        const titleLower = (event.title || "").toLowerCase();
        const descriptionLower = (event.description || "").toLowerCase();
        
        const searchableText = `${titleLower} ${descriptionLower}`;
        
        // Tous les termes doivent être présents (logique AND)
        searchMatch = searchTerms.every((term) => searchableText.includes(term));
      }
    }

    return cityMatch && typeMatch && periodMatch && searchMatch;
  });
}

/**
 * Calcule le nombre d'événements pour une ville donnée
 * en tenant compte des autres filtres actifs
 */
export function countEventsByCity(
  events: Event[],
  city: string,
  otherFilters: Omit<EventFilter, "cities">
): number {
  const filters: EventFilter = {
    cities: [city],
    ...otherFilters,
  };
  return filterEvents(events, filters).length;
}

/**
 * Calcule le nombre d'événements pour un type donné
 * en tenant compte des autres filtres actifs
 */
export function countEventsByType(
  events: Event[],
  type: EventFilter["type"],
  otherFilters: Omit<EventFilter, "type">
): number {
  const filters: EventFilter = {
    type,
    ...otherFilters,
  };
  return filterEvents(events, filters).length;
}

/**
 * Calcule le nombre d'événements pour une période donnée
 * en tenant compte des autres filtres actifs
 */
export function countEventsByPeriod(
  events: Event[],
  period: EventFilter["period"],
  otherFilters: Omit<EventFilter, "period">
): number {
  const filters: EventFilter = {
    period,
    ...otherFilters,
  };
  return filterEvents(events, filters).length;
}
