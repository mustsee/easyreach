<template>
  <div
    :class="`min-w-0 overflow-hidden ${ removeBorder ? '' : 'border-2 border-gray-100' } bg-white`"
  >
    <div class="p-4 flex items-center h-full">
      <div class="flex-1 flex items-center justify-center text-gray-500">
        <svg 
          fill="currentColor" 
          class="py-1 px-2	w-10 h-8 border bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 hover:text-gray-600" 
          viewBox="0 0 24 24"
        >
          <path d="m13.789 7.155c.141-.108.3-.157.456-.157.389 0 .755.306.755.749v8.501c0 .445-.367.75-.755.75-.157 0-.316-.05-.457-.159-1.554-1.203-4.199-3.252-5.498-4.258-.184-.142-.29-.36-.29-.592 0-.23.107-.449.291-.591 1.299-1.002 3.945-3.044 5.498-4.243z"/>
        </svg>
        <p class="text-sm sm:text-base text-center tracking-wider font-medium uppercase text-gray-500 px-8">
          Thursday 10 September 2022
        </p>
        <svg 
          fill="currentColor" 
          class="py-1 px-2	w-10 h-8 border bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 hover:text-gray-600" 
          viewBox="0 0 24 24"
        >
          <path d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z"/>
        </svg>
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  props: ["date", "removeBorder"]
}
</script>