// Troubles with ESM / CJS
// https://stackoverflow.com/questions/63358905/typeerror-firebase-default-initializeapp-is-not-a-function

// TODO: Use the modular version, add analytics ?
// https://firebase.google.com/docs/web/learn-more?authuser=0&hl=fr#modular-version

// Change to firebase 9
// https://lupas.medium.com/firebase-9-beta-nuxt-js-981cf3dac910
// https://firebase.google.com/docs/emulator-suite/connect_firestore#web-version-9

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator  } from "firebase/firestore";

const firebaseConfig = require('~/firebase.config.js')

let firebaseApp
const apps = getApps()
if (!apps.length) {
  firebaseApp = initializeApp(firebaseConfig)
} else {
  firebaseApp = apps[0]
}

const fireDb = getFirestore(firebaseApp, {});

if (process.env.NODE_ENV !==  "production") {
  connectFirestoreEmulator(fireDb, 'localhost', 8080);
}

export { fireDb }