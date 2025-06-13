import { Skeleton } from "@/app/_components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex h-full flex-col space-y-3">
      <Skeleton className="h-[200px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[80%]" />
      </div>
    </div>
  );
}
