<template>
  <div class="pb-6">
    <div class="shadow-md lg:flex">
      <div class="flex-1 px-6 py-8 bg-white lg:p-12">
        <h3 class="text-2xl font-extrabold text-gray-900 sm:text-3xl">{{ booking.name }}</h3>
        <p class="mt-6 text-base text-gray-500 truncate">
          <span v-if="booking.groupReservation">(group of {{ booking.personsInGroup }})<br/></span>
          {{ booking.phone ? booking.phone : "No phone" }} <br/> 
          {{ booking.email ? booking.email : "No email" }}</p>
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
              <p class="text-sm text-gray-700" v-html="`${booking.guestCommentsModified ? booking.guestCommentsModified : 'No data'}`"></p>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="booking.status === 'todo'" class="lg:w-3/5 px-6 py-8 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
        <select-component @selectChange="handleSelectType" :type="type" :messages="messages" :index="index" />
        <textarea-component @textChange="handleTextChange" :text="text" class="mt-6" />
        <div class="mt-8">
          <div class="action-button rounded-md shadow">
            <a 
              @click="updateBookingStatus(booking.bookId, 'inProgress')"
              :href="getWhatsAppLink" 
              :class="['flex items-center justify-center w-full px-5 py-3 text-base font-medium text-green-600 border border-green-600 bg-white rounded-md hover:bg-green-200 transition-all']"
              target="_blank">
                Open in
                <span class="w-6 h-6 ml-2">
                  <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path
                      d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                    />
                  </svg>
                </span>
              </a>
          </div>
        </div>
      </div>
      <div v-else-if="booking.status === 'inProgress'" class="lg:w-3/5 px-6 py-8 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
        <div class="flex justify-end" title="Cancel">
          <span @click="updateBookingStatus(booking.bookId, 'todo')" class="cursor-pointer">
            <svg width="24" height="24" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24">
              <path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/>
            </svg>
          </span>
        </div>
        <div class="flex flex-1 flex-col justify-center">
          <div class="m-16">
            <h1 class="mb-4 text-lg font-medium leading-6 text-gray-900">Message successfully sent ?</h1>
            <h2 class="text-sm text-gray-500">A successfull sending will update the Arrival time section.</h2>
          </div>
          <div class="flex justify-around flex-wrap mb-4">
            <div @click="updateBookingStatusAndType(booking.bookId, 'error', 'email')" class="cursor-pointer flex items-center justify-center border border-red-500 text-red-500 bg-white hover:bg-red-100 rounded-full w-20 h-20" title="Fail">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M5 14h-5v-12h5v12zm18.875-4.809c0-.646-.555-1.32-1.688-1.41-.695-.055-.868-.623-.031-.812.701-.159 1.098-.652 1.098-1.181 0-.629-.559-1.309-1.826-1.543-.766-.141-.842-.891-.031-.953.688-.053.96-.291.96-.626-.001-.931-1.654-2.666-4.852-2.666-4.16 0-6.123 2.067-10.505 2.768v10.878c2.375.869 4.466 2.644 5.688 6.886.478 1.661.781 3.468 2.374 3.468 2.375 0 2.594-5.125 1.688-8.781 1.312-.688 3.751-.936 4.979-.885 1.771.072 2.271-.818 2.271-1.49 0-1.011-.833-1.35-1.354-1.51-.609-.188-.889-.807-.031-.922.836-.112 1.26-.656 1.26-1.221z"/>
              </svg>
            </div>
            <div @click="updateBookingStatusAndType(booking.bookId, 'done', 'whatsapp')" class="cursor-pointer flex items-center justify-center text-green-500 border border-green-500 bg-white hover:bg-green-100 rounded-full w-20 h-20" title="Success">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M5 22h-5v-12h5v12zm17.615-8.412c-.857-.115-.578-.734.031-.922.521-.16 1.354-.5 1.354-1.51 0-.672-.5-1.562-2.271-1.49-1.228.05-3.666-.198-4.979-.885.906-3.656.688-8.781-1.688-8.781-1.594 0-1.896 1.807-2.375 3.469-1.221 4.242-3.312 6.017-5.687 6.885v10.878c4.382.701 6.345 2.768 10.505 2.768 3.198 0 4.852-1.735 4.852-2.666 0-.335-.272-.573-.96-.626-.811-.062-.734-.812.031-.953 1.268-.234 1.826-.914 1.826-1.543 0-.529-.396-1.022-1.098-1.181-.837-.189-.664-.757.031-.812 1.133-.09 1.688-.764 1.688-1.41 0-.565-.424-1.109-1.26-1.221z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="lg:w-3/5 px-6 py-8 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
        <div class="flex justify-end" title="Cancel">
          <span @click="updateBookingStatusAndType(booking.bookId, 'todo', 'whatsapp')" class="cursor-pointer">
            <svg width="24" height="24" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24">
              <path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/>
            </svg>
          </span>
        </div>
          <div v-if="booking.status === 'done'" class="flex flex-1 m-12 justify-center items-center">
            <div class="w-12 h-12 text-green-500">
              <svg viewBox="0 0 24 24">
                  <path fill="currentColor" d="M23 0l-4.5 16.5-6.097-5.43 5.852-6.175-7.844 5.421-5.411-1.316 18-9zm-11 12.501v5.499l2.193-3.323-2.193-2.176zm-8.698 6.825l-1.439-.507 5.701-5.215 1.436.396-5.698 5.326zm3.262 4.287l-1.323-.565 4.439-4.503 1.32.455-4.436 4.613zm-4.083.387l-1.481-.507 8-7.89 1.437.397-7.956 8z"/>
              </svg>
            </div>
          </div>
          <div v-else class="flex flex-1 m-12 justify-center items-center">
           <div>Email to send</div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["booking", "messages", "index"],
  computed: {
    bookId() {
      return this.booking.bookId
    },
    messageType() {
      return this.booking.messageType
    },
    text() {
      const { cardsInfos } = this.$store.state
      const { bookId } = this 
      if (cardsInfos[bookId]) return cardsInfos[bookId]["text"]
      return ""
    },
    type() {
      const { cardsInfos } = this.$store.state
      const { bookId } = this 
      if (cardsInfos[bookId]) return cardsInfos[bookId]["type"]
      return ""
    },
    getWhatsAppLink() {
      // There might be some reservations without phone numbers
      if (this.booking["phone"]) {
        // https://web.whatsapp.com/send?phone=whatsappphonenumber&text=urlencodedtext
        let encodedText =  encodeURI(this.text)
        return `https://web.whatsapp.com/send?phone=${this.booking.phone}&text=${encodedText}`
      }
      return "https://web.whatsapp.com/"
    }
  },
  methods: {
    ...mapActions({
      updateCardStatus: 'updateCardStatus',
      updateCardStatusAndType: 'updateCardStatusAndType',
      updateBeds24ArrivalTimeSection: 'updateBeds24ArrivalTimeSection'
    }),
    handleSelectType(value) {
      this.computeCardInfos(value)
    },
    handleTextChange(text) {
      this.$store.commit('setCardText', { bookId: this.bookId, text })
    },
    computeCardInfos(messageType) {
      const { bookId, messages, booking } = this
      const { text, type, variables } = messages.filter(message => message.type === messageType)[0]
      this.$store.commit('setCardInfos', { bookId, text, type, variables })
      this.$store.dispatch('setVariablesInText', { booking })
    },
    updateBookingStatus(bookId, status) {
      this.$store.dispatch('updateCardStatus', { bookId, status })
    },
    updateBookingStatusAndType(bookId, status, type) {
      this.$store.dispatch('updateCardStatusAndType', { bookId, status, type })
      if (status === 'done' && type === 'whatsapp') {
        this.$store.dispatch('updateBeds24ArrivalTimeSection', { bookId, previousArrivalTimeText: this.booking.arrivalTime })
      }
    }
  },
  mounted() {
    this.computeCardInfos(this.messageType)
  }
}
</script>

<style>
/* https://codepen.io/stackdiary/pen/xxPRLjV */

</style>