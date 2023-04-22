import { RouterLinkStub, shallowMount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import SongItem from '@/components/SongItem.vue'

describe('Router', () => {
  test('render router link', () => {
    const song = {
      docId: 'abc'
    }

    const wrapper = shallowMount(SongItem, {
      props: { song },
      global: {
        components: {
          'router-link': RouterLinkStub
        }
      }
    })

    expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual({
      name: 'song',
      params: { id: song.docId }
    })
  })
})
