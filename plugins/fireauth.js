import { onAuthStateChanged } from "firebase/auth";
import { fireAuth } from '@/plugins/firebase.js'

export default context => {
  const { store } = context

  return new Promise((resolve) => {
    onAuthStateChanged(fireAuth, user => {
      if (user) {
      const { displayName, email, uid } = user
      store.commit('setUser', { displayName, email, uid })
      } else {
        store.commit('setUser', null)
      }
      resolve()
    })
  })
}