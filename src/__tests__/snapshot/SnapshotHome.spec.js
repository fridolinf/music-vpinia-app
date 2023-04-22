import { RouterLinkStub, shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue'
import { describe, expect, test } from 'vitest'
describe('Home snapshot', () => {
  test('Render home component correctly', () => {
    const wrapper = shallowMount(Home, {
      global: {
        components: {
          'router-link': RouterLinkStub
        },
        mocks: {
          $t: (message) => message
        }
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
