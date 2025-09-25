'use client'

import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import RefreshButton from './RefreshButton'
import { useRef } from 'react'
import EditDialog, { EditDialogRef } from './EditDialog'
import { cn, confirm, error, success } from '@/lib/utils'
import {
  refreshHomeSliderPage,
  type HomeSliderListItem
} from '@/server/action/homeSliders'
import { api } from '@/server/api/client'
import Image from 'next/image'

export default function Table({ data }: { data: HomeSliderListItem[] }) {
  const columns: ColumnDef<HomeSliderListItem>[] = [
    {
      header: 'ID',
      accessorKey: 'id'
    },
    {
      header: '标题',
      accessorKey: 'title'
    },
    {
      header: '副标题',
      accessorKey: 'subtitle'
    },
    {
      header: '图片',
      accessorKey: 'img',
      cell: ({ row }) => {
        return (
          <div className="w-[100px] h-[50px] relative">
            <Image src={row.original.img} alt="轮播图" fill />
          </div>
        )
      }
    },
    {
      header: '排序',
      accessorKey: 'order',
      cell: ({ row }) => {
        return <div className="w-[50px]">{row.original.order}</div>
      }
    },
    {
      header: '状态',
      accessorKey: 'status',
      cell: ({ row }) => {
        return (
          <div
            className={cn(
              'w-[50px]',
              row.original.status === 1 ? 'text-green-500' : 'text-red-500'
            )}
          >
            {row.original.status === 1 ? '启用' : '禁用'}
          </div>
        )
      }
    },
    {
      header: '操作',
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <Button onClick={() => handleEditItem(row.original.id)}>
              编辑
            </Button>
            <Button
              className="ml-[10px]"
              variant="destructive"
              onClick={() => handleDeleteItem(row.original.id)}
            >
              删除
            </Button>
          </div>
        )
      }
    }
  ]

  const editDialogRef = useRef<EditDialogRef>(null)

  const handleEditItem = (id: number) => {
    editDialogRef.current?.open(id)
  }

  const handleDeleteItem = async (id: number) => {
    const isConfirm = await confirm({
      title: '删除轮播图',
      description: '确定要删除该轮播图吗？'
    })
    if (!isConfirm) return
    const resp = await api.homeSliders[':id'].$delete({
      param: { id: id.toString() }
    })
    const { code, message } = await resp.json()
    if (code === 0) {
      success(message)
      refreshHomeSliderPage()
    } else {
      error(message)
    }
  }

  return (
    <div>
      <div className="mb-[10px] flex items-center">
        <Button
          className="mr-[12px]"
          onClick={() => {
            editDialogRef.current?.open(0)
          }}
        >
          新增轮播图
        </Button>
        <RefreshButton />
      </div>
      <DataTable columns={columns} data={data} />
      <EditDialog ref={editDialogRef} />
    </div>
  )
}
