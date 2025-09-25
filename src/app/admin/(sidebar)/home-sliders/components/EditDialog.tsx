'use client'

import { Button } from '@/components/ui/button'
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
import { error, success } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import Loading from '@/components/admin/Loading'
import { useFormStatus } from 'react-dom'
import { Switch } from '@/components/ui/switch'
import { api } from '@/server/api/client'
import type { ButtonItem } from '@/server/api/routes/homeSliders'

import { refreshHomeSliderPage } from '@/server/action/homeSliders'
import ImageUpload from '@/components/admin/ImageUpload'
import EditDialogSkeleton from './EditDialogSkeleton'
export type EditDialogRef = {
  open: (id: number) => void
}

interface ButtonConfigProps {
  buttons: ButtonItem[]
  onAdd: (button: ButtonItem) => void
  onUpdate: (index: number, button: ButtonItem) => void
  onDelete: (index: number) => void
}

function ButtonConfig({
  buttons,
  onAdd,
  onUpdate,
  onDelete
}: ButtonConfigProps) {
  const [editingButton, setEditingButton] = useState<ButtonItem | null>(null)
  const [buttonText, setButtonText] = useState('')
  const [buttonHref, setButtonHref] = useState('')

  const handleAdd = () => {
    if (!buttonText || !buttonHref) return
    onAdd({ text: buttonText, href: buttonHref })
    setButtonText('')
    setButtonHref('')
  }

  const handleEdit = (index: number) => {
    const button = buttons[index]
    setEditingButton(button)
    setButtonText(button.text)
    setButtonHref(button.href)
  }

  const handleUpdate = () => {
    if (!buttonText || !buttonHref) return
    const index = buttons.findIndex((b) => b === editingButton)
    if (index === -1) return

    onUpdate(index, { text: buttonText, href: buttonHref })
    setEditingButton(null)
    setButtonText('')
    setButtonHref('')
  }

  return (
    <div className="col-span-3 space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">按钮文字</TableHead>
            <TableHead>链接地址</TableHead>
            <TableHead className="w-[100px]">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {buttons.map((button, index) => (
            <TableRow key={index}>
              <TableCell>{button.text}</TableCell>
              <TableCell>{button.href}</TableCell>
              <TableCell className="space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(index)}
                  type="button"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(index)}
                  type="button"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex gap-2">
        <Input
          placeholder="按钮文字"
          value={buttonText}
          onChange={(e) => setButtonText(e.target.value)}
          className="w-[200px]"
        />
        <Input
          placeholder="链接地址"
          value={buttonHref}
          onChange={(e) => setButtonHref(e.target.value)}
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          onClick={editingButton ? handleUpdate : handleAdd}
        >
          {editingButton ? '更新' : '添加'}
          {!editingButton && <Plus className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}

export function ConfirmButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loading />}确定
    </Button>
  )
}

export default forwardRef<EditDialogRef>(function EditDialog(props, ref) {
  const [visible, setVisible] = useState(false)
  const [id, setId] = useState(0)
  const [detail, setDetail] = useState<{
    img: string
    title: string
    subtitle: string
    buttons: ButtonItem[]
    order: number
    status: number
  }>({
    img: '',
    title: '',
    subtitle: '',
    buttons: [],
    order: 0,
    status: 0
  })

  const title = id ? '编辑轮播图' : '新增轮播图'

  const [loading, setLoading] = useState(false)
  const open = async (id: number) => {
    setId(id)
    setVisible(true)
    if (id) {
      setLoading(true)
      const resp = await api.homeSliders[':id'].$get({
        param: { id: id + '' }
      })
      const { data, code } = await resp.json()
      setLoading(false)
      if (code !== 0 || !data) return
      setDetail({
        title: data.title,
        subtitle: data.subtitle,
        img: data.img,
        buttons: data.buttons as ButtonItem[],
        order: data.order,
        status: data.status
      })
    } else {
      setDetail({
        img: '',
        title: '',
        subtitle: '',
        buttons: [],
        order: 0,
        status: 0
      })
    }
  }

  useImperativeHandle(ref, () => ({
    open
  }))

  const handleAction = async () => {
    const req = id
      ? api.homeSliders[':id'].$post({
          param: { id: id + '' },
          json: detail
        })
      : api.homeSliders.$put({ json: detail })
    const resp = await req
    const { message, code } = await resp.json()
    if (code === 0) {
      success(message)
      setVisible(false)
      refreshHomeSliderPage()
    } else {
      error(message)
    }
  }

  const handleAddButton = (button: ButtonItem) => {
    setDetail({
      ...detail,
      buttons: [...detail.buttons, button]
    })
  }

  const handleUpdateButton = (index: number, button: ButtonItem) => {
    const newButtons = [...detail.buttons]
    newButtons[index] = button
    setDetail({
      ...detail,
      buttons: newButtons
    })
  }

  const handleDeleteButton = async (index: number) => {
    setDetail({
      ...detail,
      buttons: detail.buttons.filter((_, i) => i !== index)
    })
  }

  const imageList = detail.img ? [detail.img] : []

  const handleUploadImage = (index: number, imageUrl: string) => {
    setDetail({
      ...detail,
      img: imageUrl
    })
  }

  const handleDeleteImage = () => {
    setDetail({
      ...detail,
      img: ''
    })
  }
  if (loading)
    return (
      <Dialog open={visible} onOpenChange={setVisible}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <EditDialogSkeleton />
        </DialogContent>
      </Dialog>
    )

  return (
    <Dialog open={visible} onOpenChange={setVisible}>
      <DialogContent className="sm:max-w-[800px]">
        <form action={handleAction} autoComplete="off">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                标题
              </Label>
              <Input
                name="title"
                value={detail?.title}
                className="col-span-3"
                onChange={(e) => {
                  setDetail({ ...detail, title: e.target.value })
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subtitle" className="text-right">
                副标题
              </Label>
              <Input
                name="subtitle"
                value={detail?.subtitle}
                className="col-span-3"
                onChange={(e) => {
                  setDetail({ ...detail, subtitle: e.target.value })
                }}
              />
            </div>
            <div className="grid grid-cols-4  items-center gap-4">
              <Label htmlFor="img" className="text-right">
                图片
              </Label>
              <div className="col-span-3">
                <ImageUpload
                  imageList={imageList}
                  max={1}
                  onUpload={handleUploadImage}
                  onDelete={handleDeleteImage}
                  uploadPath="home-sliders"
                  width={400}
                  height={200}
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
                  setDetail({ ...detail, order: parseInt(e.target.value) || 0 })
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
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right mt-2">按钮配置</Label>
              <ButtonConfig
                buttons={detail.buttons}
                onAdd={handleAddButton}
                onUpdate={handleUpdateButton}
                onDelete={handleDeleteButton}
              />
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
