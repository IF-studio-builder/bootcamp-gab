"use client";

import { useMemo, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { Event } from "@/lib/supabase/types";
import type { EventFilter } from "@/lib/utils/filter-events";
import {
  parseFiltersFromURL,
  filtersToURLParams,
  buildEventsURL,
} from "@/lib/utils/url-params";
import {
  filterEvents,
  countEventsByCity,
  countEventsByType,
  countEventsByPeriod,
} from "@/lib/utils/filter-events";

const VALID_CITIES = ["Lille", "Paris", "Lyon", "Remote"] as const;

export type CityCount = {
  city: string;
  count: number;
};

export type TypeCount = {
  type: EventFilter["type"];
  label: string;
  count: number;
};

export type PeriodCount = {
  period: EventFilter["period"];
  label: string;
  count: number;
};

export function useEventFilters(events: Event[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Parse les filtres depuis l'URL
  const filters = useMemo(
    () => parseFiltersFromURL(searchParams),
    [searchParams]
  );

  // Événements filtrés
  const filteredEvents = useMemo(
    () => filterEvents(events, filters),
    [events, filters]
  );

  // Compteurs par ville
  const cityCounts = useMemo<CityCount[]>(() => {
    const otherFilters: Omit<EventFilter, "cities"> = {
      type: filters.type,
      period: filters.period,
    };

    return VALID_CITIES.map((city) => ({
      city,
      count: countEventsByCity(events, city, otherFilters),
    }));
  }, [events, filters.type, filters.period]);

  // Compteurs par type
  const typeCounts = useMemo<TypeCount[]>(() => {
    const otherFilters: Omit<EventFilter, "type"> = {
      cities: filters.cities,
      period: filters.period,
    };

    return [
      { type: "all" as const, label: "Tous" },
      { type: "meetup" as const, label: "Meetup" },
      { type: "webinar" as const, label: "Webinar" },
      { type: "workshop" as const, label: "Workshop" },
    ].map(({ type, label }) => ({
      type,
      label,
      count: countEventsByType(events, type, otherFilters),
    }));
  }, [events, filters.cities, filters.period]);

  // Compteurs par période
  const periodCounts = useMemo<PeriodCount[]>(() => {
    const otherFilters: Omit<EventFilter, "period"> = {
      cities: filters.cities,
      type: filters.type,
    };

    return [
      { period: "all" as const, label: "Tous les événements" },
      { period: "upcoming" as const, label: "À venir" },
      { period: "replays" as const, label: "Replays disponibles" },
    ].map(({ period, label }) => ({
      period,
      label,
      count: countEventsByPeriod(events, period, otherFilters),
    }));
  }, [events, filters.cities, filters.type]);

  // Mettre à jour les filtres et l'URL
  const updateFilters = useCallback(
    (newFilters: Partial<EventFilter>) => {
      const updatedFilters: EventFilter = {
        ...filters,
        ...newFilters,
      };

      const params = filtersToURLParams(updatedFilters);
      const queryString = params.toString();
      const newURL = queryString ? `${pathname}?${queryString}` : pathname;

      router.push(newURL, { scroll: false });
    },
    [filters, pathname, router]
  );

  // Réinitialiser les filtres
  const resetFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [pathname, router]);

  // Vérifier si des filtres sont actifs
  const hasActiveFilters = useMemo(() => {
    return (
      filters.cities.length > 0 ||
      filters.type !== "all" ||
      filters.period !== "all"
    );
  }, [filters]);

  return {
    filters,
    filteredEvents,
    cityCounts,
    typeCounts,
    periodCounts,
    updateFilters,
    resetFilters,
    hasActiveFilters,
  };
}
