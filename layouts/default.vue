<template>
  <div class="flex flex-col h-screen justify-between text-slate-800">
    <header-menu :list="list" />
      <main class="mb-auto bg-white">
        <!-- <div class="max-w-screen-xl mx-auto px-6 pt-4 xl:px-0"> --><!-- 1280px -->
        <div class="max-w-screen-xl mx-auto px-6 xl:px-0">
          <nuxt keep-alive></nuxt>
        </div>
      </main>
    <footer-page />
  </div>
</template>

<script>
import layout from "@/mixins/layout"

export default {
  mixins: [layout],
}
</script>