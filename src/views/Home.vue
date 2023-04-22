<template>
  <main class="bg-gray-50 h-full">
    <!-- Introduction -->
    <section class="py-14 text-white text-center relative">
      <div class="absolute inset-0 w-full h-full bg-contain introduction-bg"></div>
      <div class="container mx-auto">
        <div class="text-black main-header-content">
          <h1 class="font-bold text-5xl mb-5">{{ $t('home.listen') }}</h1>
          <p class="w-full md:w-8/12 mx-auto py-2">
            {{ $t('home.description') }}
          </p>
        </div>
      </div>
    </section>
    <!-- Main Content -->
    <section class="container mx-auto pt-10">
      <div class="rounded border-t border-gray-400 relative flex flex-col">
        <div
          class="px-6 pt-6 pb-5 font-bold border-b border-gray-400 text-center text-xl tracking-widest"
        >
          <span class="card-title"> {{ $t('home.song-list') }}</span>
          <!-- Icon -->
          <i class="fa fa-headphones-alt float-right text-green-400 text-xl" />
        </div>
        <!-- Playlist -->
        <ol id="playlist">
          <song-item v-for="song in songs" :key="song.docId" :song="song" />
        </ol>
        <!-- .. end Playlist -->
      </div>
    </section>
  </main>
</template>
<script>
import { db } from '../utils/firebase'
import { collection, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore'
import SongItem from '../components/SongItem.vue'
export default {
  name: 'Home',
  data() {
    return {
      songs: [],
      maxPerPage: 6,
      pendingRequest: false,
      allLengthData: 0,
      lastSnapshot: null
    }
  },
  components: {
    SongItem
  },
  created() {
    this.getSongs()
    window.addEventListener('scroll', this.handleScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement
      const { innerHeight } = window
      const bottomOfWindow = Math.round(scrollTop) + innerHeight > offsetHeight - 10
      if (bottomOfWindow) {
        if (this.songs.length < this.allLengthData) {
          this.getNextSong()
        }
      }
    },
    async getSongs() {
      if (this.pendingRequest) {
        return
      }
      this.pendingRequest = true
      const getAllDocs = query(collection(db, 'songs'))
      const snapAllDocs = await getDocs(getAllDocs)
      if (snapAllDocs) {
        this.allLengthData = snapAllDocs.size
      }
      let snapshot
      const first = query(collection(db, 'songs'), orderBy('createdAt'), limit(this.maxPerPage))
      snapshot = await getDocs(first)
      snapshot.forEach((doc) => {
        this.songs.push({ ...doc.data(), docId: doc.id })
      })
      this.lastSnapshot = snapshot
      this.pendingRequest = false
    },

    async getNextSong() {
      if (this.pendingRequest) {
        return
      }
      this.pendingRequest = true
      const lastVisible = this.songs[this.songs.length - 1].createdAt
      const last = query(
        collection(db, 'songs'),
        orderBy('createdAt'),
        startAfter(lastVisible),
        limit(1)
      )
      const newsnapshot = await getDocs(last)
      newsnapshot.forEach((doc) => {
        this.songs.push({ ...doc.data(), docId: doc.id })
      })
      this.pendingRequest = false
    }
  }
}
</script>
