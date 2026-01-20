"use client";

import { useState, Suspense } from "react";
import { Calendar, Play, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { EventFilters } from "@/components/events/event-filters";
import { EventCard } from "@/components/events/event-card";
import { EventCardSkeleton } from "@/components/events/event-card-skeleton";
import { EmptyState } from "@/components/events/empty-state";
import { useEventFilters } from "@/hooks/use-event-filters";
import { sortEvents, separateEventsByPeriod } from "@/lib/utils/sort-events";
import type { Event } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

interface EventsClientProps {
  events: Event[];
}

function EventsContent({ events }: EventsClientProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const {
    filters,
    filteredEvents,
    resetFilters,
    hasActiveFilters,
    isPending,
  } = useEventFilters(events);

  // Trier les événements filtrés
  const sortedEvents = sortEvents(filteredEvents);
  const { upcoming, past } = separateEventsByPeriod(sortedEvents);

  // Déterminer quelles sections afficher selon les filtres
  const showUpcoming = filters.period === "all" || filters.period === "upcoming";
  const showReplays = filters.period === "all" || filters.period === "replays";

  const filtersContent = (
    <EventFilters events={events} />
  );

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="max-w-3xl mb-8">
        <h1 className="font-heading text-3xl font-bold mb-4">Événements</h1>
        <p className="text-lg text-muted-foreground">
          Meetups, webinars et workshops avec des experts GenAI. Participe en
          direct ou regarde les replays.
        </p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Desktop - Filtres */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            {filtersContent}
          </div>
        </aside>

        {/* Contenu principal */}
        <main className="flex-1 min-w-0">
          {/* Bouton Filtrer Mobile */}
          <div className="lg:hidden mb-6">
            <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrer
                  {hasActiveFilters && (
                    <span className="ml-2 px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                      {filteredEvents.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Filtres</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  {filtersContent}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Compteur total */}
          {hasActiveFilters && (
            <div className="mb-6 text-sm text-muted-foreground">
              {filteredEvents.length} événement{filteredEvents.length > 1 ? "s" : ""} trouvé{filteredEvents.length > 1 ? "s" : ""}
            </div>
          )}

          {/* Section Prochains événements */}
          {showUpcoming && (
            <section className="mb-16">
              <h2 className="font-heading text-xl font-semibold mb-6 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Prochains événements
              </h2>
              {isPending && upcoming.length === 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <EventCardSkeleton key={i} />
                  ))}
                </div>
              ) : upcoming.length > 0 ? (
                <div
                  className={cn(
                    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-200",
                    isPending && "opacity-50"
                  )}
                >
                  {upcoming.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-border/50 p-8 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {hasActiveFilters
                      ? "Aucun événement à venir ne correspond à vos filtres."
                      : "Aucun événement programmé pour le moment."}
                  </p>
                  {hasActiveFilters && (
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={resetFilters}
                    >
                      Réinitialiser les filtres
                    </Button>
                  )}
                </div>
              )}
            </section>
          )}

          {/* Section Replays */}
          {showReplays && (
            <section>
              <h2 className="font-heading text-xl font-semibold mb-6 flex items-center gap-2">
                <Play className="h-5 w-5 text-primary" />
                Replays disponibles
              </h2>
              {isPending && past.length === 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <EventCardSkeleton key={i} />
                  ))}
                </div>
              ) : past.length > 0 ? (
                <div
                  className={cn(
                    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-200",
                    isPending && "opacity-50"
                  )}
                >
                  {past.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-border/50 p-8 text-center">
                  <Play className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {hasActiveFilters
                      ? "Aucun replay ne correspond à vos filtres."
                      : "Les replays arrivent bientôt. Reste connecté !"}
                  </p>
                  {hasActiveFilters && (
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={resetFilters}
                    >
                      Réinitialiser les filtres
                    </Button>
                  )}
                </div>
              )}
            </section>
          )}

          {/* État vide global (si aucun résultat après filtres) */}
          {hasActiveFilters && filteredEvents.length === 0 && (
            <EmptyState onResetFilters={resetFilters} />
          )}
        </main>
      </div>
    </div>
  );
}

export function EventsClient({ events }: EventsClientProps) {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mb-8">
          <h1 className="font-heading text-3xl font-bold mb-4">Événements</h1>
          <p className="text-lg text-muted-foreground">
            Chargement des événements...
          </p>
        </div>
      </div>
    }>
      <EventsContent events={events} />
    </Suspense>
  );
}
