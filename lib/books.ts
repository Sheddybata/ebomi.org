export type BookCategory =
  | 'Personal Growth'
  | 'Family'
  | 'Spiritual Life'
  | 'Prayer'
  | 'Leadership'

export interface Book {
  id: string
  number: number
  title: string
  category: BookCategory
  pages: number
  description: string
  price: string
  /** Selar product URL — update when available (see BOOK_SELAR_URLS below) */
  link: string
  cover: string
  readOnline?: boolean
  featuredOnHome?: boolean
}

export const books: Book[] = [
  {
    id: 'the-currency-of-time',
    number: 1,
    title: 'The Currency of Time',
    category: 'Personal Growth',
    pages: 361,
    description:
      'Master Your Time, Master Your Life, Fulfill Your Purpose. Everyone has 24 hours — the difference between those who rise and those who remain lies in how every second is used.',
    price: '£15',
    link: '',
    cover: '/books/currencyoftime.jpeg',
    featuredOnHome: true,
  },
  {
    id: 'build-your-house-before-you-build-the-world',
    number: 2,
    title: 'Build Your House Before You Build the World',
    category: 'Family',
    pages: 329,
    description:
      'Why Family Is Your First Ministry and Legacy Is Born at Home. Build a culture that preserves faith across generations and raises children who understand purpose and responsibility.',
    price: '£15',
    link: '',
    cover: '/books/buildyourhouse.jpg',
    featuredOnHome: true,
  },
  {
    id: 'guard-the-flames',
    number: 3,
    title: 'Guard the Flames',
    category: 'Spiritual Life',
    pages: 84,
    description:
      "30 Dangerous Distractions That Can Destroy a Minister's Calling. A spiritual mirror, a prophetic alarm, and a shepherd's urgent call to vigilance for every minister.",
    price: '£15',
    link: '',
    cover: '/books/guardtheflames.jpg',
  },
  {
    id: 'prayer-and-covenant',
    number: 4,
    title: 'Prayer & Covenant',
    category: 'Prayer',
    pages: 208,
    description:
      'The intersection of intercession and governance — how prayer shapes nations, influences policy, and positions the Church as a prophetic voice in the public square.',
    price: '£15',
    link: '',
    cover: '/books/prayer%26convenant.jpg',
    featuredOnHome: true,
  },
  {
    id: 'ebomi-daily-prophetic-prayer-pills',
    number: 5,
    title: 'EBOMI Daily: Prophetic Prayer Pills',
    category: 'Prayer',
    pages: 153,
    description:
      'A 31-Day Prophetic Prayer Journey into Divine Reversals, Rebuilding and Rising Glory — daily Scripture-anchored declarations for believers, families, and church leaders.',
    price: '£15',
    link: '',
    cover: '/books/prayerpills.jpg',
    featuredOnHome: true,
  },
  {
    id: 'order-is-a-spirit',
    number: 6,
    title: 'Order Is a Spirit',
    category: 'Spiritual Life',
    pages: 200,
    description:
      'Why Structure Sustains Increase in Family, Ministry, Business, and Work. A prophetic revelation on divine order as the foundation for lasting fruitfulness in every area of life.',
    price: '£15',
    link: '',
    cover: '/books/order.jpg',
  },
  {
    id: 'the-power-of-silence',
    number: 7,
    title: 'The Power of Silence',
    category: 'Personal Growth',
    pages: 242,
    description:
      'No Words. Just Work. The silence that protects your peace, strengthens your purpose, and multiplies your results. Silence is not empty — it is power restrained.',
    price: '£15',
    link: '',
    cover: '/books/silence.jpg',
  },
  {
    id: 'sustaining-generational-fire',
    number: 8,
    title: 'Sustaining Generational Fire',
    category: 'Spiritual Life',
    pages: 170,
    description:
      'Building Fire-Lines That Outlive You. How to pass the flame of the Spirit to the next generation and construct spiritual legacies that endure beyond your lifetime.',
    price: '£15',
    link: 'https://drisaelbuba.selar.com/84464178c6',
    cover: '/books/sustaininggenerationalfire.jpeg',
  },
  {
    id: 'wisdom-for-destiny',
    number: 9,
    title: 'Wisdom for Destiny',
    category: 'Spiritual Life',
    pages: 124,
    description:
      "A Father's Letter to His Children. Timeless Keys for Kingdom Living and Spiritual Warfare — prophetic wisdom for navigating life's battles and fulfilling God's call.",
    price: '£15',
    link: '',
    cover: '/books/destiny.jpg',
    readOnline: true,
  },
  {
    id: 'build-your-house-vol-1',
    number: 10,
    title: 'Build Your House Before You Build the World (Vol. I)',
    category: 'Family',
    pages: 120,
    description:
      "The Secret of My Family. Laying the spiritual foundations of godly home-building — systems that protect your family legacy and align your home with heaven's pattern.",
    price: '£15',
    link: '',
    cover: '/books/buildyourhouse.jpg',
  },
  {
    id: 'the-altar-of-a-thousand-generations',
    number: 11,
    title: 'The Altar of a Thousand Generations',
    category: 'Prayer',
    pages: 247,
    description:
      'A prophetic call to build altars of prayer that impact generational bloodlines — places of encounter that outlast the individual and transform entire family lines.',
    price: '£15',
    link: '',
    cover: '/books/generational.jpg',
  },
  {
    id: 'prayer-supplement',
    number: 12,
    title: 'Prayer Supplement',
    category: 'Prayer',
    pages: 397,
    description:
      'An extensive compendium of prophetic prayers, declarations, and intercessions covering every dimension of Kingdom living — the ultimate resource for serious prayer warriors.',
    price: '£15',
    link: '',
    cover: '/books/prayersupplement.jpeg',
  },
  {
    id: 'watch-and-warlords',
    number: 13,
    title: 'Watch & Warlords',
    category: 'Prayer',
    pages: 155,
    description:
      'The art of spiritual watchfulness and intercessory warfare — equipping believers to discern the times and engage the unseen battles that shape earthly outcomes.',
    price: '£15',
    link: '',
    cover: '/books/watchandwarlords.jpeg',
  },
  {
    id: 'following-the-leaders-spirit',
    number: 14,
    title: "Following the Leader's Spirit",
    category: 'Leadership',
    pages: 196,
    description:
      'Spiritual mentorship, apostolic succession, and the transfer of anointing — how to carry the spirit of a leader and multiply their legacy through faithful discipleship.',
    price: '£15',
    link: 'https://drisaelbuba.selar.com/3371u14zjp',
    cover: '/books/followingtheleaderspirit.jpeg',
  },
  {
    id: 'prophetic-mandate',
    number: 15,
    title: 'Prophetic Mandate',
    category: 'Leadership',
    pages: 138,
    description:
      'Understanding the assignment of the prophet in the earth — the mandate, the cost, and the glory of prophetic ministry for those carrying a prophetic burden today.',
    price: '£15',
    link: '',
    cover: '/books/propheticmandate.jpeg',
    readOnline: true,
  },
  {
    id: 'burning-mantles',
    number: 16,
    title: 'Burning Mantles',
    category: 'Spiritual Life',
    pages: 170,
    description:
      'The fire of calling, the weight of mantle, and the grace to carry both — prophetic ministry, spiritual authority, and what it means to be genuinely set apart for God.',
    price: '£15',
    link: 'https://drisaelbuba.selar.com/1pml035a77',
    cover: '/books/burningmantles.jpeg',
    featuredOnHome: true,
  },
  {
    id: 'wealth-creation',
    number: 17,
    title: 'Wealth Creation',
    category: 'Personal Growth',
    pages: 148,
    description:
      'Kingdom principles for financial increase and generational prosperity — biblical strategies for creating wealth that honours God and funds Kingdom assignments on earth.',
    price: '£15',
    link: 'https://drisaelbuba.selar.com/26h34nj3j4',
    cover: '/books/wealthcreation.jpeg',
    readOnline: true,
    featuredOnHome: true,
  },
  {
    id: 'queen-of-heaven-vol-1',
    number: 18,
    title: 'Queen of Heaven Vol. I',
    category: 'Spiritual Life',
    pages: 60,
    description:
      'A prophetic exposé on one of the most powerful spiritual forces opposing the Church — equipping believers to identify, confront, and overcome principalities of false worship.',
    price: '£15',
    link: '',
    cover: '/books/queenofheaven.jpeg',
    readOnline: true,
  },
]

export const featuredBooks = books.filter((book) => book.featuredOnHome)

/** WhatsApp number for book orders (+234 808 253 8837) */
export const BOOK_ORDER_WHATSAPP = '2348082538837'

export function getBookOrderWhatsAppLink(bookTitle: string): string {
  const message = `I am interested in the "${bookTitle}" from the website.`
  return `https://wa.me/${BOOK_ORDER_WHATSAPP}?text=${encodeURIComponent(message)}`
}
