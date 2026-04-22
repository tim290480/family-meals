// src/screens/FamilyScreen.jsx
//
// The family profiles screen: list, add, edit, delete household members.
// Inline editor expands when you tap a member or the "Add" button.

import { useState } from 'react'
import Screen from '../components/Screen'
import Button from '../components/Button'
import { useFamily } from '../hooks/useFamily'
import { GOALS } from '../db/seed'

function goalLabel(goalId) {
  return GOALS.find(g => g.id === goalId)?.label ?? 'Custom'
}

function MemberEditor({ initial, onSave, onCancel, onDelete }) {
  const [name, setName]   = useState(initial?.name ?? '')
  const [goal, setGoal]   = useState(initial?.goal ?? 'maintenance')
  const [notes, setNotes] = useState(initial?.notes ?? '')

  const isNew  = !initial
  const canSave = name.trim().length > 0

  return (
    <div style={{
      padding: '1.25rem',
      border: '1.5px solid var(--accent)',
      borderRadius: '0.875rem',
      marginBottom: '1rem',
      display: 'flex', flexDirection: 'column', gap: '1rem',
      background: 'var(--bg)',
    }}>
      <div>
        <label style={labelStyle}>Name</label>
        <input
          type="text" value={name} onChange={e => setName(e.target.value)}
          autoFocus placeholder="e.g. Tim"
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>Goal</label>
        <select
          value={goal} onChange={e => setGoal(e.target.value)}
          style={inputStyle}
        >
          {GOALS.map(g => (
            <option key={g.id} value={g.id}>{g.label}</option>
          ))}
        </select>
        <div style={{
          fontSize: '0.78rem', color: 'var(--ink-faint)',
          marginTop: '0.35rem', fontStyle: 'italic',
          fontFamily: "'Fraunces', Georgia, serif",
        }}>
          {GOALS.find(g => g.id === goal)?.description}
        </div>
      </div>

      <div>
        <label style={labelStyle}>Notes (optional)</label>
        <textarea
          value={notes} onChange={e => setNotes(e.target.value)}
          rows={3} placeholder="Dietary preferences, allergies, dislikes..."
          style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button variant="accent" onClick={() => onSave({ name, goal, notes })} disabled={!canSave}>
            {isNew ? 'Add' : 'Save'}
          </Button>
          <Button variant="subtle" onClick={onCancel}>Cancel</Button>
        </div>
        {!isNew && onDelete && (
          <Button variant="subtle" onClick={onDelete} style={{ color: '#B4432E' }}>
            Delete
          </Button>
        )}
      </div>
    </div>
  )
}

function MemberRow({ member, onEdit }) {
  return (
    <div
      onClick={onEdit}
      style={{
        padding: '1rem 1.25rem',
        border: '1px solid var(--rule)',
        borderRadius: '0.75rem',
        marginBottom: '0.75rem',
        cursor: 'pointer',
        transition: 'background 0.15s',
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(198,107,61,0.04)'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem' }}>
        <div className="serif italic" style={{ fontSize: '1.4rem', color: 'var(--ink)' }}>
          {member.name}
        </div>
        <div style={{
          fontSize: '0.7rem', letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'var(--ink-faint)',
        }}>
          {goalLabel(member.goal)}
        </div>
      </div>
      {member.notes && (
        <div style={{
          fontSize: '0.85rem', color: 'var(--ink-muted)',
          marginTop: '0.35rem', fontStyle: 'italic',
          fontFamily: "'Fraunces', Georgia, serif",
        }}>
          {member.notes}
        </div>
      )}
    </div>
  )
}

export default function FamilyScreen({ onBack }) {
  const { members, loading, create, update, remove } = useFamily()
  const [editingId, setEditingId] = useState(null)  // id | 'new' | null

  if (loading) {
    return (
      <Screen title="Family" eyebrow="Household" onBack={onBack}>
        <div style={{ color: 'var(--ink-muted)', fontStyle: 'italic' }}>Loading…</div>
      </Screen>
    )
  }

  const editingMember = editingId && editingId !== 'new'
    ? members.find(m => m.id === editingId)
    : null

  return (
    <Screen
      title="Family"
      eyebrow="Household"
      subtitle={`${members.length} ${members.length === 1 ? 'person' : 'people'} · tap anyone to edit`}
      onBack={onBack}
    >
      {members.map(m => {
        if (editingId === m.id) {
          return (
            <MemberEditor
              key={m.id}
              initial={m}
              onSave={async data => { await update(m.id, data); setEditingId(null) }}
              onCancel={() => setEditingId(null)}
              onDelete={async () => {
                if (confirm(`Remove ${m.name} from the family?`)) {
                  await remove(m.id)
                  setEditingId(null)
                }
              }}
            />
          )
        }
        return <MemberRow key={m.id} member={m} onEdit={() => setEditingId(m.id)} />
      })}

      {editingId === 'new' && (
        <MemberEditor
          onSave={async data => { await create(data); setEditingId(null) }}
          onCancel={() => setEditingId(null)}
        />
      )}

      {editingId !== 'new' && (
        <div style={{ marginTop: '1rem' }}>
          <Button onClick={() => setEditingId('new')}>+ Add someone</Button>
        </div>
      )}
    </Screen>
  )
}

const labelStyle = {
  display: 'block',
  fontSize: '0.7rem', letterSpacing: '0.15em',
  textTransform: 'uppercase', color: 'var(--ink-faint)',
  marginBottom: '0.4rem',
  fontWeight: 500,
}

const inputStyle = {
  width: '100%',
  padding: '0.65rem 0.85rem',
  border: '1px solid var(--rule)',
  borderRadius: '0.5rem',
  background: 'var(--bg)',
  color: 'var(--ink)',
  fontSize: '0.95rem',
  fontFamily: 'inherit',
}