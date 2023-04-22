import { setActivePinia, createPinia } from 'pinia'
import useUserStore from '@/stores/user'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import Header from '@/components/Header.vue'
import { RouterLinkStub, shallowMount } from '@vue/test-utils'

vi.mock('firebase/auth', async () => {
  const actual = await vi.importActual('firebase/auth')
  return {
    ...actual,
    signInWithEmailAndPassword: () => Promise.resolve()
  }
})

describe('Header', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  test('Showing list tab navigation before and after login', async () => {
    const wrapper = shallowMount(Header, {
      global: {
        mocks: {
          $t: (message) => message,
          $i18n: (message) => message
        },
        components: {
          'router-link': RouterLinkStub
        }
      }
    })
    const store = useUserStore()
    expect(store.userLoggedIn).not.toBe(true)
    expect(wrapper.findAll('li')).toHaveLength(3)
    await store.authenticate({}) //async
    expect(store.userLoggedIn).toBe(true)
    expect(wrapper.findAll('li')).toHaveLength(4)
  })
})
