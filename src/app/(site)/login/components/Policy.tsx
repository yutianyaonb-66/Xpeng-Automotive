import RadioIcon from '../imgs/radio.png'
import RadioCheckedIcon from '../imgs/radio-check.png'
import Image from 'next/image'
function Link({ href, text }: { href: string; text: string }) {
  return (
    <a href={href} className="text-[#6da23a]" target="_blank">
      {text}
    </a>
  )
}

const Radio = ({
  checked,
  onChange
}: {
  checked: boolean
  onChange: (checked: boolean) => void
}) => {
  return (
    <div className="w-[14Px] h-[14Px] relative ">
      <input
        type="checkbox"
        className="opacity-0 absolute w-full h-full z-10 cursor-pointer"
        checked={checked}
        onChange={(e) => {
          onChange(e.target.checked)
        }}
      />
      <Image src={checked ? RadioCheckedIcon : RadioIcon} alt="radio" fill />
    </div>
  )
}

export default function Policy({
  isAgree,
  onChange
}: {
  isAgree: boolean
  onChange: (isAgree: boolean) => void
}) {
  return (
    <div className="flex items-center mt-[20Px]" style={{ fontSize: '12Px' }}>
      <div className="flex items-center w-[24Px]">
        <Radio checked={isAgree} onChange={onChange} />
      </div>
      <div className="text-[#333] text-[12Px]">
        {' 同意 '}
        <Link
          href="https://events.xiaopeng.com/nx9w4x.html?ch=00977&ps=event"
          text="《小鹏汽车网络平台用户协议》"
        />
        {' 与 '}
        <Link
          href="https://events.xiaopeng.com/22p4p4.html?ch=00977&ps=event"
          text="《小鹏汽车网络平台隐私政策》"
        />
      </div>
    </div>
  )
}
