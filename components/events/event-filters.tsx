"use client";

import { MapPin, Calendar, Tag, Search, Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useEventFilters, type TypeCount, type PeriodCount } from "@/hooks/use-event-filters";
import type { Event } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface EventFiltersProps {
  events: Event[];
  className?: string;
}

export function EventFilters({ events, className }: EventFiltersProps) {
  const {
    filters,
    cityCounts,
    typeCounts,
    periodCounts,
    updateFilters,
    resetFilters,
    hasActiveFilters,
    isPending,
  } = useEventFilters(events);

  // État local pour le champ de recherche (pour le debouncing)
  const [searchInput, setSearchInput] = useState(filters.searchQuery || "");

  // Synchroniser l'input avec les filtres URL (pour le back/forward)
  useEffect(() => {
    setSearchInput(filters.searchQuery || "");
  }, [filters.searchQuery]);

  // Debounce la mise à jour de l'URL pour la recherche (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      // Ne mettre à jour que si la valeur a changé
      if (searchInput !== (filters.searchQuery || "")) {
        updateFilters({ searchQuery: searchInput });
      }
    }, 300);

    // Nettoyer le timer si l'utilisateur continue à taper
    return () => clearTimeout(timer);
  }, [searchInput, filters.searchQuery, updateFilters]);

  const handleSearchChange = (value: string) => {
    // Mettre à jour l'input immédiatement pour une réactivité visuelle
    setSearchInput(value);
    // La mise à jour de l'URL sera faite par le useEffect avec debounce
  };

  // Normaliser les villes pour la comparaison (insensible à la casse)
  const normalizeCity = (city: string) => city.toLowerCase();
  const isCitySelected = (city: string) => {
    const normalized = normalizeCity(city);
    return filters.cities.map(normalizeCity).includes(normalized);
  };

  const handleCityToggle = (city: string) => {
    const normalized = normalizeCity(city);
    const currentCities = filters.cities.map(normalizeCity);
    
    if (currentCities.includes(normalized)) {
      // Décocher
      updateFilters({
        cities: filters.cities.filter((c) => normalizeCity(c) !== normalized),
      });
    } else {
      // Cocher - utiliser la valeur normalisée en minuscules pour cohérence avec l'URL
      updateFilters({
        cities: [...filters.cities, normalized],
      });
    }
  };

  const handleTypeChange = (type: TypeCount["type"]) => {
    updateFilters({ type });
  };

  const handlePeriodChange = (period: PeriodCount["period"]) => {
    updateFilters({ period });
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-semibold">Filtres</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            disabled={isPending}
            className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground"
          >
            Réinitialiser
          </Button>
        )}
      </div>

      {/* Filtre Recherche Textuelle */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Label className="text-sm font-medium">Recherche</Label>
          {isPending && (
            <Loader2 className="h-3 w-3 text-muted-foreground animate-spin ml-auto" />
          )}
        </div>
        <Input
          type="text"
          placeholder="Rechercher un événement..."
          value={searchInput}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full"
          disabled={isPending}
        />
      </div>

      <Separator />

      {/* Filtre Ville */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <Label className="text-sm font-medium">Ville</Label>
        </div>
        <div className="space-y-2">
          {cityCounts.map(({ city, count }) => {
            const selected = isCitySelected(city);
            const disabled = count === 0 && !selected;
            
            return (
              <div
                key={city}
                className={cn(
                  "flex items-center space-x-2",
                  disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                <Checkbox
                  id={`city-${city}`}
                  checked={selected}
                  disabled={disabled || isPending}
                  onCheckedChange={() => !disabled && !isPending && handleCityToggle(city)}
                />
                <Label
                  htmlFor={`city-${city}`}
                  className={cn(
                    "text-sm font-normal cursor-pointer flex-1",
                    disabled && "cursor-not-allowed"
                  )}
                >
                  {city}
                  <span className="ml-2 text-muted-foreground">
                    ({count})
                  </span>
                </Label>
              </div>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Filtre Type */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-muted-foreground" />
          <Label className="text-sm font-medium">Type</Label>
        </div>
        <RadioGroup
          value={filters.type}
          onValueChange={(value) => handleTypeChange(value as TypeCount["type"])}
          disabled={isPending}
        >
          {typeCounts.map(({ type, label, count }) => {
            const disabled = count === 0 && type !== filters.type;
            
            return (
              <div
                key={type}
                className={cn(
                  "flex items-center space-x-2",
                  disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                <RadioGroupItem
                  value={type}
                  id={`type-${type}`}
                  disabled={disabled}
                />
                <Label
                  htmlFor={`type-${type}`}
                  className={cn(
                    "text-sm font-normal cursor-pointer flex-1",
                    disabled && "cursor-not-allowed"
                  )}
                >
                  {label}
                  <span className="ml-2 text-muted-foreground">
                    ({count})
                  </span>
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </div>

      <Separator />

      {/* Filtre Période */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Label className="text-sm font-medium">Période</Label>
        </div>
        <RadioGroup
          value={filters.period}
          onValueChange={(value) =>
            handlePeriodChange(value as PeriodCount["period"])
          }
          disabled={isPending}
        >
          {periodCounts.map(({ period, label, count }) => {
            const disabled = count === 0 && period !== filters.period;
            
            return (
              <div
                key={period}
                className={cn(
                  "flex items-center space-x-2",
                  disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                <RadioGroupItem
                  value={period}
                  id={`period-${period}`}
                  disabled={disabled}
                />
                <Label
                  htmlFor={`period-${period}`}
                  className={cn(
                    "text-sm font-normal cursor-pointer flex-1",
                    disabled && "cursor-not-allowed"
                  )}
                >
                  {label}
                  <span className="ml-2 text-muted-foreground">
                    ({count})
                  </span>
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
}
