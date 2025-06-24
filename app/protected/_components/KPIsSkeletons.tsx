import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Skeleton } from "@/app/_components/ui/skeleton";

export function KPIsSkeleton() {
  return (
    <div className="grid gap-4 space-x-1 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex-row items-center gap-x-2 space-y-0 p-6">
            <Skeleton className="h-5 w-5 rounded-full" />
            <CardTitle className="text-sm font-medium">
              <Skeleton className="h-4 w-24" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-6 w-20" />
            {i === 1 && <Skeleton className="h-3 w-24" />}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
