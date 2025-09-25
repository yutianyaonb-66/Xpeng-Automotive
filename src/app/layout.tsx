import type { Metadata } from 'next'
import './globals.scss'

export const metadata: Metadata = {
  title: '小鹏汽车丨未来出行探索者',
  description:
    '小鹏汽车是一家专注未来出行的科技公司，致力于探索科技，引领未来出行变革。小鹏汽车旗下有小鹏P7+、小鹏MONA M03、小鹏X9、小鹏G6、小鹏全新P7i超智能轿跑、2024款小鹏G9和2024款小鹏P5等。'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
