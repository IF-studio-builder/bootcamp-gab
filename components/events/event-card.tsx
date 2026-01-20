import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Play, ExternalLink } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatEventDate } from "@/lib/utils";
import type { Event } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: Event;
}

// Couleurs des badges ville selon le PRD
const getCityBadgeVariant = (city: string | null | undefined): string => {
  if (!city) return "";
  const normalized = city.toLowerCase();
  
  switch (normalized) {
    case "lille":
      return "bg-green-500/10 text-green-700 border-green-500/20 dark:text-green-400 dark:bg-green-500/20 dark:border-green-500/30";
    case "paris":
      return "bg-blue-500/10 text-blue-700 border-blue-500/20 dark:text-blue-400 dark:bg-blue-500/20 dark:border-blue-500/30";
    case "lyon":
      return "bg-red-500/10 text-red-700 border-red-500/20 dark:text-red-400 dark:bg-red-500/20 dark:border-red-500/30";
    case "remote":
      return "bg-purple-500/10 text-purple-700 border-purple-500/20 dark:text-purple-400 dark:bg-purple-500/20 dark:border-purple-500/30";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

export function EventCard({ event }: EventCardProps) {
  const isPast = event.is_past || new Date(event.event_date) < new Date();

  return (
    <Card className="overflow-hidden transition-all hover:border-primary/50">
      {event.image_url && (
        <div className="relative aspect-video">
          <Image
            src={event.image_url}
            alt={event.title}
            fill
            className="object-cover"
          />
          {isPast && event.replay_url && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/60">
              <Play className="h-12 w-12 text-primary" />
            </div>
          )}
        </div>
      )}
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          {event.city && (
            <Badge
              variant="outline"
              className={cn(
                "text-xs font-medium",
                getCityBadgeVariant(event.city)
              )}
            >
              {event.city}
            </Badge>
          )}
          <Badge variant={isPast ? "secondary" : "default"}>
            {event.event_type}
          </Badge>
          {isPast && event.replay_url && (
            <Badge variant="outline">Replay disponible</Badge>
          )}
        </div>
        <h3 className="font-heading text-lg font-semibold mb-2 line-clamp-2">
          {event.title}
        </h3>
        <div className="space-y-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatEventDate(event.event_date)}</span>
          </div>
          {event.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {isPast && event.replay_url ? (
          <Button asChild variant="secondary" className="w-full">
            <Link href={event.replay_url} target="_blank">
              <Play className="h-4 w-4 mr-2" />
              Voir le replay
            </Link>
          </Button>
        ) : event.registration_url ? (
          <Button asChild className="w-full">
            <Link href={event.registration_url} target="_blank">
              <ExternalLink className="h-4 w-4 mr-2" />
              S&apos;inscrire
            </Link>
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}
