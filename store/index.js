import { fireDb } from '@/plugins/firebase.js'
import { collection, query, orderBy, getDocs, getDoc, doc, setDoc } from 'firebase/firestore'

export const state = () => ({
  company: {
    name: "Easy Reach",
    shortenedName: "ER"
  },
  typeFilter: "all",
  statusFilter: "all",
  // date related state
  currentDate: null,
  //bookings: data.bookings.slice(0, 1),
  bookings: {},
  lastUpdates: {},
  cardsInfos: {},
  senderName: "",
  lastSenderName: "",
  // This data will also come from the firebase store
  messages: [
    {
      type: "defaultWelcomeMessage", // type is name without space and with first word lowercase then capitalize
      name: "Default welcome message", // Entered by the customer
      variables: ["guestFirstName", "senderName", "dayOfWeek"],
      text: `Hi --guestFirstName--, this is --senderName-- from the Princes Street Hostel, I hope you are well and thanks again for booking with us. Could you please let us know what time you will be arriving on --dayOfWeek--?\n\nPlease bear in mind we are at the very top of our building and there are a quite a few steps to reach reception level.\n\nSee you soon!`
    },
    {
      type: "withArrivalTime",
      name: "With arrival time",
      variables: ["guestFirstName", "senderName", "dayOfWeek", "checkinTime" ],
      text: `Hi --guestFirstName--, this is --senderName-- from the Princes Street Hostel, I hope you are well and thanks again for booking with us. We look forward to welcoming you on --dayOfWeek-- --checkinTime--.\n\nPlease bear in mind we are at the very top of our building and there are a quite a few steps to reach reception level.\n\nSee you soon!`
    },
    {
      type: "earlyCheckin",
      name: "Early Checkin",
      variables: ["guestFirstName", "senderName", "dayOfWeek", "checkinTime" ],
      text: `Hi --guestFirstName--, this is --senderName-- from the Princes Street Hostel, I hope you are well and thanks again for booking with us. We look forward to welcoming you on --dayOfWeek-- --checkinTime--.\n\nOur official check-in time is at 3pm, however you are very welcome to leave your luggage here at reception, then you are free to explore Edinburgh!\n\nPlease bear in mind we are at the very top of our building and there are a quite a few steps to reach reception level.\n\nSee you soon!`
    },
    {
      type: "lateCheckin",
      name: "Late Checkin",
      variables: ["guestFirstName", "senderName", "roomNumber" ],
      text: `Hello --guestFirstName--, this is --senderName-- from the Princes Street Hostel.\n\nAs you are checking in at a time when the reception will be closed, I have put your key in an envelope with your name on it, next to the check out box which is located directly on your right as you walk through the front door.\n\nThe door code to enter the hostel is 2805. Your room number is --roomNumber--. Turn to your left as you walk in, go down the corridor and there you will find signs to your room. Sorry for the inconvenience and thank you for your understanding.\n\nThere are bathrooms and showers on your floor as well as next to reception if yours are busy in the morning. And please switch off any lights you switch on.\n\nFor late night food, McDonalds is open.\n\nThere is no one at reception just now (although staff is on site in case of emergency) until tomorrow morning 8.30am so just pop by to say hi!`
    },
  ]
})

export const getters = {
  apiDate(state) {
    const { currentDate } = state
    if (currentDate) {
      let timezoneOffset = currentDate.getTimezoneOffset()
      let modifiedDate = new Date(currentDate.setHours(currentDate.getHours() +  (timezoneOffset / 60))) 
      return modifiedDate.toISOString().split("T")[0].replace(/-/g,"");
    }
  },
  fireStoreDate(state) {
    const { currentDate } = state
    if (currentDate) {
      let timezoneOffset = currentDate.getTimezoneOffset()
      let modifiedDate = new Date(currentDate.setHours(currentDate.getHours() +  (timezoneOffset / 60))) 
      return  modifiedDate.toISOString().split("T")[0] 
    }
  }
}

export const mutations = {
  setCurrentDate(state, value) {
    state.currentDate = value
  },
  updateTypeFilter(state, value) {
    state.typeFilter = value
  },
  updateStatusFilter(state, value) {
    state.statusFilter = value
  },
  updateSenderName(state, value) {
    state.senderName = value
  },
  setLastSenderName(state, value) {
    state.lastSenderName = value
  },
  setCardInfos(state, { bookId, text, type, variables }) {
    state.cardsInfos = {
      ...state.cardsInfos,
      [bookId]: { text, type, variables } 
    }
  },
  setCardText(state, { bookId, text }) {
    state.cardsInfos = {
      ...state.cardsInfos,
      [bookId]: { 
        ...state.cardsInfos[bookId],
        text,
      }
    }
  },
  setCard(state, { date, bookId, key, value }) {
    const updatedBookings = state.bookings[date].map(item => {
      if (item.bookId === bookId) item[key] = value
      return item
    })
    state.bookings = {
      ...state.bookings,
      [date]: updatedBookings
    }
  },
  setBookings(state, { bookings, date}) {
    state.bookings = {
      ...state.bookings,
      [date]: bookings,
    }
  },
  setLastUpdates(state, { key, value }) {
    state.lastUpdates = {
      ...state.lastUpdates,
      [key]: value
    }
  }
}

export const actions = {
  setSenderNameInCards({ state, commit, getters, dispatch }) {
    // TODO: If there is two times the same occurrence in the text, might cause a bug.
    // Check if more than one occurence, and if so, warn the user and ask for modification beforehand
    if (state.lastSenderName) {
      Object.keys(state.cardsInfos).map(key => {
        let { text } = state.cardsInfos[key]
        let updatedText = text.replace(state.lastSenderName, state.senderName)
        commit('setCardText', { bookId: key, text: updatedText})
      })
    } else {
      Object.keys(state.cardsInfos).map(key => { 
        let booking = state.bookings[getters.apiDate].find(booking => booking.bookId === key)
        dispatch('setVariablesInText', { booking })
      });
    }
    commit('setLastSenderName', state.senderName)
  },
  setVariablesInText({ state, commit }, { booking }) {
    const { text, variables } = state.cardsInfos[booking.bookId]
    let modifiedText = text
    for (const variable of variables) {
      let replaceBy = booking[variable] ? booking[variable] : state[variable] ? state[variable] : `--${variable}--`
      modifiedText = modifiedText.replace(`--${variable}--`, replaceBy )
    }
    commit('setCardText', { bookId: booking.bookId, text: modifiedText })
  },  
  // Get data from Firestore Database
  // https://stackoverflow.com/questions/40165766/returning-promises-from-vuex-actions

  /////////////////////////////////////
  //////      COLLECTION        //////
  ///////////////////////////////////

  async loadGuestsData({ commit, getters }) {
    const q = query(collection(fireDb, `guests/${getters.apiDate}/bookings`), orderBy('guestName'))
    try {
      const querySnapshot = await getDocs(q)
      let res = []
      querySnapshot.forEach((doc) => {
        res.push(doc.data())
      });
      commit('setBookings', { bookings: res, date: getters.apiDate })
    } catch (e) {
      console.log('Error in loadGuestsData: ', e)
    }
  },
  async dateLastUpdates({ commit }) {
    const q = query(collection(fireDb, "updatedAt"))
    try {
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        commit('setLastUpdates', { key: doc.id, value: doc.data().updatedAt })
      });
    } catch (e) {
      console.log('Error in dateLastUpdates: ', e)
    }
  },
  /////////////////////////////////////
  /////////       DOC        /////////
  ///////////////////////////////////

  async dataLastUpdate({ commit, getters }) {
    const ref = doc(fireDb, `updatedAt/${getters.apiDate}`)
    try {
      const doc = await getDoc(ref)
      if (doc.exists()) {
        commit('setLastUpdates', { key: getters.apiDate, value: doc.data().updatedAt })  
      }
    } catch (e) {
      console.log('Error in dataLastUpdate: ', e)
    }
  },
  async updateCardStatus({ commit, getters }, { bookId, status }) {
    const ref = doc(fireDb, `guests/${getters.apiDate}/bookings/${bookId}`)
    try {
      await setDoc(ref, { status }, { merge: true })
      commit('setCard', { date: getters.apiDate, bookId, key: 'status', value: status })
    } catch (error) {
      console.log('Error while updating card status: ', error)
    }
  },
  async updateCardStatusAndType({ commit, getters }, { bookId, status, type }) {
    const ref = doc(fireDb, `guests/${getters.apiDate}/bookings/${bookId}`)
    try {
      await setDoc(ref, { status, type }, { merge: true })
      await commit('setCard', { date: getters.apiDate, bookId, key: 'status', value: status })
      commit('setCard', { date: getters.apiDate, bookId, key: 'type', value: type })
    } catch (error) {
      console.log('Error while updating card status and type: ', error)
    }
  },

  /////////////////////////////////////
  //////       FUNCTIONS        //////
  ///////////////////////////////////

  async writeGuestsData({ getters, dispatch }) {
    try {
      let res = await this.$axios.$get('http://localhost:5001/easy-reach-1f358/us-central1/getArrivals?date=' + getters.apiDate)
      if (res.success) {
        dispatch('dataLastUpdate')
        return res
      }
    } catch (e) {
      console.log('Error in writeGuestsData: ', error)
    }
  },
  async updateBeds24ArrivalTimeSection({ commit, getters }, { bookId, previousArrivalTimeText }) {
    try {
      let res = await this.$axios.$get('http://localhost:5001/easy-reach-1f358/us-central1/updateBeds24ArrivalTimeSection?bookId=' + bookId + '&previousArrivalTimeText=' + previousArrivalTimeText)
      if (res.success) {
        // Update store and firebase / Don't overcharge Beds24 API
        const ref = doc(fireDb, `guests/${getters.apiDate}/bookings/${bookId}`)
        try {
          await setDoc(ref, { arrivalTime: res.text }, { merge: true })
          commit('setCard', { date: getters.apiDate, bookId, key: 'arrivalTime', value: res.text })
        } catch (error) {
          console.log('Error while updating card arrival time: ', error)
        }
      }
    } catch (error) {
      console.log('Error in updateBeds24ArrivalTimeSection: ', error)
    }
  }
}


// TODO: Check all the possibilities with the arrival time, exceptions, etc...
// TODO: And list them !

// If the reservation is made with Hostel World
// You might have a number (15) that is written in the arrival time
// -> at --arrivalTime--
// --> Not so clear... Check again, or send default welcome message

// If the reservations is made with Booking
// You might have an approximate time (Approximate time of arrival: between 19:00 and 20:00) that is written is the guests comments
// -> between --arrivalTime--

// If the reservation is direct
