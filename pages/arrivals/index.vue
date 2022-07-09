<template>
  <div>
    <summary-cards :numberOfGuests="getNumberOfGuests"/>
    <dynamic-cards />
    <guest-card v-for="(booking, index) in bookings" :key="index" :booking="booking" :getMessages="messages" />
  </div>
</template>

<script>

export default {
  transition: 'default',
  computed: {
    messages() {
      return this.$store.state.messages
    },
    getNumberOfGuests() {
      return this.bookings.length
    },
    bookings() {
      return this.$store.state.bookings
    }
  },
  async fetch() {
    // https://nuxtjs.org/docs/directory-structure/components/
    // TODO: See if it's best to call it booking or guest
    // Set bookings here
  }
}
</script>