<template>
  <div
    :class="`min-w-0 overflow-hidden ${ removeBorder ? '' : 'border-2 border-gray-100' } bg-white`"
  >
    <div class="p-4 flex items-center">
      <div
        class="p-3 rounded-full text-gray-500 bg-gray-100 mr-4"
      >
        <svg fill="currentColor" class="w-5 h-5" viewBox="0 0 24 24">
          <path d="M22 2v22h-20v-22h3c1.23 0 2.181-1.084 3-2h8c.82.916 1.771 2 3 2h3zm-11 1c0 .552.448 1 1 1 .553 0 1-.448 1-1s-.447-1-1-1c-.552 0-1 .448-1 1zm9 1h-4l-2 2h-3.897l-2.103-2h-4v18h16v-18zm-13 9.729l.855-.791c1 .484 1.635.852 2.76 1.654 2.113-2.399 3.511-3.616 6.106-5.231l.279.64c-2.141 1.869-3.709 3.949-5.967 7.999-1.393-1.64-2.322-2.686-4.033-4.271z"/>
        </svg>
      </div>
      <div class="flex flex-1 relative text-gray-700 bg-white rounded-sm shadow">
        <select class="appearance-none w-full py-2 pl-3 pr-10 bg-white focus:outline-none" name="status" id="status">
          <option value="all">All status</option>
          <option value="all">Done</option>
          <option value="all">To do</option>
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