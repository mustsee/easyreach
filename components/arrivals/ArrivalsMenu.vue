<template>
<div class="grid gap-6 my-8 sm:grid-cols-3">
  <!-- 1 row -->
  <date class="col-span-1 sm:col-span-3" :removeBorder="removeBorder"/>
  <!-- 2 row -->
  <guests class="col-span-1" :numberOfGuests="numberOfGuests" :color="color" />
  <whats-app class="col-span-1" :connected="connected" :color="color" />
  <!-- <email :color="color" /> -->
  <progression class="col-span-1" :color="color" :numberOfGuests="numberOfGuests"/>
  <!-- 3 row -->
  <!-- <web-whats-app class="col-span-1 sm:col-span-2 grid grid-cols-3 gap-6" :removeBorder="removeBorder" :connected="connected" /> -->
  <!-- <div class="col-span-1 sm:col-span-2 flex flex-col sm:flex-row grid grid-cols-3 gap-6"> -->
  <sender-name class="col-span-1" :removeBorder="removeBorder" />
  <message-types class="col-span-1" :removeBorder="removeBorder" />
  <status class="col-span-1" :removeBorder="removeBorder" />
</div>
</template>

<script>
export default {
  props: ["numberOfGuests", "date"],
  data() {
    return {
      color: "blue",
      connected: false,
      removeBorder: true,
    }
  }
}
</script>

<style scoped>
/* https://tailwindcomponents.com/component/statistic-cards */
</style>