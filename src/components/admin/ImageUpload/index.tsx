import Image from 'next/image'
import { FaTimes } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa6'
import { RiUpload2Line } from 'react-icons/ri'
import Loading from '@/components/admin/Loading'
import styles from './index.module.scss'
import { cn } from '@/lib/utils'

import { useRef, useState } from 'react'
import { upload } from '@/server/upload'

function UploadLoading({ color = 'white' }: { color?: string }) {
  return (
    <Loading
      className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
      size={30}
      color={color}
    />
  )
}

export default function ImageUpload({
  imageList,
  max,
  width = 96,
  height = 96,
  editable = true,
  onUpload,
  onDelete,
  uploadPath,
  color = 'white'
}: {
  imageList: string[]
  max: number
  width?: number
  height?: number
  editable?: boolean
  onUpload?: (index: number, imageUrl: string) => void
  onDelete?: (index: number) => void
  uploadPath: string
  color?: string
}) {
  const showAdd = imageList.length < max && editable
  const inputRef = useRef<HTMLInputElement>(null)

  const [uploadIndex, setUploadIndex] = useState<number>(-1)
  const handleUpload = (index: number = imageList.length) => {
    if (uploading) return
    if (!onUpload) return
    setUploadIndex(index)
    inputRef.current!.value = ''
    inputRef.current!.click()
  }

  const [uploading, setUploading] = useState<boolean>(false)
  const handleSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      setUploading(true)
      const imageUrl = await upload(file, uploadPath)
      setUploading(false)
      if (!imageUrl) return
      onUpload?.(uploadIndex, imageUrl)
    } catch {
      setUploading(false)
    }
  }

  return (
    <div className="w-full flex flex-wrap gap-4">
      {imageList.map((image, index) => (
        <div
          key={index}
          className={styles.imgWrapper}
          style={{ width, height }}
        >
          <Image alt="" key={index} src={image} className="object-cover" fill />
          {editable && (
            <RiUpload2Line
              className={cn('left-[5px]', styles.actionBtn)}
              onClick={() => handleUpload(index)}
              style={{ color }}
            />
          )}
          {uploading && uploadIndex === index && (
            <UploadLoading color={color} />
          )}
          {editable && (
            <FaTimes
              className={cn('right-[5px]', styles.actionBtn)}
              onClick={() => onDelete?.(index)}
              style={{ color }}
            />
          )}
        </div>
      ))}
      {showAdd && (
        <div
          className="flex items-center justify-center relative border rounded-md cursor-pointer hover:bg-gray-100"
          style={{ width, height }}
          onClick={() => handleUpload(-1)}
        >
          {uploading && uploadIndex === -1 ? (
            <UploadLoading color="black" />
          ) : (
            <FaPlus className="text-[24px]" />
          )}
        </div>
      )}
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        onChange={handleSelectFile}
      />
    </div>
  )
}
