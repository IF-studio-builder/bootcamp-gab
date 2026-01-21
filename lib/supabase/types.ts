export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          id: string;
          slug: string;
          title: string;
          content: string | null;
          excerpt: string | null;
          category: string | null;
          tags: string[] | null;
          featured_image: string | null;
          published: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          content?: string | null;
          excerpt?: string | null;
          category?: string | null;
          tags?: string[] | null;
          featured_image?: string | null;
          published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          content?: string | null;
          excerpt?: string | null;
          category?: string | null;
          tags?: string[] | null;
          featured_image?: string | null;
          published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      resources: {
        Row: {
          id: string;
          slug: string;
          title: string;
          content: string | null;
          type: "guide" | "skill" | "template" | "prompt";
          parcours: string[] | null;
          difficulty: "beginner" | "intermediate" | "advanced" | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          content?: string | null;
          type: "guide" | "skill" | "template" | "prompt";
          parcours?: string[] | null;
          difficulty?: "beginner" | "intermediate" | "advanced" | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          content?: string | null;
          type?: "guide" | "skill" | "template" | "prompt";
          parcours?: string[] | null;
          difficulty?: "beginner" | "intermediate" | "advanced" | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      formations: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string | null;
          parcours: string;
          modules: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          description?: string | null;
          parcours: string;
          modules?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          description?: string | null;
          parcours?: string;
          modules?: Json | null;
          created_at?: string;
        };
      };
      subscribers: {
        Row: {
          id: string;
          email: string;
          confirmed: boolean;
          parcours: string[] | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          confirmed?: boolean;
          parcours?: string[] | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          confirmed?: boolean;
          parcours?: string[] | null;
          created_at?: string;
        };
      };
      partners: {
        Row: {
          id: string;
          name: string;
          logo_url: string | null;
          website: string | null;
          active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          logo_url?: string | null;
          website?: string | null;
          active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          logo_url?: string | null;
          website?: string | null;
          active?: boolean;
          created_at?: string;
        };
      };
      ab_events: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string | null;
          event_date: string;
          event_end_date: string | null;
          location: string | null;
          address: string | null;
          coordinates: number[] | null;
          city: string | null;
          image_url: string | null;
          registration_url: string | null;
          replay_url: string | null;
          is_past: boolean;
          event_type: "meetup" | "webinar" | "workshop" | "conference";
          capacity: number | null;
          registered_count: number | null;
          tags: string[] | null;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          description?: string | null;
          event_date: string;
          event_end_date?: string | null;
          location?: string | null;
          address?: string | null;
          coordinates?: number[] | null;
          city?: string | null;
          image_url?: string | null;
          registration_url?: string | null;
          replay_url?: string | null;
          is_past?: boolean;
          event_type: "meetup" | "webinar" | "workshop" | "conference";
          capacity?: number | null;
          registered_count?: number | null;
          tags?: string[] | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          description?: string | null;
          event_date?: string;
          event_end_date?: string | null;
          location?: string | null;
          address?: string | null;
          coordinates?: number[] | null;
          city?: string | null;
          image_url?: string | null;
          registration_url?: string | null;
          replay_url?: string | null;
          is_past?: boolean;
          event_type?: "meetup" | "webinar" | "workshop" | "conference";
          capacity?: number | null;
          registered_count?: number | null;
          tags?: string[] | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      events: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string | null;
          event_date: string;
          event_end_date: string | null;
          location: string | null;
          city: string | null;
          image_url: string | null;
          registration_url: string | null;
          replay_url: string | null;
          is_past: boolean;
          event_type: "meetup" | "webinar" | "workshop" | "conference";
          capacity: number | null;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          description?: string | null;
          event_date: string;
          event_end_date?: string | null;
          location?: string | null;
          city?: string | null;
          image_url?: string | null;
          registration_url?: string | null;
          replay_url?: string | null;
          is_past?: boolean;
          event_type: "meetup" | "webinar" | "workshop" | "conference";
          capacity?: number | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          description?: string | null;
          event_date?: string;
          event_end_date?: string | null;
          location?: string | null;
          city?: string | null;
          image_url?: string | null;
          registration_url?: string | null;
          replay_url?: string | null;
          is_past?: boolean;
          event_type?: "meetup" | "webinar" | "workshop" | "conference";
          capacity?: number | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// Type helpers
export type Article = Database["public"]["Tables"]["articles"]["Row"];
export type Resource = Database["public"]["Tables"]["resources"]["Row"];
export type Formation = Database["public"]["Tables"]["formations"]["Row"];
export type Subscriber = Database["public"]["Tables"]["subscribers"]["Row"];
export type Partner = Database["public"]["Tables"]["partners"]["Row"];
export type Event = Database["public"]["Tables"]["ab_events"]["Row"];
