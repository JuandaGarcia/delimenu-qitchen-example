import Image from 'next/image'

/**
 * Big photo with "Menu" set over a dark gradient. Sticky beside the menu on
 * desktop; stacked above it, at a fixed aspect ratio, below that.
 */
export function Hero({ imageUrl, title = 'Menu' }: { imageUrl: string; title?: string }) {
  return (
    <div className="py-3 tablet:py-4 desktop:sticky desktop:top-0 desktop:h-dvh desktop:flex-1">
      <div className="relative aspect-square overflow-hidden rounded-2xl tablet:aspect-[1.17879] desktop:aspect-auto desktop:h-full">
        <Image src={imageUrl} alt="" fill priority sizes="(min-width: 1280px) 50vw, 100vw" className="object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-linear-to-b from-black/0 to-black opacity-80" />
        <h1
          aria-label={title}
          className="absolute inset-x-0 bottom-8 text-center font-display text-[56px] leading-[50.4px] uppercase tablet:bottom-[38px] tablet:text-[80px] tablet:leading-[72px] desktop:bottom-14 desktop:left-14 desktop:text-left desktop:text-[96px] desktop:leading-[86.4px]"
        >
          {[...title].map((letter, index) => (
            <span key={index} aria-hidden className="letter" style={{ animationDelay: `${0.15 + index * 0.08}s` }}>
              {letter}
            </span>
          ))}
        </h1>
      </div>
    </div>
  )
}
