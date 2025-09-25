import { getSiteProfile } from '@/lib/dal'
import TopNavigator from './index'
import { getNavCarModels } from '@/server/action/navCarModels'

export default async function TopNavigatorWrapper() {
  const carModelList = await getNavCarModels({ status: 1 })
  const profile = await getSiteProfile()
  return <TopNavigator carModelList={carModelList} profile={profile} />
}
