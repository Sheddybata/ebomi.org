'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, Wallet } from 'lucide-react'
import GiveModal from './GiveModal'

const floatingBottom = 'max(2rem, env(safe-area-inset-bottom, 2rem))'

export default function GiveButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div
        className="fixed right-8 z-40 flex flex-col items-end gap-3"
        style={{ bottom: floatingBottom }}
      >
        <Link
          href="/ebomiprays"
          className="bg-gold hover:bg-gold-light text-white rounded-full px-4 py-3 sm:px-4 sm:py-4 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center space-x-2 group min-h-[44px] min-w-[44px] touch-manipulation font-bold text-base sm:text-lg"
          aria-label="Prayer Request"
        >
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-white text-white group-hover:scale-110 transition-transform flex-shrink-0" />
          <span>Prayer Request</span>
        </Link>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-navy hover:bg-navy-light text-white rounded-full px-4 py-3 sm:px-4 sm:py-4 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center space-x-2 group min-h-[44px] min-w-[44px] touch-manipulation"
          aria-label="Give"
        >
          <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform flex-shrink-0" />
          <span className="font-bold text-base sm:text-lg">Give</span>
        </button>
      </div>
      <GiveModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
