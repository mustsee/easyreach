<template>
  <div class="border border-gray-300 rounded flex flex-col text-gray-800 bg-white shadow-md">
    <div class="bg-tertiary-color px-3 py-2 border-b border-gray-300">
      <h3 class="text-sm text-left font-medium">Output</h3>
    </div>
    <textarea 
      v-model="getText"
      rows="8" 
      spellcheck="false" 
      placeholder="Text to be sent to the guest" 
      class=" flex-1 p-2 m-1 focus:outline-none" 
      name="output" 
    ></textarea>
  </div>
</template>

<script>
export default {
  props: ["text"],
  computed: {
    getText: {
      get: function() {
        return this.text
      },
      set: function(newValue) {
        return this.$emit("textChange", newValue)
      }
    }
  }
}
</script>

<style>
/* https://codepen.io/koca/pen/RMeZBe */
</style>
