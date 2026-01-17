import type { Metadata } from "next";
import Link from "next/link";
import { Code, Briefcase, Palette, Settings, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Formations",
  description:
    "Parcours de formation pour devenir Dev, PM, Designer ou Ops Augmente.",
};

const formations = [
  {
    id: "dev",
    title: "Dev Augmente",
    description:
      "Maitrise la programmation assistee par IA. Apprends a coder avec Claude, GitHub Copilot et les meilleurs outils GenAI.",
    icon: Code,
    modules: 8,
    status: "coming_soon",
  },
  {
    id: "pm",
    title: "PM Augmente",
    description:
      "Accelere ta productivite en product management. PRD, user stories, analyses de donnees avec l'IA.",
    icon: Briefcase,
    modules: 6,
    status: "coming_soon",
  },
  {
    id: "designer",
    title: "Designer Augmente",
    description:
      "Integre l'IA dans ton workflow design. Prototypage, generation d'assets, design systems automatises.",
    icon: Palette,
    modules: 5,
    status: "coming_soon",
  },
  {
    id: "ops",
    title: "Ops Augmente",
    description:
      "Automatise tes operations avec l'IA. DevOps, infrastructure, monitoring intelligent.",
    icon: Settings,
    modules: 5,
    status: "coming_soon",
  },
];

export default function FormationsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mb-12">
        <h1 className="font-heading text-3xl font-bold mb-4">Formations</h1>
        <p className="text-lg text-muted-foreground">
          Parcours structures pour maitriser la programmation assistee par IA.
          Choisis ton parcours et deviens un Builder augmente.
        </p>
      </div>

      {/* Formations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formations.map((formation) => (
          <Card key={formation.id} className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <formation.icon className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="secondary">
                  {formation.status === "coming_soon" ? "Bientot" : "Disponible"}
                </Badge>
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">
                {formation.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {formation.description}
              </p>
              <p className="text-xs text-muted-foreground">
                {formation.modules} modules prevus
              </p>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button asChild variant="outline" className="w-full" disabled>
                <Link href={`/formations/${formation.id}`}>
                  Voir le parcours
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
