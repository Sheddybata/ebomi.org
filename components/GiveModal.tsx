'use client'

import { useState } from 'react'
import { X, Copy, Check, DollarSign } from 'lucide-react'

interface GiveModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function GiveModal({ isOpen, onClose }: GiveModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-3 rounded-full hover:bg-gray-100 transition-colors z-10 min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
          aria-label="Close"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-4">Give</h2>
            <p className="text-gray-600 text-lg">
              Your generous giving helps spread the transformative message of the Cross globally.
            </p>
          </div>

          {/* Naira Account */}
          <div className="mb-8 p-6 bg-gradient-to-br from-navy/5 to-navy/10 rounded-xl border border-navy/20">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">₦</span>
              </div>
              <h3 className="text-2xl font-bold text-navy-dark">Naira Account</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Account Name</label>
                <div className="flex items-center justify-between mt-2 p-3 bg-white rounded-lg border border-gray-200">
                  <span className="text-navy-dark font-medium">El-Buba Outreach Min. Intl (EBOMI)</span>
                  <button
                    onClick={() => copyToClipboard('El-Buba Outreach Min. Intl (EBOMI)', 'naira-name')}
                    className="p-3 hover:bg-gray-100 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
                    aria-label="Copy account name"
                  >
                    {copiedField === 'naira-name' ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-navy" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Account Number</label>
                <div className="flex items-center justify-between mt-2 p-3 bg-white rounded-lg border border-gray-200">
                  <span className="text-navy-dark font-mono text-lg font-semibold">1011143959</span>
                  <button
                    onClick={() => copyToClipboard('1011143959', 'naira-number')}
                    className="p-3 hover:bg-gray-100 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
                    aria-label="Copy account number"
                  >
                    {copiedField === 'naira-number' ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-navy" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Bank</label>
                <div className="flex items-center justify-between mt-2 p-3 bg-white rounded-lg border border-gray-200">
                  <span className="text-navy-dark font-medium">Zenith Bank</span>
                  <button
                    onClick={() => copyToClipboard('Zenith Bank', 'naira-bank')}
                    className="p-3 hover:bg-gray-100 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
                    aria-label="Copy bank name"
                  >
                    {copiedField === 'naira-bank' ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-navy" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dollar Account */}
          <div className="mb-6 p-6 bg-gradient-to-br from-gold/10 to-gold/5 rounded-xl border border-gold/20">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-navy-dark" />
              </div>
              <h3 className="text-2xl font-bold text-navy-dark">Dollar Account</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Account Name</label>
                <div className="flex items-center justify-between mt-2 p-3 bg-white rounded-lg border border-gray-200">
                  <span className="text-navy-dark font-medium">El-buba Outreach Min. INtl (EBOMI)</span>
                  <button
                    onClick={() => copyToClipboard('El-buba Outreach Min. INtl (EBOMI)', 'dollar-name')}
                    className="p-3 hover:bg-gray-100 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
                    aria-label="Copy account name"
                  >
                    {copiedField === 'dollar-name' ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-navy" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Account Number</label>
                <div className="flex items-center justify-between mt-2 p-3 bg-white rounded-lg border border-gray-200">
                  <span className="text-navy-dark font-mono text-lg font-semibold">5074823438</span>
                  <button
                    onClick={() => copyToClipboard('5074823438', 'dollar-number')}
                    className="p-3 hover:bg-gray-100 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
                    aria-label="Copy account number"
                  >
                    {copiedField === 'dollar-number' ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-navy" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Bank Details</label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                    <span className="text-navy-dark font-medium">JOS BRANCH</span>
                    <button
                      onClick={() => copyToClipboard('JOS BRANCH', 'dollar-branch')}
                      className="p-3 hover:bg-gray-100 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
                      aria-label="Copy branch"
                    >
                      {copiedField === 'dollar-branch' ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5 text-navy" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                    <span className="text-navy-dark font-medium">SWIFT: ZEIBNGLA</span>
                    <button
                      onClick={() => copyToClipboard('ZEIBNGLA', 'dollar-swift')}
                      className="p-3 hover:bg-gray-100 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
                      aria-label="Copy SWIFT code"
                    >
                      {copiedField === 'dollar-swift' ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5 text-navy" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                    <span className="text-navy-dark font-medium">BANK: ZENITH BANK</span>
                    <button
                      onClick={() => copyToClipboard('ZENITH BANK', 'dollar-bank')}
                      className="p-3 hover:bg-gray-100 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
                      aria-label="Copy bank name"
                    >
                      {copiedField === 'dollar-bank' ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5 text-navy" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Helper Text */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Click the copy icons to easily copy account details to your clipboard
          </p>
        </div>
      </div>
    </div>
  )
}
