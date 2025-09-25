'use client'

import { ColumnDef } from '@tanstack/react-table'
import {
  refreshNavCarModelsPage,
  type ListNavCarModelItem
} from '@/server/action/navCarModels'
import { DataTable } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import RefreshButton from './RefreshButton'
import { useRef } from 'react'
import EditDialog, { EditDialogRef } from './EditDialog'
import { confirm, error } from '@/lib/utils'
import { success } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { api } from '@/server/api/client'
import Image from 'next/image'

export default function Table({ data }: { data: ListNavCarModelItem[] }) {
  const columns: ColumnDef<ListNavCarModelItem>[] = [
    {
      header: 'ID',
      accessorKey: 'id'
    },
    {
      header: '车型',
      accessorKey: 'modelName'
    },
    {
      header: '图片',
      accessorKey: 'modelImg',
      cell: ({ row }) => {
        return (
          <div className="w-[100px] h-[50px] relative">
            <Image src={row.original.modelImg} alt="车型图片" fill />
          </div>
        )
      }
    },
    {
      accessorKey: 'order',
      header: '排序'
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
      title: '删除车型',
      description: '确定要删除该车型吗？'
    })
    if (!isConfirm) return
    const resp = await api.navCarModels[':id'].$delete({
      param: {
        id: id + ''
      }
    })
    const { code, message } = await resp.json()
    if (code === 0) {
      success(message)
      refreshNavCarModelsPage()
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
          新增车型
        </Button>
        <RefreshButton />
      </div>
      <DataTable columns={columns} data={data} />
      <EditDialog ref={editDialogRef} />
    </div>
  )
}
