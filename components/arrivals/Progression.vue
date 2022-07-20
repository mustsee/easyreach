<template>
  <div
    :class="`min-w-0 overflow-hidden shadow-md bg-white border-t-4 border-${color}-500`"
  >
    <div class="p-4 flex items-center">
      <div
        :class="`p-3 rounded-full text-${color}-500 bg-${color}-100 mr-4`"
      >
        <svg  fill="currentColor" class="w-5 h-5" viewBox="0 0 24 24">
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm8 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-19 0c0-6.065 4.935-11 11-11v2c-4.962 0-9 4.038-9 9 0 2.481 1.009 4.731 2.639 6.361l-1.414 1.414.015.014c-2-1.994-3.24-4.749-3.24-7.789z"/>
        </svg>
      </div>
      <div>
        <p class="mb-2 text-sm font-normal text-gray-600">
          Progression
        </p>
        <p class="text-base font-normal text-gray-700">
          0 <span class="font-light">/</span> {{ numberOfGuests }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["color", "numberOfGuests"]
}
</script>