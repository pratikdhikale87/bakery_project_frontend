import { Clock3, ShieldCheck, ShoppingBag, Star, Truck, Zap } from 'lucide-react'
import { useEffect, useEffectEvent, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import QuantitySelector from '../components/QuantitySelector'
import { formatCurrency } from '../data/initialData'
import { useStore } from '../context/StoreContext'

function ProductDetailsPage() {
  const { slug } = useParams()
  const { products, addToCart, beginQuickBuy } = useStore()
  const product = products.find((entry) => entry.slug === slug)

  if (!product) {
    return (
      <section className="rounded-[36px] bg-white px-6 py-16 text-center shadow-[0_30px_90px_rgba(17,17,17,0.06)]">
        <p className="text-2xl font-semibold text-[var(--text-main)]">Product not found</p>
        <p className="mt-3 text-sm text-[var(--text-soft)]">
          The selected bakery item does not exist in the catalog.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex rounded-full bg-[var(--brand-pink)] px-6 py-3 text-sm font-semibold text-white"
        >
          Back to products
        </Link>
      </section>
    )
  }

  return (
    <ProductDetailsContent
      key={product.id}
      product={product}
      products={products}
      addToCart={addToCart}
      beginQuickBuy={beginQuickBuy}
    />
  )
}

function ProductDetailsContent({ product, products, addToCart, beginQuickBuy }) {
  const navigate = useNavigate()
  const [activeImage, setActiveImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]?.label ?? '')
  const [quantity, setQuantity] = useState(1)
  const currentSize = product.sizes.find((size) => size.label === selectedSize) ?? product.sizes[0]
  const relatedProducts = products
    .filter((entry) => entry.category === product.category && entry.id !== product.id)
    .slice(0, 3)

  const rotateImage = useEffectEvent(() => {
    setActiveImage((value) => (value + 1) % product.images.length)
  })

  useEffect(() => {
    const interval = window.setInterval(() => {
      rotateImage()
    }, 5000)

    return () => window.clearInterval(interval)
  }, [product.images.length])

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      size: currentSize.label,
      quantity,
    })
  }

  const handleQuickBuy = () => {
    beginQuickBuy({
      productId: product.id,
      size: currentSize.label,
      quantity,
    })

    navigate('/checkout?mode=quick')
  }

  return (
    <div className="space-y-10">
      <section className="grid gap-8 rounded-[40px] bg-white p-6 shadow-[0_34px_100px_rgba(17,17,17,0.06)] lg:grid-cols-2 lg:p-8">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-[32px] bg-[var(--soft-pink)]">
            <img
              src={product.images[activeImage]}
              alt={`${product.name} preview ${activeImage + 1}`}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {product.images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveImage(index)}
                className={`overflow-hidden rounded-[20px] border transition ${
                  activeImage === index
                    ? 'border-[var(--brand-pink)] ring-2 ring-[var(--brand-pink)]/20'
                    : 'border-black/10'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="aspect-square w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[var(--soft-pink)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-pink)]">
                {product.badge}
              </span>
              <span className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--text-soft)]">
                {product.category}
              </span>
            </div>

            <div>
              <h1 className="font-serif text-4xl text-[var(--text-main)] sm:text-5xl">
                {product.name}
              </h1>
              <p className="mt-3 text-base leading-7 text-[var(--text-soft)]">{product.description}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[24px] border border-black/10 bg-[var(--soft-pink)] p-4">
                <Star className="h-4 w-4 text-[var(--brand-pink)]" />
                <p className="mt-2 text-lg font-semibold">{product.rating}</p>
                <p className="text-sm text-[var(--text-soft)]">{product.reviewCount} reviews</p>
              </div>
              <div className="rounded-[24px] border border-black/10 bg-[var(--soft-pink)] p-4">
                <Clock3 className="h-4 w-4 text-[var(--brand-pink)]" />
                <p className="mt-2 text-lg font-semibold">{product.deliveryTime}</p>
                <p className="text-sm text-[var(--text-soft)]">Estimated delivery</p>
              </div>
              <div className="rounded-[24px] border border-black/10 bg-[var(--soft-pink)] p-4">
                <ShieldCheck className="h-4 w-4 text-[var(--brand-pink)]" />
                <p className="mt-2 text-lg font-semibold">Fresh seal</p>
                <p className="text-sm text-[var(--text-soft)]">Packed securely</p>
              </div>
            </div>

            <div className="rounded-[32px] border border-black/10 p-5">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-soft)]">
                    Selected price
                  </p>
                  <p className="mt-1 text-4xl font-semibold text-[var(--text-main)]">
                    {formatCurrency(currentSize.price)}
                  </p>
                </div>
                <QuantitySelector value={quantity} onChange={setQuantity} />
              </div>

              <div className="mt-5">
                <p className="text-sm font-semibold text-[var(--text-main)]">Choose size</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size.label}
                      type="button"
                      onClick={() => setSelectedSize(size.label)}
                      className={`rounded-full px-4 py-3 text-sm font-semibold transition ${
                        selectedSize === size.label
                          ? 'bg-black text-white'
                          : 'border border-black/10 bg-[var(--soft-pink)] text-[var(--text-main)]'
                      }`}
                    >
                      {size.label} / {formatCurrency(size.price)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-[var(--text-main)] transition hover:border-black"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add to cart
                </button>
                <button
                  type="button"
                  onClick={handleQuickBuy}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-pink)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-black hover:text-white"
                >
                  <Zap className="h-4 w-4" />
                  Quick buy
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[28px] bg-[var(--soft-pink)] p-5">
              <p className="text-sm font-semibold text-[var(--text-main)]">Highlights</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--text-soft)]">
                {product.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[28px] bg-[var(--soft-pink)] p-5">
              <p className="text-sm font-semibold text-[var(--text-main)]">Ingredients</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--text-soft)]">
                {product.ingredients.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-[28px] border border-black/10 bg-white p-5">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-[var(--brand-pink)]" />
              <div>
                <p className="font-semibold text-[var(--text-main)]">Delivery and support</p>
                <p className="text-sm text-[var(--text-soft)]">
                  Track this item later from the user dashboard after checkout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[var(--brand-pink)]">
              Related products
            </p>
            <h2 className="mt-2 font-serif text-3xl text-[var(--text-main)]">You may also like</h2>
          </div>
          <Link to="/products" className="text-sm font-semibold text-[var(--text-main)]">
            View catalog
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {relatedProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default ProductDetailsPage
