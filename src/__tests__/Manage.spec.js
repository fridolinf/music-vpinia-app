const { shallowMount } = require('@vue/test-utils')
import Manage from '@/views/Manage.vue'
import CompositionItems from '@/components/CompositionItems.vue'

describe('Manage.vue', () => {
  test('renders list of songs in composition items component', () => {
    const songs = [{}, {}, {}]
    const component = shallowMount(Manage, {
      data() {
        return {
          songs
        }
      },
      global: {
        mocks: {
          $t: (message) => message
        }
      }
    })
    const items = component.findAllComponents(CompositionItems)
    expect(items).toHaveLength(songs.length)

    items.forEach((wrapper, i) => {
      expect(wrapper.props().song).toStrictEqual(songs[i])
    })
  })
})
