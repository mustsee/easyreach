import data from "@/assets/data/beds24-API.js"

export const state = () => ({
  company: {
    name: "Izy Rich",
    shortenedName: "IR"
  },
  bookings: data.bookings.slice(0,6),
  cardsInfos: {},
  senderName: "",
  lastSenderName: "",
  // This data will also come from the firebase store
  messages: [
    {
      type: "defaultWelcomeMessage", // type is name without space and with first word lowercase then capitalize
      name: "Default welcome message", // Entered by the customer
      variables: ["guestFirstName", "senderName", "dayOfWeek"],
      text: `Hi --guestFirstName--, this is --senderName--, from the Princes Street Hostel, I hope you are well and thanks again for booking with us. Could you please let us know what time you will be arriving on --dayOfWeek--?\n\nPlease bear in mind we are at the very top of our building and there are a quite a few steps to reach reception level.\n\nSee you soon!`
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

export const mutations = {
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
  }
}

export const actions = {
  setSenderNameInCards({ state, commit, dispatch }) {
    if (state.lastSenderName) {
      Object.keys(state.cardsInfos).map(key => {
        let { text } = state.cardsInfos[key]
        let updatedText = text.replace(state.lastSenderName, state.senderName)
        commit('setCardText', { bookId: key, text: updatedText})
      })
    } else {
      Object.keys(state.cardsInfos).map(key => { 
        let booking = state.bookings.find(booking => booking.bookId === key)
        dispatch('setVariablesInText', { booking })
      });
      commit('setLastSenderName', state.senderName)
    }
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
