import prisma from '@/lib/prisma'

export const sliderList = [
  {
    img: 'https://xps01.xiaopeng.com/cms/material/pic/2024/10-21/pic_20241021185242_11524.jpg',
    title: '小鹏P7+ Al智驾技术分享会',
    subtitle: '2024.10.24 14:30',
    buttons: [
      {
        text: '点击预约直播',
        href: '/p7plus'
      }
    ]
  },
  {
    img: 'https://xps01.xiaopeng.com/cms/material/pic/2024/10-14/pic_20241014190814_69858.jpg',
    title: '小鹏P7+ 越级登场',
    subtitle: '智驾掀背轿跑 开启预售',
    buttons: [
      {
        text: '立即预定',
        href: '/p7plus'
      },
      {
        text: '预约品鉴',
        href: '/p7plus'
      }
    ]
  },
  {
    img: 'https://xps01.xiaopeng.com/cms/material/pic/2024/09-26/pic_20240926095453_31562.jpg',
    title: '2024小鹏 G9',
    subtitle: '650四驱高性能上新',
    buttons: [
      {
        text: '立即订购',
        href: '/g9'
      },
      {
        text: '预约试驾',
        href: '/g9'
      }
    ]
  },
  {
    img: 'https://xps01.xiaopeng.com/cms/material/pic/2024/04-11/pic_20240411093020_64152.jpg',
    title: '小鹏G6  暗夜黑来袭',
    subtitle: '580长续航Plus发布',
    buttons: [
      {
        text: '了解G6',
        href: '/g6'
      },
      {
        text: '预约试驾',
        href: '/g6'
      }
    ]
  },
  {
    img: 'https://xps01.xiaopeng.com/cms/material/pic/2024/09-25/pic_20240925134138_94413.jpg',
    title: '超智驾大七座',
    subtitle: '小鹏X9 610长续航 新品上市',
    buttons: [
      {
        text: '立即订购',
        href: '/x9'
      },
      {
        text: '预约试驾',
        href: '/x9'
      }
    ]
  },
  {
    img: 'https://xps01.xiaopeng.com/cms/material/pic/2024/08-27/pic_20240827173407_30962.jpg',
    title: '小鹏 MONA M03  智趣登场',
    subtitle: '智能纯电掀背轿跑',
    buttons: [
      {
        text: '立即订购',
        href: '/m03'
      },
      {
        text: '预约试驾',
        href: '/m03'
      }
    ]
  },
  {
    img: 'https://xps01.xiaopeng.com/cms/material/pic/2024/03-25/pic_20240325100430_54769.jpg',
    title: '全新 P7i 702Max 鹏翼版',
    subtitle: '超智驾鹏翼轿跑 全新登场',
    buttons: [
      {
        text: '了解P7i',
        href: '/p7i'
      },
      {
        text: '预约试驾',
        href: '/p7i'
      }
    ]
  },
  {
    img: 'https://xps01.xiaopeng.com/cms/material/pic/2023/09-25/pic_20230925172656_24673.jpg',
    title: '2024款小鹏P5',
    subtitle: '「真智享」越级轿车',
    buttons: [
      {
        text: '了解2024款P5',
        href: '/p5'
      },
      {
        text: '预约试驾',
        href: '/p5'
      }
    ]
  }
]

export const importSliders = async () => {
  await prisma.homeSliders.deleteMany()
  await prisma.homeSliders.createMany({
    data: sliderList.map((item, index) => ({
      img: item.img,
      title: item.title,
      subtitle: item.subtitle,
      buttons: item.buttons,
      order: index + 1,
      status: 1
    }))
  })
}
