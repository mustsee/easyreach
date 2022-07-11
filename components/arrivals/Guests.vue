<template>
  <div
    :class="`min-w-0 overflow-hidden shadow-md bg-white border-t-4 border-${color}-500`"
  >
    <div class="p-4 flex items-center">
      <div
        :class="`p-3 rounded-full text-${color}-500 bg-${color}-100 mr-4`"
      >
       <svg fill="currentColor" viewBox="0 0 20 20" class="w-5 h-5">
          <path
            d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
          ></path>
        </svg>
      </div>
      <div>
        <p class="mb-2 text-sm font-normal text-gray-600">
          Guests
        </p>
        <p class="text-base font-normal text-gray-700">
          {{ numberOfGuests }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["color", "numberOfGuests"],
}
</script>