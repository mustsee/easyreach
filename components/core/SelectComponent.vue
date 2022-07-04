<template>
  <div class="relative border border-gray-300 text-gray-800 bg-white shadow-md">
    <select class="appearance-none w-full py-1 px-2 bg-white focus:outline-none" name="messages" id="messages">
      <option value="default_welcome_message">Default welcome message</option>
      <option value="with_arrival_time">With arrival time</option>
      <option value="early-checkin">Early Checkin</option>
    </select>
    <div class="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l border-gray-300">
        <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
    </div>
</div>
</template>

<style>
/* https://codepen.io/croxton/pen/zYqYdKr */
</style>

