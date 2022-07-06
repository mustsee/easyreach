<template>
  <header class="bg-canary">
    <div class="max-w-screen-xl flex justify-between mx-auto px-6 xl:px-0">
      <div class="logo flex items-center">
        <nuxt-link 
          to="/" 
          :title="$store.state.company.name"
          class="text-white font-bold bg-spanish-bistre px-3 py-1 rounded-lg"
        >
          {{ $store.state.company.shortenedName }}
        </nuxt-link>
      </div>
      <ul class="flex">
        <li v-for="(item, i) in list" :key="i" class="flex">
          <nuxt-link 
            :to="item.path" 
            :title="item.name"
            :class="[getActiveClass(item), 'text-sm font-medium uppercase p-4']"
          >
            {{ item.name }}
          </nuxt-link>
        </li>
      </ul>
      </div>
  </header>
</template>

<script>
export default {
  props: ["list"],
  methods: {
    getActiveClass(item) {
      if (item.path === "/")
        return this.$route.path == item.path ? "text-blood-red" : "";
      return this.$route.path.indexOf(item.path) == 0 ? "text-blood-red" : ""
    }
  }
}
</script>