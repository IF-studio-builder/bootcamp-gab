import type { Metadata } from "next";
import { Suspense } from "react";
import { EventsClient } from "./events-client";
import { readFile } from "fs/promises";
import { join } from "path";
import type { Event } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "Événements",
  description:
    "Meetups, webinars et workshops GenAI. Rejoins la communauté GAB.",
};

// Charger les événements depuis le JSON
async function getEvents(): Promise<Event[]> {
  try {
    const filePath = join(process.cwd(), "data", "events.json");
    const fileContents = await readFile(filePath, "utf8");
    const eventsData = JSON.parse(fileContents) as Event[];
    // Filtrer uniquement les événements publiés
    return eventsData.filter((event) => event.published);
  } catch (error) {
    console.error("Error loading events:", error);
    return [];
  }
}

export default async function EventsPage() {
  const events = await getEvents();

  return <EventsClient events={events} />;
}
