import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'
import { success, error } from '@/lib/utils'
import Loading from '@/components/admin/Loading'
import { Switch } from '@/components/ui/switch'
import { api } from '@/server/api/client'
import { refreshNavCarModelsPage } from '@/server/action/navCarModels'
import ImageUpload from '@/components/admin/ImageUpload'
import EditDialogSkeleton from './EditDialogSkeleton'

type Detail = {
  modelName: string
  modelImg: string
  order: number
  status: number
}

export interface EditDialogRef {
  open: (id: number) => void
}

const EditDialog = forwardRef<EditDialogRef>(function EditDialog({}, ref) {
  const [visible, setVisible] = useState<boolean>(false)
  const [id, setId] = useState<number | null>(null)
  const title = id ? '编辑车型' : '新增车型'
  const [detail, setDetail] = useState<Detail>({
    modelName: '',
    modelImg: '',
    order: 0,
    status: 1
  })
  const [loading, setLoading] = useState(false)
  const getDetail = async (id: number) => {
    setLoading(true)
    const resp = await api.navCarModels[':id'].$get({
      param: {
        id: id.toString()
      }
    })
    setLoading(false)
    const { data } = await resp.json()
    if (!data) return
    setDetail(data)
  }

  const open = (id: number) => {
    setId(id)
    setVisible(true)
    if (id) {
      getDetail(id)
    } else {
      setDetail({
        modelName: '',
        modelImg: '',
        order: 0,
        status: 1
      })
    }
  }

  useImperativeHandle(ref, () => ({
    open
  }))

  const handleAction = async () => {
    const json = {
      modelName: detail.modelName,
      modelImg: detail.modelImg,
      order: detail.order,
      status: detail.status
    }
    const req = id
      ? api.navCarModels[':id'].$post({ param: { id: id + '' }, json })
      : api.navCarModels.$put({ json })
    const resp = await req
    const { code, message } = await resp.json()
    if (code === 0) {
      success(message)
      setVisible(false)
      refreshNavCarModelsPage()
    } else {
      error(message)
    }
  }

  const imageList = detail.modelImg ? [detail.modelImg] : []

  const handleUploadImage = (index: number, imageUrl: string) => {
    setDetail({
      ...detail,
      modelImg: imageUrl
    })
  }

  const handleDeleteImage = () => {
    setDetail({
      ...detail,
      modelImg: ''
    })
  }

  if (loading)
    return (
      <Dialog open={visible}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <EditDialogSkeleton />
        </DialogContent>
      </Dialog>
    )

  return (
    <Dialog open={visible} onOpenChange={setVisible}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form action={handleAction} autoComplete="off">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="modelName" className="text-right">
                车型
              </Label>
              <Input
                name="modelName"
                value={detail?.modelName}
                className="col-span-3"
                onChange={(e) => {
                  setDetail({ ...detail, modelName: e.target.value as string })
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="modelImg" className="text-right">
                图片
              </Label>
              <div className="col-span-3">
                <ImageUpload
                  imageList={imageList}
                  max={1}
                  onUpload={handleUploadImage}
                  onDelete={handleDeleteImage}
                  uploadPath="nav-car-models"
                  width={400}
                  height={200}
                  color="black"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="order" className="text-right">
                排序
              </Label>
              <Input
                name="order"
                type="number"
                value={detail?.order}
                className="col-span-3"
                onChange={(e) => {
                  setDetail({ ...detail, order: parseInt(e.target.value) })
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                状态
              </Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Switch
                  id="status"
                  checked={detail?.status === 1}
                  onCheckedChange={(checked) => {
                    setDetail({ ...detail, status: checked ? 1 : 0 })
                  }}
                />
                <Label
                  htmlFor="status"
                  className="text-sm text-muted-foreground"
                >
                  {detail?.status === 1 ? '启用' : '禁用'}
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <ConfirmButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
})

export function ConfirmButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loading />}保存
    </Button>
  )
}

export default EditDialog
