// src/db/seed.js
//
// Example data shown on first launch so the app never feels empty.
// User can edit these, or tap "Reset to examples" in settings.

import { newId, now } from './database'

export const EXAMPLE_FAMILY = [
  {
    id: newId(),
    name: 'Alex',
    goal: 'maintenance',
    notes: 'Loves a good curry. Not a fan of mushrooms.',
    order: 0,
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: newId(),
    name: 'Sam',
    goal: 'mass-gain',
    notes: 'Training 4x a week — needs calorie-dense meals.',
    order: 1,
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: newId(),
    name: 'Jordan',
    goal: 'kid-fuel',
    notes: 'Age 8. Sensitive to strong spices.',
    order: 2,
    createdAt: now(),
    updatedAt: now(),
  },
]

export const GOALS = [
  { id: 'low-cal',     label: 'Low calorie',       description: 'Weight loss, high volume, low energy density' },
  { id: 'mass-gain',   label: 'Mass gain',         description: 'Healthy weight gain, calorie dense' },
  { id: 'training',    label: 'Training fuel',     description: 'Athletic performance, balanced macros' },
  { id: 'kid-fuel',    label: 'Kid fuel',          description: 'Growing kids, nutrient dense, fun' },
  { id: 'maintenance', label: 'Maintenance',       description: 'Balanced eating, no specific goal' },
  { id: 'custom',      label: 'Custom',            description: 'Use notes field to describe' },
]