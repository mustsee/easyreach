<template>
  <div class="flex justify-center mt-20">
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import 'firebaseui/dist/firebaseui.css'
import { fireAuth, authProviders  } from '/plugins/firebase.js'
import { mapActions } from "vuex";

export default {
  transition: 'default',
  computed: {
    currentUser() {
      return this.$store.state.user
    }
  },
  methods: {
    ...mapActions({
      pageSignOut: 'pageSignOut',
      isUserAuthorized: 'isUserAuthorized',
    }),
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
          signInSuccessWithAuthResult: (res) => this.signInResult(res),
        }
      }
      ui.start('#firebaseui-auth-container', config)
    },
    async signInResult(res) {
      const isUserAuthorized = await this.isUserAuthorized({ email: res.user.email })
      if (isUserAuthorized) {
        this.$router.push('/arrivals')
      } else {
        this.$store.dispatch('pageSignOut').then(() => this.showAuthContainer())
      }
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