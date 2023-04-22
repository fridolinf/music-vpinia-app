<template>
  <main class="h-screen">
    <!-- Music Header -->
    <section class="w-full mb-8 py-14 text-center text-black relative">
      <div class="container mx-auto flex items-center">
        <!-- Play/Pause Button -->
        <button
          @click.prevent="!playing ? newSong(song) : toogleAudio()"
          type="button"
          class="z-50 h-24 w-24 text-3xl bg-orange-300 mx-2 text-black rounded-full focus:outline-none"
          id="play-btn"
        >
          <i :class="{ 'fa fa-play': !playing, 'fa fa-pause': playing }"></i>
        </button>
        <div class="z-50 text-left ml-8">
          <!-- Song Info -->
          <div class="text-xl font-bold">{{ song.modifiedName }}</div>
          <div>{{ song.genre }}</div>
          <div class="song-price">{{ $n(10000, 'currency') }}</div>
        </div>
      </div>
    </section>
    <!-- Form -->
    <section class="container mx-auto mt-6">
      <div class="bg-white rounded border border-gray-200 relative flex flex-col my-2">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <span class="card-title">{{
            $tc('song.commentCount', song.commentCount, { count: song.commentCount })
          }}</span>
          <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
        </div>
        <div class="p-6">
          <div
            class="text-center font-bold p-4 m-4 text-white"
            v-if="commentShowAlert"
            :class="commentAlertVariant"
          >
            {{ translate(commentAlertMessage) }}
          </div>
          <vee-form :validation-schema="schema" @submit="addComment" v-if="userLoggedIn">
            <vee-field
              as="textarea"
              name="comment"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
              placeholder="Your comment here..."
            ></vee-field>
            <ErrorMessage class="text-red-600" name="comment" />
            <button
              :disabled="commentInSubmission"
              type="submit"
              class="py-1.5 px-3 rounded text-white bg-green-600 block"
            >
              {{ $t('composition-items.submit-btn') }}
            </button>
          </vee-form>
          <!-- Sort Comments -->
          <select
            v-model="sort"
            class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          >
            <option value="1">{{ $t('song.option.latest') }}</option>
            <option value="2">{{ $t('song.option.oldest') }}</option>
          </select>
        </div>
      </div>
    </section>
    <!-- Comments -->
    <ul
      class="container mx-auto"
      v-for="(comment, index) in sortedComments"
      :key="index"
      id="comments"
    >
      <li class="p-6 bg-gray-50 border border-gray-200">
        <!-- Comment Author -->
        <div class="mb-5">
          <div class="font-bold">{{ comment.name }}</div>
          <time>{{ comment.datePosted }}</time>
        </div>

        <p>
          {{ comment.content }}
        </p>
      </li>
    </ul>
  </main>
</template>

<script>
import { auth, db } from '../utils/firebase'
import usePlayerStore from '../stores/player'
import useUserStore from '../stores/user'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where
} from 'firebase/firestore'
import { mapActions, mapState } from 'pinia'

export default {
  name: 'Song',
  data() {
    return {
      song: {},
      commentsData: [],
      schema: {
        comment: 'required|min:3'
      },
      commentInSubmission: false,
      commentShowAlert: false,
      commentAlertVariant: 'bg-blue-500',
      commentAlertMessage: 'alert.song.wait-add-comment',
      sort: '1'
    }
  },
  computed: {
    ...mapState(useUserStore, ['userLoggedIn']),
    ...mapState(usePlayerStore, ['playing', 'currentSong']),
    sortedComments() {
      return this.commentsData.slice().sort((a, b) => {
        if (this.sort === '1') {
          return new Date(b.datePosted) - new Date(a.datePosted)
        }
        return new Date(a.datePosted) - new Date(b.datePosted)
      })
    },
    translate() {
      return (data) => this.$t(`${data}`)
    }
  },
  async created() {
    const { sort } = this.$route.query
    this.sort = sort === '1' || sort === '2' ? sort : '1'
    this.getSong()
    this.getComments()
  },
  methods: {
    ...mapActions(usePlayerStore, ['newSong', 'toogleAudio']), //getting action from usePlayerStore the function name is newSong, and use it in component
    async getSong() {
      const docRef = doc(db, 'songs', this.$route.params.id)
      const querySnapshot = await getDoc(docRef)
      this.song = querySnapshot.data()
    },
    async addComment(values, { resetForm }) {
      this.commentInSubmission = true
      this.commentShowAlert = true
      this.commentAlertVariant = 'bg-blue-500'
      this.commentAlertMessage = 'alert.song.wait-add-comment'
      const docsRef = doc(db, 'songs', this.$route.params.id)
      const commentData = {
        content: values.comment,
        datePosted: new Date().toString(),
        sid: this.$route.params.id,
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid
      }
      try {
        await addDoc(collection(db, 'comments'), commentData)
        this.song.commentCount += 1
        await updateDoc(docsRef, {
          commentCount: this.song.commentCount
        })
      } catch (error) {
        return error.message
      }
      this.getComments()
      this.commentInSubmission = false
      this.commentAlertVariant = 'bg-green-500'
      this.commentAlertMessage = 'alert.song.success-add-comment'
      resetForm()
    },
    async getComments() {
      const q = query(collection(db, 'comments'), where('sid', '==', this.$route.params.id))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        this.commentsData.push({ ...doc.data(), docId: doc.id })
      })
    }
  },
  watch: {
    sort(newVal) {
      if (newVal === this.$route.query.sort) {
        return
      }
      // when any change from sort value inside data(), the route will change the query params
      this.$router.push({
        query: {
          sorting: newVal === '1' ? 'latest' : 'oldest'
        }
      })
    }
  }
}
</script>
