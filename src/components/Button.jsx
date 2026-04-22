// src/components/Button.jsx
//
// Reusable button with two variants: primary (pill outline) and subtle (text-only).

export default function Button({ variant = 'primary', onClick, children, type = 'button', disabled, style = {} }) {
  const baseStyle = {
    fontFamily: 'inherit', cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s', opacity: disabled ? 0.5 : 1,
    ...style,
  }

  if (variant === 'primary') {
    return (
      <button
        type={type} onClick={onClick} disabled={disabled}
        style={{
          ...baseStyle,
          padding: '0.85rem 1.25rem',
          background: 'transparent', color: 'var(--ink)',
          border: '1.5px solid var(--ink)', borderRadius: '2rem',
          fontFamily: "'Fraunces', Georgia, serif", fontStyle: 'italic',
          fontSize: '1rem', fontWeight: 400,
          letterSpacing: '0.01em',
        }}
      >
        {children}
      </button>
    )
  }

  if (variant === 'accent') {
    return (
      <button
        type={type} onClick={onClick} disabled={disabled}
        style={{
          ...baseStyle,
          padding: '0.85rem 1.25rem',
          background: 'var(--accent)', color: 'var(--accent-ink)',
          border: '1.5px solid var(--accent)', borderRadius: '2rem',
          fontFamily: "'Fraunces', Georgia, serif", fontStyle: 'italic',
          fontSize: '1rem', fontWeight: 400,
          letterSpacing: '0.01em',
        }}
      >
        {children}
      </button>
    )
  }

  // subtle / text-only
  return (
    <button
      type={type} onClick={onClick} disabled={disabled}
      style={{
        ...baseStyle,
        background: 'transparent', border: 'none',
        color: 'var(--ink-muted)',
        fontSize: '0.85rem', fontFamily: 'inherit',
        padding: '0.5rem 0.75rem',
      }}
    >
      {children}
    </button>
  )
}