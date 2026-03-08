import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[linear-gradient(135deg,var(--cocoa-deep)_0%,#120b08_100%)] text-white">
      <div className="mx-auto grid w-[min(1200px,92vw)] gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <p className="font-serif text-3xl">Cocoa Atelier</p>
          <p className="max-w-md text-sm leading-6 text-white/70">
            A chocolate-first storefront with layered cakes, cocoa pastries, artisan breads,
            quick-buy flows, dashboards, and admin management.
          </p>
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-4 text-sm text-white/80">
            Open daily for desserts, gifting boxes, and same-day chocolate delivery.
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/50">Explore</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-white/80">
            <Link to="/">Landing Page</Link>
            <Link to="/products">All Products</Link>
            <Link to="/dashboard">User Dashboard</Link>
            <Link to="/account">Login / Register</Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/50">Contact</p>
          <div className="mt-4 space-y-3 text-sm text-white/80">
            <p>hello@cocoaatelier.com</p>
            <p>+91 90000 11122</p>
            <p>12 Cocoa Arcade, City Centre</p>
            <p>Same-day dessert delivery available across major zones.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
