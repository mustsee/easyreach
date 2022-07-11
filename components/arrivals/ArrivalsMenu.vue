<template>
<div class="grid gap-6 my-8 sm:grid-cols-2 lg:grid-cols-4">
  <date :date="date" class="order-1 col-span-1 sm:col-span-2" :removeBorder="removeBorder"/>
  <guests class="order-2" :numberOfGuests="numberOfGuests" :color="color" />
  <progression class="order-3" :color="color"/>
  <web-whats-app class="order-6 lg:order-4 col-span-1 sm:col-span-2" :removeBorder="removeBorder" :connected="connected" />
  <whats-app class="order-4 lg:order-5" :connected="connected" :color="color" />
  <email class="order-5 lg:order-6" :color="color" />
  <sender-name class="order-7" :removeBorder="removeBorder" />
  <status class="order-8" :removeBorder="removeBorder" />
  <message-types class="order-9" :removeBorder="removeBorder" />
</div>
</template>

<script>
export default {
  props: ["numberOfGuests", "date"],
  data() {
    return {
      color: "blue",
      connected: true,
      removeBorder: false,
    }
  }
}
</script>

<style scoped>
/* https://tailwindcomponents.com/component/statistic-cards */
</style>