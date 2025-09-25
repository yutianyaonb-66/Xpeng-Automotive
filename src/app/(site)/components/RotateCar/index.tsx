'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'
import Image from 'next/image'
import { rotateCarList } from './data'
import { CarouselApi } from '@/components/ui/carousel'
import { useEffect, useState } from 'react'
import { GoChevronLeft, GoChevronRight } from 'react-icons/go'
import clsx from 'clsx'
import Link from 'next/link'
import HoverButton from '@/app/(site)/components/HoverButton'

const Pagination = ({
  current,
  setCurrent
}: {
  current: number
  setCurrent: (current: number) => void
}) => {
  return (
    <div className="flex  justify-center gap-[8px]">
      {rotateCarList.map((item, index) => (
        <div
          key={index}
          className={clsx(
            'px-[45px] flex flex-col items-center cursor-pointer',
            current === index ? 'opacity-100' : 'opacity-20'
          )}
          onClick={() => setCurrent(index)}
        >
          <div className="text-[24px]">{item.title}</div>
          <div className="text-[10px]">{item.subtitle}</div>
        </div>
      ))}
    </div>
  )
}

export default function RotateCar() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    if (!api) return
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const buttonClass = clsx(
    'absolute z-10 top-1/2 -translate-y-1/2 text-[60px] cursor-pointer',
    'text-[#aaa] hover:text-[#888] p-[20px] box-content'
  )
  return (
    <div className="py-[120px]">
      <Pagination
        current={current}
        setCurrent={(index) => api?.scrollTo(index)}
      />
      <div className="relative">
        <GoChevronLeft
          className={clsx(buttonClass, 'left-[5%]')}
          onClick={() => api?.scrollPrev()}
        />
        <GoChevronRight
          className={clsx(buttonClass, 'right-[5%]')}
          onClick={() => api?.scrollNext()}
        />
        <Carousel
          className="w-full h-[39vw] mx-auto"
          setApi={setApi}
          opts={{
            loop: true
          }}
        >
          <CarouselContent className="p-0 m-0">
            {rotateCarList.map((item, index) => (
              <CarouselItem
                key={index}
                className="w-full h-[45vw] px-0 flex flex-col  items-center justify-center"
              >
                <div className="w-[83vw] h-[39vw] relative">
                  <Image
                    src={item.bgImg}
                    alt="slider"
                    className="absolute z-[-1] top-[1vw] left-[6vw] h-[19vw] w-[30vw]"
                    width={322}
                    height={210}
                  />
                  {/* TODO 360旋转 */}
                  <div
                    className={clsx('w-full h-full')}
                    style={{
                      backgroundImage: `url(${`/site/rotate-card/image${
                        index + 1
                      }.png`})`,
                      backgroundSize: '100% 100%'
                      // TODO 会导致加载卡顿，这里处理了一下，截取了第一张图
                      // backgroundSize: '3600% 100%'
                    }}
                  />
                </div>
                <div className="text-[20px] font-[400] mt-[16px] mb-[24px] tracking-[.2em]">
                  {item.description}
                </div>
                <div className="flex items-center justify-center  gap-[16px]">
                  {item.buttons.map((button, index) => (
                    <Link key={index} href={button.href}>
                      <HoverButton
                        text={button.text}
                        theme={index === 1 ? 'black' : 'transparent-black'}
                      />
                    </Link>
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}
