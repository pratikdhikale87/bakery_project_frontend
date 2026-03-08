import { ArrowRight, LockKeyhole, MapPin, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { formatCurrency } from '../data/initialData'
import { useStore } from '../context/StoreContext'

function CheckoutPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { cartItems, currentUser, placeOrder, quickBuyItem } = useStore()
  const quickMode = searchParams.get('mode') === 'quick'
  const orderItems = quickMode && quickBuyItem ? [quickBuyItem] : cartItems
  const orderSubtotal = orderItems.reduce((sum, item) => sum + item.totalPrice, 0)
  const taxes = Math.round(orderSubtotal * 0.05)
  const total = orderSubtotal + taxes

  const [form, setForm] = useState({
    name: currentUser?.name ?? '',
    email: currentUser?.email ?? '',
    address: '',
    city: '',
    pinCode: '',
    paymentMethod: 'UPI',
    deliveryNote: '',
  })

  const [error, setError] = useState('')

  if (!orderItems.length) {
    return (
      <section className="rounded-[38px] bg-white px-6 py-16 text-center shadow-[0_30px_90px_rgba(17,17,17,0.06)]">
        <p className="text-3xl font-semibold text-[var(--text-main)]">Nothing to checkout yet</p>
        <p className="mt-3 text-sm leading-6 text-[var(--text-soft)]">
          Add an item to the cart or use the quick-buy option from the product page first.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--brand-pink)] px-6 py-3 text-sm font-semibold text-white"
        >
          Go to products
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    )
  }

  if (!currentUser) {
    return (
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[38px] bg-white p-6 shadow-[0_30px_90px_rgba(17,17,17,0.06)] sm:p-8">
          <div className="flex items-center gap-3">
            <LockKeyhole className="h-5 w-5 text-[var(--brand-pink)]" />
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand-pink)]">
              Login required
            </p>
          </div>
          <h1 className="mt-4 font-serif text-4xl text-[var(--text-main)]">
            Sign in to place and track the order
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--text-soft)]">
            The user dashboard is connected to the checkout flow. Logging in first allows the
            customer to place the order, track it later, and review previous orders.
          </p>
          <Link
            to={`/account?next=${encodeURIComponent(`/checkout${quickMode ? '?mode=quick' : ''}`)}`}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--brand-pink)] px-6 py-3 text-sm font-semibold text-white"
          >
            Login or register
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        <aside className="rounded-[38px] bg-white p-6 shadow-[0_30px_90px_rgba(17,17,17,0.06)] sm:p-8">
          <p className="text-sm uppercase tracking-[0.28em] text-[var(--brand-pink)]">Order summary</p>
          <div className="mt-5 space-y-4">
            {orderItems.map((item) => (
              <div
                key={`${item.productId}-${item.size}`}
                className="flex items-center gap-4 rounded-[26px] bg-[var(--soft-pink)] p-4"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="h-20 w-20 rounded-[20px] object-cover"
                />
                <div>
                  <p className="font-semibold text-[var(--text-main)]">{item.product.name}</p>
                  <p className="mt-1 text-sm text-[var(--text-soft)]">
                    {item.size} / Qty {item.quantity}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[var(--text-main)]">
                    {formatCurrency(item.totalPrice)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    )
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.address || !form.city || !form.pinCode) {
      setError('Please complete the delivery address before placing the order.')
      return
    }

    const order = placeOrder({
      customer: form,
      mode: quickMode && quickBuyItem ? 'quick' : 'cart',
    })

    if (!order) {
      setError('Unable to place the order because there are no items in checkout.')
      return
    }

    navigate(`/dashboard?order=${order.id}`)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
      <section className="rounded-[38px] bg-white p-6 shadow-[0_30px_90px_rgba(17,17,17,0.06)] sm:p-8">
        <p className="text-sm uppercase tracking-[0.28em] text-[var(--brand-pink)]">Checkout</p>
        <h1 className="mt-2 font-serif text-4xl text-[var(--text-main)]">Place your order</h1>
        <p className="mt-4 text-sm leading-7 text-[var(--text-soft)]">
          Complete the address and payment details. Once confirmed, the order appears in the user
          dashboard for tracking.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-[var(--text-main)]">
              Full name
              <input
                name="name"
                value={form.name}
                readOnly
                className="w-full rounded-[22px] border border-black/10 bg-[var(--soft-pink)] px-4 py-3 outline-none"
              />
            </label>
            <label className="space-y-2 text-sm font-medium text-[var(--text-main)]">
              Email
              <input
                name="email"
                value={form.email}
                readOnly
                className="w-full rounded-[22px] border border-black/10 bg-[var(--soft-pink)] px-4 py-3 outline-none"
              />
            </label>
          </div>

          <label className="space-y-2 text-sm font-medium text-[var(--text-main)]">
            Delivery address
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="House number, street, landmark"
              className="w-full rounded-[22px] border border-black/10 bg-white px-4 py-3 outline-none"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-[var(--text-main)]">
              City
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Enter city"
                className="w-full rounded-[22px] border border-black/10 bg-white px-4 py-3 outline-none"
              />
            </label>
            <label className="space-y-2 text-sm font-medium text-[var(--text-main)]">
              PIN code
              <input
                name="pinCode"
                value={form.pinCode}
                onChange={handleChange}
                placeholder="000000"
                className="w-full rounded-[22px] border border-black/10 bg-white px-4 py-3 outline-none"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-[var(--text-main)]">
              Payment method
              <select
                name="paymentMethod"
                value={form.paymentMethod}
                onChange={handleChange}
                className="w-full rounded-[22px] border border-black/10 bg-white px-4 py-3 outline-none"
              >
                <option value="UPI">UPI</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="Card">Card</option>
              </select>
            </label>
            <label className="space-y-2 text-sm font-medium text-[var(--text-main)]">
              Delivery note
              <input
                name="deliveryNote"
                value={form.deliveryNote}
                onChange={handleChange}
                placeholder="Optional instructions"
                className="w-full rounded-[22px] border border-black/10 bg-white px-4 py-3 outline-none"
              />
            </label>
          </div>

          {error ? (
            <div className="rounded-[22px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-pink)]"
          >
            Confirm order
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </section>

      <aside className="space-y-5 rounded-[38px] bg-white p-6 shadow-[0_30px_90px_rgba(17,17,17,0.06)] sm:p-8">
        <div className="flex items-center gap-3">
          <ShoppingBag className="h-5 w-5 text-[var(--brand-pink)]" />
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--brand-pink)]">
              Order summary
            </p>
            <p className="mt-1 text-sm text-[var(--text-soft)]">
              {quickMode && quickBuyItem ? 'Quick buy mode' : 'Cart checkout mode'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {orderItems.map((item) => (
            <div
              key={`${item.productId}-${item.size}`}
              className="flex items-center gap-4 rounded-[26px] bg-[var(--soft-pink)] p-4"
            >
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="h-20 w-20 rounded-[20px] object-cover"
              />
              <div>
                <p className="font-semibold text-[var(--text-main)]">{item.product.name}</p>
                <p className="mt-1 text-sm text-[var(--text-soft)]">
                  {item.size} / Qty {item.quantity}
                </p>
                <p className="mt-2 text-sm font-semibold text-[var(--text-main)]">
                  {formatCurrency(item.totalPrice)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[28px] border border-black/10 p-5">
          <div className="flex items-center justify-between py-2 text-sm text-[var(--text-soft)]">
            <span>Subtotal</span>
            <span>{formatCurrency(orderSubtotal)}</span>
          </div>
          <div className="flex items-center justify-between py-2 text-sm text-[var(--text-soft)]">
            <span>Packaging and tax</span>
            <span>{formatCurrency(taxes)}</span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-black/10 pt-4 text-lg font-semibold text-[var(--text-main)]">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>

        <div className="rounded-[28px] bg-[var(--soft-pink)] p-5">
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 h-4 w-4 text-[var(--brand-pink)]" />
            <p className="text-sm leading-6 text-[var(--text-soft)]">
              Orders are stored locally in this frontend demo and become visible instantly inside
              the user dashboard after confirmation.
            </p>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default CheckoutPage
