'use client'

import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import { UserItem } from '@/server/action/users'
import { useMemo } from 'react'

export default function Table({ data }: { data: UserItem[] }) {
  const columns: ColumnDef<UserItem>[] = useMemo(
    () => [
      {
        header: 'ID',
        accessorKey: 'id'
      },
      {
        header: '手机号',
        accessorKey: 'phone'
      },
      {
        header: '创建时间',
        accessorKey: 'createdAt'
      },
      {
        header: '更新时间',
        accessorKey: 'updatedAt'
      }
    ],
    []
  )

  return <DataTable columns={columns} data={data} />
}
