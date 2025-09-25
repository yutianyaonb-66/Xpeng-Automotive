'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'
import { type CarouselApi } from '@/components/ui/carousel'

import Autoplay from 'embla-carousel-autoplay'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { GoX } from 'react-icons/go'
import Link from 'next/link'
import HoverButton from '../HoverButton'
import type { HomeSliderListItem } from '@/server/action/homeSliders'
import Image from 'next/image'
function Indicator({
  current,
  length,
  setCurrent
}: {
  current: number
  length: number
  setCurrent: (current: number) => void
}) {
  return (
    <div className="absolute z-[10] bottom-[28px] left-1/2 -translate-x-1/2 flex items-center gap-[4px]">
      {Array.from({ length }).map((_, index) => (
        <div
          key={index}
          className="w-[44px] h-[44px] flex items-center justify-center cursor-pointer"
          onClick={() => setCurrent(index)}
        >
          <div
            className={clsx(
              'w-full h-[3px] rounded-full',
              current === index ? 'bg-[#a4ce4c]' : 'bg-[hsla(0,0%,100%,.3)]'
            )}
            style={{ transform: 'skewX(-30deg)' }}
          />
        </div>
      ))}
    </div>
  )
}

export default function Slider({
  sliderList
}: {
  sliderList: HomeSliderListItem[]
}) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const autoplay = api?.plugins().autoplay
  // TODO 调整字体
  return (
    <div className="relative">
      <Indicator
        current={current}
        length={sliderList.length}
        setCurrent={(current) => {
          if (!api) return
          autoplay?.stop()
          api.scrollTo(current)
          autoplay?.play()
        }}
      />
      <Carousel
        setApi={setApi}
        opts={{
          loop: true
        }}
        plugins={[
          Autoplay({
            delay: 5000
          })
        ]}
      >
        <CarouselContent className="p-0 m-0">
          {sliderList.map((item, index) => (
            <CarouselItem
              key={index}
              className="w-screen h-screen px-0 relative"
            >
              <Image
                src={item.img}
                alt="轮播图"
                fill
                // 首张图片优先加载，否则会变形
                loading={index === current ? 'eager' : 'lazy'}
                className="object-cover"
              />
              <div
                className={clsx(
                  'absolute z-[10] left-[15%] top-[30%] text-white text-[32px]',
                  'font-[300] tracking-[.16em]'
                )}
              >
                <GoX className="absolute text-[28px] top-[-16px] left-[-16px]" />
                <div className="">{item.title}</div>
                <div className="">{item.subtitle}</div>
                <div className="mt-[32px] flex items-center gap-[16px]">
                  {item.buttons?.map((button, index) => (
                    <Link key={index} href={button.href}>
                      <HoverButton
                        text={button.text}
                        theme={index === 1 ? 'white' : 'transparent-white'}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
