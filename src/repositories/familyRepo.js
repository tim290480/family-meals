// src/repositories/familyRepo.js
//
// The "middleman" layer between the UI and the database.
// The UI calls these functions — it never touches IndexedDB directly.
// When Sheets sync is added later, THIS is the file that knows about both.

import { getDB, newId, now } from '../db/database'

/**
 * Get all family members, ordered by their 'order' field.
 */
export async function getAll() {
  const db = await getDB()
  const all = await db.getAll('family')
  return all.sort((a, b) => a.order - b.order)
}

/**
 * Get a single family member by id.
 */
export async function get(id) {
  const db = await getDB()
  return db.get('family', id)
}

/**
 * Create a new family member.
 * Pass only the fields the user set — id, order, timestamps are filled in.
 */
export async function create({ name, goal, notes = '' }) {
  const db = await getDB()
  const existing = await db.getAll('family')
  const maxOrder = existing.reduce((m, e) => Math.max(m, e.order ?? 0), -1)

  const member = {
    id: newId(),
    name: name.trim(),
    goal,
    notes: notes.trim(),
    order: maxOrder + 1,
    createdAt: now(),
    updatedAt: now(),
  }
  await db.put('family', member)
  return member
}

/**
 * Update an existing family member. Only provided fields are changed.
 */
export async function update(id, patch) {
  const db = await getDB()
  const existing = await db.get('family', id)
  if (!existing) throw new Error(`Family member ${id} not found`)

  const updated = {
    ...existing,
    ...patch,
    id: existing.id,           // never allow id to change
    createdAt: existing.createdAt,
    updatedAt: now(),
  }
  await db.put('family', updated)
  return updated
}

/**
 * Delete a family member by id.
 * (True delete for now. When Sheets sync arrives, we'll switch to soft-delete.)
 */
export async function remove(id) {
  const db = await getDB()
  await db.delete('family', id)
}

/**
 * Replace the entire family list (used by "seed example family" and "reset").
 */
export async function replaceAll(members) {
  const db = await getDB()
  const tx = db.transaction('family', 'readwrite')
  await tx.objectStore('family').clear()
  for (const m of members) {
    await tx.objectStore('family').put(m)
  }
  await tx.done
}

/**
 * Has the user ever had anything in their family list?
 * Used on first launch to decide whether to seed example data.
 */
export async function hasAny() {
  const db = await getDB()
  const count = await db.count('family')
  return count > 0
}