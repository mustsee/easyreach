<template>
  <div class="flex justify-center mt-20">
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import 'firebaseui/dist/firebaseui.css'
import { fireAuth, authProviders  } from '/plugins/firebase.js'

export default {
  transition: 'default',
  computed: {
    currentUser() {
      return this.$store.state.user
    }
  },
  methods: {
    showAuthContainer() {
      const firebaseui = require('firebaseui')
      let ui = firebaseui.auth.AuthUI.getInstance()
      if (!ui) {
        ui = new firebaseui.auth.AuthUI(fireAuth)
      }
      const config = {
        signInOptions: [authProviders.Google],
        signInFlow: 'popup',
        callbacks: {
          signInSuccessWithAuthResult: () => this.signInResult()
        }
      }
      ui.start('#firebaseui-auth-container', config)
    },
    signInResult() {
      this.$router.push('/arrivals')
      return false
    },
    isUserConnected() {
      if (this.currentUser.email) return this.$router.push('/arrivals')
      this.showAuthContainer()
    }
  },
  activated() {
    this.isUserConnected()
  },
  mounted() {
    this.isUserConnected()
  }
}
</script>