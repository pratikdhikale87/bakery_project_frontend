import { ArrowRight, LockKeyhole, ShieldUser, UserRound } from 'lucide-react'
import { useEffect, useState, useTransition } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

function AuthPage() {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { currentUser, setUser } = useStore()
  const nextPath = searchParams.get('next')
  const initialTab = searchParams.get('tab') === 'register' ? 'register' : 'login'
  const [activeTab, setActiveTab] = useState(initialTab)
  const [isPending, startTransition] = useTransition()
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    role: 'user',
  })
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  })

  useEffect(() => {
    setActiveTab(initialTab)
  }, [initialTab])

  const finishAuth = ({ name, email, role }) => {
    startTransition(() => {
      setUser({
        name,
        email,
        role,
      })

      if (nextPath) {
        navigate(nextPath)
        return
      }

      navigate(role === 'admin' ? '/admin' : '/dashboard')
    })
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
      <section className="rounded-[38px] bg-black p-6 text-white shadow-[0_30px_90px_rgba(17,17,17,0.16)] sm:p-8">
        <p className="text-sm uppercase tracking-[0.28em] text-white/60">Account area</p>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl">Login, register, and unlock dashboards</h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-white/70">
          This is a frontend demo auth flow. Choose user role for customer dashboard access or
          admin role for the store management panel.
        </p>

        <div className="mt-8 space-y-4">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <UserRound className="h-5 w-5 text-[var(--brand-rose-light)]" />
              <p className="font-semibold">User dashboard includes</p>
            </div>
            <p className="mt-3 text-sm leading-6 text-white/70">
              Orders, tracking, wishlist, and recent activity from the storefront.
            </p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <ShieldUser className="h-5 w-5 text-[var(--brand-rose-light)]" />
              <p className="font-semibold">Admin dashboard includes</p>
            </div>
            <p className="mt-3 text-sm leading-6 text-white/70">
              Product creation, order status management, and quick storefront control.
            </p>
          </div>
        </div>

        {currentUser ? (
          <div className="mt-8 rounded-[28px] border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-white/70">Current session</p>
            <p className="mt-2 text-xl font-semibold">{currentUser.name}</p>
            <p className="mt-1 text-sm text-white/70">
              Logged in as {currentUser.role} / {currentUser.email}
            </p>
            <Link
              to={currentUser.role === 'admin' ? '/admin' : '/dashboard'}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black"
            >
              Go to dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : null}
      </section>

      <section className="rounded-[38px] bg-white p-6 shadow-[0_30px_90px_rgba(17,17,17,0.06)] sm:p-8">
        <div className="inline-flex rounded-full bg-[var(--soft-pink)] p-1">
          <button
            type="button"
            onClick={() => setActiveTab('login')}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              activeTab === 'login' ? 'bg-white text-[var(--text-main)] shadow-sm' : 'text-[var(--text-soft)]'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('register')}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              activeTab === 'register'
                ? 'bg-white text-[var(--text-main)] shadow-sm'
                : 'text-[var(--text-soft)]'
            }`}
          >
            Register
          </button>
        </div>

        {location.state?.notice ? (
          <div className="mt-6 rounded-[22px] border border-black/10 bg-[var(--soft-pink)] px-4 py-3 text-sm text-[var(--text-main)]">
            {location.state.notice}
          </div>
        ) : null}

        {nextPath ? (
          <div className="mt-6 rounded-[22px] border border-black/10 bg-[var(--soft-pink)] px-4 py-3 text-sm text-[var(--text-main)]">
            Login continues to <span className="font-semibold">{nextPath}</span>
          </div>
        ) : null}

        {activeTab === 'login' ? (
          <form
            className="mt-8 space-y-5"
            onSubmit={(event) => {
              event.preventDefault()
              finishAuth({
                name: loginForm.role === 'admin' ? 'Admin Controller' : 'Bakery Customer',
                email: loginForm.email || 'customer@rosyoven.com',
                role: loginForm.role,
              })
            }}
          >
            <label className="space-y-2 text-sm font-medium text-[var(--text-main)]">
              Email
              <input
                type="email"
                value={loginForm.email}
                onChange={(event) =>
                  setLoginForm((current) => ({ ...current, email: event.target.value }))
                }
                placeholder="name@example.com"
                className="w-full rounded-[22px] border border-black/10 bg-white px-4 py-3 outline-none"
              />
            </label>

            <label className="space-y-2 text-sm font-medium text-[var(--text-main)]">
              Password
              <input
                type="password"
                value={loginForm.password}
                onChange={(event) =>
                  setLoginForm((current) => ({ ...current, password: event.target.value }))
                }
                placeholder="••••••••"
                className="w-full rounded-[22px] border border-black/10 bg-white px-4 py-3 outline-none"
              />
            </label>

            <label className="space-y-2 text-sm font-medium text-[var(--text-main)]">
              Login as
              <select
                value={loginForm.role}
                onChange={(event) =>
                  setLoginForm((current) => ({ ...current, role: event.target.value }))
                }
                className="w-full rounded-[22px] border border-black/10 bg-white px-4 py-3 outline-none"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </label>

            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-pink)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-black hover:text-white disabled:opacity-70"
            >
              <LockKeyhole className="h-4 w-4" />
              {isPending ? 'Logging in...' : 'Login'}
            </button>
          </form>
        ) : (
          <form
            className="mt-8 space-y-5"
            onSubmit={(event) => {
              event.preventDefault()
              finishAuth({
                name: registerForm.name || 'New Bakery Customer',
                email: registerForm.email || 'new@rosyoven.com',
                role: registerForm.role,
              })
            }}
          >
            <label className="space-y-2 text-sm font-medium text-[var(--text-main)]">
              Full name
              <input
                value={registerForm.name}
                onChange={(event) =>
                  setRegisterForm((current) => ({ ...current, name: event.target.value }))
                }
                placeholder="Your name"
                className="w-full rounded-[22px] border border-black/10 bg-white px-4 py-3 outline-none"
              />
            </label>

            <label className="space-y-2 text-sm font-medium text-[var(--text-main)]">
              Email
              <input
                type="email"
                value={registerForm.email}
                onChange={(event) =>
                  setRegisterForm((current) => ({ ...current, email: event.target.value }))
                }
                placeholder="name@example.com"
                className="w-full rounded-[22px] border border-black/10 bg-white px-4 py-3 outline-none"
              />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-[var(--text-main)]">
                Password
                <input
                  type="password"
                  value={registerForm.password}
                  onChange={(event) =>
                    setRegisterForm((current) => ({ ...current, password: event.target.value }))
                  }
                  placeholder="Create password"
                  className="w-full rounded-[22px] border border-black/10 bg-white px-4 py-3 outline-none"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-[var(--text-main)]">
                Account role
                <select
                  value={registerForm.role}
                  onChange={(event) =>
                    setRegisterForm((current) => ({ ...current, role: event.target.value }))
                  }
                  className="w-full rounded-[22px] border border-black/10 bg-white px-4 py-3 outline-none"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </label>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-pink)] disabled:opacity-70"
            >
              <UserRound className="h-4 w-4" />
              {isPending ? 'Creating account...' : 'Create account'}
            </button>
          </form>
        )}
      </section>
    </div>
  )
}

export default AuthPage
