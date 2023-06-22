<template>
  <div
    :class="`min-w-0 overflow-hidden ${ removeBorder ? '' : 'border-2 border-gray-100' } bg-white`"
  >
    <div class="w-full py-4 flex items-center">
      <div class="flex flex-1">
        <p class="relative flex flex-1 text-base font-normal text-gray-700">
          <input v-model="senderName" v-on:keyup.enter="handleSenderName" type="text" id="sendersName" name="sendersName" placeholder="Sender's name" spellcheck="false" class="w-full pl-3 pr-12 py-2 rounded-sm shadow focus:shadow-md focus:outline-none focus:shadow-outline">
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
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["removeBorder"],
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
      setSenderNameInCards: 'setSenderNameInCards'
    }),
    handleSenderName() {
      if (this.senderName.length < 3) return
      // Change senderName in all cards
      this.$store.dispatch('setSenderNameInCards')
    }
  }
}
</script>