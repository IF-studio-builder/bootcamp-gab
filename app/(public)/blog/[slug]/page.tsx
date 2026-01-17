import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  // TODO: Fetch article from Supabase and return metadata
  return {
    title: `Article: ${slug}`,
    description: "Article sur GAB - Gen AI Builders",
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  // TODO: Fetch article from Supabase
  // const article = await getArticle(slug);
  // if (!article) notFound();

  // Placeholder for now
  if (!slug) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au blog
          </Link>
        </Button>

        <h1 className="font-heading text-3xl font-bold mb-4">
          Article: {slug}
        </h1>
        <p className="text-muted-foreground mb-8">
          Cet article sera bientot disponible.
        </p>

        <div className="prose prose-invert max-w-none">
          <p>Contenu de l&apos;article a venir...</p>
        </div>
      </div>
    </article>
  );
}
