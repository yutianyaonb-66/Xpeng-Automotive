'use client'

import { useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import HoverButton from '../HoverButton/index'
import Link from 'next/link'

type DataItem = (typeof dataList)[number]
const dataList = [
  {
    title: '自营充电网络',
    description:
      '1000+站点，覆盖全国所有地级行政区和直辖市；S4液冷超快充，最快充电5分钟，续航增加200km+',
    bgSrc: 'https://s.xiaopeng.com/xp-fe/mainsite/2023/home/charging1.jpg'
  },
  {
    title: '自营充电网络',
    description: '核心城区与高速场景补能',
    bgSrc: 'https://s.xiaopeng.com/xp-fe/mainsite/2023/home/charging2.jpg'
  },
  {
    title: '家充服务',
    description: '超低补能成本，全程贴心服务',
    bgSrc: 'https://s.xiaopeng.com/xp-fe/mainsite/2023/home/charging3.jpg'
  },
  {
    title: '目的地充电服务',
    description: '优选景点/酒店等休闲出游场景，无忧补能',
    bgSrc: 'https://s.xiaopeng.com/xp-fe/mainsite/2023/home/charging4.jpg'
  },
  {
    title: '车主充电权益',
    description: '专享预约充电、限时免停车费等车主权益',
    bgSrc: 'https://s.xiaopeng.com/xp-fe/mainsite/2023/home/charging5.jpg'
  }
]

function HoverCard({
  title,
  description,
  bgSrc,
  className
}: {
  title: string
  description: string
  bgSrc: string
  className?: string
}) {
  const [isHover, setIsHover] = useState(false)
  return (
    <div
      className={clsx(
        'relative overflow-hidden cursor-pointer rounded-[4Px] text-white',
        className
      )}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Image
        src={bgSrc}
        alt={title}
        className={clsx(
          'object-cover h-full w-full',
          'transition-all duration-300',
          isHover && 'scale-[120%]'
        )}
        width="1000"
        height="1000"
      />
      <div className="absolute bottom-[22px] mx-[32px]">
        <h2 className="text-[18px] tracking-[.16em]">{title}</h2>
        {isHover && (
          <p className="text-[14px] tracking-[.22em]">{description}</p>
        )}
      </div>
    </div>
  )
}

export default function Charge() {
  const firstItem = dataList[0]
  const otherGroup: DataItem[][] = []
  // 将其他数据分组，每组2个
  for (let i = 1; i < dataList.length; i += 2) {
    otherGroup.push(dataList.slice(i, i + 2))
  }
  return (
    <div className="bg-[#f9f9f9] pt-[80px] pb-[120px] flex flex-col items-center">
      <div className="pt-[120px] pb-[64px] text-center">
        <h2 className="text-[32px] tracking-[.16em] mb-[16px]">
          全场景充电服务
        </h2>
        <h2 className="text-[16px] tracking-[.16em] text-[rgba(0,0,0,.6)] font-[400]">
          全场景充电服务遍布全国的补能网络，贴心的自营充电服务，让鹏友没有里程焦虑
        </h2>
      </div>
      <div className="flex gap-[32px] justify-stretch">
        <HoverCard {...firstItem} className="h-[660px] w-[418px]" />
        <div className="flex-1 flex flex-col justify-between">
          {otherGroup.map((group, index) => (
            <div key={index} className="flex gap-x-[32px]">
              {group.map((item) => (
                <HoverCard
                  key={item.title}
                  {...item}
                  className="h-[314px] w-[418px]"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <Link href="/charge" className="mt-[60px]">
        <HoverButton text="了解充电服务" theme="transparent-black" />
      </Link>
    </div>
  )
}
