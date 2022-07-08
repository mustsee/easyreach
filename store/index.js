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
      variables: { 1: "guestFirstName", 2: "staffName", 3: "dayOfWeek" },
      text: `Hi --1--, this is --2--, from the Princes Street Hostel, I hope you are well and thanks again for booking with us. Could you please let us know what time you will be arriving on --3--?\n\nPlease bear in mind we are at the very top of our building and there are a quite a few steps to reach reception level.\n\nSee you soon!`
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
      text: `Hi --1--, this is --2-- from the Princes Street Hostel, I hope you are well and thanks again for booking with us. We look forward to welcoming you on --3-- --4--.\n\nOur official check-in time is at 3pm, however you are very welcome to leave your luggage here at reception, then you are free to explore Edinburgh!\n\nPlease bear in mind we are at the very top of our building and there are a quite a few steps to reach reception level.\n\nSee you soon!`
    },
    {
      type: "lateCheckin",
      name: "Late Checkin",
      variables: { 1: "guestFirstName", 2: "staffName", 3: "roomNumber" },
      text: `Hello --1--, this is --2-- from the Princes Street Hostel.\n\nAs you are checking in at a time when the reception will be closed, I have put your key in an envelope with your name on it, next to the check out box which is located directly on your right as you walk through the front door.\n\nThe door code to enter the hostel is 2805. Your room number is --3--. Turn to your left as you walk in, go down the corridor and there you will find signs to your room. Sorry for the inconvenience and thank you for your understanding.\n\nThere are bathrooms and showers on your floor as well as next to reception if yours are busy in the morning. And please switch off any lights you switch on.\n\nFor late night food, McDonalds is open.\n\nThere is no one at reception just now (although staff is on site in case of emergency) until tomorrow morning 8.30am so just pop by to say hi!`
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
