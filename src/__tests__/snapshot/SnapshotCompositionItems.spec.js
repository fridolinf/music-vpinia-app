import { RouterLinkStub, shallowMount } from '@vue/test-utils'
import CompositionItems from '@/components/CompositionItems.vue'
import { describe, expect, test } from 'vitest'
describe('Composition Items Snapshot', () => {
  test('Render correctly', () => {
    const song = {}
    const updateSong = () => {}
    const index = 1
    const removeSong = () => {}
    const updateUnsaveFlag = () => {}
    const wrapper = shallowMount(CompositionItems, {
      props: {
        song,
        updateSong,
        index,
        removeSong,
        updateUnsaveFlag
      },
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
