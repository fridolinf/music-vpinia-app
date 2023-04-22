<template>
  <div id="upload-content" class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">{{ $t('upload.upload-title') }}</span>
      <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <!-- Drag n Drop event -->
      <!-- @drag will be triggered when we click on component in website and beggin to dragging -->
      <!-- @drag-start when component starting to be dragged -->
      <!-- @drag-end when component is no longer being dragged -->
      <!-- @drag-over when user hover something over the component the event is applied to -->
      <!-- @drag-enter is emitted when the user begins to drag something into the component -->
      <!-- @drag-leave is emitted when the item that was previously being dragged over the element is no longer being dragged over it -->
      <!-- @drop is emitted when user has released the element or text that was being dragged, can be triggered when user relase the mouse or by pressing esc key -->
      <!-- .prenvent.stop is will prevent unexpected behavior from browser when a file is dropped onto an element by default. because most browsers will load the file in the browser depending on the file type. We don't want the user to be redirected away from the app when they drop a file. -->
      <div
        class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
        :class="{ 'bg-green-400 border-green-400 border-solid': is_dragover }"
        @drag.prevent.stop=""
        @dragstart.prevent.stop=""
        @dragend.prevent.stop="is_dragover = false"
        @dragover.prevent.stop="is_dragover = true"
        @dragenter.prevent.stop="is_dragover = true"
        @dragleave.prevent.stop="is_dragover = false"
        @drop.prevent.stop="handleUpload($event)"
      >
        <h5>{{ $t('upload.drop') }}</h5>
      </div>
      <input type="file" multiple @change="handleUpload($event)" />
      <hr class="my-6" />
      <!-- Progess Bars -->
      <div class="mb-4" v-for="upload in uploads" :key="upload.name">
        <!-- File Name -->
        <div class="font-bold text-sm" :class="upload.textClass">
          <i :class="upload.icon"></i>{{ upload.name }}
        </div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <!-- Inner Progress Bar -->
          <div
            class="transition-all progress-bar"
            :class="upload.variant"
            :style="{ width: upload.currentProgress + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db, storage } from '../utils/firebase'
import { addDoc, collection, getDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
export default {
  name: 'Upload',
  data() {
    return {
      is_dragover: false,
      uploads: []
    }
  },
  props: ['addSong'],
  methods: {
    async handleUpload($event) {
      this.is_dragover = false
      const files = $event.dataTransfer ? [...$event.dataTransfer.files] : [...$event.target.files]

      files.forEach((file) => {
        if (file.type !== 'audio/mpeg') {
          return
        }
        if (!navigator.onLine) {
          this.uploads.push({
            task: {},
            currentProgress: 100,
            name: file.name,
            variant: 'bg-red-400',
            icon: 'fas fa-times',
            textClass: 'text-red-400'
          })
          return
        }
        const storageReference = ref(storage, `songs/${file.name}`) // storageBucket/songs/songName.mp3
        const uploadTask = uploadBytesResumable(storageReference, file)
        const uploadIndex =
          this.uploads.push({
            uploadTask,
            currentProgress: 0,
            name: file.name,
            variant: 'bg-blue-400',
            icon: 'fas fa-spinner fa-spin',
            textClass: ''
          }) - 1
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            this.uploads[uploadIndex].currentProgress = progress
          },
          (error) => {
            this.uploads[uploadIndex].variant = 'bg-red-400'
            this.uploads[uploadIndex].icon = 'fas fa-times'
            this.uploads[uploadIndex].textClass = 'text-red-400'
          },
          async () => {
            // Handle successful uploads on complete
            const song = {
              uid: auth.currentUser.uid,
              displayName: auth.currentUser.displayName,
              originalName: uploadTask.snapshot.ref.name,
              modifiedName: uploadTask.snapshot.ref.name,
              genre: '',
              commentCount: 0,
              createdAt: new Date()
            }
            song.url = await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              return downloadURL
            })
            const songRef = await addDoc(collection(db, 'songs'), song) //adding song metadata to Database
            const querySnapshot = await getDoc(songRef)
            this.addSong(querySnapshot)
            this.uploads[uploadIndex].variant = 'bg-green-400'
            this.uploads[uploadIndex].icon = 'fas fa-check'
            this.uploads[uploadIndex].textClass = 'text-green-400'
          }
        )
      })
    },
    cancelUpload() {
      // this function will be triger or Manage.vue,
      // this function called using $ref to emmit in DOM
      this.uploads.forEach((upload) => {
        upload.uploadTask.cancel()
      })
    }
  },
  beforeUnmount() {
    this.uploads.forEach((upload) => {
      //same like cancelUpload() when user unMount() from the current page, uploaded file will be canceled
      upload.uploadTask.cancel()
    })
  }
}
</script>
