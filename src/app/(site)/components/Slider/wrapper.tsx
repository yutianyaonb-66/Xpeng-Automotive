import { getHomeSliders } from '@/server/action/homeSliders'
import Slider from './index'

export default async function SliderWrapper() {
  const data = await getHomeSliders('1')
  if (data.length === 0) {
    return null
  }
  return <Slider sliderList={data} />
}
