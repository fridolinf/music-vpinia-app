import { setActivePinia, createPinia } from 'pinia'
import useUserStore from '@/stores/user'
import { beforeEach, describe, expect, test, vi } from 'vitest'

vi.mock('firebase/auth', async () => {
  const actual = await vi.importActual('firebase/auth')
  return {
    ...actual,
    signInWithEmailAndPassword: () => Promise.resolve()
  }
})

describe('Pinia', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  test('Authenticate user logged in', async () => {
    const store = useUserStore()
    expect(store.userLoggedIn).not.toBe(true)
    await store.authenticate({}) //async
    expect(store.userLoggedIn).toBe(true)
  })
})
