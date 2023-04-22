import { RouterLinkStub, shallowMount } from '@vue/test-utils'
import SongItem from '@/components/SongItem.vue'
import { describe, expect, test } from 'vitest'
describe('SongItem snapshot', () => {
  test('Render correctly', () => {
    const song = {}
    const wrapper = shallowMount(SongItem, {
      props: { song },
      global: {
        components: {
          'router-link': RouterLinkStub
        }
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
