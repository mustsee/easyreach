<template>
  <div
    :class="`min-w-0 overflow-hidden ${ removeBorder ? '' : 'border-2 border-gray-100' } bg-white`"
  >
    <div class="p-4 flex items-center">
      <div
        class="p-3 rounded-full text-gray-500 bg-gray-100 mr-4"
      >
        <svg fill="currentColor" class="w-5 h-5" viewBox="0 0 20 20">
         <path
            fill-rule="evenodd"
            d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <div class="flex flex-1 relative text-gray-700 bg-white rounded-sm shadow">
        <select class="appearance-none w-full py-2 pl-3 pr-10 bg-white focus:outline-none" name="status" id="status">
          <option value="all">All messages</option>
          <option value="all">WhatsApp</option>
          <option value="all">Email</option>
          <option value="all">Other</option>
        </select>
        <div class="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-3 text-gray-700">
          <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  props: ["removeBorder"]
}
</script>