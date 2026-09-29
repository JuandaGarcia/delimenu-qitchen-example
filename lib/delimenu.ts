/**
 * Minimal client for Delimenu's public menu endpoint.
 *
 * `GET /api/v1/menus/{identifier}` needs no API key: it serves the published
 * menu of any restaurant with an active plan. Hidden products are already
 * filtered out and categories arrive in the order the owner set.
 * Docs: https://delimenu.co/developers
 */

export const DELIMENU_API_URL = process.env.DELIMENU_API_URL ?? 'https://delimenu.co/api/v1'
export const DELIMENU_MENU = process.env.DELIMENU_MENU ?? 'qitchen'

/** Seconds a fetched menu is reused before Next.js asks the API again. */
export const MENU_REVALIDATE_SECONDS = 300

export type VariantOption = {
  id: string
  name: string
  /** Extra charge on top of the product price, in major units. */
  price: number
  show: boolean
}

export type Variant = {
  id: string
  name: string
  /** 0 means optional. */
  min_selections: number
  /** 0 means no limit. */
  max_selections: number
  max_per_option?: number
  options: VariantOption[]
}

export type Product = {
  id: string
  category_id: string
  name: string
  /** Major units in the restaurant currency (6.25 = $6.25), never cents. */
  price: number
  /** Present only while the product is on promotion. */
  original_price?: number
  description?: string
  available: boolean
  hidden: boolean
  has_image: boolean
  image_url?: string
  variants: Variant[]
}

export type Category = {
  id: string
  name: string
  position: number
  products: Product[]
}

export type Restaurant = {
  id: string
  identifier: string
  name: string
  /** ISO 4217 code. */
  currency: string
  type: 'whatsapp' | 'read_only'
  /** E.164, e.g. +573001234567. */
  phone: string | null
  address: string | null
  menu_url: string
  logo_url: string | null
  banner_url: string | null
}

export type Menu = {
  restaurant: Restaurant
  categories: Category[]
}

export type MenuResult =
  | { ok: true; menu: Menu }
  | { ok: false; status: number; message: string; restaurantName?: string }

export async function fetchMenu(identifier: string = DELIMENU_MENU): Promise<MenuResult> {
  const url = `${DELIMENU_API_URL}/menus/${encodeURIComponent(identifier.toLowerCase())}`

  try {
    const res = await fetch(url, { next: { revalidate: MENU_REVALIDATE_SECONDS } })
    const body = await res.json().catch(() => null)

    if (res.ok) return { ok: true, menu: body as Menu }

    // 404 NOT_FOUND, or 403 RESTAURANT_UNAVAILABLE when the restaurant has no active plan.
    return {
      ok: false,
      status: res.status,
      message: body?.message ?? 'No pudimos cargar el menú.',
      restaurantName: body?.restaurant?.name,
    }
  } catch (error) {
    console.error('Error fetching Delimenu menu:', error)
    return { ok: false, status: 0, message: 'No pudimos conectar con Delimenu.' }
  }
}

/** Mirrors Delimenu's own menu formatter: narrow symbol, the currency's own decimals. */
export function formatPrice(value: number, currency: string): string {
  const decimals = currency === 'COP' ? 0 : undefined
  const hasCents = Math.round(value * 100) % 100 !== 0

  return new Intl.NumberFormat(currency === 'COP' ? 'es-CO' : 'en-US', {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: decimals ?? (hasCents ? 2 : 0),
    maximumFractionDigits: decimals ?? 2,
  }).format(value)
}

export function whatsappUrl(phone: string | null, restaurantName: string): string | null {
  if (!phone) return null
  const text = encodeURIComponent(`Hi ${restaurantName}, I would like to book a table.`)
  return `https://wa.me/${phone.replace(/\D/g, '')}?text=${text}`
}

export function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
