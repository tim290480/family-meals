// src/components/Screen.jsx
//
// Standard screen wrapper: provides the header bar, optional back button,
// and consistent padding. Every full-page view should use this.

export default function Screen({ title, subtitle, eyebrow, onBack, children }) {
  return (
    <div style={{ minHeight: '100vh', padding: '1.5rem 1.25rem 4rem', position: 'relative' }}>
      <div style={{
        marginBottom: '1.75rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid var(--rule)',
      }}>
        {onBack && (
          <button
            onClick={onBack}
            aria-label="Back"
            style={{
              background: 'transparent', border: 'none',
              color: 'var(--ink-muted)', cursor: 'pointer',
              padding: 0, marginBottom: '1rem',
              fontSize: '0.8rem', letterSpacing: '0.1em',
              textTransform: 'uppercase', fontFamily: 'inherit',
            }}
          >
            ← Back
          </button>
        )}
        {eyebrow && (
          <div style={{
            fontSize: '0.7rem', letterSpacing: '0.3em',
            textTransform: 'uppercase', color: 'var(--ink-faint)',
            marginBottom: '0.5rem',
          }}>
            {eyebrow}
          </div>
        )}
        <h1 className="serif italic" style={{
          fontSize: 'clamp(2rem, 7vw, 2.6rem)', fontWeight: 400, lineHeight: 1,
          letterSpacing: '-0.02em',
          fontVariationSettings: "'SOFT' 100, 'opsz' 144",
          color: 'var(--ink)',
        }}>
          {title}<span style={{ color: 'var(--accent)' }}>.</span>
        </h1>
        {subtitle && (
          <div style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', marginTop: '0.5rem' }}>
            {subtitle}
          </div>
        )}
      </div>
      {children}
    </div>
  )
}