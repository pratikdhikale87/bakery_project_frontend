import { Heart, ShoppingBag, Zap } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { formatCurrency } from '../data/initialData'
import { useStore } from '../context/StoreContext'

function ProductCard({ product }) {
  const navigate = useNavigate()
  const { addToCart, beginQuickBuy, toggleWishlist, wishlist } = useStore()
  const defaultSize = product.sizes[0]?.label
  const isWishlisted = wishlist.includes(product.id)

  const handleQuickBuy = () => {
    beginQuickBuy({
      productId: product.id,
      size: defaultSize,
      quantity: 1,
    })

    navigate('/checkout?mode=quick')
  }

  return (
    <article className="group overflow-hidden rounded-[30px] border border-black/10 bg-white shadow-[0_28px_80px_rgba(17,17,17,0.06)]">
      <div className="relative">
        <Link to={`/products/${product.slug}`} className="block overflow-hidden bg-[var(--soft-pink)]">
          <img
            src={product.images[0]}
            alt={product.name}
            className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </Link>
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[var(--brand-pink)]">
          {product.badge}
        </div>
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          className={`absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/90 transition ${
            isWishlisted ? 'text-[var(--brand-pink)]' : 'text-[var(--text-main)]'
          }`}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-soft)]">
            {product.category}
          </p>
          <Link to={`/products/${product.slug}`} className="mt-2 block text-xl font-semibold">
            {product.name}
          </Link>
          <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">{product.tagline}</p>
        </div>

        <div className="flex items-center justify-between text-sm text-[var(--text-soft)]">
          <span>{product.rating} rating</span>
          <span>{product.deliveryTime}</span>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-soft)]">Starts at</p>
            <p className="mt-1 text-2xl font-semibold text-[var(--text-main)]">
              {formatCurrency(product.sizes[0]?.price ?? product.basePrice)}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => addToCart({ productId: product.id, size: defaultSize, quantity: 1 })}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-[var(--text-main)] transition hover:border-black"
            >
              <ShoppingBag className="h-4 w-4" />
              Add
            </button>
            <button
              type="button"
              onClick={handleQuickBuy}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-pink)] px-4 py-2 text-sm font-medium text-white transition hover:bg-black hover:text-white"
            >
              <Zap className="h-4 w-4" />
              Quick Buy
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
