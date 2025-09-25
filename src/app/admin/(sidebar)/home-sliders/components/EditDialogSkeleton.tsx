import { Skeleton } from '@/components/ui/skeleton'

export default function EditDialogSkeleton() {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <div className="text-right">
          <Skeleton className="h-4 w-16 ml-auto" />
        </div>
        <Skeleton className="h-10 col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <div className="text-right">
          <Skeleton className="h-4 w-16 ml-auto" />
        </div>
        <Skeleton className="h-10 col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <div className="text-right">
          <Skeleton className="h-4 w-16 ml-auto" />
        </div>
        <Skeleton className="h-40 col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <div className="text-right">
          <Skeleton className="h-4 w-16 ml-auto" />
        </div>
        <Skeleton className="h-10 col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <div className="text-right">
          <Skeleton className="h-4 w-16 ml-auto" />
        </div>
        <Skeleton className="h-6 w-12 col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-start gap-4">
        <div className="text-right">
          <Skeleton className="h-4 w-16 ml-auto" />
        </div>
        <div className="col-span-3 space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  )
}
