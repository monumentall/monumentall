import APIKeys from './constants/APIKeys'
import * as firebase from 'firebase'

//Initialize firebase if not already initialized:
if (!firebase.apps.length) {
  firebase.initializeApp(APIKeys.firebaseConfig)
}

//Turn on the below if you want DB logging...
// firebase.database.enableLogging(true)

export const database = firebase.database()
