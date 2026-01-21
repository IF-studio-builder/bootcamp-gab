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
async function getEvents(): Promise<{ events: Event[]; error: string | null }> {
  try {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/36f7f96d-f01b-4642-a94b-44efa836e371',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:13',message:'getEvents entry',data:{hasUrl:!!process.env.NEXT_PUBLIC_SUPABASE_URL,hasKey:!!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,urlLength:process.env.NEXT_PUBLIC_SUPABASE_URL?.length||0,keyLength:process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length||0},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    
    // Vérification des variables d'environnement
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error("❌ Variables d'environnement Supabase manquantes");
      console.error("NEXT_PUBLIC_SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Définie" : "❌ Manquante");
      console.error("NEXT_PUBLIC_SUPABASE_ANON_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Définie" : "❌ Manquante");
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/36f7f96d-f01b-4642-a94b-44efa836e371',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:20',message:'env vars missing',data:{hasUrl:!!process.env.NEXT_PUBLIC_SUPABASE_URL,hasKey:!!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
      // #endregion
      return {
        events: [],
        error: "Configuration Supabase manquante. Veuillez vérifier les variables d'environnement.",
      };
    }

    // Validation du format de l'URL Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/36f7f96d-f01b-4642-a94b-44efa836e371',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:33',message:'URL validation',data:{urlLength:supabaseUrl.length,urlStartsWithHttps:supabaseUrl.startsWith('https://'),urlContainsPublishable:supabaseUrl.includes('_publishable_'),urlEndsWithSupabase:supabaseUrl.endsWith('.supabase.co')},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'F'})}).catch(()=>{});
    // #endregion
    if (!supabaseUrl.startsWith('https://') || !supabaseUrl.endsWith('.supabase.co') || supabaseUrl.includes('_publishable_')) {
      console.error("❌ Format d'URL Supabase invalide");
      console.error("URL actuelle:", supabaseUrl);
      console.error("Format attendu: https://[project-ref].supabase.co");
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/36f7f96d-f01b-4642-a94b-44efa836e371',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:38',message:'invalid URL format',data:{url:supabaseUrl,hasPublishable:supabaseUrl.includes('_publishable_')},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'F'})}).catch(()=>{});
      // #endregion
      return {
        events: [],
        error: `URL Supabase invalide. Format attendu: https://[project-ref].supabase.co. Vérifiez votre variable NEXT_PUBLIC_SUPABASE_URL dans .env.local`,
      };
    }

    console.log("🔍 Tentative de chargement des événements depuis Supabase...");
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/36f7f96d-f01b-4642-a94b-44efa836e371',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:27',message:'before createClient',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    const supabase = await createClient();
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/36f7f96d-f01b-4642-a94b-44efa836e371',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:28',message:'after createClient',data:{clientExists:!!supabase,hasFrom:typeof supabase?.from==='function'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/36f7f96d-f01b-4642-a94b-44efa836e371',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:30',message:'before query',data:{table:'ab_events',filter:'published=true',orderBy:'event_date'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B,C'})}).catch(()=>{});
    // #endregion
    const { data, error } = await supabase
      .from("ab_events")
      .select("*")
      .eq("published", true)
      .order("event_date", { ascending: false });
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/36f7f96d-f01b-4642-a94b-44efa836e371',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:34',message:'after query',data:{hasError:!!error,hasData:!!data,dataLength:data?.length||0,errorCode:error?.code,errorMessage:error?.message,errorDetails:error?.details,errorHint:error?.hint,fullError:error?JSON.stringify(error):null},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A,B,C,D,E'})}).catch(()=>{});
    // #endregion

    if (error) {
      console.error("❌ Error loading events from Supabase:", error);
      console.error("Détails de l'erreur:", JSON.stringify(error, null, 2));
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/36f7f96d-f01b-4642-a94b-44efa836e371',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:36',message:'error handler',data:{errorCode:error?.code,errorMessage:error?.message,errorDetails:error?.details,errorHint:error?.hint,fullError:error?JSON.stringify(error):null},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A,B,C,D,E'})}).catch(()=>{});
      // #endregion
      return {
        events: [],
        error: `Erreur de connexion à Supabase: ${error.message || "Erreur inconnue"}`,
      };
    }

    const events = (data as Event[]) || [];
    console.log(`✅ ${events.length} événement(s) chargé(s) depuis Supabase`);
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/36f7f96d-f01b-4642-a94b-44efa836e371',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:45',message:'success path',data:{dataLength:events.length,hasData:events.length>0},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    if (events.length > 0) {
      const firstEvent = events[0];
      console.log("Premier événement:", {
        id: firstEvent.id,
        title: firstEvent.title,
        published: firstEvent.published,
        event_date: firstEvent.event_date,
        city: firstEvent.city,
      });
    } else {
      console.warn("⚠️ Aucun événement trouvé dans la base de données avec published = true");
    }

    return {
      events,
      error: null,
    };
  } catch (error) {
    console.error("❌ Error loading events:", error);
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/36f7f96d-f01b-4642-a94b-44efa836e371',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:62',message:'catch block',data:{isError:error instanceof Error,errorName:error instanceof Error?error.name:null,errorMessage:error instanceof Error?error.message:String(error),errorStack:error instanceof Error?error.stack:null},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    if (error instanceof Error) {
      console.error("Message d'erreur:", error.message);
      console.error("Stack:", error.stack);
      return {
        events: [],
        error: `Erreur lors du chargement: ${error.message}`,
      };
    }
    return {
      events: [],
      error: "Une erreur inattendue est survenue lors du chargement des événements.",
    };
  }
}

export default async function EventsPage() {
  const { events, error } = await getEvents();
  console.log(`📊 Page Events: ${events.length} événement(s) passés au client`);

  return <EventsClient events={events} error={error} />;
}
