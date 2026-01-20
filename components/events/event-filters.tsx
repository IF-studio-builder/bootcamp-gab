"use client";

import { MapPin, Calendar, Tag } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useEventFilters, type TypeCount, type PeriodCount } from "@/hooks/use-event-filters";
import type { Event } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

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
  } = useEventFilters(events);

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
            className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground"
          >
            Réinitialiser
          </Button>
        )}
      </div>

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
                  disabled={disabled}
                  onCheckedChange={() => !disabled && handleCityToggle(city)}
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
