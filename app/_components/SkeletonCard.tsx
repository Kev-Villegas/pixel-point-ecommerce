import { Skeleton } from "@/app/_components/ui/skeleton";
import { Card, CardContent } from "@/app/_components/ui/card";

export function SkeletonCard() {
  return (
    <Card className="w-full max-w-[220px] overflow-hidden">
      <div className="aspect-square w-full">
        <Skeleton className="h-full w-full" />
      </div>
      <CardContent className="flex h-[130px] flex-col justify-between p-2">
        <div className="space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-1/3" />
          <div className="flex gap-1">
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
