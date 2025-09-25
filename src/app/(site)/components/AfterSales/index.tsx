'use client'

import { useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import HoverButton from '../HoverButton/index'
import Link from 'next/link'

const dataList = [
  {
    title: '超长无忧质保',
    description:
      '最高5年/12万公里整车质保，8年/16万公里三电质保，可选超值终身质保产品',
    tip: '*不同车型存在差异',
    bgSrc: 'https://s.xiaopeng.com/xp-fe/mainsite/2023/home/shouhou1.jpg'
  },
  {
    title: '终身无忧救援',
    description: '7*24H全天守候，无忧救援随时待命，让您安心出行',
    bgSrc: 'https://s.xiaopeng.com/xp-fe/mainsite/2023/home/shouhou2.jpg'
  },
  {
    title: '智能服务守护',
    description: '7*24H智能在线诊断、智能故障预警，守护车辆健康',
    bgSrc: 'https://xps01.xiaopeng.com/www/public/img/shouhou3.9febac91.jpg'
  }
]

function HoverCard({
  bgSrc,
  className
}: {
  bgSrc: string
  className?: string
}) {
  const [isHover, setIsHover] = useState(false)
  return (
    <div
      className={clsx(
        'relative overflow-hidden w-[418px] h-[314px] cursor-pointer rounded-[4Px]',
        className
      )}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Image
        src={bgSrc}
        alt=""
        className={clsx(
          'object-cover h-full w-full',
          'transition-all duration-300',
          isHover && 'scale-[120%]'
        )}
        width={1000}
        height={1000}
      />
    </div>
  )
}

export default function AfterSales() {
  return (
    <div className="pt-[80px] pb-[120px] flex flex-col items-center">
      <div className="pt-[120px] pb-[64px] text-center">
        <h2 className="text-[32px] tracking-[.16em] mb-[16px]">售后服务</h2>
        <h2 className="text-[16px] tracking-[.16em] text-[rgba(0,0,0,.6)] font-[400]">
          鹏友好才是真的好
        </h2>
      </div>
      <div className="flex gap-x-[32px]">
        {dataList.map((item, index) => (
          <div key={index} className="flex flex-col w-[418px]">
            <HoverCard bgSrc={item.bgSrc} className="mb-[24px]" />
            <h2 className="mb-[16px] text-[18px] tracking-[.16em]">
              {item.title}
            </h2>
            <p className="text-[16px] tracking-[.2em] text-[#666]">
              {item.description}
            </p>
            <div className="mt-[16px] text-[14px] tracking-[.2em] text-[rgba(0,0,0,.3)]">
              {item.tip}
            </div>
          </div>
        ))}
      </div>
      <Link href="/after-sales" className="mt-[60px]">
        <HoverButton text="了解售后服务" theme="transparent-black" />
      </Link>
    </div>
  )
}
