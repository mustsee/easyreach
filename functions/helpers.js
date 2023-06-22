module.exports = {
  capitalizeFirstLetter: (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  getDayOfWeek: (dateInString) => {
    let date = new Date(dateInString)
    let dayOfWeek = date.getDay()
    return module.exports.nameDayOfWeek(dayOfWeek)
  },
  nameDayOfWeek: (number) => {
    if (number === 0) return 'Sunday'
    else if (number === 1) return 'Monday'
    else if (number === 2) return 'Tuesday'
    else if (number === 3) return 'Wednesday'
    else if (number === 4) return 'Thursday'
    else if (number === 5) return 'Friday'
    else return 'Saturday'
  },
  getCheckinTime: (guestComments, referer) => {
    if (referer === "Booking.com") {
      if (guestComments.includes("Approximate time of arrival")) {
        // 'Approximate time of arrival: between 21:00 and 22:00'
        let time = guestComments.split('between')
        if (time[1]) {
          return 'between' + time[1].slice(0, 16)
        }
        return null
      }
    }
    return null
  },
  getMessageType: (guestComments, referer, guestPhone, guestEmail) => {
    const { messageTypes } = module.exports
    const hasPhone = !!(guestPhone && guestPhone != '0')
    if (!hasPhone && !guestEmail) return messageTypes.other
    if (!hasPhone) return messageTypes.emailMessage
    const hasArrivalTime = module.exports.getCheckinTime(guestComments, referer)
    if (!hasArrivalTime) return messageTypes.defaultWelcomeMessage
    // 'Approximate time of arrival: between 21:00 and 22:00'
    // -> 21
    // Make the intervals modifiable
    const from = parseInt(hasArrivalTime.split(' and ')[0].slice(-5, -3));
    if (!isNaN(from) && from >= 8 && from < 15) return messageTypes.earlyCheckin
    else if (!isNaN(from) && from >= 15 && from < 23) return messageTypes.withArrivalTime
    else if (!isNaN(from) && ((from === 23) || (from >= 0 && from < 8))) return messageTypes.lateCheckin
    else return messageTypes.defaultWelcomeMessage 
  },
  // The room number for a group reservation can be wrong
  getRoomNumber: (roomId, unitId) => {
    const roomType = module.exports.roomIds[roomId]
    if (!roomType.private && !roomType.unique) {
      const roomKey = Math.ceil(unitId / roomType.beds)
      return roomType[roomKey]
    } else if (roomType.unique){
      return roomType["1"]
    } else {
      return roomType[unitId]
    }
  },

  // 22/06/2023
  /*
  Name	              Room id
  10 BED	            333607	
  4 BED	              337837	
  6 BED	              337835	
  6 BED Female Only	  333594	
  8 BED	              333605	
  DOUBLE ROOM	        333604	
  Private 12 BED	    333608	
  Private 4 BEDS	    347674	
  Private 9 Beds	    344335	
  TWIN ROOM - BUNK	  423937	
  */
  roomIds: {
    423937: { // TWIN ROOM - BUNK // OK
      private: true,
      unique: true,
      1: 35,
    },
    337837: { // 4 beds // OK
      private: false,
      unique: true,
      1: 31,
    },
    337835: { // 6 beds // OK
      private: false,
      unique: false,
      beds: 6, 
      1: 34,
      2: 36,
      3: 41,
    },
    333604: { // Double rooms // OK
      private: true,
      unique: false,
      1: 33,
      2: 44,
      3: 45,
      4: 46,
    },
    333594: { // 6 beds female only // OK
      private: false,
      unique: true,  
      1: 32,
    },
    333605: { // 8 beds // OK
      1: 38,
      private: false,
      unique: true,  
    }, 
    333607: { // 10 beds // OK
      1: 37,
      private: false,
      unique: true,  
    }, 
    347674: { // Private 4 beds // OK
      private: true,
      unique: false,
      1: 43,
      2: 12,
      3: 13
    }, 
    344335: { // Private 9 beds // OK
      private: true,
      unique: true,
      1: 15,
    },
    333608: { // Private 12 beds // OK
      private: true,
      unique: true,
      1: 11,
    }, 
  },
  messageTypes: {
    defaultWelcomeMessage: "defaultWelcomeMessage", 
    withArrivalTime: "withArrivalTime", 
    earlyCheckin: "earlyCheckin",
    lateCheckin: "lateCheckin",
    emailMessage: "emailMessage",
    other: "other" // User has no phone and no email (VIP/family...)
  },
}