import { describe, expect, test } from 'vitest'
import About from '@/views/About.vue'
import { RouterLinkStub, shallowMount } from '@vue/test-utils'

describe('About.vue', () => {
  test('renders about description and github link', () => {
    const wrapper = shallowMount(About, {
      global: {
        mocks: {
          $t: (message) => message
        },
        components: {
          'router-link': RouterLinkStub
        }
      }
    })
    expect(wrapper.text()).toContain('about.title')

    expect(wrapper.attributes().id).toContain(/github-link/)
  })
})
