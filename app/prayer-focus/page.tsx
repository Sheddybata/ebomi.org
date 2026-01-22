'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MapPin, Phone, User, Search, Globe } from 'lucide-react'

interface Branch {
  id: number
  state: string
  address?: string
  coordinator: string
  phone: string[]
  image: string
}

const branches: Branch[] = [
  {
    id: 1,
    state: 'ABUJA – FCT',
    address: 'Hosanna house by nitel junction by oceanic bakery, Wuse 2, Abuja, Abuja, Nigeria',
    coordinator: 'Headquarters',
    phone: ['+234 806 038 5986'],
    image: '/branches/fct.jpeg',
  },
  {
    id: 2,
    state: 'ABIA',
    coordinator: 'PST ROWLAND OBIMBA',
    phone: ['07068002667'],
    image: '/branches/abia.jpg',
  },
  {
    id: 3,
    state: 'ADAMAWA',
    coordinator: 'REV.EZRA DONSON AHMED',
    phone: ['08032855576'],
    image: '/branches/adamawa.png',
  },
  {
    id: 4,
    state: 'AKWA IBOM',
    coordinator: 'APOSTLE ROBINSON USABOR',
    phone: ['08037273095'],
    image: '/branches/akwaibom.jpg',
  },
  {
    id: 5,
    state: 'ANAMBRA',
    coordinator: 'APOSTLE ROBINSON USABOR',
    phone: ['08037273095'],
    image: '/branches/anambra.jpg',
  },
  {
    id: 6,
    state: 'BAUCHI',
    coordinator: 'PST. KELVIN NDUJI',
    phone: ['08039360816', '09012843380'],
    image: '/branches/bauchi.jpg',
  },
  {
    id: 7,
    state: 'BAYELSA',
    coordinator: 'REV. JOHN DANIEL',
    phone: ['08037962104'],
    image: '/branches/bayelsa.jpg',
  },
  {
    id: 8,
    state: 'BENUE',
    coordinator: 'APOSTLE JREMIAH TYOHEE',
    phone: ['08036430437'],
    image: '/branches/benue.jpg',
  },
  {
    id: 9,
    state: 'BORNO',
    coordinator: 'JOEL BUBA',
    phone: ['08065409001'],
    image: '/branches/borno.jpg',
  },
  {
    id: 10,
    state: 'CROSS RIVER',
    coordinator: 'PST. ENOBONG UDOFIA',
    phone: ['08034364716'],
    image: '/branches/crossriver.jpg',
  },
  {
    id: 11,
    state: 'EBONYI',
    coordinator: 'PST. EMEKA EZEH',
    phone: ['07014656334'],
    image: '/branches/ebonyi.jpg',
  },
  {
    id: 12,
    state: 'EDO',
    coordinator: 'PST. JOHN EBOSE',
    phone: ['07065282018'],
    image: '/branches/edo.jpg',
  },
  {
    id: 13,
    state: 'ENUGU',
    coordinator: 'PST. JOHN CHUKWU ORJI',
    phone: ['07035879780', '07083866100'],
    image: '/branches/enugu.jpg',
  },
  {
    id: 14,
    state: 'GOMBE',
    coordinator: 'REV. TIMOTHY JATAU',
    phone: ['08130668400', '08025509421'],
    image: '/branches/gombe.jpg',
  },
  {
    id: 15,
    state: 'JIGAWA',
    coordinator: 'AMB. JOSEPH DEPARK',
    phone: ['09117560598'],
    image: '/branches/jigawa.jpg',
  },
  {
    id: 16,
    state: 'KADUNA',
    coordinator: 'PST. MUSA EL-BUBA',
    phone: ['07036018199'],
    image: '/branches/kaduna.jpg',
  },
  {
    id: 17,
    state: 'KANO',
    coordinator: 'DCNS. DEBORAH',
    phone: ['08135465556'],
    image: '/branches/kano.png',
  },
  {
    id: 18,
    state: 'KEBBI',
    coordinator: 'SOLOMON DARANGI SHALOM',
    phone: ['07013342228'],
    image: '/branches/kebbi.jpg',
  },
  {
    id: 19,
    state: 'KOGI',
    coordinator: 'PST. JUST IBOBOR',
    phone: ['08056644126'],
    image: '/branches/kogi.jpg',
  },
  {
    id: 20,
    state: 'KWARA',
    coordinator: 'MOSES OYEYODE OGUNNIRAN',
    phone: ['08107280644'],
    image: '/branches/kwara.png',
  },
  {
    id: 21,
    state: 'NASARRAWA',
    coordinator: 'BARNABAS SIDI EBOLO',
    phone: ['07034756321'],
    image: '/branches/nasarawa.jpg',
  },
  {
    id: 22,
    state: 'NIGER',
    coordinator: 'PST. MANASSEH TAKAI',
    phone: ['08033698176'],
    image: '/branches/niger.jpg',
  },
  {
    id: 23,
    state: 'RIVERS',
    coordinator: 'PST. GILBERT CHUKWUKA',
    phone: ['08037072768', '09157612883'],
    image: '/branches/rivers.jpg',
  },
  {
    id: 24,
    state: 'TARABA',
    coordinator: 'PST. EGLAH VINKING',
    phone: ['08142530058'],
    image: '/branches/taraba.jpg',
  },
  {
    id: 25,
    state: 'YOBE',
    coordinator: 'PST. KAKALA SHELU',
    phone: ['08063072082'],
    image: '/branches/yobe.jpg',
  },
  {
    id: 26,
    state: 'ZAMFARA',
    coordinator: 'PST. ELIJAH GOODLUCK',
    phone: ['07061023830'],
    image: '/branches/zamfara.jpg',
  },
]

export default function EbomiBranchesPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredBranches = branches.filter((branch) =>
    branch.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
    branch.coordinator.toLowerCase().includes(searchQuery.toLowerCase()) ||
    branch.address?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatPhone = (phone: string) => {
    if (phone.startsWith('0')) {
      return `+234 ${phone.substring(1)}`
    }
    return phone.startsWith('+') ? phone : `+234 ${phone}`
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-4">
            <Globe className="w-12 h-12 text-gold mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold">EBOMI Branches</h1>
          </div>
          <p className="text-xl text-gray-300 text-center">Find a branch near you across Nigeria</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search */}
        <div className="mb-12 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by state or coordinator..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent text-lg"
            />
          </div>
        </div>

        {/* All Branches Grid View */}
        <div>
          <h2 className="text-3xl font-bold text-navy-dark mb-8 text-center">All Branches</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBranches.map((branch) => (
              <div
                key={branch.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 group flex flex-col"
              >
                {/* Branch Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-navy to-navy-light">
                  <Image
                    src={branch.image}
                    alt={branch.state}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white drop-shadow-lg">{branch.state}</h3>
                  </div>
                </div>

                {/* Branch Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {branch.address && (
                    <div className="flex items-start space-x-2 text-gray-600 mb-4 text-sm">
                      <MapPin className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                      <span>{branch.address}</span>
                    </div>
                  )}
                  
                  <div className="mb-4 flex-grow">
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="w-4 h-4 text-gold" />
                      <span className="text-sm font-semibold text-gray-700">Coordinator</span>
                    </div>
                    <p className="text-gray-700 text-sm ml-6">{branch.coordinator}</p>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Phone className="w-4 h-4 text-gold" />
                      <span className="text-sm font-semibold text-gray-700">Contact</span>
                    </div>
                    <div className="space-y-1 ml-6">
                      {branch.phone.map((phone, index) => (
                        <a
                          key={index}
                          href={`tel:${phone}`}
                          className="block text-gold hover:text-gold-dark text-sm font-semibold transition-colors"
                        >
                          {formatPhone(phone)}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

