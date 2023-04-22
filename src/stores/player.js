import { defineStore } from 'pinia'
import { Howl } from 'howler' //package for playing audio
import { formatTime } from '../utils/helper'
export default defineStore('player', {
  state: () => ({
    currentSong: {},
    sound: {},
    seek: '00:00',
    duration: '00:00',
    playerProgress: '0%'
  }),
  actions: {
    /* The `async newSong(song)` function is an action in a Pinia store that is responsible for loading
    and playing a new song. It takes a `song` object as a parameter, which contains the URL of the
    audio file to be played. */
    async newSong(song) {
      if (this.sound instanceof Howl) {
        this.sound.unload() // delete sound from memory for prevent memory leak if sound is instance of Howl for better performance
      }
      this.currentSong = song
      this.sound = new Howl({
        src: [song.url],
        html5: true //switch to html5 audio play, using html5 api to retrive the audio, because to prevent origin error from browser
      }) //initialize the song

      /* `this.sound.play()` is a method call that plays the audio file represented by the `this.sound`
      object. It starts playing the audio from the current position or from the beginning if the
      audio was paused or stopped. */
      this.sound.play()

      /* `this.sound.on('play', () => { requestAnimationFrame(this.progress) })` is setting up an event
      listener for the 'play' event on the `this.sound` object. When the audio file starts playing,
      the callback function `() => { requestAnimationFrame(this.progress) }` is executed. This
      function calls the `progress()` action, which updates the `seek`, `duration`, and
      `playerProgress` properties of the store to reflect the current state of the audio playback.
      The `requestAnimationFrame()` method is used to schedule the `progress()` action to be called
      before the next repaint of the browser window, which ensures smooth animation and better
      performance. */
      this.sound.on('play', () => {
        requestAnimationFrame(this.progress)
      })
    },

    /* The `async toogleAudio(song)` function is an action in a Pinia store that toggles the playback
    of an audio file. It takes a `song` object as a parameter, which contains the URL of the audio
    file to be played. */
    async toogleAudio(song) {
      /* This code block is checking if the `sound` object is currently playing or not. If it is not
      playing, it calls the `newSong()` action with the `song` object as a parameter to load and
      play the new song. If the `sound` object is already playing, it toggles the playback by
      pausing or playing the audio file using the `pause()` or `play()` method of the `sound`
      object. */
      if (!this.sound.playing) {
        await this.newSong(song)
      }

      /* This code block is toggling the playback of the audio file. It checks if the `sound` object is
      currently playing or not using the `playing()` method of the `sound` object. If it is playing,
      it pauses the audio file using the `pause()` method of the `sound` object. If it is not
      playing, it starts playing the audio file using the `play()` method of the `sound` object. */
      if (this.sound.playing()) {
        this.sound.pause()
      } else {
        this.sound.play()
      }
    },

    /* The `progress()` function is an action in a Pinia store that updates the `seek`, `duration`, and
    `playerProgress` properties of the store to reflect the current state of the audio playback. */
    progress() {
      /* `this.seek = formatTime(this.sound.seek())` is updating the `seek` property of the store with
      the current position of the audio playback in a formatted time string. */
      this.seek = formatTime(this.sound.seek())

      /* `this.duration = formatTime(this.sound.duration())` is updating the `duration` property of the
      Pinia store with the duration of the currently playing audio file in a formatted time string.
      The `formatTime()` function is used to convert the duration from seconds to a formatted time
      string in the format `mm:ss`. */
      this.duration = formatTime(this.sound.duration())

      /* `this.playerProgress = `${(this.sound.seek() / this.sound.duration()) * 100}%`` is calculating
      the progress of the currently playing audio file as a percentage and updating the
      `playerProgress` property of the Pinia store with the result. */
      this.playerProgress = `${(this.sound.seek() / this.sound.duration()) * 100}%`

      /* This code block is checking if the `sound` object is currently playing or not using the
      `playing()` method of the `sound` object. If it is playing, it schedules the `progress()`
      action to be called before the next repaint of the browser window using the
      `requestAnimationFrame()` method. This ensures smooth animation and better performance.
      Essentially, it updates the `seek`, `duration`, and `playerProgress` properties of the store
      to reflect the current state of the audio playback. */
      if (this.sound.playing()) {
        requestAnimationFrame(this.progress)
      }
    },
    /**
     * The function updates the seek position of an audio file based on the user's click on a progress
     * bar.
     * @param event - The event parameter is an object that contains information about the event that
     * triggered the function. In this case, it is likely a mouse click event. It contains information
     * such as the target element, the type of event, and the coordinates of the mouse click.
     * @returns If the `playing` property of `this.sound` is `false`, the function returns nothing
     * (`undefined`).
     */
    updateSeek(event) {
      if (!this.sound.playing) {
        return
      }
      /* `event.currentTarget.getBoundingClientRect()` is a method that returns the size of an element and
      its position relative to the viewport. The returned value is a `DOMRect` object that contains
      properties such as `x`, `y`, `width`, and `height`. */
      const { x, width } = event.currentTarget.getBoundingClientRect()

      const clickX = event.clientX - x //getting x cordinate when click
      const precentage = clickX / width
      const seconds = this.sound.duration() * precentage

      /* `this.sound.seek(seconds)` is setting the current playback position of the audio file to the
      specified number of seconds. It seeks to the specified time in the audio file and starts
      playing from that position. */
      this.sound.seek(seconds)
      this.progress
      this.sound.play()
    }
  },
  getters: {
    /* `playing` is a getter function in a Pinia store that returns a boolean value indicating whether
    the audio file is currently playing or not. It takes the `state` object of the store as a
    parameter. */
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing()
      }
      return false
    }
  }
})
