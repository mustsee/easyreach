<template>
  <div class="px-4 pb-6">
    <div class="rounded-lg shadow-lg lg:flex">
      <div class="flex-1 px-6 py-8 bg-white lg:p-12">
        <h3 class="text-2xl font-extrabold text-gray-900 sm:text-3xl">{{ booking.name }}</h3>
        <p class="mt-6 text-base text-gray-500 truncate">{{ booking.phone ? booking.phone : "No phone" }} <br/> {{ booking.email ? booking.email : "No email" }}</p>
        <div class="mt-8">
          <div class="flex items-center">
            <h4 class="flex-shrink-0 pr-4 text-sm font-semibold tracking-wider uppercase bg-white">Guest infos</h4>
            <div class="flex-1 border-t-2 border-gray-200"></div>
          </div>
          <!-- <ul class="mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5"> -->
          <ul class="mt-8 space-y-5">
            <li class="lg:col-span-1">
              <p class="text-gray-900">Arrival time</p>
              <p class="text-sm text-gray-700">{{ booking.arrivalTime ? booking.arrivalTime : "No data" }}</p>
            </li>
            <li class="lg:col-span-1">
              <p class="text-gray-900">Comments</p>
              <p class="text-sm text-gray-700" v-html="`${booking.guestComments ? booking.guestComments : 'No data'}`"></p>
            </li>
          </ul>
        </div>
      </div>
      <div class="lg:w-3/5 px-6 py-8 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
        <select-component @selectChange="handleSelectType" :type="type" :messages="getMessages" />
        <textarea-component @textChange="handleTextChange" :text="text" class="mt-6" />
        <div class="mt-8">
          <div class="action-button rounded-md shadow">
            <a 
              :href="getWhatsAppLink" 
              :class="[
              'flex items-center justify-center w-full px-5 py-3 text-base font-medium text-primary-color bg-white border border-transparent rounded-md hover:text-white hover:bg-primary-color transition-all', 
              !getWhatsAppLink ? 'pointer-events-none text-gray-800 border border-gray-800 bg-gray-200' : '' 
              ]"
              target="_blank">
                Open in
                <span class="w-6 h-6 ml-2">
                  <svg :class="['whatsapp-icon', !getWhatsAppLink ? 'disable' : '']" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path
                      d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                    />
                  </svg>
                </span>
              </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["booking", "staffName"],
  data() {
    return {
      text: "",
      type: "",
      variables: {},
    }
  },
  computed: {
    getMessages() {
      return this.$store.state.messages
    },
    getWhatsAppLink() {
      // There might be some reservations without phone numbers
      if (this.booking["phone"]) {
        // https://web.whatsapp.com/send?phone=whatsappphonenumber&text=urlencodedtext
        let encodedText =  encodeURI(this.text)
        return `https://web.whatsapp.com/send?phone=${this.booking.phone}&text=${encodedText}`
      }
      return ""
    }
  },
  methods: {
    changeVariablesInText(text, variables = this.variables) {
      let textToArray = text.split("--")
      let modifiedArray = textToArray.map((part) => {
        if (parseInt(part)) {
          return this.booking[variables[part]] ? 
                  this.booking[variables[part]] : this[variables[part]] ? 
                    this[variables[part]] : "--" +  variables[part] + "--"
        }
        return part
      })
      return modifiedArray.join("")
    },
    handleSelectType(value) {
      let message = this.getMessages.filter(message => message.type === value)[0]
      this.type = value
      this.variables = message.variables
      this.text = this.changeVariablesInText(message.text, message.variables) 
    },
    handleTextChange(value) {
      this.text = value
    }
  },
  mounted() {
    // The first message in the array is the default message
    // TODO: make it more intelligent afterwards
    const { text, type, variables } = this.getMessages[0]
    this.type = type
    this.variables = variables
    this.text = this.changeVariablesInText(text, variables)

  }
}
</script>

<style>
/* https://codepen.io/stackdiary/pen/xxPRLjV */

.action-button:hover .whatsapp-icon {
  fill: #FFFFFF;
}

.action-button:hover .disable {
  fill: inherit;
}

.whatsapp-icon {
  fill: #FF3B3F;
}

.disable {
  fill: #1F2937;
}
</style>