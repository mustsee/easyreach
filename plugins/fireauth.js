import { onAuthStateChanged } from "firebase/auth";
import { fireAuth } from '@/plugins/firebase.js'

export default context => {
  const { store } = context

  return new Promise((resolve) => {
    onAuthStateChanged(fireAuth, user => {
      if (user) {
      const { displayName, email } = user
      store.commit('setUser', { displayName, email })
      } else {
        store.commit('setUser', null)
      }
      resolve()
    })
  })
}