<template>
  <div class="fixed bottom-0 left-0 bg-white border-t px-4 py-2 w-full">
    <!-- Track Info -->
    <div class="text-center" v-if="currentSong.modifiedName">
      <span class="song-title font-bold">{{ currentSong.modifiedName }}</span> by
      <span class="song-artist">{{ currentSong.displayName }}</span>
    </div>
    <div class="flex flex-nowrap gap-4 items-center">
      <!-- Play/Pause Button -->
      <button
        class="bg-orange-300 w-14 h-12 rounded-full pl-0.5"
        type="button"
        @click.prevent="toogleAudio"
        id="player-play-btn"
      >
        <i
          class="fa text-gray-500 text-xl"
          :class="{ 'fa-play': !playing, 'fa-pause': playing }"
        ></i>
      </button>
      <!-- Current Position -->
      <div class="player-currenttime">{{ seek }}</div>
      <!-- Scrub Container  -->
      <div
        @click.prevent="updateSeek"
        class="w-full h-2 rounded bg-gray-100 relative cursor-pointer"
      >
        <!-- Player Ball -->
        <span
          class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg"
          :style="{ left: playerProgress }"
        >
          <i class="fas fa-circle"></i>
        </span>
        <!-- Player Progress Bar-->
        <span
          class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
          :style="{ width: playerProgress }"
        ></span>
      </div>
      <!-- Duration -->
      <div class="player-duration">{{ duration }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import usePlayerStore from '../stores/player'
export default {
  name: 'Player',
  methods: {
    ...mapActions(usePlayerStore, ['toogleAudio', 'updateSeek'])
  },
  computed: {
    ...mapState(usePlayerStore, ['playing', 'duration', 'seek', 'playerProgress', 'currentSong']) //mapState is getting getters or state from store using pinia, getters in pinia is like to computed method
  }
}
</script>
