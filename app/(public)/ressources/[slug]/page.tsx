import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResourcePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ResourcePageProps): Promise<Metadata> {
  const { slug } = await params;
  // TODO: Fetch resource from Supabase and return metadata
  return {
    title: `Ressource: ${slug}`,
    description: "Ressource sur GAB - Gen AI Builders",
  };
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { slug } = await params;

  // TODO: Fetch resource from Supabase
  // const resource = await getResource(slug);
  // if (!resource) notFound();

  if (!slug) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/ressources">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux ressources
          </Link>
        </Button>

        <h1 className="font-heading text-3xl font-bold mb-4">
          Ressource: {slug}
        </h1>
        <p className="text-muted-foreground mb-8">
          Cette ressource sera bientot disponible.
        </p>

        <div className="prose prose-invert max-w-none">
          <p>Contenu de la ressource a venir...</p>
        </div>
      </div>
    </article>
  );
}
