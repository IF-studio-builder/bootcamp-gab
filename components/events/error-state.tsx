import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  onRetry: () => void;
  error?: Error | null;
}

export function ErrorState({ onRetry, error }: ErrorStateProps) {
  return (
    <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-12 text-center">
      <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
      <h3 className="font-heading text-lg font-semibold mb-2 text-destructive">
        Erreur de chargement
      </h3>
      <p className="text-muted-foreground mb-2">
        Une erreur est survenue lors du chargement des événements.
      </p>
      {error && (
        <p className="text-sm text-muted-foreground mb-6">
          {error.message}
        </p>
      )}
      {!error && (
        <p className="text-sm text-muted-foreground mb-6">
          Impossible de charger les événements pour le moment. Veuillez réessayer.
        </p>
      )}
      <Button onClick={onRetry} variant="outline">
        <RefreshCw className="h-4 w-4 mr-2" />
        Réessayer
      </Button>
    </div>
  );
}
