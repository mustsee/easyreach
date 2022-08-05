<template>
  <client-only>
    <div v-if="currentUser.email">
      <arrivals-menu :numberOfGuests="getNumberOfGuests" :bookings="getBookings" />
      <div v-if="!getNumberOfGuests" class="flex flex-col justify-center items-center text-gray-500">
        <span class="my-8 text-xl font-semi-bold">NO DATA</span>
        <span @click="writeData" :class="!debounceLoadData ? '' : 'pointer-events-none opacity-50'"  title="Upload data">
          <svg 
            fill="currentColor" 
            class="my-2 py-9 px-4 w-24 h-24 border bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 hover:text-gray-600" 
            viewBox="0 0 24 24"
          >
            <path d="M12 21l-8-9h6v-12h4v12h6l-8 9zm9-1v2h-18v-2h-2v4h22v-4h-2z"/>
          </svg>
        </span>
      </div>
      <div v-else>
        <guest-card v-for="(booking, index) in filteredBookings" :key="index" :booking="booking" :messages="getMessages" />
      </div>
    </div>
    <div v-else></div>
  </client-only>
</template>

<script>
import { mapActions } from "vuex";

export default {
  transition: 'default',
  data() {
    return {
      debounce: false,
      debounceLoadData: false,
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.user
    },
    getNumberOfGuests() {
      if (this.getBookings) {
        return this.getBookings.length
      }
      return 0
    },
    getMessages() {
      return this.$store.state.messages
    },
    getBookings() {
      return this.$store.state.bookings[this.apiDate]
    },
    filteredBookings() {
      const { typeFilter, statusFilter, getBookings } = this
      let res = getBookings
      if (typeFilter !== 'all') res = getBookings.filter(booking => booking.type === typeFilter)
      if (statusFilter !== 'all') res = res.filter(booking => booking.status === statusFilter)
      return res
    },
    typeFilter() {
      return this.$store.state.typeFilter
    },
    statusFilter() {
      return this.$store.state.statusFilter
    },
    apiDate() {
      return this.$store.getters.apiDate
    },
  },
  methods: {
    ...mapActions({
      loadGuestsData: 'loadGuestsData',
      writeGuestsData: 'writeGuestsData',
      dateLastUpdates: 'dateLastUpdates',
    }),
    writeData() {
      if (this.debounceLoadData) return
      this.debounceLoadData = true
      this.$store.dispatch('writeGuestsData')
        .then(res => {
          if (res.length > 0) this.loadData()
        })
        .catch(error => console.log('Error in writeData function: ', error ))
      setTimeout(() => this.debounceLoadData = false, 5000)
    },
    loadData() {
      if (this.debounce) return
      this.debounce = true
      this.$store.dispatch('loadGuestsData')
        .catch(error => console.log('Error in loadData function: ', error ))
        .finally(() => this.debounce = false)
    }
  },
  mounted() {
    if (!this.currentUser.email) return this.$router.push('/')
  }
}
</script>