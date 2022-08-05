// Troubles with ESM / CJS
// https://stackoverflow.com/questions/63358905/typeerror-firebase-default-initializeapp-is-not-a-function

// TODO: Use the modular version, add analytics ?
// https://firebase.google.com/docs/web/learn-more?authuser=0&hl=fr#modular-version

// Change to firebase 9
// https://lupas.medium.com/firebase-9-beta-nuxt-js-981cf3dac910
// https://firebase.google.com/docs/web/modular-upgrade
// https://firebase.google.com/docs/emulator-suite/connect_firestore#web-version-9

// Firebase UI
// https://firebase.google.com/docs/auth/web/firebaseui

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator  } from "firebase/firestore";
import { getAuth, connectAuthEmulator, GoogleAuthProvider } from "firebase/auth"

let firebaseConfig
if (process.env.NODE_ENV !==  "production") {
  firebaseConfig = require('~/firebase.config.dev.js')
} else {
  firebaseConfig = require('~/firebase.config.prod.js')
}

let firebaseApp
const apps = getApps()
if (!apps.length) {
  firebaseApp = initializeApp(firebaseConfig)
} else {
  firebaseApp = apps[0]
}

const fireDb = getFirestore(firebaseApp);
const fireAuth = getAuth(firebaseApp)

const authProviders = {
  Google: GoogleAuthProvider.PROVIDER_ID,
}

if (process.env.NODE_ENV !==  "production") {
  connectFirestoreEmulator(fireDb, 'localhost', 8080);
  connectAuthEmulator(fireAuth, 'http://localhost:9099')
}

export { fireDb, fireAuth, authProviders }