<template>
  <header class="border-b border-gray-200 bg-gray-50">
    <div class="max-w-screen-xl flex justify-between mx-auto px-6 xl:px-0">
      <div class="logo flex items-center">
        <nuxt-link 
          to="/" 
          :title="$store.state.company.name"
          class="text-gray-700 font-medium bg-white border-l-4 border-gray-500 px-3 py-1"
        >
          {{ $store.state.company.name }}
        </nuxt-link>
      </div>
      <ul class="flex">
        <li v-for="(item, i) in list" :key="i" class="flex">
          <nuxt-link 
            :to="item.path" 
            :title="item.name"
            :class="[getActiveClass(item), 'text-sm font-normal tracking-widest uppercase p-4']"
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
        return this.$route.path == item.path ? "bg-gray-600 text-white" : "hover:text-gray-600";
      return this.$route.path.indexOf(item.path) == 0 ? "bg-gray-600 text-white" : "hover:text-gray-600"
    }
  }
}
</script>