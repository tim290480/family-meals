// src/hooks/useFamily.js
//
// React hook that exposes the family list to components and keeps it
// in sync with the database. Components call useFamily() and get
// { members, loading, create, update, remove, refresh } back.

import { useState, useEffect, useCallback } from 'react'
import * as familyRepo from '../repositories/familyRepo'
import { EXAMPLE_FAMILY } from '../db/seed'

export function useFamily() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    const all = await familyRepo.getAll()
    setMembers(all)
  }, [])

  // Load on mount. Seed example family if DB is empty.
  useEffect(() => {
    (async () => {
      const hasAny = await familyRepo.hasAny()
      if (!hasAny) {
        await familyRepo.replaceAll(EXAMPLE_FAMILY)
      }
      await refresh()
      setLoading(false)
    })()
  }, [refresh])

  const create = useCallback(async (data) => {
    await familyRepo.create(data)
    await refresh()
  }, [refresh])

  const update = useCallback(async (id, patch) => {
    await familyRepo.update(id, patch)
    await refresh()
  }, [refresh])

  const remove = useCallback(async (id) => {
    await familyRepo.remove(id)
    await refresh()
  }, [refresh])

  const resetToExamples = useCallback(async () => {
    await familyRepo.replaceAll(EXAMPLE_FAMILY)
    await refresh()
  }, [refresh])

  return { members, loading, create, update, remove, resetToExamples, refresh }
}