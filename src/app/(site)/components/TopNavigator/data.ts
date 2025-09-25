import prisma from '@/lib/prisma'

const carModelList = [
  {
    modelName: 'P7+',
    modelImg:
      'https://xps01.xiaopeng.com/cms/material/pic/2024/10-14/pic_20241014183252_13479.png'
  },
  {
    modelName: 'M03',
    modelImg:
      'https://xps01.xiaopeng.com/cms/material/pic/2024/08-28/pic_20240828103320_98276.png'
  },
  {
    modelName: 'X9',
    modelImg:
      'https://xps01.xiaopeng.com/cms/material/pic/2024/01-01/pic_20240101184308_02018.png'
  },
  {
    modelName: '2024款G9',
    modelImg:
      'https://xps01.xiaopeng.com/cms/material/pic/2023/09-19/pic_20230919164412_75046.png'
  },
  {
    modelName: 'G6',
    modelImg:
      'https://xps01.xiaopeng.com/cms/material/pic/2024/07-15/pic_20240715181620_65605.png'
  },
  {
    modelName: 'P7i',
    modelImg:
      'https://xps01.xiaopeng.com/cms/material/pic/2024/03-25/pic_20240325100421_63748.png'
  },
  {
    modelName: '2024款P5',
    modelImg:
      'https://xps01.xiaopeng.com/cms/material/pic/2023/09-24/pic_20230924150408_94553.png'
  }
]

// 导入数据到数据库的函数
export async function importCarModels() {
  // 清空现有数据
  await prisma.navCarModels.deleteMany()

  // 批量创建新数据
  await prisma.navCarModels.createMany({
    data: carModelList.map((item, index) => ({
      modelName: item.modelName,
      modelImg: item.modelImg,
      order: index + 1,
      status: 1
    }))
  })
}
