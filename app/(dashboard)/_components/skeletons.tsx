import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton () {
  return (
    <div className="flex flex-col gap-4 pb-4">
      <div className="flex justify-between items-center">
        <Skeleton className="w-[200px] h-[40px]" />
        <Skeleton className="w-[130px] h-[40px]" />
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
