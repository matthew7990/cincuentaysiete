export type Category = 'pizzas' | 'pizzetas' | 'promos'

export type Topping =
  | 'muzza' | 'tomate' | 'cebolla' | 'jamon' | 'morron'
  | 'aceituna' | 'calabresa' | 'provenzal' | 'cherry'

export interface Product {
  id: string
  name: string
  desc: string
  price: number
  originalPrice?: number
  badge?: 'promo' | 'nuevo'
  category: Category
  toppings: Topping[]
  size?: string
}

export interface Business {
  name: string
  fullName: string
  tagline: string
  whatsapp: string // formato internacional sin +, para wa.me
  whatsappDisplay: string
  instagram: string
  instagramHandle: string
  barrio: string
  zona: string
  city: string
}

export interface Faq {
  q: string
  a: string
}

export interface SiteData {
  business: Business
  marquee: string[]
  products: Product[]
  faqs: Faq[]
}
