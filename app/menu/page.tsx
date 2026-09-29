import type { Metadata } from 'next'
import Image from 'next/image'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { MenuPanel } from '@/components/MenuPanel'
import { NavBar } from '@/components/NavBar'
import { fetchMenu } from '@/lib/delimenu'

// Rebuilt in the background at most every five minutes, so the API is not hit on every
// visit. Must be a literal (Next reads it statically); keep it equal to MENU_REVALIDATE_SECONDS.
export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  const result = await fetchMenu()
  if (!result.ok) return { title: 'Menu unavailable' }
  const { restaurant } = result.menu
  return {
    title: `Menu — ${restaurant.name}`,
    description: `The ${restaurant.name} menu, served from the Delimenu API.`,
    openGraph: restaurant.banner_url ? { images: [restaurant.banner_url] } : undefined,
  }
}

export default async function MenuPage() {
  const result = await fetchMenu()

  if (!result.ok) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="font-display text-[56px] leading-none uppercase">{result.restaurantName ?? 'Menu'}</h1>
        <p className="max-w-[420px] text-[14px] leading-[22.4px] font-light text-muted">{result.message}</p>
      </main>
    )
  }

  const { restaurant, categories } = result.menu

  return (
    <>
      <NavBar restaurant={restaurant} />
      <div className="px-3 tablet:px-4">
        <main className="flex flex-col desktop:flex-row desktop:gap-4">
          <Hero imageUrl={restaurant.banner_url ?? '/hero.webp'} />
          <div className="flex min-w-0 flex-col gap-3 pt-5 tablet:gap-4 desktop:flex-1 desktop:py-4">
            <MenuPanel categories={categories} currency={restaurant.currency} />
            <Footer restaurant={restaurant} />
          </div>
        </main>
      </div>
      {/* Film grain over everything, as in the reference. */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-50 opacity-5">
        <Image src="/noise.jpg" alt="" fill sizes="100vw" className="object-cover" />
      </div>
    </>
  )
}
