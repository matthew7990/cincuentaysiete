import { BUSINESS } from '@/config'
import type { Product } from '@/data/products'
import { formatPrice } from '@/data/products'

export const waLink = (message: string) =>
  `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`

export const waChatLink = () => waLink('Hola 57! Quiero hacer una consulta.')

export interface CartLine {
  product: Product
  qty: number
}

export function orderMessage(lines: CartLine[], total: number): string {
  const items = lines
    .map((l) => `- ${l.qty}x ${l.product.name} (${formatPrice(l.product.price * l.qty)})`)
    .join('\n')
  return `Hola 57! Quiero hacer un pedido:\n\n${items}\n\nTotal estimado: ${formatPrice(total)}\n\nGracias!`
}
