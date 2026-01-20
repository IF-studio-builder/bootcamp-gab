import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function EventCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      {/* Image skeleton */}
      <div className="relative aspect-video bg-muted">
        <Skeleton className="h-full w-full" />
      </div>
      <CardContent className="p-4">
        {/* Badges skeleton */}
        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>
        {/* Title skeleton */}
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-5 w-3/4 mb-4" />
        {/* Date and location skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-40" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {/* Button skeleton */}
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}
