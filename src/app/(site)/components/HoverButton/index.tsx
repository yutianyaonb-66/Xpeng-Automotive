'use client'

import { useState } from 'react'
import clsx from 'clsx'
import { FaChevronRight } from 'react-icons/fa'

type Theme = 'transparent-white' | 'transparent-black' | 'white' | 'black'

const defaultBgColor: Record<Theme, string> = {
  'transparent-white': 'bg-transparent',
  'transparent-black': 'bg-transparent',
  white: 'bg-white',
  black: 'bg-black'
}

const defaultTextColor: Record<Theme, string> = {
  'transparent-white': 'text-white',
  'transparent-black': 'text-black',
  white: 'text-black',
  black: 'text-white'
}

const defaultArrowColor: Record<Theme, string> = {
  'transparent-white': 'text-white',
  'transparent-black': 'text-[#a4ce4c]',
  white: 'text-[#a4ce4c]',
  black: 'text-[#a4ce4c]'
}

const defaultBorderColor: Record<Theme, string> = {
  'transparent-white': 'border-white',
  'transparent-black': 'border-black',
  white: 'border-white',
  black: 'border-black'
}

export default function HoverButton({
  text,
  theme = 'transparent-white',
  className
}: {
  text: string
  theme?: Theme
  className?: string
}) {
  const [isHover, setIsHover] = useState(false)
  const bgColor = defaultBgColor[theme]
  let textColor = defaultTextColor[theme]
  // 悬浮时字体为白色
  if (isHover) {
    textColor = 'text-white'
  }
  let arrowColor = defaultArrowColor[theme]
  // 悬浮时箭头为白色
  if (isHover) {
    arrowColor = 'text-white'
  }
  const borderColor = defaultBorderColor[theme]

  return (
    <div
      className={clsx(
        className,
        'flex items-center justify-center text-[16px] tracking-[.16em] font-[400]',
        'border btn-hover cursor-pointer',
        'rounded-[4Px] px-[32px] h-[44px]',
        bgColor,
        borderColor
      )}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <span className={clsx(textColor)}>{text}</span>
      <FaChevronRight className={clsx('ml-[4px] text-[14px]', arrowColor)} />
    </div>
  )
}
