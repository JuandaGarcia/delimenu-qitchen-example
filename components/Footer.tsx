import type { Restaurant } from '@/lib/delimenu'

function RollLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group block h-3 overflow-hidden text-cream no-underline">
      <span className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-3">
        <p className="text-[12px] leading-3 tracking-[1px] whitespace-nowrap uppercase">{label}</p>
        <p aria-hidden className="text-[12px] leading-3 tracking-[1px] whitespace-nowrap uppercase">
          {label}
        </p>
      </span>
    </a>
  )
}

export function Footer({ restaurant }: { restaurant: Restaurant }) {
  return (
    <footer className="outline-line flex flex-col items-center justify-center gap-10 rounded-2xl p-6 tablet:h-[60px] tablet:flex-row">
      <RollLink href={restaurant.menu_url} label={`© ${restaurant.name}`} />
      <RollLink href="https://delimenu.co/developers" label="Delimenu API" />
    </footer>
  )
}
