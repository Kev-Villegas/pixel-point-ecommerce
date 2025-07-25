import { Skeleton } from "@/app/_components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex h-[350px] flex-col space-y-3">
      <Skeleton className="h-[220px] w-full rounded-xl" />
      <div className="space-y-2 px-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[80%]" />
      </div>
      <div className="flex grow items-end justify-between px-2">
        <Skeleton className="h-8 w-[40%]" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
}
