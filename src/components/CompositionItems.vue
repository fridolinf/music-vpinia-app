<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-sm font-bold">{{ song.modifiedName }}</h4>
      <button
        @click.prevent="handleDeleteSong"
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        @click.prevent="showForm = !showForm"
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-show="showForm">
      <div class="text-white text-center font-bold p-4 mb-4" v-if="showAlert" :class="alertVarian">
        <!-- {{ alertMessage }} -->
        {{ translate(alertMessage) }}
      </div>
      <vee-form :validation-schema="schema" :initial-values="song" @submit="handleEdit">
        <div class="mb-3">
          <label class="inline-block mb-2">{{ $t('composition-items.song-title') }}</label>
          <vee-field
            name="modifiedName"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            :placeholder="$t('composition-items.enter-song-title')"
            @input="updateUnsaveFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="modifiedName" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">{{ $t('composition-items.genre') }}</label>
          <vee-field
            name="genre"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            :placeholder="$t('composition-items.enter-genre')"
            @input="updateUnsaveFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="genre" />
        </div>
        <button
          type="submit"
          class="py-1.5 px-3 mr-2 rounded text-white bg-green-600"
          :disabled="inSubmission"
        >
          {{ $t('composition-items.submit-btn') }}
        </button>
        <button
          type="button"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
          :disabled="inSubmission"
          @click.prevent="showForm = false"
        >
          {{ $t('composition-items.back-btn') }}
        </button>
      </vee-form>
    </div>
  </div>
</template>

<script>
import { db } from '../utils/firebase'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
export default {
  name: 'CompositionItem',
  props: {
    // Validating a props
    song: {
      type: Object,
      required: true
    },
    updateSong: {
      type: Function,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    removeSong: {
      type: Function,
      required: true
    },
    updateUnsaveFlag: {
      type: Function
    }
  },
  data() {
    return {
      showForm: false,
      schema: {
        modifiedName: 'required',
        genre: 'alpha_spaces'
      },
      inSubmission: false,
      showAlert: false,
      alertVarian: 'bg-blue-500',
      alertMessage: 'alert.please-wait'
    }
  },
  computed: {
    translate() {
      return (data) => this.$t(`${data}`)
    }
  },
  methods: {
    async handleEdit(values) {
      this.inSubmission = true
      this.showAlert = true
      this.alertVarian = 'bg-blue-500'
      this.alertMessage = 'alert.please-wait'
      try {
        const docsRef = doc(db, 'songs', this.song.docId)
        await updateDoc(docsRef, {
          modifiedName: values.modifiedName,
          genre: values.genre
        })
      } catch (error) {
        this.inSubmission = false
        this.alertVarian = 'bg-red-500'
        this.alertMessage = 'alert.error-upload'
        return
      }

      this.updateSong(this.index, values)
      this.inSubmission = false
      this.alertVarian = 'bg-green-500'
      this.alertMessage = 'alert.success-upload'
      this.updateUnsaveFlag(false)
    },
    async handleDeleteSong() {
      const docsRef = doc(db, 'songs', this.song.docId)
      await deleteDoc(docsRef)
      this.removeSong(this.index)
    }
  }
}
</script>
