import type { Event } from "@/lib/supabase/types";

/**
 * Trie les événements :
 * - Futurs : date croissante (du plus proche au plus lointain)
 * - Passés : date décroissante (du plus récent au plus ancien)
 * - Mixte : futurs avant passés
 */
export function sortEvents(events: Event[]): Event[] {
  const now = new Date();

  return [...events].sort((a, b) => {
    const dateA = new Date(a.event_date);
    const dateB = new Date(b.event_date);
    const isFutureA = dateA >= now;
    const isFutureB = dateB >= now;

    // Si les deux sont futurs : tri croissant
    if (isFutureA && isFutureB) {
      return dateA.getTime() - dateB.getTime();
    }

    // Si les deux sont passés : tri décroissant
    if (!isFutureA && !isFutureB) {
      return dateB.getTime() - dateA.getTime();
    }

    // Futurs avant passés
    return isFutureA ? -1 : 1;
  });
}

/**
 * Sépare les événements en futurs et passés
 */
export function separateEventsByPeriod(events: Event[]): {
  upcoming: Event[];
  past: Event[];
} {
  const now = new Date();
  const upcoming: Event[] = [];
  const past: Event[] = [];

  events.forEach((event) => {
    const eventDate = new Date(event.event_date);
    if (eventDate >= now) {
      upcoming.push(event);
    } else {
      past.push(event);
    }
  });

  // Trier les futurs par date croissante
  upcoming.sort(
    (a, b) =>
      new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
  );

  // Trier les passés par date décroissante
  past.sort(
    (a, b) =>
      new Date(b.event_date).getTime() - new Date(a.event_date).getTime()
  );

  return { upcoming, past };
}
