import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="rounded-[38px] bg-white px-6 py-16 text-center shadow-[0_30px_90px_rgba(17,17,17,0.06)]">
      <p className="text-sm uppercase tracking-[0.28em] text-[var(--brand-pink)]">404</p>
      <h1 className="mt-3 font-serif text-4xl text-[var(--text-main)]">Page not found</h1>
      <p className="mt-4 text-sm leading-7 text-[var(--text-soft)]">
        The route does not exist in this bakery storefront project.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-full bg-[var(--brand-pink)] px-6 py-3 text-sm font-semibold text-white"
      >
        Back to home
      </Link>
    </section>
  )
}

export default NotFoundPage
