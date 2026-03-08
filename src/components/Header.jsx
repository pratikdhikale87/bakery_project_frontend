import { useState } from 'react'
import { Heart, Menu, ShoppingBag, UserRound, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/dashboard', label: 'My Dashboard' },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { cartCount, wishlist, currentUser, logout } = useStore()
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex w-[min(1200px,92vw)] items-center justify-between gap-4 py-4">
        <Link to="/" onClick={closeMenu} className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--brand-pink),var(--cocoa-deep))] text-sm font-bold text-white shadow-[0_14px_36px_rgba(43,24,16,0.28)]">
            CA
          </div>
          <div>
            <p className="font-serif text-lg font-semibold text-[var(--text-main)]">Cocoa Atelier</p>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-soft)]">
              Chocolate Boutique
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-black/10 bg-white/80 px-2 py-2 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeMenu}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-[var(--brand-pink)] text-white'
                    : 'text-[var(--text-soft)] hover:bg-black/5 hover:text-[var(--text-main)]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          {currentUser?.role === 'admin' ? (
            <NavLink
              to="/admin"
              onClick={closeMenu}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-black text-white'
                    : 'text-[var(--text-soft)] hover:bg-black/5 hover:text-[var(--text-main)]'
                }`
              }
            >
              Admin
            </NavLink>
          ) : null}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/products"
            onClick={closeMenu}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-[var(--text-main)] transition hover:border-[var(--brand-pink)] hover:text-[var(--brand-pink)]"
          >
            <Heart className="h-4 w-4" />
            Wishlist {wishlist.length}
          </Link>
          <Link
            to="/cart"
            onClick={closeMenu}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--cocoa-deep)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--brand-pink)] hover:text-white"
          >
            <ShoppingBag className="h-4 w-4" />
            Cart {cartCount}
          </Link>
          {currentUser ? (
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-[var(--text-main)] transition hover:border-black hover:bg-black hover:text-white"
            >
              <UserRound className="h-4 w-4" />
              {currentUser.name.split(' ')[0]}
            </button>
          ) : (
            <Link
              to="/account"
              onClick={closeMenu}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-pink)] px-4 py-2 text-sm font-medium text-[var(--brand-pink)] transition hover:bg-[var(--brand-pink)] hover:text-white"
            >
              <UserRound className="h-4 w-4" />
              Login
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-[var(--text-main)] lg:hidden"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-black/10 bg-white/95 px-[4vw] py-4 lg:hidden">
          <div className="mx-auto flex w-[min(1200px,92vw)] flex-col gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-sm font-medium ${
                    isActive
                      ? 'bg-[var(--brand-pink)] text-white'
                      : 'bg-[var(--soft-pink)] text-[var(--text-main)]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            {currentUser?.role === 'admin' ? (
              <NavLink
                to="/admin"
                onClick={closeMenu}
                className="rounded-2xl bg-[var(--cocoa-deep)] px-4 py-3 text-sm font-medium text-white"
              >
                Admin Dashboard
              </NavLink>
            ) : null}
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/cart"
                onClick={closeMenu}
                className="rounded-2xl bg-[var(--cocoa-deep)] px-4 py-3 text-center text-sm font-medium text-white"
              >
                Cart ({cartCount})
              </Link>
              <Link
                to="/account"
                onClick={closeMenu}
                className="rounded-2xl border border-[var(--brand-pink)] px-4 py-3 text-center text-sm font-medium text-[var(--brand-pink)]"
              >
                {currentUser ? 'Account' : 'Login'}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}

export default Header
