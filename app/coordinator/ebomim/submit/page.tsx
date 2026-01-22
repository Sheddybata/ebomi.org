'use client'

import { useState } from 'react'

export default function EbomimSubmitPage() {
  const [activeTab, setActiveTab] = useState<'financial' | 'other'>('financial')

  // Initialize financialForm before useQuery
  const [financialForm, setFinancialForm] = useState({
    amount: '',
    description: '',
    date: '',
    category: '',
  })

  // Now useQuery can safely reference financialForm
  // Note: If you're using React Query, you'll need to install @tanstack/react-query
  // For now, this is a basic implementation without useQuery
  const financialData = {
    moduleName: "ebomim",
    tabType: "financial",
    formData: financialForm,
    enabled: activeTab === "financial",
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-navy-dark mb-8">EBOMIM Submit</h1>
        
        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('financial')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'financial'
                ? 'text-gold border-b-2 border-gold'
                : 'text-gray-600 hover:text-navy-dark'
            }`}
          >
            Financial
          </button>
        </div>

        {/* Form */}
        {activeTab === 'financial' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-navy-dark mb-6">Financial Submission</h2>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-navy-dark mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  value={financialForm.amount}
                  onChange={(e) => setFinancialForm({ ...financialForm, amount: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy-dark mb-2">
                  Description
                </label>
                <textarea
                  value={financialForm.description}
                  onChange={(e) => setFinancialForm({ ...financialForm, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  rows={4}
                  placeholder="Enter description"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy-dark mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={financialForm.date}
                  onChange={(e) => setFinancialForm({ ...financialForm, date: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy-dark mb-2">
                  Category
                </label>
                <select
                  value={financialForm.category}
                  onChange={(e) => setFinancialForm({ ...financialForm, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                >
                  <option value="">Select category</option>
                  <option value="tithe">Tithe</option>
                  <option value="offering">Offering</option>
                  <option value="seed">Seed</option>
                  <option value="project">Project</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy-light transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}


