// src/App.jsx
import { useState, useEffect } from 'react'
import FamilyScreen from './screens/FamilyScreen'

function SunMoon({ mode, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle theme"
      style={{
        position: 'absolute', top: '1.25rem', right: '1.25rem', zIndex: 10,
        width: 34, height: 34, borderRadius: '50%',
        border: '1px solid var(--rule)',
        background: 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: 'var(--ink)',
        transition: 'all 0.3s',
      }}
    >
      {mode === 'light' ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" fill="currentColor" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      )}
    </button>
  )
}

function HomeScreen({ onNavigate }) {
  const sections = [
    { id: 'family',   label: 'Family',        desc: 'Who we cook for' },
    { id: 'shopping', label: 'Shopping list', desc: 'Coming soon' },
    { id: 'mealplan', label: 'Meal plan',     desc: 'Coming soon' },
    { id: 'recipes',  label: 'Recipes',       desc: 'Coming soon' },
  ]

  return (
    <div style={{ minHeight: '100vh', padding: '1.5rem 1.25rem', position: 'relative' }}>
      <div style={{ marginTop: '0.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--rule)' }}>
        <div style={{
          fontSize: '0.7rem', letterSpacing: '0.3em',
          textTransform: 'uppercase', color: 'var(--ink-faint)',
          marginBottom: '0.5rem',
        }}>
          Family Meals · No. 01
        </div>
        <h1 className="serif italic" style={{
          fontSize: 'clamp(2.2rem, 8vw, 3rem)', fontWeight: 400, lineHeight: 1,
          letterSpacing: '-0.02em',
          fontVariationSettings: "'SOFT' 100, 'opsz' 144",
          color: 'var(--ink)',
        }}>
          Hello, kitchen<span style={{ color: 'var(--accent)' }}>.</span>
        </h1>
        <div style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', marginTop: '0.5rem' }}>
          Your meal planner, shopping list, and recipe book — all in one quiet place.
        </div>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {sections.map(s => (
          <div
            key={s.id}
            onClick={() => onNavigate(s.id)}
            style={{
              padding: '1rem 1.25rem',
              border: '1px solid var(--rule)',
              borderRadius: '0.75rem',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              cursor: 'pointer', transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(198,107,61,0.04)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <div>
              <div className="serif italic" style={{ fontSize: '1.3rem' }}>{s.label}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--ink-faint)', marginTop: '0.1rem' }}>
                {s.desc}
              </div>
            </div>
            <span style={{ color: 'var(--ink-faint)' }}>→</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [mode, setMode] = useState('light')
  const [route, setRoute] = useState('home')  // 'home' | 'family' | etc.

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode)
  }, [mode])

  return (
    <>
      <SunMoon mode={mode} onToggle={() => setMode(mode === 'light' ? 'dark' : 'light')} />
      {route === 'home'   && <HomeScreen onNavigate={setRoute} />}
      {route === 'family' && <FamilyScreen onBack={() => setRoute('home')} />}
      {/* Other routes added here as we build them */}
    </>
  )
}