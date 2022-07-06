export const state = () => ({
  company: {
    name: "Easy Reach",
    shortenedName: "ER"
  },
  // This data will also come from the firebase store
  messages: [
    {
      type: "defaultWelcomeMessage", // type is name without space and with first word lowercase then capitalize
      name: "Default welcome message", // Entered by the customer
      variables: { 1: "guestFirstName", 2: "staffName" },
      text: `Hi --1--, this is --2--, from the Princes Street Hostel, I hope you are well and thanks again for booking with us. Could you please let us know what time you will be arriving tomorrow?\n\nPlease bear in mind we are at the very top of our building and there are a quite a few steps to reach reception level.\n\nSee you soon!`
    },
    {
      type: "withArrivalTime",
      name: "With arrival time",
      variables: { 1: "guestFirstName", 2: "staffName", 3: "dayOfWeek", 4: "checkinTime" },
      text: `Hi --1--, this is --2-- from the Princes Street Hostel, I hope you are well and thanks again for booking with us. We look forward to welcoming you on --3-- --4--.\n\nPlease bear in mind we are at the very top of our building and there are a quite a few steps to reach reception level.\n\nSee you soon!`
    },
    {
      type: "earlyCheckin",
      name: "Early Checkin",
      variables: { 1: "guestFirstName", 2: "staffName", 3: "dayOfWeek", 4: "checkinTime" },
      text: `Hi --1--, this is --2-- from the Princes Street Hostel, I hope you are well and thanks again for booking with us. We look forward to welcoming you on --3-- --4--. Our official check-in time is at 3pm, however you are very welcome to leave your luggage here at reception, then you are free to explore Edinburgh!\n\nPlease bear in mind we are at the very top of our building and there are a quite a few steps to reach reception level.\n\nSee you soon!`
    },
  ]
})

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
