<template>
  <div :class="`flex-col sm:flex-row flex flex-1 ${ removeBorder ? '' : 'border-2 border-gray-100' } bg-white`">
    <!-- element CONNECTED -->
    <div class="py-4 flex w-full items-center" :title="connected ? 'Connected to WhatsApp' : 'Not connected to WhatsApp'">
      <div
        :class="['flex p-3', connected ? 'text-green-500 bg-green-100' : 'text-red-500 bg-red-100']"
      >
        <svg v-if="connected" fill="currentColor" class="w-5 h-5" viewBox="0 0 24 24">
          <path d="M8 24l3-9h-9l14-15-3 9h9l-14 15z"/>
        </svg>
        <svg v-else fill="currentColor" class="w-5 h-5" viewBox="0 0 24 24">
          <path d="M16 0l-3 9h9l-1.866 2h-14.4l10.266-11zm2.267 13h-14.4l-1.867 2h9l-3 9 10.267-11z"/>
        </svg>
      </div>
      <div :class="['w-full text-center justify-center py-2 px-3 text-gray-600 border-2 truncate', connected ? 'border-green-100' : 'border-red-100']">
        WA {{ connected ? "ON" : "OFF" }}
      </div>
    </div>
    <!-- element CHECK NUMBERS-->
    <div class="relative py-4 flex w-full items-center ">
      <div 
        v-on:keyup.enter=""
        type="text" 
        :class="['w-full text-center truncate px-4 py-2 cursor-pointer rounded-sm shadow text-gray-600 hover:shadow-md', !connected ? 'pointer-events-none opacity-50' : '']">
          Check numbers
      </div>
    </div>
    <!-- 3 element BULK SEND -->
    <div class="py-4 flex w-full items-center ">
      <div 
        v-on:keyup.enter="" 
        type="text" 
        :class="['w-full text-center truncate px-4 py-2 cursor-pointer rounded-sm shadow text-gray-600 hover:shadow-md', !connected ? 'pointer-events-none opacity-50' : '']">
          Bulk send
      </div>
      </div>
  </div>
</template>

<script>
export default {
  props: ["connected", "removeBorder"]
}
</script>