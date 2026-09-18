import type { Product } from '@/types'

export const waLink = (message: string, phone: string) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

export const waChatLink = (phone: string) =>
  waLink('Hola 57! Quiero hacer una consulta.', phone)

export interface CartLine {
  product: Product
  qty: number
}

export const formatPrice = (n: number) => '$' + n.toLocaleString('es-AR')

export function orderMessage(lines: CartLine[], total: number): string {
  const items = lines
    .map((l) => `- ${l.qty}x ${l.product.name} (${formatPrice(l.product.price * l.qty)})`)
    .join('\n')
  return `Hola 57! Quiero hacer un pedido:\n\n${items}\n\nTotal estimado: ${formatPrice(total)}\n\nGracias!`
}
