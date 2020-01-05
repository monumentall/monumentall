import Constants from "expo-constants";
import * as firebase from "firebase";

const firebaseConfig = {
  "apiKey": Constants.manifest.extra.firebaseConfig.apiKey,
  "authDomain": Constants.manifest.extra.firebaseConfig.authDomain,
  "databaseURL": Constants.manifest.extra.firebaseConfig.databaseURL,
  "projectId": Constants.manifest.extra.firebaseConfig.projectId,
  "storageBucket": Constants.manifest.extra.firebaseConfig.storageBucket,
  "messagingSenderId": Constants.manifest.extra.firebaseConfig.messagingSenderId,
  "appId": Constants.manifest.extra.firebaseConfig.appId
};

//Initialize firebase if not already initialized:
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
};

//Turn on the below if you want DB logging...
// firebase.database.enableLogging(true)

export const database = firebase.database();
