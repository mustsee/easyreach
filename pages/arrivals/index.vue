<template>
  <div>
    <arrivals-menu :numberOfGuests="getNumberOfGuests" :date="getDate" />
    <guest-card v-for="(booking, index) in getBookings" :key="index" :booking="booking" :messages="getMessages" />
  </div>
</template>

<script>

export default {
  transition: 'default',
  computed: {
    getNumberOfGuests() {
      return this.getBookings.length
    },
    getDate() {
      // TODO: Get this info from DB later
      let date = this.getBookings[0]["firstNight"]
      let datePart = date.match(/\d+/g),
      year = datePart[0].substring(2), // get only two digits
      month = datePart[1], day = datePart[2];
      return day+'/'+month+'/'+year;
    },
    getMessages() {
      return this.$store.state.messages
    },
    getBookings() {
      return this.$store.state.bookings
    },
  },
  async fetch() {
    // https://nuxtjs.org/docs/directory-structure/components/
    // TODO: See if it's best to call it booking or guest
    // Set bookings here
  }
}
</script>