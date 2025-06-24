import { Skeleton } from "@/app/_components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex h-[310px] flex-col space-y-3">
      <Skeleton className="h-[220px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[80%]" />
        <Skeleton className="h-4 w-[80%]" />
      </div>
    </div>
  );
}
