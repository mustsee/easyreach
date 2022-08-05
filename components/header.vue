<template>
  <header class="border-b border-gray-200 bg-gray-900">
    <div class="max-w-screen-xl flex justify-between mx-auto px-6 xl:px-0">
      <div class="logo flex items-center">
        <nuxt-link 
          to="/" 
          :title="$store.state.company.name"
          class="truncate text-white font-medium border-l-4 border-gray-500 transition hover:text-gray-100 my-4 px-3 py-1"
        >
          {{ $store.state.company.name }}
        </nuxt-link>
      </div>
      <ul class="flex">
        <li v-for="(item, i) in list" :key="i" class="flex">
          <nuxt-link 
            :to="item.path" 
            :title="item.name"
            :class="[getActiveClass(item), 'text-sm font-normal tracking-widest uppercase p-4 border-l border-r border-transparent']"
          >
            {{ item.name }}
          </nuxt-link>
        </li>
      </ul>
      <div v-if="showLogout" @click="handleLogout" class="text-white text-lg flex items-center px-4 cursor-pointer hover:text-gray-100">
        logout
      </div>
      <div v-else></div>
    </div>
  </header>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["list"],
  computed: {
    currentUser() {
      return this.$store.state.user
    },
    showLogout() {
      if (this.$route.name !== 'index' && this.currentUser && this.currentUser.email) return true
      return false
    }
  },
  methods: {
    ...mapActions({
      pageSignOut: 'pageSignOut'
    }),
    getActiveClass(item) {
      if (item.path === "/")
        return this.$route.path == item.path ? "border-l border-r border-gray-200 text-gray-800 bg-white" : "hover:text-gray-600";
      return this.$route.path.indexOf(item.path) == 0 ? "border-l border-r border-gray-200 text-gray-800 bg-white" : "hover:text-gray-600"
    },
    handleLogout() {
      this.$store.dispatch('pageSignOut', null)
      this.$router.push('/')
    }
  }
}
</script>