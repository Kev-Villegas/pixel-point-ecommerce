import { Skeleton } from "@/app/_components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[200px] max-w-[225px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 max-w-[225px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
