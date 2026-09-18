// Catálogo - EDITAR ACÁ: sabores, precios, badges.
// price: precio actual en ARS (sin centavos). originalPrice: se muestra tachado (opcional).
// badge: 'promo' | 'nuevo' | null
// toppings: lista de ingredientes para el arte de la pizza y la descripción.

export type Category = 'pizzas' | 'pizzetas' | 'promos'

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

export type Topping = 'muzza' | 'tomate' | 'cebolla' | 'jamon' | 'morron' | 'aceituna' | 'calabresa' | 'provenzal' | 'cherry'

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

export const PRODUCTS: Product[] = [
  // ---- PIZZAS (8 porciones) ----
  {
    id: 'muzza',
    name: 'Muzzarella',
    desc: 'La clásica: salsa de tomate casera, abundante muzzarella y orégano.',
    price: 8000,
    category: 'pizzas',
    toppings: ['muzza', 'aceituna'],
    size: '8 porciones',
  },
  {
    id: 'napo',
    name: 'Napolitana',
    desc: 'Muzzarella, rodajas de tomate, ajo y provenzal. La favorita de siempre.',
    price: 9500,
    category: 'pizzas',
    toppings: ['muzza', 'tomate', 'provenzal'],
    size: '8 porciones',
  },
  {
    id: 'fugazzeta',
    name: 'Fugazzeta',
    desc: 'Cebolla dorada sobre una capa generosa de muzzarella.',
    price: 9500,
    category: 'pizzas',
    toppings: ['muzza', 'cebolla'],
    size: '8 porciones',
  },
  {
    id: 'jamon-morron',
    name: 'Jamón y Morrones',
    desc: 'Jamón natural, morrones asados y muzzarella.',
    price: 9500,
    category: 'pizzas',
    toppings: ['muzza', 'jamon', 'morron'],
    size: '8 porciones',
  },
  {
    id: 'calabresa',
    name: 'Calabresa',
    desc: 'Calabresa en rodajas, muzzarella y aceitunas.',
    price: 9500,
    category: 'pizzas',
    toppings: ['muzza', 'calabresa', 'aceituna'],
    size: '8 porciones',
  },
  {
    id: 'la-57',
    name: 'La 57',
    desc: 'La de la casa: cherrys, provenzal y extra muzza. Edición limitada.',
    price: 11000,
    badge: 'nuevo',
    category: 'pizzas',
    toppings: ['muzza', 'cherry', 'provenzal', 'aceituna'],
    size: '8 porciones',
  },

  // ---- PIZZETAS ----
  {
    id: 'pizzeta-muzza',
    name: 'Pizzeta Muzza',
    desc: 'Porción individual, misma receta. Ideal para una o dos personas.',
    price: 4000,
    badge: 'nuevo',
    category: 'pizzetas',
    toppings: ['muzza', 'aceituna'],
    size: 'Individual',
  },
  {
    id: 'pizzeta-napo',
    name: 'Pizzeta Napo',
    desc: 'Individual: tomate en rodajas, ajo y provenzal.',
    price: 4500,
    badge: 'nuevo',
    category: 'pizzetas',
    toppings: ['muzza', 'tomate', 'provenzal'],
    size: 'Individual',
  },

  // ---- PROMOS ----
  {
    id: 'promo-3-muzza',
    name: '3 de Muzza',
    desc: 'Tres muzzarellas de 8 porciones. El freezer te lo agradece.',
    price: 21000,
    badge: 'promo',
    category: 'promos',
    toppings: ['muzza', 'aceituna'],
    size: '3 unidades',
  },
  {
    id: 'promo-3-sabores',
    name: '3 de Sabores',
    desc: 'Tres pizzas a elección entre todos los sabores.',
    price: 27000,
    badge: 'promo',
    category: 'promos',
    toppings: ['muzza', 'tomate', 'cebolla', 'jamon', 'morron'],
    size: '3 unidades',
  },
]

export const CATEGORY_LABEL: Record<Category, string> = {
  promos: 'Promos',
  pizzas: 'Pizzas · 8 porciones',
  pizzetas: 'Pizzetas · individuales',
}

export const CATEGORY_ORDER: Category[] = ['promos', 'pizzas', 'pizzetas']

export const formatPrice = (n: number) =>
  '$' + n.toLocaleString('es-AR')
