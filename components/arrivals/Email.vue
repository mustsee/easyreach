<template>
  <div
    :class="`min-w-0 overflow-hidden shadow-md bg-white border-t-4 border-blue-500`"
  >
    <div class="p-4 flex items-center">
      <div
        :class="`p-3 rounded-full text-blue-500 bg-blue-100 mr-4`"
      >
        <svg fill="currentColor" class="w-5 h-5" viewBox="0 0 24 24">
          <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
        </svg>
      </div>
      <div>
        <p class="mb-2 text-sm font-normal text-gray-600">
          Email
        </p>
        <p class="text-base font-normal text-gray-700">
          {{ done }} / {{ total }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["color", "done", "total"]
}
</script>