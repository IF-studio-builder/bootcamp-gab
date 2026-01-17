import type { Metadata } from "next";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles, guides et actualites sur l'IA generative et la programmation assistee.",
};

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mb-12">
        <h1 className="font-heading text-3xl font-bold mb-4">Blog</h1>
        <p className="text-lg text-muted-foreground">
          Articles, guides et actualites sur l&apos;IA generative et la
          programmation assistee par IA.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="rounded-lg border border-border/50 p-8 text-center">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">
          Les premiers articles arrivent bientot. Reste connecte!
        </p>
      </div>
    </div>
  );
}
