<template>
  <div
    :class="`min-w-0 overflow-hidden ${ removeBorder ? '' : 'border-2 border-gray-100' } bg-white`"
  >
    <div class="p-4 flex items-center h-full">
      <div class="flex-1 flex items-center justify-center text-gray-500">
        <span @click="handlePreviousDate" :class="[offSet > minOffSet ? '' : 'pointer-events-none opacity-50', debounce ? 'pointer-events-none opacity-50' : '']">
          <svg 
            fill="currentColor" 
            class="py-1 px-2	w-10 h-8 border bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 hover:text-gray-600" 
            viewBox="0 0 24 24"
          >
            <path d="m13.789 7.155c.141-.108.3-.157.456-.157.389 0 .755.306.755.749v8.501c0 .445-.367.75-.755.75-.157 0-.316-.05-.457-.159-1.554-1.203-4.199-3.252-5.498-4.258-.184-.142-.29-.36-.29-.592 0-.23.107-.449.291-.591 1.299-1.002 3.945-3.044 5.498-4.243z"/>
          </svg>
        </span>
        <p class="flex items-center justify-center text-sm sm:text-base text-center tracking-wider font-medium uppercase text-gray-500 px-2 sm:px-8 sm:w-96 select-none">
          <span>{{ displayDate }}</span>
          <!-- Find where is the best to put this button -->
          <span @click="handleLoadData" :class="[(!debounceLoadData && lastUpdate) ? '' : 'pointer-events-none opacity-50']" :title="`Last update: ${lastUpdate}`">
            <svg 
              fill="currentColor" 
              class="py-1 px-2 w-10 h-8 cursor-pointer hover:text-gray-600" 
              viewBox="0 0 24 24"
            >
              <path d="M20.944 12.979c-.489 4.509-4.306 8.021-8.944 8.021-2.698 0-5.112-1.194-6.763-3.075l1.245-1.633c1.283 1.645 3.276 2.708 5.518 2.708 3.526 0 6.444-2.624 6.923-6.021h-2.923l4-5.25 4 5.25h-3.056zm-15.864-1.979c.487-3.387 3.4-6 6.92-6 2.237 0 4.228 1.059 5.51 2.698l1.244-1.632c-1.65-1.876-4.061-3.066-6.754-3.066-4.632 0-8.443 3.501-8.941 8h-3.059l4 5.25 4-5.25h-2.92z"/>
            </svg>
          </span>
        </p>
        <span @click="handleNextDate" :class="[offSet < maxOffSet ? '' : 'pointer-events-none opacity-50', debounce ? 'pointer-events-none opacity-50' : '']">
          <svg 
            fill="currentColor" 
            class="py-1 px-2	w-10 h-8 border bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 hover:text-gray-600" 
            viewBox="0 0 24 24"
          >
            <path d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z"/>
          </svg>
        </span>
      </div>
    </div>
  </div>  
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["date", "removeBorder"],
  data() {
    return {
      debounce: false,
      debounceLoadData: false,
      minOffSet: -10,
      maxOffSet: 10,
      offSet: 0,
      options: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    }
  },
  computed: {
    currentDate() {
      return this.$store.state.currentDate
    },
    apiDate() {
      return this.$store.getters.apiDate
    },
    lastUpdate() {
      const updatedAt = this.$store.state.lastUpdates[this.apiDate] 
      if (updatedAt) {
        let date = new Date(updatedAt.seconds * 1000)
        return `${date.toLocaleDateString("en-GB")} ${date.getHours()}h${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`
      }
    },
    displayDate() {
      const { currentDate, options } = this
      if (currentDate) {
        return currentDate.toLocaleDateString("en-GB", options)
      }
    },
  },
  methods: {
    ...mapActions({
      loadGuestsData: 'loadGuestsData',
      writeGuestsData: 'writeGuestsData',
      dateLastUpdates: 'dateLastUpdates',
    }),
    handlePreviousDate() {
      if (this.debounce) return
      this.debounce = true
      this.offSet = this.offSet - 1
      let currentDate = new Date(this.currentDate.setDate(this.currentDate.getDate() - 1))
      this.$store.commit('setCurrentDate', currentDate)
      this.$store.dispatch('loadGuestsData').finally(() => this.debounce = false )
    },
    handleNextDate() {
      if (this.debounce) return
      this.debounce = true
      this.offSet = this.offSet + 1
      let currentDate = new Date(this.currentDate.setDate(this.currentDate.getDate() + 1))
      this.$store.commit('setCurrentDate', currentDate)
      this.$store.dispatch('loadGuestsData').finally(() => this.debounce = false )
    },
    handleLoadData() {
      // SetTimeout on 5 seconds
      if (this.debounceLoadData) return
      this.debounceLoadData = true
      this.$store.dispatch('writeGuestsData', true)
        .then(res => {
          if (res.length > 0) this.loadGuestsData()
        })
        .catch(error => console.log('Error in handleLoadData function: ', error ))
      setTimeout(() => this.debounceLoadData = false, 5000)
    },
  },
  mounted() {
    // TODO: maybe I will have to put this in the activated hook
    // Max offset -10 to +10 days
    this.offSet = 0
    // !! No time zone handling
    // + 2 days, make it a parameter
    // TODO: Set this beforehand SSR, cause no need to be it on client side
    // And it will be more clear !
    let now = new Date()
    let currentDate = new Date(now.setDate(now.getDate() + 2))
    this.$store.commit('setCurrentDate', currentDate)
  }
}
</script>