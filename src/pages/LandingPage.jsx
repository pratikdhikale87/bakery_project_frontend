import { ArrowRight, ShieldCheck, Sparkles, Star, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { deliverySteps, testimonials } from '../data/initialData'
import { useStore } from '../context/StoreContext'

function LandingPage() {
  const { categories, featuredProducts } = useStore()
  const heroProduct = featuredProducts[0]
  const collageCategories = categories.slice(0, 3)

  return (
    <div className="space-y-10 sm:space-y-12">
      <section className="relative overflow-hidden rounded-[44px] border border-white/70 bg-[var(--hero-bg)] px-6 py-8 shadow-[var(--shadow-soft)] sm:px-8 lg:px-12 lg:py-12">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.68),transparent_56%)] lg:block" />

        <div className="relative grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-pink)]/15 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--brand-pink)]">
              <Sparkles className="h-4 w-4" />
              Boutique bakery experience
            </div>

            <div className="space-y-4">
              <p className="max-w-md text-sm uppercase tracking-[0.28em] text-[var(--text-soft)]">
                Fresh cakes, pastries, breads, and biscuit jars
              </p>
              <h1 className="max-w-3xl font-serif text-4xl leading-[1.05] text-[var(--text-main)] sm:text-5xl lg:text-[4.4rem]">
                Bakery storefront that feels premium the moment it opens.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-[var(--text-soft)] sm:text-lg">
                Rosy Oven now has a stronger editorial theme: richer hero storytelling, visual
                category cards, quick ordering, dashboards, and a polished pink-black-white finish
                built to look more like a live boutique bakery brand.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-pink)] hover:text-white"
              >
                Explore the menu
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/account"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white/85 px-6 py-3 text-sm font-semibold text-[var(--text-main)] transition hover:border-black hover:bg-white"
              >
                Login or register
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[28px] border border-white/70 bg-white/85 p-4 backdrop-blur-sm">
                <Truck className="h-5 w-5 text-[var(--brand-pink)]" />
                <p className="mt-3 text-2xl font-semibold">45 min</p>
                <p className="mt-1 text-sm text-[var(--text-soft)]">Average delivery promise</p>
              </div>
              <div className="rounded-[28px] border border-white/70 bg-white/85 p-4 backdrop-blur-sm">
                <ShieldCheck className="h-5 w-5 text-[var(--brand-pink)]" />
                <p className="mt-3 text-2xl font-semibold">Fresh sealed</p>
                <p className="mt-1 text-sm text-[var(--text-soft)]">Packed for safe transport</p>
              </div>
              <div className="rounded-[28px] border border-white/70 bg-white/85 p-4 backdrop-blur-sm">
                <Star className="h-5 w-5 text-[var(--brand-pink)]" />
                <p className="mt-3 text-2xl font-semibold">4.8+</p>
                <p className="mt-1 text-sm text-[var(--text-soft)]">Average product rating</p>
              </div>
            </div>

            <div className="rounded-[32px] bg-black p-5 text-white shadow-[0_28px_80px_rgba(17,17,17,0.18)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-white/55">
                    Today&apos;s bakery window
                  </p>
                  <p className="mt-2 text-2xl font-semibold">Freshly baked, packed, then delivered</p>
                </div>
                <p className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80">
                  Same-day cakes and gifting boxes
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <article className="hero-float relative min-h-[420px] overflow-hidden rounded-[38px] bg-black shadow-[0_35px_100px_rgba(17,17,17,0.16)]">
              <img
                src={heroProduct?.images[0] ?? categories[0]?.image}
                alt={heroProduct?.name ?? 'Bakery spotlight'}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.05),rgba(17,17,17,0.76))]" />
              <div className="relative flex h-full flex-col justify-between p-6 text-white">
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/85">
                    Signature spotlight
                  </span>
                  <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-black">
                    Live bakery look
                  </span>
                </div>

                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-white/70">
                    {heroProduct?.badge ?? 'Best Seller'}
                  </p>
                  <h2 className="mt-3 max-w-sm font-serif text-4xl leading-tight">
                    {heroProduct?.name ?? 'Berry Velvet Cake'}
                  </h2>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-white/75">
                    {heroProduct?.tagline ??
                      'Soft sponge, glossy finish, and a storefront-first presentation.'}
                  </p>
                </div>
              </div>
            </article>

            <div className="grid gap-4">
              {collageCategories.map((category, index) => (
                <article
                  key={category.id}
                  className={`${index === 1 ? 'hero-float-delayed' : 'hero-float'} relative min-h-[132px] overflow-hidden rounded-[30px] border border-white/60 bg-white shadow-[0_24px_70px_rgba(17,17,17,0.08)]`}
                >
                  <img
                    src={category.image}
                    alt={category.label}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,17,0.76),rgba(17,17,17,0.18))]" />
                  <div className="relative flex h-full flex-col justify-end p-5 text-white">
                    <p className="text-xs uppercase tracking-[0.28em] text-white/65">
                      {category.shortLabel}
                    </p>
                    <div className="mt-2 flex items-end justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-semibold">{category.label}</h3>
                        <p className="mt-1 text-xs text-white/75">{category.accentLine}</p>
                      </div>
                      <Link
                        to={`/products?category=${category.id}`}
                        className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-white"
                      >
                        View
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[var(--brand-pink)]">
              Categories
            </p>
            <h2 className="mt-2 font-serif text-3xl text-[var(--text-main)] sm:text-4xl">
              Visual category browsing
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-[var(--text-soft)] sm:text-base">
            Each category now has its own bakery image so users instantly understand what is inside
            cakes, pastries, biscuits, and breads before opening the products page.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="group overflow-hidden rounded-[34px] border border-white/70 bg-white shadow-[var(--shadow-soft)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.label}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.04),rgba(17,17,17,0.72))]" />
                <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/12 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white">
                  {category.shortLabel}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <p className="text-xs uppercase tracking-[0.26em] text-white/70">{category.stat}</p>
                  <h3 className="mt-2 text-2xl font-semibold">{category.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/78">{category.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 bg-white px-5 py-4">
                <div>
                  <p className="text-sm font-semibold text-[var(--text-main)]">{category.headline}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.24em] text-[var(--text-soft)]">
                    {category.accentLine}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--soft-pink)] px-4 py-2 text-sm font-semibold text-[var(--brand-pink)]">
                  Shop
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-[42px] bg-[linear-gradient(135deg,#111111_0%,#2a0d16_100%)] px-6 py-8 text-white shadow-[0_32px_100px_rgba(17,17,17,0.18)] sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.28em] text-white/55">Delivery Flow</p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl">
              Freshly baked to packed to delivered
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/70 sm:text-base">
              The landing page now presents the delivery journey inside a darker premium panel so
              the process feels more like a live bakery brand than a plain brochure layout.
            </p>
          </div>
          <p className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
            Live status later continues in the user dashboard
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-4">
          {deliverySteps.map((step, index) => (
            <div
              key={step.title}
              className="relative rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg font-semibold text-black">
                0{index + 1}
              </div>
              <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/70">{step.text}</p>
              {index < deliverySteps.length - 1 ? (
                <div className="absolute right-[-18px] top-1/2 hidden h-[2px] w-9 -translate-y-1/2 bg-[var(--brand-rose-light)] lg:block" />
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[var(--brand-pink)]">
              Testimonials
            </p>
            <h2 className="mt-2 font-serif text-3xl text-[var(--text-main)] sm:text-4xl">
              What regular customers say
            </h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-main)]"
          >
            See featured bakes
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <div
              key={item.name}
              className={`rounded-[32px] border border-black/10 p-6 shadow-[0_18px_60px_rgba(17,17,17,0.05)] ${
                index === 1 ? 'bg-[var(--soft-pink)]' : 'bg-white'
              }`}
            >
              <p className="text-base leading-7 text-[var(--text-main)]">&ldquo;{item.quote}&rdquo;</p>
              <div className="mt-6 border-t border-black/10 pt-4">
                <p className="font-semibold text-[var(--text-main)]">{item.name}</p>
                <p className="mt-1 text-sm text-[var(--text-soft)]">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[var(--brand-pink)]">
              Quick order
            </p>
            <h2 className="mt-2 font-serif text-3xl text-[var(--text-main)] sm:text-4xl">
              Featured bakery products
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-[var(--text-soft)]">
            Users can add to cart or use the direct quick-buy action without adding products to the
            cart first.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default LandingPage
