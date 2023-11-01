import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton () {
  return (
    <div className="flex flex-col gap-4 pb-4">
      <Skeleton className="w-[200px] h-[40px]" />

      <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-4">
        <Skeleton className="w-full h-[450px] rounded-lg" />
        <Skeleton className="w-full h-[450px] rounded-lg" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="w-full h-[128px] rounded-lg" />

        <Skeleton className="w-full h-[128px] rounded-lg" />

        <Skeleton className="w-full h-[128px] rounded-lg" />

        <Skeleton className="w-full h-[128px] rounded-lg" />
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        <Skeleton className="h-[450px] rounded-lg col-span-2" />

        <Skeleton className="h-[450px] rounded-lg col-span-2" />
      </div>
    </div>
  )
}
