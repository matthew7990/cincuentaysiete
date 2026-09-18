import type { Category, Topping } from '@/types'

export const formatPrice = (n: number) => '$' + n.toLocaleString('es-AR')

export const TOPPING_LABEL: Record<Topping, string> = {
  muzza: 'Muzzarella',
  tomate: 'Tomate',
  cebolla: 'Cebolla',
  jamon: 'Jamón',
  morron: 'Morrón',
  aceituna: 'Aceitunas',
  calabresa: 'Calabresa',
  provenzal: 'Provenzal',
  cherry: 'Tomate cherry',
}

export const CATEGORY_LABEL: Record<Category, string> = {
  promos: 'Promos',
  pizzas: 'Pizzas · 8 porciones',
  pizzetas: 'Pizzetas · individuales',
}

export const CATEGORY_ORDER: Category[] = ['promos', 'pizzas', 'pizzetas']
