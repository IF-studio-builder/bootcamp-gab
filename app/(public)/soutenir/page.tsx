import type { Metadata } from "next";
import Link from "next/link";
import { Heart, Building2, Coffee, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Soutenir GAB",
  description:
    "Soutenez la communaute GAB - Gen AI Builders. Donations et partenariats.",
};

export default function SoutenirPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="font-heading text-3xl font-bold mb-4">Soutenir GAB</h1>
        <p className="text-lg text-muted-foreground">
          GAB est une initiative communautaire independante. Votre soutien nous
          permet de continuer a organiser des events gratuits et creer du
          contenu de qualite pour la communaute.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
        {/* Individual Support */}
        <Card className="border-border/50">
          <CardHeader>
            <Heart className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="font-heading">Faire un don</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Soutenez GAB avec une donation ponctuelle ou recurrente. Chaque
              contribution aide a financer les events et le contenu.
            </p>
            <Button className="w-full" disabled>
              <Coffee className="h-4 w-4 mr-2" />
              Bientot disponible
            </Button>
          </CardContent>
        </Card>

        {/* Partnership */}
        <Card className="border-border/50">
          <CardHeader>
            <Building2 className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="font-heading">Devenir partenaire</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              ESN, editeurs, startups : rejoignez notre ecosysteme et touchez
              une communaute engagee de professionnels GenAI.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link href="mailto:contact@gab.community">
                <Mail className="h-4 w-4 mr-2" />
                Nous contacter
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Why Support */}
      <div className="max-w-3xl mx-auto">
        <h2 className="font-heading text-xl font-semibold mb-6 text-center">
          Pourquoi soutenir GAB ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <p className="text-sm text-muted-foreground">
              Contenu gratuit et accessible
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">0</div>
            <p className="text-sm text-muted-foreground">
              Publicite ou tracking intrusif
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">Lille</div>
            <p className="text-sm text-muted-foreground">
              Initiative locale qui rayonne
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
