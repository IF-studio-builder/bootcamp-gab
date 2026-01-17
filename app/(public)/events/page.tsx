import type { Metadata } from "next";
import { Calendar, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Meetups, webinars et workshops GenAI. Rejoins la communaute GAB.",
};

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mb-12">
        <h1 className="font-heading text-3xl font-bold mb-4">Events</h1>
        <p className="text-lg text-muted-foreground">
          Meetups, webinars et workshops avec des experts GenAI. Participe en
          direct ou regarde les replays.
        </p>
      </div>

      {/* Upcoming Events */}
      <section className="mb-16">
        <h2 className="font-heading text-xl font-semibold mb-6 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Prochains events
        </h2>
        <div className="rounded-lg border border-border/50 p-8 text-center">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">
            Aucun event programme pour le moment.
          </p>
          <Button variant="outline">Recevoir les annonces</Button>
        </div>
      </section>

      {/* Past Events / Replays */}
      <section>
        <h2 className="font-heading text-xl font-semibold mb-6 flex items-center gap-2">
          <Play className="h-5 w-5 text-primary" />
          Replays disponibles
        </h2>
        <div className="rounded-lg border border-border/50 p-8 text-center">
          <Play className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            Les replays arrivent bientot. Reste connecte!
          </p>
        </div>
      </section>
    </div>
  );
}
