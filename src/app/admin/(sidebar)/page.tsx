export default function Admin() {
  return (
    <div className="h-screen w-full bg-white flex flex-col items-center justify-center">
      <div className="text-4xl font-bold text-gray-800 mb-4 flex items-center gap-3 animate-fadeIn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        小鹏汽车管理后台
      </div>
    </div>
  )
}
