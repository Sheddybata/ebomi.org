import { BOOK_ORDER_WHATSAPP } from './books'

export function getMerchOrderWhatsAppLink(productName: string): string {
  const message = `I am interested in the "${productName}" from the EBOMI store.`
  return `https://wa.me/${BOOK_ORDER_WHATSAPP}?text=${encodeURIComponent(message)}`
}

export interface Product {
  id: string
  name: string
  image: string
  images?: string[]
  price: string
  link: string
  category: 'lapel' | 'apparel' | 'accessories'
}

function merch(
  id: string,
  name: string,
  image: string,
  price: string,
  category: Product['category'],
  images?: string[]
): Product {
  return {
    id,
    name,
    image,
    images,
    price,
    link: getMerchOrderWhatsAppLink(name),
    category,
  }
}

export const storeProducts: Product[] = [
  merch(
    '1',
    'EBOMI Lapel Pin',
    '/merch/lapelpin/157a4478-e0db-485f-9c36-37c2ada3d879.png',
    '₦3,500',
    'lapel'
  ),
  merch(
    '2',
    'EBOMI T-Shirt — Navy',
    '/merch/tshirts/9b385657-6ef3-42a9-b0fa-c322d4c9c97a.png',
    '₦5,000',
    'apparel'
  ),
  merch(
    '3',
    'EBOMI T-Shirt — White',
    '/merch/tshirts/4bbabbff-1903-41c3-8275-e5fe1d372043.png',
    '₦5,000',
    'apparel'
  ),
  merch(
    '4',
    'EBOMI T-Shirt — White Sport',
    '/merch/tshirts/1015b27b-abbb-4a03-b12c-ae8e009e7bd6.png',
    '₦5,000',
    'apparel'
  ),
  merch(
    '5',
    'EBOMI Face Cap — White',
    '/merch/caps/92d5780d-8e9d-49f2-8d43-60606a7e2974.png',
    '₦2,500',
    'accessories'
  ),
  merch(
    '6',
    'EBOMI Face Cap — Navy',
    '/merch/caps/c6933947-5da1-40fe-832c-a2e6b5bb96c5.png',
    '₦2,500',
    'accessories'
  ),
  merch(
    '7',
    'EBOMI Wristband',
    '/merch/wristband/30a5c276-095d-4ff1-8e9f-ff03b1c38a14.png',
    '₦1,500',
    'accessories',
    [
      '/merch/wristband/30a5c276-095d-4ff1-8e9f-ff03b1c38a14.png',
      '/merch/wristband/af07d47e-5ce7-4a19-b64c-817d3770ff1a.png',
    ]
  ),
]
