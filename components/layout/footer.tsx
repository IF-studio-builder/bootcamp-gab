import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  platform: [
    { name: "Events", href: "/events" },
    { name: "Blog", href: "/blog" },
    { name: "Ressources", href: "/ressources" },
    { name: "Formations", href: "/formations" },
  ],
  community: [
    { name: "Discord", href: "https://discord.gg/gab", external: true },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/gab",
      external: true,
    },
    { name: "Soutenir GAB", href: "/soutenir" },
  ],
  legal: [
    { name: "Mentions legales", href: "/mentions-legales" },
    { name: "Politique de confidentialite", href: "/confidentialite" },
    { name: "CGU", href: "/cgu" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Image
              src="/assets/logos/GAB Logo full white.png"
              alt="GAB - Gen AI Builders"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
            <p className="text-sm text-muted-foreground">
              Pour celles et ceux qui construisent vraiment avec la GenAI.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Plateforme</h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Communaute</h3>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} GAB - Gen AI Builders. Tous droits
            reserves.
          </p>
          <p className="text-sm text-muted-foreground">
            Fait avec passion a Lille
          </p>
        </div>
      </div>
    </footer>
  );
}
