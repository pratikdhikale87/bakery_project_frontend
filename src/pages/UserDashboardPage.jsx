import { Gift, Heart, PackageCheck, Truck } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { formatCurrency, orderStatuses } from '../data/initialData'
import { useStore } from '../context/StoreContext'

function UserDashboardPage() {
  const [searchParams] = useSearchParams()
  const { currentUser, orders, wishlistProducts } = useStore()
  const matchingOrders = orders.filter((order) => order.customerEmail === currentUser.email)
  const visibleOrders = matchingOrders.length ? matchingOrders : orders
  const activeOrders = visibleOrders.filter((order) => order.status !== 'Delivered')
  const highlightedOrder = searchParams.get('order')

  return (
    <div className="space-y-8">
      <section className="rounded-[38px] bg-white px-6 py-8 shadow-[0_30px_90px_rgba(17,17,17,0.06)] sm:px-8">
        <p className="text-sm uppercase tracking-[0.28em] text-[var(--brand-pink)]">User Dashboard</p>
        <h1 className="mt-2 font-serif text-4xl text-[var(--text-main)] sm:text-5xl">
          Welcome back, {currentUser.name}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-soft)]">
          Orders, live tracking status, wishlist items, and customer activity are all grouped here.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-[28px] bg-[var(--soft-pink)] p-5">
            <PackageCheck className="h-5 w-5 text-[var(--brand-pink)]" />
            <p className="mt-3 text-3xl font-semibold">{visibleOrders.length}</p>
            <p className="mt-1 text-sm text-[var(--text-soft)]">Orders placed</p>
          </div>
          <div className="rounded-[28px] bg-[var(--soft-pink)] p-5">
            <Truck className="h-5 w-5 text-[var(--brand-pink)]" />
            <p className="mt-3 text-3xl font-semibold">{activeOrders.length}</p>
            <p className="mt-1 text-sm text-[var(--text-soft)]">Orders in progress</p>
          </div>
          <div className="rounded-[28px] bg-[var(--soft-pink)] p-5">
            <Heart className="h-5 w-5 text-[var(--brand-pink)]" />
            <p className="mt-3 text-3xl font-semibold">{wishlistProducts.length}</p>
            <p className="mt-1 text-sm text-[var(--text-soft)]">Wishlist products</p>
          </div>
          <div className="rounded-[28px] bg-[var(--soft-pink)] p-5">
            <Gift className="h-5 w-5 text-[var(--brand-pink)]" />
            <p className="mt-3 text-3xl font-semibold">{visibleOrders.length * 35}</p>
            <p className="mt-1 text-sm text-[var(--text-soft)]">Loyalty points</p>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[var(--brand-pink)]">
              Track orders
            </p>
            <h2 className="mt-2 font-serif text-3xl text-[var(--text-main)]">Current and past orders</h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-main)]"
          >
            Order more products
          </Link>
        </div>

        <div className="space-y-4">
          {visibleOrders.map((order) => (
            <article
              key={order.id}
              className={`rounded-[34px] bg-white p-6 shadow-[0_24px_80px_rgba(17,17,17,0.05)] ${
                highlightedOrder === order.id ? 'ring-2 ring-[var(--brand-pink)]/30' : ''
              }`}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-soft)]">
                    Order ID {order.id}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-[var(--text-main)]">
                    {order.items.map((item) => item.name).join(', ')}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">
                    Placed on {order.placedAt} / ETA {order.eta}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">
                    Delivering to {order.deliveryAddress}
                  </p>
                </div>
                <div className="text-left lg:text-right">
                  <p className="inline-flex rounded-full bg-[var(--soft-pink)] px-4 py-2 text-sm font-semibold text-[var(--brand-pink)]">
                    {order.status}
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-[var(--text-main)]">
                    {formatCurrency(order.total)}
                  </p>
                  <p className="text-sm text-[var(--text-soft)]">{order.paymentMethod}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-4">
                {orderStatuses.map((status) => {
                  const currentIndex = orderStatuses.indexOf(order.status)
                  const stepIndex = orderStatuses.indexOf(status)
                  const complete = stepIndex <= currentIndex

                  return (
                    <div
                      key={status}
                      className={`rounded-[24px] px-4 py-4 text-sm font-medium ${
                        complete
                          ? 'bg-[var(--brand-pink)] text-white'
                          : 'border border-black/10 bg-[var(--soft-pink)] text-[var(--text-soft)]'
                      }`}
                    >
                      {status}
                    </div>
                  )
                })}
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {order.items.map((item) => (
                  <div
                    key={`${order.id}-${item.productId}-${item.size}`}
                    className="rounded-[24px] border border-black/10 bg-[var(--soft-pink)] px-4 py-4 text-sm text-[var(--text-main)]"
                  >
                    {item.name} / {item.size} / Qty {item.quantity} / {formatCurrency(item.unitPrice)}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-[var(--brand-pink)]">Wishlist</p>
          <h2 className="mt-2 font-serif text-3xl text-[var(--text-main)]">Saved products</h2>
        </div>

        {wishlistProducts.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {wishlistProducts.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 rounded-[30px] bg-white p-4 shadow-[0_24px_80px_rgba(17,17,17,0.05)]"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-24 w-24 rounded-[24px] object-cover"
                />
                <div>
                  <p className="text-lg font-semibold text-[var(--text-main)]">{product.name}</p>
                  <p className="mt-1 text-sm text-[var(--text-soft)]">{product.tagline}</p>
                  <Link
                    to={`/products/${product.slug}`}
                    className="mt-3 inline-flex text-sm font-semibold text-[var(--brand-pink)]"
                  >
                    View product
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-[34px] border border-dashed border-black/20 bg-white px-6 py-12 text-center">
            <p className="text-xl font-semibold text-[var(--text-main)]">No wishlist items yet</p>
            <p className="mt-2 text-sm text-[var(--text-soft)]">
              Tap the heart icon on any product card to save it here.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}

export default UserDashboardPage
