'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'
import GiveModal from './GiveModal'

export default function GiveButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 z-40 bg-navy hover:bg-navy-light text-white rounded-full sm:rounded-full px-4 py-3 sm:px-4 sm:py-4 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center space-x-2 group min-h-[44px] min-w-[44px] touch-manipulation"
        style={{ bottom: 'max(2rem, env(safe-area-inset-bottom, 2rem))' }}
        aria-label="Give"
      >
        <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-white group-hover:scale-110 transition-transform" />
        <span className="font-bold text-base sm:text-lg">Give</span>
      </button>
      <GiveModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
