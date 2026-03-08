import { ClipboardList, PackagePlus, Store, Truck } from 'lucide-react'
import { useMemo, useState } from 'react'
import { formatCurrency, orderStatuses } from '../data/initialData'
import { useStore } from '../context/StoreContext'

function AdminDashboardPage() {
  const { categories, products, orders, addProduct, updateOrderStatus } = useStore()
  const [form, setForm] = useState({
    name: '',
    category: 'cakes',
    basePrice: '299',
    tagline: '',
    description: '',
  })
  const [latestAdded, setLatestAdded] = useState('')

  const pendingOrders = useMemo(
    () => orders.filter((order) => order.status !== 'Delivered').length,
    [orders],
  )

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.name.trim()) {
      return
    }

    const product = addProduct(form)
    setLatestAdded(product.name)
    setForm({
      name: '',
      category: 'cakes',
      basePrice: '299',
      tagline: '',
      description: '',
    })
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[38px] bg-black px-6 py-8 text-white shadow-[0_30px_90px_rgba(17,17,17,0.16)] sm:px-8">
        <p className="text-sm uppercase tracking-[0.28em] text-white/60">Admin Dashboard</p>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl">Manage products and orders</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">
          Admins can add products, monitor catalog size, and update order statuses from one page in
          this frontend demo.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
            <Store className="h-5 w-5 text-[var(--brand-rose-light)]" />
            <p className="mt-3 text-3xl font-semibold">{products.length}</p>
            <p className="mt-1 text-sm text-white/70">Products live</p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
            <ClipboardList className="h-5 w-5 text-[var(--brand-rose-light)]" />
            <p className="mt-3 text-3xl font-semibold">{orders.length}</p>
            <p className="mt-1 text-sm text-white/70">Orders total</p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
            <Truck className="h-5 w-5 text-[var(--brand-rose-light)]" />
            <p className="mt-3 text-3xl font-semibold">{pendingOrders}</p>
            <p className="mt-1 text-sm text-white/70">Orders in progress</p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
            <PackagePlus className="h-5 w-5 text-[var(--brand-rose-light)]" />
            <p className="mt-3 text-3xl font-semibold">{categories.length}</p>
            <p className="mt-1 text-sm text-white/70">Product categories</p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[38px] bg-white p-6 shadow-[0_30px_90px_rgba(17,17,17,0.06)] sm:p-8">
          <p className="text-sm uppercase tracking-[0.28em] text-[var(--brand-pink)]">
            Add product
          </p>
          <h2 className="mt-2 font-serif text-3xl text-[var(--text-main)]">
            Push new items to the storefront
          </h2>
          <p className="mt-3 text-sm leading-6 text-[var(--text-soft)]">
            New products appear immediately on the products page and can be opened on the detail
            page with generated gallery images.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <label className="space-y-2 text-sm font-medium text-[var(--text-main)]">
              Product name
              <input
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                placeholder="Rose Pistachio Cake"
                className="w-full rounded-[22px] border border-black/10 bg-white px-4 py-3 outline-none"
              />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-[var(--text-main)]">
                Category
                <select
                  value={form.category}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, category: event.target.value }))
                  }
                  className="w-full rounded-[22px] border border-black/10 bg-white px-4 py-3 outline-none"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2 text-sm font-medium text-[var(--text-main)]">
                Base price
                <input
                  value={form.basePrice}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, basePrice: event.target.value }))
                  }
                  placeholder="299"
                  className="w-full rounded-[22px] border border-black/10 bg-white px-4 py-3 outline-none"
                />
              </label>
            </div>

            <label className="space-y-2 text-sm font-medium text-[var(--text-main)]">
              Short tagline
              <input
                value={form.tagline}
                onChange={(event) => setForm((current) => ({ ...current, tagline: event.target.value }))}
                placeholder="Light sponge with rose cream and pistachio crunch."
                className="w-full rounded-[22px] border border-black/10 bg-white px-4 py-3 outline-none"
              />
            </label>

            <label className="space-y-2 text-sm font-medium text-[var(--text-main)]">
              Description
              <textarea
                value={form.description}
                onChange={(event) =>
                  setForm((current) => ({ ...current, description: event.target.value }))
                }
                rows={4}
                placeholder="Describe the product for the storefront and details page."
                className="w-full rounded-[22px] border border-black/10 bg-white px-4 py-3 outline-none"
              />
            </label>

            {latestAdded ? (
              <div className="rounded-[22px] border border-black/10 bg-[var(--soft-pink)] px-4 py-3 text-sm text-[var(--text-main)]">
                Added successfully: <span className="font-semibold">{latestAdded}</span>
              </div>
            ) : null}

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-pink)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-black hover:text-white"
            >
              <PackagePlus className="h-4 w-4" />
              Add product
            </button>
          </form>
        </section>

        <section className="space-y-6">
          <div className="rounded-[38px] bg-white p-6 shadow-[0_30px_90px_rgba(17,17,17,0.06)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.28em] text-[var(--brand-pink)]">
              Order management
            </p>
            <div className="mt-5 space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-[28px] border border-black/10 bg-[var(--soft-pink)] p-5"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-soft)]">
                        {order.id}
                      </p>
                      <p className="mt-2 text-lg font-semibold text-[var(--text-main)]">
                        {order.customerName}
                      </p>
                      <p className="mt-1 text-sm text-[var(--text-soft)]">
                        {order.items.map((item) => item.name).join(', ')}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <p className="text-sm font-semibold text-[var(--text-main)]">
                        {formatCurrency(order.total)}
                      </p>
                      <select
                        value={order.status}
                        onChange={(event) =>
                          updateOrderStatus({
                            orderId: order.id,
                            status: event.target.value,
                          })
                        }
                        className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm outline-none"
                      >
                        {orderStatuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[38px] bg-white p-6 shadow-[0_30px_90px_rgba(17,17,17,0.06)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.28em] text-[var(--brand-pink)]">
              Product inventory
            </p>
            <div className="mt-5 grid gap-4">
              {products.slice(0, 8).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 rounded-[26px] border border-black/10 p-4"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-20 w-20 rounded-[20px] object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-[var(--text-main)]">{product.name}</p>
                    <p className="mt-1 text-sm text-[var(--text-soft)]">
                      {product.category} / {product.badge}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-[var(--text-main)]">
                    {formatCurrency(product.sizes[0].price)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AdminDashboardPage
