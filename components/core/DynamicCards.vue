<template>
<div class="grid gap-6 my-8 sm:grid-cols-2 lg:grid-cols-4">
  <div
    class="min-w-0 overflow-hidden border-2 border-gray-100 bg-white"
  >
    <div class="p-4 flex items-center">
      <div
        class="p-3 rounded-full text-gray-500 bg-gray-100 mr-4"
      >
       <svg fill="currentColor" viewBox="0 0 24 24" class="w-5 h-5">
         <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/>
        </svg>
      </div>
      <div class="flex flex-1">
        <p class="relative flex flex-1 text-base font-normal text-gray-700">
          <input v-model="senderName" v-on:keyup.enter="handleSenderName" type="text" placeholder="Sender's name" spellcheck="false" class="w-full pl-3 pr-12 py-2 rounded-sm shadow focus:outline-none focus:shadow-outline">
          <span @click="handleSenderName" :class="['absolute px-3 right-0 top-0 bottom-0 flex items-center z-10 border-l text-gray-500 bg-gray-100 cursor-pointer hover:text-gray-600 hover:bg-gray-200 transition-all', 
            senderName.length < 3 ? 'pointer-events-none opacity-50' : '']">
            <svg fill="currentColor" viewBox="0 0 24 24" class="w-4 h-4">
              <path d="M12.849 24l-3.96-7.853-4.889 4.142v-20.289l16 12.875-6.192 1.038 3.901 7.696-4.86 2.391zm-3.299-10.979l4.194 8.3 1.264-.617-4.213-8.313 4.632-.749-9.427-7.559v11.984l3.55-3.046z"/>
            </svg>
          </span>
        </p>
      </div>
    </div>
  </div>
  <div
    class="min-w-0 overflow-hidden border-2 border-gray-100 bg-white"
  >
    <div class="p-4 flex items-center">
      <div
        class="p-3 rounded-full text-gray-500 bg-gray-100 mr-4"
      >
        <svg fill="currentColor" class="w-5 h-5" viewBox="0 0 24 24">
          <path d="M22 2v22h-20v-22h3c1.23 0 2.181-1.084 3-2h8c.82.916 1.771 2 3 2h3zm-11 1c0 .552.448 1 1 1 .553 0 1-.448 1-1s-.447-1-1-1c-.552 0-1 .448-1 1zm9 1h-4l-2 2h-3.897l-2.103-2h-4v18h16v-18zm-13 9.729l.855-.791c1 .484 1.635.852 2.76 1.654 2.113-2.399 3.511-3.616 6.106-5.231l.279.64c-2.141 1.869-3.709 3.949-5.967 7.999-1.393-1.64-2.322-2.686-4.033-4.271z"/>
        </svg>
      </div>
      <div class="flex flex-1 relative text-gray-700 bg-white rounded-sm shadow">
        <select class="appearance-none w-full py-2 px-3 bg-white focus:outline-none" name="status" id="status">
          <option value="all">All</option>
          <option value="all">Done</option>
          <option value="all">To do</option>
        </select>
        <div class="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700">
          <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  </div>
  <div
    class="min-w-0 overflow-hidden border-2 border-gray-100 bg-white"
  >
    <div class="p-4 flex items-center">
      <div
        class="p-3 rounded-full text-gray-500 bg-gray-100 mr-4"
      >
        <svg fill="currentColor" class="w-5 h-5" viewBox="0 0 20 20">
         <path
            fill-rule="evenodd"
            d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <div class="flex flex-1 relative text-gray-700 bg-white rounded-sm shadow">
        <select class="appearance-none w-full py-2 px-3 bg-white focus:outline-none" name="status" id="status">
          <option value="all">All</option>
          <option value="all">WhatsApp</option>
          <option value="all">Email</option>
          <option value="all">Other</option>
        </select>
        <div class="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700">
          <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  </div>
  <div
    class="min-w-0 overflow-hidden border-2 border-gray-100 bg-white"
  >
    <div class="p-4 flex items-center">
      <div
        class="p-3 rounded-full text-gray-500 bg-gray-100 mr-4"
      >
        <svg fill="currentColor" class="w-5 h-5" viewBox="0 0 24 24">
         <path d="M20 20h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2z"/>
        </svg>
      </div>
      <div class="flex-1 flex items-center text-gray-500">
      <!-- <div class="flex-1 flex justify-around items-center text-gray-500"> -->
        <!-- <svg fill="currentColor" class="py-2 px-1	w-8 h-10" viewBox="0 0 24 24">
          <path d="m13.789 7.155c.141-.108.3-.157.456-.157.389 0 .755.306.755.749v8.501c0 .445-.367.75-.755.75-.157 0-.316-.05-.457-.159-1.554-1.203-4.199-3.252-5.498-4.258-.184-.142-.29-.36-.29-.592 0-.23.107-.449.291-.591 1.299-1.002 3.945-3.044 5.498-4.243z"/>
        </svg> -->
        <p class="text-base font-normal text-gray-700">
          {{ date }}
        </p>
        <!-- <svg fill="currentColor" class="py-2 px-1	w-8 h-10" viewBox="0 0 24 24">
          <path d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z"/>
        </svg> -->
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["date"],
  computed: {
    senderName: {
      get() {
        return this.$store.state.senderName
      },
      set(newValue) {
        this.$store.commit('updateSenderName', newValue)
      }
    }
  },
  methods: {
    ...mapActions({
      setSenderNameInCards: 'setSenderNameInCards' // map `this.add()` to `this.$store.dispatch('increment')`
    }),
    handleSenderName() {
      // Change senderName in all cards
      this.$store.dispatch('setSenderNameInCards')
    }
  }
}
</script>

<style scoped>
/* https://tailwindcomponents.com/component/statistic-cards */
</style>