import { RouterLinkStub, shallowMount } from '@vue/test-utils'
import Manage from '@/views/Manage.vue'
import { describe, expect, test } from 'vitest'
describe('Manage snapshot', () => {
  test('Render manage component correctly', () => {
    const wrapper = shallowMount(Manage, {
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
