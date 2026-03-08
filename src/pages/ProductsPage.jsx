import { Search, SlidersHorizontal } from 'lucide-react'
import { useDeferredValue, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useStore } from '../context/StoreContext'

function ProductsPage() {
  const { categories, products } = useStore()
  const [searchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') ?? 'all')
  const [sortBy, setSortBy] = useState('featured')
  const [searchQuery, setSearchQuery] = useState('')
  const deferredSearch = useDeferredValue(searchQuery)

  const filteredProducts = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase()

    const list = products.filter((product) => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory
      const matchesSearch =
        !query ||
        `${product.name} ${product.tagline} ${product.category}`.toLowerCase().includes(query)

      return matchesCategory && matchesSearch
    })

    switch (sortBy) {
      case 'price-low':
        return [...list].sort((a, b) => a.sizes[0].price - b.sizes[0].price)
      case 'price-high':
        return [...list].sort((a, b) => b.sizes[0].price - a.sizes[0].price)
      case 'rating':
        return [...list].sort((a, b) => b.rating - a.rating)
      default:
        return [...list].sort((a, b) => Number(b.featured) - Number(a.featured))
    }
  }, [activeCategory, deferredSearch, products, sortBy])

  return (
    <div className="space-y-8">
      <section className="rounded-[38px] bg-white px-6 py-8 shadow-[0_30px_90px_rgba(17,17,17,0.06)] sm:px-8 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[var(--brand-pink)]">
              Product Page
            </p>
            <h1 className="mt-2 font-serif text-4xl text-[var(--text-main)] sm:text-5xl">
              Filter bakery products by category
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-soft)] sm:text-base">
              This page lets users browse every product and filter by category such as cakes,
              pastries, biscuits, and breads. Search and sorting are also included for a more
              complete storefront.
            </p>
          </div>

          <div className="grid gap-4 rounded-[30px] bg-[var(--soft-pink)] p-4 sm:grid-cols-[1fr_auto]">
            <label className="flex items-center gap-3 rounded-full border border-black/10 bg-white px-4 py-3">
              <Search className="h-4 w-4 text-[var(--text-soft)]" />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search cake, pastry, biscuit..."
                className="w-full border-0 bg-transparent text-sm text-[var(--text-main)] outline-none placeholder:text-[var(--text-soft)]"
              />
            </label>

            <label className="flex items-center gap-3 rounded-full border border-black/10 bg-white px-4 py-3">
              <SlidersHorizontal className="h-4 w-4 text-[var(--text-soft)]" />
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="bg-transparent text-sm text-[var(--text-main)] outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </label>
          </div>
        </div>
      </section>

      <section className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setActiveCategory('all')}
          className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
            activeCategory === 'all'
              ? 'bg-black text-white'
              : 'border border-black/10 bg-white text-[var(--text-main)]'
          }`}
        >
          All products
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setActiveCategory(category.id)}
            className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
              activeCategory === category.id
                ? 'bg-[var(--brand-pink)] text-white'
                : 'border border-black/10 bg-white text-[var(--text-main)]'
            }`}
          >
            {category.label}
          </button>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>

      {filteredProducts.length === 0 ? (
        <section className="rounded-[34px] border border-dashed border-black/20 bg-white px-6 py-12 text-center">
          <p className="text-xl font-semibold text-[var(--text-main)]">No products match the filter.</p>
          <p className="mt-2 text-sm text-[var(--text-soft)]">
            Try a different category or search keyword.
          </p>
        </section>
      ) : null}
    </div>
  )
}

export default ProductsPage
