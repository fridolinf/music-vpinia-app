import { auth } from '../utils/firebase'
import {
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { db } from '../utils/firebase'
export default defineStore('user', {
  state: () => ({
    userLoggedIn: false
  }),
  actions: {
    // can be asynchronous
    // can be mutated multiple mutation
    // available to all component
    async register(values) {
      /* `const userCred = await createUserWithEmailAndPassword(auth, values.email, values.password)`
      is creating a new user account with the provided email and password using Firebase
      Authentication. It returns a `UserCredential` object that contains the newly created user's
      information. */
      const userCred = await createUserWithEmailAndPassword(auth, values.email, values.password)

      /* `const newDocument = doc(db, 'users', userCred.user.uid)` is creating a new Firestore document
      reference with the `db` instance and the `users` collection name, and the `userCred.user.uid`
      as the document ID. This document will be used to store the user's information such as name,
      email, age, and country. The `setDoc` function is then used to set the data of this document
      with the provided user information. */
      const newDocument = doc(db, 'users', userCred.user.uid)

      /* `await setDoc(newDocument, {...})` is setting the data of a Firestore document with the
      provided user information. The `newDocument` variable is a reference to a new Firestore
      document that will be used to store the user's information such as name, email, age, and
      country. The `setDoc` function is then used to set the data of this document with the provided
      user information, which is an object containing the user's name, email, age, and country. This
      data will be stored in the Firestore database and can be retrieved later when needed. */
      await setDoc(newDocument, {
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country
      })

      /* `await updateProfile(userCred.user, { displayName: values.name })` is updating the user's
      profile information in Firebase Authentication. The `updateProfile` function is provided by
      Firebase Authentication and takes two arguments: the user object and an object containing the
      updated profile information. In this case, the `displayName` property of the user's profile is
      being updated with the `name` value provided in the `values` object. This will update the
      user's display name in Firebase Authentication, which can be used in various parts of the
      application, such as displaying the user's name in the UI. */
      await updateProfile(userCred.user, {
        displayName: values.name
      })

      // after login
      this.userLoggedIn = true
    },
    async authenticate(values) {
      await signInWithEmailAndPassword(auth, values.email, values.password)
      this.userLoggedIn = true
    },

    async signOut() {
      await auth.signOut()
      this.userLoggedIn = false
    }
  }
})
