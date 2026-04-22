// src/db/database.js
//
// IndexedDB setup for Family Meals.
// Uses the 'idb' library for a promise-based API over raw IndexedDB.
//
// When we add more data types later (recipes, meal plans, shopping items),
// we add them to the migrations below. Each migration is a version bump
// that the browser runs once per user.

import { openDB } from 'idb'

const DB_NAME = 'family-meals'
const DB_VERSION = 1

/**
 * Open the database, creating/upgrading stores as needed.
 * Called once on app startup; returns a shared db handle.
 */
export async function getDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion) {
      // Migration from version 0 (no db) → version 1
      if (oldVersion < 1) {
        // Family members store
        // keyPath 'id' means every record must have a unique 'id' field
        const familyStore = db.createObjectStore('family', { keyPath: 'id' })
        familyStore.createIndex('by-order', 'order')

        // Meta store — for app-level settings like "has the user seen the welcome screen?"
        db.createObjectStore('meta', { keyPath: 'key' })
      }

      // Future migrations go here:
      // if (oldVersion < 2) { db.createObjectStore('recipes', { keyPath: 'id' }) }
      // if (oldVersion < 3) { ... }
    }
  })
}

/**
 * Generate a unique ID for new records.
 * Using crypto.randomUUID() gives us proper globally-unique IDs,
 * which will matter when Sheets sync enters the picture.
 */
export function newId() {
  return crypto.randomUUID()
}

/**
 * Current timestamp for last-write-wins conflict resolution.
 * Every record that gets saved includes this.
 */
export function now() {
  return new Date().toISOString()
}