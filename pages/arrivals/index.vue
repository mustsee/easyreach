<template>
  <div>
    <guest-card v-for="(booking, index) in bookings" :key="index" :booking="booking" :staffName="staffName" />
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
  async fetch() {
    // https://nuxtjs.org/docs/directory-structure/components/
    // TODO: See if it's best to call it booking or guest
    this.bookings = data.bookings
  }
}
</script>