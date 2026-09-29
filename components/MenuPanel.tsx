import Image from 'next/image'
import type { Category, Product } from '@/lib/delimenu'
import { formatPrice, slugify } from '@/lib/delimenu'

const sectionId = (category: Category) => `menu-${slugify(category.name)}`

function Ornament({ flip }: { flip?: boolean }) {
  return (
    <div className={['flex items-center gap-px py-[7px]', flip ? 'flex-row-reverse' : ''].join(' ')}>
      <span className="outline-line block size-2 rotate-45" />
      <span className="block h-px w-[30px] bg-line" />
    </div>
  )
}

function ProductRow({ product, currency }: { product: Product; currency: string }) {
  const onPromo = product.original_price !== undefined && product.original_price > product.price

  return (
    <article className="flex flex-col gap-6 tablet:flex-row tablet:items-center">
      <div className="relative aspect-[3/2] w-full shrink-0 overflow-hidden rounded-lg tablet:h-[100px] tablet:w-[150px]">
        {product.image_url && (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(min-width: 810px) 150px, 100vw"
            className={['object-cover', product.available ? '' : 'grayscale'].join(' ')}
          />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
        <div className="flex w-full items-end gap-4">
          <h3 className="font-display text-[20px] leading-6 tracking-[1px] uppercase">{product.name}</h3>
          <div className="flex flex-1 flex-col items-end pb-1.5">
            <div className="leader w-full" />
          </div>
          <p className="flex gap-2 font-display text-[20px] leading-6 tracking-[1px] whitespace-nowrap uppercase">
            {onPromo && <span className="text-muted line-through">{formatPrice(product.original_price!, currency)}</span>}
            <span>{product.available ? formatPrice(product.price, currency) : 'Sold out'}</span>
          </p>
        </div>
        {product.description && (
          <p className="w-full text-[14px] leading-[22.4px] font-light text-muted tablet:w-[90%]">{product.description}</p>
        )}
      </div>
    </article>
  )
}

/** Category chips, then one titled section per category. */
export function MenuPanel({ categories, currency }: { categories: Category[]; currency: string }) {
  return (
    <div
      id="menu"
      className="outline-line flex flex-col items-center gap-8 rounded-2xl p-10 tablet:gap-16 tablet:p-16 desktop:px-20 desktop:pt-16 desktop:pb-20"
    >
      <nav aria-label="Categories" className="fade-in flex flex-wrap justify-center gap-1">
        {categories.map((category) => (
          <a
            key={category.id}
            href={`#${sectionId(category)}`}
            className="outline-line rounded-md px-2.5 py-2 text-cream no-underline transition-colors duration-200 hover:bg-chip"
          >
            <p className="text-[12px] leading-3 tracking-[0.5px] uppercase">{category.name}</p>
          </a>
        ))}
      </nav>

      <div className="flex w-full flex-col gap-16 tablet:w-[660px] tablet:max-w-full tablet:gap-24 desktop:w-full">
        {categories.map((category) => (
          <section key={category.id} id={sectionId(category)} className="flex scroll-mt-28 flex-col gap-8 tablet:gap-12 desktop:scroll-mt-8">
            <div className="flex items-center justify-center gap-3">
              <Ornament />
              <h2 className="font-display text-[24px] leading-[28.8px] tracking-[1px] uppercase tablet:text-[32px] tablet:leading-[35.2px]">
                {category.name}
              </h2>
              <Ornament flip />
            </div>
            <div className="flex flex-col gap-6">
              {category.products.map((product) => (
                <ProductRow key={product.id} product={product} currency={currency} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
