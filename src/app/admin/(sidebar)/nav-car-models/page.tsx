import { getNavCarModels } from '@/server/action/navCarModels'
import Table from './components/Table'

export default async function NavCarModels() {
  const data = await getNavCarModels()

  return (
    <div className="p-4">
      <Table data={data} />
    </div>
  )
}
