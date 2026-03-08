function QuantitySelector({ value, onChange }) {
  return (
    <div className="inline-flex items-center rounded-full border border-black/10 bg-white">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="px-4 py-2 text-lg text-[var(--text-main)]"
      >
        -
      </button>
      <span className="min-w-10 text-center text-sm font-semibold text-[var(--text-main)]">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="px-4 py-2 text-lg text-[var(--text-main)]"
      >
        +
      </button>
    </div>
  )
}

export default QuantitySelector
