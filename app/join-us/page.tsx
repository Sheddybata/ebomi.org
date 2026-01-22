'use client'

import { Heart, Users, CheckCircle, ExternalLink } from 'lucide-react'

export default function JoinUsPage() {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <section className="bg-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-12 h-12 text-gold mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold">Join Us</h1>
          </div>
          <p className="text-xl text-gray-300">Join the EBOMI Global Intercessors Army</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* About The Prayer Army Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200 mb-12">
          <div className="flex items-center mb-6">
            <Users className="w-10 h-10 text-gold mr-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-navy-dark">ABOUT THE PRAYER ARMY</h2>
          </div>
          
          <div className="space-y-4 text-gray-700 leading-relaxed text-lg mb-8">
            <p>
              An Army praying for the Body of Christ globally.
            </p>
            <p>
              We believe that prayer is the backbone of any successful ministry, and we are committed to praying for the needs of the Church, its leaders, and its members. It is a spiritual militarise organization.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>To raise an army of intercessors</li>
              <li>Praying for the spiritual awakening</li>
              <li>Praying for Spiritual Revival</li>
              <li>Establishing the kingdom of God</li>
            </ul>
          </div>

          {/* Video Introduction */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-navy-dark mb-4">Video Introduction</h3>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/2Ypyja-ca0o?si=fAG3rBSDqKlZbrCt"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          {/* Join Button */}
          <div className="text-center">
            <a
              href="https://api.whatsapp.com/send?phone=2348082538837&text=Hello%20Sir.%20Please%20I%20want%20to%20join%20the%20prayer%20army"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gold text-navy-dark font-bold rounded-lg hover:bg-gold-light transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span>Click to Join</span>
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* To Join The EBOMI Global Intercessors Army Section */}
        <div className="bg-gradient-to-br from-navy/5 to-navy/10 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-6">
            To Join The EBOMI Global Intercessors Army
          </h2>
          
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            If you are passionate about prayer and intercession, and you want to join the EBOMI Global Intercessors Army, here are some expectations that we expect from you.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start space-x-3 bg-white rounded-lg p-6 shadow-md">
              <CheckCircle className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
              <p className="text-gray-700 font-semibold">You must be born-again Christian</p>
            </div>
            <div className="flex items-start space-x-3 bg-white rounded-lg p-6 shadow-md">
              <CheckCircle className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
              <p className="text-gray-700 font-semibold">Love Evangelism and Intercession</p>
            </div>
            <div className="flex items-start space-x-3 bg-white rounded-lg p-6 shadow-md">
              <CheckCircle className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
              <p className="text-gray-700 font-semibold">Join in Corporate Prayer Meetings</p>
            </div>
            <div className="flex items-start space-x-3 bg-white rounded-lg p-6 shadow-md">
              <CheckCircle className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
              <p className="text-gray-700 font-semibold">Be Willing to Fast & Pray Regularly</p>
            </div>
          </div>

          {/* Join Button */}
          <div className="text-center">
            <a
              href="https://api.whatsapp.com/send?phone=2348082538837&text=Hello%20Sir.%20Please%20I%20want%20to%20join%20the%20prayer%20army"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-navy text-white font-bold rounded-lg hover:bg-navy-light transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span>Join Now</span>
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

