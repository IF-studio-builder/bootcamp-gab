import type { Metadata } from "next";
import { EventsClient } from "./events-client";
import { createClient } from "@/lib/supabase/server";
import type { Event } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "Événements",
  description:
    "Meetups, webinars et workshops GenAI. Rejoins la communauté GAB.",
};

// Charger les événements depuis Supabase
async function getEvents(): Promise<Event[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("ab_events")
      .select("*")
      .eq("published", true)
      .order("event_date", { ascending: false });

    if (error) {
      console.error("Error loading events from Supabase:", error);
      return [];
    }

    return (data as Event[]) || [];
  } catch (error) {
    console.error("Error loading events:", error);
    return [];
  }
}

export default async function EventsPage() {
  const events = await getEvents();

  return <EventsClient events={events} />;
}
