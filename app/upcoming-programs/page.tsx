import Image from 'next/image'
import { Users, Target, Globe, Heart } from 'lucide-react'

const pastors = [
  {
    name: 'Prophet Dr. Isa El-buba Sadiq & Pastor Choice El-buba Sadiq',
    image: '/aboutus1.jpg',
  },
  {
    name: 'Reverend Haruna Maidoki',
    image: '/haruna.jpg',
  },
  {
    name: 'Pastor Jeremiah Ogbebor',
    image: '/jeremiah.jpg',
  },
]

export default function AboutUsPage() {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy via-navy-light to-navy-dark text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              WELCOME TO
              <br />
              <span className="text-gold">Evangelical Biblical Outreach</span>
              <br />
              Ministries International
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                This commission is designed by the Lord to mobilize, train, equip and empower individual believers, 
                church and church leaders, city elders, civil servants, and politicians to walk into their God's 
                prophetic destiny to preach the undiluted gospel, accelerated the growth and expansion of the Kingdom 
                of God on the earth, through intercession for the corporate global revival and restoration of the 
                King's mandate.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                This commission will bring into your life a new dimension of understanding God's prophetic mandate 
                by transforming you to impact your society, land, and institutions with the transfigurating force 
                of God's Spirit to frame things into order.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                We are called and chosen by the Lord in a time like this to restore the old order, the ancient land 
                mark, and this can only be done by the watchmen, Ezekiel 33:7 and Ezekiel 22:26-30, Isaiah 62:6. 
                The priest have compromised, the Prophets have given false visions, The prince have oppressed the 
                poor and corrupt the business world The people have left the path of holiness, so much robbery, 
                evil and abuse. God's hope is on the watchmen to arise and take their place in the fight.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gold/10 to-gold/5 rounded-2xl p-8 md:p-12 border border-gold/20 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-6">The Call of the Watchmen</h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                The four groups in the Church wouldn't have compromised or totally drift if the watchmen were in 
                their post but because the watchmen left their post and joined the crowd, the enemy came in and 
                pull down the walls of holiness, the fear of God, prosperity and sanity in the Church and the society.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg font-semibold italic">
                "When I got saved from Islamic Jihadism, the Lord said to me, son goes and provoke the watchmen 
                to take their place so that I do not destroy the people."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Pastors Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-navy-dark mb-4">Our Pastors</h2>
            <p className="text-xl text-gray-600">Leading God's people with wisdom and vision</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pastors.map((pastor, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100 hover:shadow-2xl hover:border-gold transition-all duration-300 group"
              >
                {/* Pastor Image */}
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={pastor.image}
                    alt={pastor.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Pastor Info */}
                <div className="p-6">
                  <h3 className="text-xl md:text-2xl font-bold text-navy-dark mb-2 text-center leading-tight">
                    {pastor.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Highlights */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-navy-dark mb-3">Our Mission</h3>
              <p className="text-gray-700">
                Mobilize, train, equip and empower believers to walk into their God's prophetic destiny
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-navy-dark mb-3">Global Impact</h3>
              <p className="text-gray-700">
                Accelerating the growth and expansion of the Kingdom of God through intercession and revival
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-navy-dark mb-3">The Watchmen</h3>
              <p className="text-gray-700">
                Restoring the old order and ancient landmarks through dedicated watchmen standing in the gap
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
