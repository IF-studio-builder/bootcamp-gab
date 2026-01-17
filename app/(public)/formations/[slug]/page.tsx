import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FormationPageProps {
  params: Promise<{ slug: string }>;
}

const formationTitles: Record<string, string> = {
  dev: "Dev Augmente",
  pm: "PM Augmente",
  designer: "Designer Augmente",
  ops: "Ops Augmente",
};

export async function generateMetadata({
  params,
}: FormationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = formationTitles[slug] || `Formation: ${slug}`;
  return {
    title,
    description: `Formation ${title} sur GAB - Gen AI Builders`,
  };
}

export default async function FormationPage({ params }: FormationPageProps) {
  const { slug } = await params;

  // TODO: Fetch formation from Supabase
  // const formation = await getFormation(slug);
  // if (!formation) notFound();

  const title = formationTitles[slug];
  if (!title) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/formations">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux formations
          </Link>
        </Button>

        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary">Bientot disponible</Badge>
        </div>

        <h1 className="font-heading text-3xl font-bold mb-4">{title}</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Ce parcours de formation est en cours de preparation. Inscris-toi a la
          newsletter pour etre informe de son lancement!
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>8 modules prevus</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>~20h de contenu</span>
          </div>
        </div>

        <div className="rounded-lg border border-border/50 p-8 text-center">
          <p className="text-muted-foreground mb-4">
            Le programme detaille sera bientot disponible.
          </p>
          <Button asChild>
            <Link href="/#newsletter">Recevoir les annonces</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
