<template>
  <div>
    <summary-cards />
    <dynamic-cards />
    <guest-card v-for="(booking, index) in bookings" :key="index" :booking="booking" :getMessages="messages" :staffName="staffName" />
  </div>
</template>

<script>
import data from "@/assets/data/beds24-API.js"

export default {
  transition: 'default',
  data() {
    return {
      staffName: "Thomas",
      bookings: [],
    }
  },
  computed: {
    messages() {
      return this.$store.state.messages
    }
  },
  async fetch() {
    // https://nuxtjs.org/docs/directory-structure/components/
    // TODO: See if it's best to call it booking or guest
    this.bookings = data.bookings.slice(0, 5)
  }
}
</script>