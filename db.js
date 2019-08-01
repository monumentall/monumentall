import APIKeys from './constants/APIKeys'
import * as firebase from 'firebase'

//Initialize firebase if not already initialized:
if (!firebase.apps.length) {
  firebase.initializeApp(APIKeys.firebaseConfig)
}
export const database = firebase.database()
