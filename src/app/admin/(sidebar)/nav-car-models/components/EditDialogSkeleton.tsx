import { Skeleton } from '@/components/ui/skeleton'
import { Label } from '@/components/ui/label'

export default function EditDialogSkeleton() {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right">车型</Label>
        <Skeleton className="col-span-3 h-10" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right">图片</Label>
        <Skeleton className="col-span-3 h-[200px]" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right">排序</Label>
        <Skeleton className="col-span-3 h-10" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right">状态</Label>
        <div className="col-span-3">
          <Skeleton className="h-6 w-[100px]" />
        </div>
      </div>
    </div>
  )
}
