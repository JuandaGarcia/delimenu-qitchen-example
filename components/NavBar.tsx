import Image from 'next/image'
import type { Restaurant } from '@/lib/delimenu'
import { whatsappUrl } from '@/lib/delimenu'

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="group relative flex h-[41px] items-center rounded-lg px-3 text-cream no-underline">
      <span className="block h-3 overflow-hidden">
        <span className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-3">
          <p className="text-[12px] leading-3 tracking-[1px] uppercase">{label}</p>
          <p aria-hidden className="text-[12px] leading-3 tracking-[1px] uppercase">
            {label}
          </p>
        </span>
      </span>
    </a>
  )
}

/** Floating bar: pinned top-left on desktop, centred on top from tablet down. */
export function NavBar({ restaurant }: { restaurant: Restaurant }) {
  const bookUrl = whatsappUrl(restaurant.phone, restaurant.name) ?? restaurant.menu_url

  return (
    <div className="fade-in fixed top-8 left-1/2 z-40 -translate-x-1/2 tablet:top-12 desktop:top-[72px] desktop:left-[72px] desktop:translate-x-0">
      <nav className="flex w-[calc(100vw-88px)] items-center justify-between gap-3 rounded-xl bg-ink p-2 tablet:w-auto tablet:justify-start">
        <div className="flex items-center gap-2">
          <a
            href={restaurant.menu_url}
            aria-label="Open the menu on Delimenu"
            className="outline-line flex size-[41px] shrink-0 items-center justify-center rounded-lg bg-chip"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1" className="text-cream">
              <path d="M1 4h14M1 8h14M1 12h14" />
            </svg>
          </a>
          <a href="/menu" aria-label={restaurant.name} className="mt-1 block">
            <Image src="/logo.webp" alt={restaurant.name} width={100} height={27} priority className="block h-[23.9px] w-[90px] object-cover tablet:h-[26.6px] tablet:w-[100px]" />
          </a>
        </div>
        <div className="hidden items-center gap-0.5 tablet:flex">
          <NavLink href="#menu" label="Menu" />
          <NavLink href={restaurant.menu_url} label="About" />
        </div>
        <a
          href={bookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="outline-line group flex items-center rounded-lg bg-chip px-4 py-3.5 tablet:-ml-1 text-cream no-underline"
        >
          <span className="block h-[13.2px] overflow-hidden">
            <span className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-[13.2px]">
              <p className="text-[12px] leading-[13.2px] tracking-[1px] whitespace-nowrap uppercase">Book a table</p>
              <p aria-hidden className="text-[12px] leading-[13.2px] tracking-[1px] whitespace-nowrap uppercase">
                Book a table
              </p>
            </span>
          </span>
        </a>
      </nav>
    </div>
  )
}
