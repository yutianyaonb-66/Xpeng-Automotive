import RefreshButton from './components/RefreshButton'
import Table from './components/Table'
import { getUsers, UserItem } from '@/server/action/users'

export default async function UsersPage() {
  const users: UserItem[] = await getUsers()

  return (
    <div className="p-4">
      <h1 className="flex items-center mb-4">
        <RefreshButton />
      </h1>
      <Table data={users} />
    </div>
  )
}
