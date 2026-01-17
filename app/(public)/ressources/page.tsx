import type { Metadata } from "next";
import { FileText, Code, Layout, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Ressources",
  description:
    "Guides, skills Claude, templates et prompts pour devenir un Builder augmente.",
};

const resourceTypes = [
  { id: "guide", label: "Guides", icon: FileText },
  { id: "skill", label: "Skills Claude", icon: Code },
  { id: "template", label: "Templates", icon: Layout },
  { id: "prompt", label: "Prompts", icon: MessageSquare },
];

const parcours = [
  { id: "dev", label: "Dev Augmente" },
  { id: "pm", label: "PM Augmente" },
  { id: "designer", label: "Designer Augmente" },
  { id: "ops", label: "Ops Augmente" },
];

export default function RessourcesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mb-12">
        <h1 className="font-heading text-3xl font-bold mb-4">
          Centre de Ressources
        </h1>
        <p className="text-lg text-muted-foreground">
          Guides pratiques, skills Claude, templates et prompts actionnables
          pour accelerer ton adoption de l&apos;IA generative.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        {/* Type filters */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground mr-2">Type:</span>
          {resourceTypes.map((type) => (
            <Badge
              key={type.id}
              variant="outline"
              className="cursor-pointer hover:bg-primary/10"
            >
              <type.icon className="h-3 w-3 mr-1" />
              {type.label}
            </Badge>
          ))}
        </div>

        {/* Parcours filters */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground mr-2">Parcours:</span>
          {parcours.map((p) => (
            <Badge
              key={p.id}
              variant="outline"
              className="cursor-pointer hover:bg-primary/10"
            >
              {p.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Resources Grid */}
      <div className="rounded-lg border border-border/50 p-8 text-center">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">
          Les ressources arrivent bientot. Reste connecte!
        </p>
      </div>
    </div>
  );
}
