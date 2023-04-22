<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div id="upload-wrapper" class="col-span-1">
        <upload ref="uploadref" :addSong="addSong" />
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">{{ $t('manage.my-song') }}</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6 h-full mb-12">
            <!-- Composition Items -->
            <composition-item
              v-for="(songData, i) in songs"
              :key="songData.docId"
              :song="songData"
              :updateSong="updateSong"
              :removeSong="removeSong"
              :index="i"
              :updateUnsaveFlag="updateUnsavedFlag"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Upload from '../components/Upload.vue'
import CompositionItem from '../components/CompositionItems.vue'
import { auth, db } from '../utils/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
export default {
  name: 'Manage',
  components: {
    Upload,
    CompositionItem
  },
  data() {
    return {
      songs: [],
      unSavedFlag: false
    }
  },
  async created() {
    try {
      const q = query(collection(db, 'songs'), where('uid', '===', auth.currentUser.uid))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach(this.addSong)
    } catch (error) {
      console.log(error, '2')
    }
  },
  methods: {
    updateSong(i, values) {
      this.songs[i].modifiedName = values.modifiedName
      this.songs[i].genre = values.genre
    },
    removeSong(i) {
      this.songs.splice(i, 1)
    },
    async addSong(val) {
      const songData = { ...val.data(), docId: val.id }
      this.songs.push(songData)
    },
    updateUnsavedFlag(value) {
      this.unSavedFlag = value
    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.unSavedFlag) {
      next()
    } else {
      // this.unsavedFlag is passed on input form to detect if any changes or not from CompositionItems.vue insied vee-field
      // Check if user have filled an input and they want to go to another page, this function will be execute confirm() to showing message and block user to navigate between page
      const leave = confirm('You have unsaved changes. Are you sure want to leave?')
      next(leave)
    }
  }

  // beforeRouteLeave(to, from, next) {
  //   // get uploadref from component references, and call the cancelUpload method
  //   // see ref="uploadref"
  //   this.$refs.uploadref.cancelUpload()
  //   next()
  // }

  // example of guarding routes with beforeRouteEnter
  // beforeRouteEnter(to, from, next) {
  //   const store = useUserStore()
  //   if (store.userLoggedIn) {
  //     next()
  //   } else {
  //     next({ name: 'home' })
  //   }
  // }
}
</script>
