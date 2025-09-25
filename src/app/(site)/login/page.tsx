'use client'

import Image from 'next/image'
import P7PlusImg from './imgs/p7+.png'
import Logo from '@/assets/icons/common/logo_black.png'
import Policy from './components/Policy'
import { useState, useEffect } from 'react'
import { api } from '@/server/api/client'
import { success } from '@/lib/utils'
import Loading from '@/components/admin/Loading'
import { useRouter } from 'next/navigation'
import { usePolicyConfirmDialog } from './components/PolicyConfirmDialog'
import { refreshAllPage } from '@/server/action/login'

function LoginButton({
  loading,
  onClick
}: {
  loading: boolean
  onClick: () => void
}) {
  return (
    <div
      className="mt-[14px] h-[48px] w-full flex justify-center items-center bg-black text-white
      cursor-pointer"
      onClick={onClick}
    >
      {loading ? <Loading /> : '  登录'}
    </div>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const [phone, setPhone] = useState('')
  const [verifyCode, setVerifyCode] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [isAgree, setIsAgree] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const { confirm: policyConfirm, context: policyConfirmDialog } =
    usePolicyConfirmDialog()

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleSendVerifyCode = async () => {
    if (countdown > 0) return
    setErrorMsg('')
    if (!phone) {
      setErrorMsg('手机号不能为空')
      return
    }
    // TODO 滑动图片验证
    const resp = await api.auth.sendVerifyCode.$post({
      json: {
        phone
      }
    })
    const { code, message } = await resp.json()
    if (code === 0) {
      success('验证码发送成功')
      // 60秒后可重新发送验证码
      setCountdown(60)
    } else {
      setErrorMsg(message)
    }
  }

  const [loading, setLoading] = useState(false)
  const handleLogin = async () => {
    if (loading) return
    setErrorMsg('')
    if (!phone) {
      setErrorMsg('手机号不能为空')
      return
    }
    if (!verifyCode) {
      setErrorMsg('验证码不能为空')
      return
    }
    if (!isAgree) {
      const isConfirm = await policyConfirm()
      if (!isConfirm) return
      setIsAgree(true)
    }
    try {
      setLoading(true)
      const resp = await api.auth.login.$post({
        json: {
          phone,
          verifyCode
        }
      })
      setLoading(false)
      const { code, message } = await resp.json()
      if (code === 0) {
        refreshAllPage()
        router.replace('/')
      } else {
        setErrorMsg(message)
      }
    } catch (error) {
      setLoading(false)
      throw new Error('Failed to login:', { cause: error })
    }
  }

  return (
    <div className="min-h-screen relative flex flex-col items-center bg-[linear-gradient(0deg,#FFF8EF_15%,#EBF4FF_100%)]">
      <div className="mt-[40Px] mb-[auto] flex flex-col items-center w-[315PX]">
        <Image src={Logo} alt="logo" width={74} height={40} />
        <div className="mt-[32Px] mb-[16Px] bg-white px-[20Px] py-[5Px] w-full">
          <input
            type="text"
            placeholder="请输入手机号"
            className="h-[46Px] w-full text-[#333]"
            style={{ fontSize: '16Px' }}
            value={phone}
            maxLength={11}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div
          className="flex items-center mb-[5Px] bg-white px-[20Px] py-[5Px] w-full"
          style={{ fontSize: '16Px' }}
        >
          <input
            type="text"
            placeholder="请输入短信验证码"
            className="h-[46Px] flex-1 text-[#333]"
            value={verifyCode}
            maxLength={4}
            onChange={(e) => setVerifyCode(e.target.value)}
          />
          <span
            className={`mr-[4Px] cursor-pointer ${
              countdown > 0 ? 'text-gray-400' : 'text-[#6da23a]'
            }`}
            onClick={handleSendVerifyCode}
          >
            {countdown > 0 ? `${countdown}秒后重试` : '获取验证码'}
          </span>
        </div>
        {errorMsg && <div className="w-full text-red-500">{errorMsg}</div>}
        <Policy isAgree={isAgree} onChange={setIsAgree} />
        <LoginButton loading={loading} onClick={handleLogin} />
        {policyConfirmDialog}
      </div>

      <Image
        className="w-screen mt-[20px] h-[200px] object-cover"
        src={P7PlusImg}
        alt="p7+"
      />
    </div>
  )
}
