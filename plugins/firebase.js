// Troubles with ESM / CJS
// https://stackoverflow.com/questions/63358905/typeerror-firebase-default-initializeapp-is-not-a-function

// TODO: Use the modular version, add analytics ?
// https://firebase.google.com/docs/web/learn-more?authuser=0&hl=fr#modular-version

// CJS
const firebase = require('firebase/app').default
const firebaseConfig = require('~/firebase.config.js')
require('firebase/firestore')

// Code specific to Vue
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const fireDb = firebase.firestore();

if (process.env.NODE_ENV !==  "production") {
  fireDb.useEmulator("localhost", 8080);
}

export { fireDb }