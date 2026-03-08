import { ArrowRight, ShoppingCart, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import QuantitySelector from '../components/QuantitySelector'
import { formatCurrency } from '../data/initialData'
import { useStore } from '../context/StoreContext'

function CartPage() {
  const { cartItems, cartSubtotal, removeFromCart, updateCartQuantity } = useStore()

  if (!cartItems.length) {
    return (
      <section className="rounded-[38px] bg-white px-6 py-16 text-center shadow-[0_30px_90px_rgba(17,17,17,0.06)]">
        <ShoppingCart className="mx-auto h-12 w-12 text-[var(--brand-pink)]" />
        <p className="mt-6 text-3xl font-semibold text-[var(--text-main)]">Your cart is empty</p>
        <p className="mt-3 text-sm leading-6 text-[var(--text-soft)]">
          Add a cake, pastry, biscuit, or bread first. You can also use the quick-buy flow
          directly from a product card.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--brand-pink)] px-6 py-3 text-sm font-semibold text-white"
        >
          Explore products
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    )
  }

  const taxes = Math.round(cartSubtotal * 0.05)
  const grandTotal = cartSubtotal + taxes

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <section className="space-y-4">
        {cartItems.map((item) => (
          <article
            key={`${item.productId}-${item.size}`}
            className="grid gap-5 rounded-[34px] bg-white p-5 shadow-[0_24px_80px_rgba(17,17,17,0.05)] sm:grid-cols-[140px_1fr]"
          >
            <img
              src={item.product.images[0]}
              alt={item.product.name}
              className="aspect-square w-full rounded-[26px] object-cover"
            />

            <div className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-soft)]">
                    {item.product.category}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-[var(--text-main)]">
                    {item.product.name}
                  </p>
                  <p className="mt-2 text-sm text-[var(--text-soft)]">Selected size: {item.size}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromCart({ productId: item.productId, size: item.size })}
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-[var(--text-main)] transition hover:border-red-500 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </button>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <QuantitySelector
                  value={item.quantity}
                  onChange={(quantity) =>
                    updateCartQuantity({
                      productId: item.productId,
                      size: item.size,
                      quantity,
                    })
                  }
                />
                <div className="text-right">
                  <p className="text-sm text-[var(--text-soft)]">
                    {formatCurrency(item.unitPrice)} each
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-[var(--text-main)]">
                    {formatCurrency(item.totalPrice)}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <aside className="space-y-5 rounded-[36px] bg-white p-6 shadow-[0_30px_90px_rgba(17,17,17,0.06)]">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-[var(--brand-pink)]">Cart summary</p>
          <h1 className="mt-2 font-serif text-3xl text-[var(--text-main)]">Ready to place order</h1>
          <p className="mt-3 text-sm leading-6 text-[var(--text-soft)]">
            The checkout page will let the user place the order and later track it from the user
            dashboard.
          </p>
        </div>

        <div className="rounded-[28px] bg-[var(--soft-pink)] p-5">
          <div className="flex items-center justify-between py-2 text-sm text-[var(--text-soft)]">
            <span>Subtotal</span>
            <span>{formatCurrency(cartSubtotal)}</span>
          </div>
          <div className="flex items-center justify-between py-2 text-sm text-[var(--text-soft)]">
            <span>Packaging and tax</span>
            <span>{formatCurrency(taxes)}</span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-black/10 pt-4 text-lg font-semibold text-[var(--text-main)]">
            <span>Total</span>
            <span>{formatCurrency(grandTotal)}</span>
          </div>
        </div>

        <div className="space-y-3 text-sm text-[var(--text-soft)]">
          <p>1. Mobile-friendly checkout layout.</p>
          <p>2. User login flow before payment confirmation.</p>
          <p>3. Order status visible from dashboard and admin panel.</p>
        </div>

        <Link
          to="/checkout"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-pink)]"
        >
          Proceed to checkout
          <ArrowRight className="h-4 w-4" />
        </Link>
      </aside>
    </div>
  )
}

export default CartPage
