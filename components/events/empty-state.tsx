import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onResetFilters: () => void;
}

export function EmptyState({ onResetFilters }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-border/50 p-12 text-center">
      <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
      <h3 className="font-heading text-lg font-semibold mb-2">
        Aucun événement ne correspond à vos critères
      </h3>
      <p className="text-muted-foreground mb-6">
        Essayez de modifier vos filtres pour voir plus de résultats.
      </p>
      <Button onClick={onResetFilters} variant="outline">
        Réinitialiser les filtres
      </Button>
    </div>
  );
}
