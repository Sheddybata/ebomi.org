import { LOGO_PATH } from './constants'

export interface Product {
  id: string
  name: string
  image: string
  price: string
  link: string
  category: 'crest' | 'apparel' | 'accessories'
}

// Placeholder products - links will be updated when Selar products are ready
export const storeProducts: Product[] = [
  {
    id: '1',
    name: 'EBOMI Crest',
    image: LOGO_PATH,
    price: '₦3,500',
    link: '#',
    category: 'crest',
  },
  {
    id: '2',
    name: 'EBOMI T-Shirt',
    image: LOGO_PATH,
    price: '₦5,000',
    link: '#',
    category: 'apparel',
  },
  {
    id: '3',
    name: 'EBOMI Face Cap',
    image: LOGO_PATH,
    price: '₦2,500',
    link: '#',
    category: 'accessories',
  },
  {
    id: '4',
    name: 'EBOMI Wristband',
    image: LOGO_PATH,
    price: '₦1,500',
    link: '#',
    category: 'accessories',
  },
]
