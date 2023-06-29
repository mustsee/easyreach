const functions = require("firebase-functions");
const firestore = require("firebase-admin/firestore"); 
const { initializeApp } = require('firebase-admin/app');
const nodemailer = require('nodemailer');
const axios = require("axios");
const cors = require("cors")({ origin: true });

/* 
  firebase emulators:export <export-directory>
  firebase emulators:start --import <export-directory>
*/

require('dotenv').config()
//console.log(process.env)
// Without the dotenv package, it doesn't work ? It seems like it works

let firebaseConfig;
if (process.env.NODE_ENV !== "production") {
  firebaseConfig = require("./../firebase.config.prod");
} else {
  firebaseConfig = require("./../firebase.config.prod");
}

const app = initializeApp(firebaseConfig)
const db = firestore.getFirestore(app)

const helpers = require("./helpers");

const API_KEY_BEDS24 = process.env.BEDS24APIKEY;
const PSH_KEY = process.env.BEDS24PROPKEY
const API_URL = 'https://api.beds24.com/json/'
const getBookingsUrl = 'getBookings'
const setBookingUrl = 'setBooking'

exports.updateBeds24ArrivalTimeSection = functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    const { bookId, previousArrivalTimeText, type } = request.query

    const fullText = (type === 'whatsapp' ? 'whatsapp message OK - ' : 'emailed OK - ') + previousArrivalTimeText // Not to overwrite previous guest arrival time message

    const dataSetBooking = (bookId) => {
      return {
        "authentication": {
          "apiKey": API_KEY_BEDS24,
          "propKey": PSH_KEY
        },
        "bookId": bookId,
        "guestArrivalTime": fullText 
      }
    }

    try {
      const setBooking = await axios({
        method: 'post',
        url: API_URL + setBookingUrl,
        data: dataSetBooking(bookId),
      })
      if (setBooking.data.success) {
        response.json({ success: true, text: fullText })
      } else {
        functions.logger.error(`Error in setBooking ${error}`)
        response.json({ success: false })
      }
    } catch (error) {
      functions.logger.error(`Error in updateBeds24ArrivalTimeSection ${error}`)
      response.json({success: false, error })
    }
  })
})

exports.getArrivals = functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    const { date, updateData } = request.query
    const dataGetBookings = {
        "authentication": {
          "apiKey": API_KEY_BEDS24,
          "propKey": PSH_KEY
        },
        "includeInvoice": false,
        "includeInfoItems": false,
        "arrivalFrom": date,
        "arrivalTo": date
    }
    try {
        const getBookings = await axios({
            method: 'post',
            url: API_URL + getBookingsUrl,
            data: dataGetBookings,
        })
        /********************************
        ***** Booking status values *****
        *********************************
        0 = Cancelled
        1 = Confirmed
        2 = New (same as confirmed but unread)
        3 = Request
        4 = Black
        ********************************/

        /* const debug = getBookings.data.filter(booking => {
          if (booking.status == 1 || booking.status == 2) return true
        }).map(booking => {
          const { bookId, firstNight, guestFirstName, guestName, guestEmail, guestPhone, guestMobile, guestArrivalTime, notes, message, guestComments, guestCountry, referer, roomId, unitId, masterId, group } = booking
          return {
            bookId, firstNight, guestFirstName, guestName, guestEmail, guestPhone, guestMobile, guestArrivalTime, notes, message, guestComments, guestCountry, referer, roomId, unitId, masterId, group
          }
        })
        return response.json({ success: true, length: getBookings.data.length, bookings: debug }) */

        const computedBookings = getBookings.data.filter(booking => {
            if (booking.status == 1 || booking.status == 2) return true
        }).map(booking => {
            const { bookId, firstNight, guestFirstName, guestName, guestEmail, guestPhone, guestMobile, guestArrivalTime, notes, message, guestComments, guestCountry, referer, roomId, unitId, masterId, group } = booking
            return {
              bookId,
              firstNight,
              dayOfWeek: helpers.getDayOfWeek(firstNight),
              guestFirstName: helpers.capitalizeFirstLetter(guestFirstName),
              guestName: guestName,
              name: guestFirstName + ' ' + guestName,
              email: guestEmail,
              phone: guestPhone, // They use this phone number
              mobile: guestMobile, // Probably note used
              arrivalTime: guestArrivalTime, // They modify this column
              checkinTime: helpers.getCheckinTime(guestComments, referer),
              messageType: helpers.getMessageType(guestComments, referer, guestPhone, guestEmail),
              notes, // Probably not used // Sometimes it is used
              message, // Probably not used
              //guestCommentsModified: guestComments.replaceAll('\n', '<br />'),
              guestCommentsModified: guestComments.replaceAll(new RegExp('\r?\n','g'), '<br />'),
              guestComments: guestComments, // Might be the arrival time from Booking.com : 'Approximate time of arrival: between 15:00 and 16:00'
              guestCountry, // Might help to find the prefix - Check how does booking.com - There is also guestCountry2 in uppercase
              referer,
              roomId, 
              unitId,
              roomNumber: helpers.getRoomNumber(roomId, unitId) ? helpers.getRoomNumber(roomId, unitId) : "--roomNumber--", // With roomId and UnitId we can know the room number
              groupReservation: masterId ? true : false,
              isMasterReservation: !!(masterId && masterId === bookId),
              // +1 is for the master booking
              personsInGroup: masterId === bookId ? (Object.keys(group).length + 1) : null,
            }
        }).filter(booking => {
            const { groupReservation, isMasterReservation } = booking
            if (!groupReservation) return true
            else if (isMasterReservation) return true
            return false
        })
        // Click on button - NO DATA
        if (!updateData) {
          let addStatusAndTypeBookings = computedBookings.map(item => {
            return {
              ...item,
              // TODO: handle below case
              // We could the type only if the status in not done
              status: item.messageType === 'other' ? 'other' : 'todo', // todo/inProgress(clicked on link)/done/other(!phone && !mail)
              // Might change if updated...
              type: item.messageType === 'other' ? 'other' : item.messageType === 'emailMessage' ? 'email' : 'whatsapp', // whatsapp/email/other => should be an interface
            }
          })
          addStatusAndTypeBookings.forEach(async (element) => {
            await db.collection('guests').doc(date).collection('bookings').doc(element.bookId).set(element);
          });
          // Click on refresh button - some data already present
        } else {
          // Delete docs not in the new list
          let newBookingIds = computedBookings.map(item => item.bookId)
          db.collection(`guests/${date}/bookings`).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              let { bookId } = doc.data()
              if (!newBookingIds.includes(bookId)) {
                db.collection('guests').doc(date).collection('bookings').doc(bookId).delete();
              }
            });
          })
          // Merge new data with old custom data : status and type
          computedBookings.forEach(async (element) => {
            await db.collection('guests').doc(date).collection('bookings').doc(element.bookId).set(element, { merge: true });
          });
        }
        await db.collection('updatedAt').doc(date).set({ updatedAt: firestore.Timestamp.now() })
        response.json({ success: true, length: computedBookings.length })
    } catch (error) {
        functions.logger.error(`Error in getArrivals ${error}`)
        response.json({ success: false, error })
    }
  })
})

// Be aware that Gmail has an email sending quota (up to 500 a day)
// If you are planning on sending a large number of emails 
// you should use a professional email sending platform such as Sendgrid, Mailjet or Mailgun.

// https://stackoverflow.com/questions/45478293/username-and-password-not-accepted-when-using-nodemailer

exports.sendEmail = functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    const { guestEmail, text } = request.query

    const mailTransport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const APP_NAME = 'Princes Street Hostel';

    const mailOptions = {
      from: `${APP_NAME} <noreply@firebase.com>`,
      to: 'thomas.sypniewski+test@gmail.com', // guestEmail
      attachments: [{
        filename: 'psh_logo.png',
        path: '../static/images/psh_logo.png',
        cid: 'unique@kreata.ee'
      }]
    }

    const modifiedText = JSON.parse(text).replaceAll('\n', '<br/>')

    mailOptions.subject = `${APP_NAME} - Your arrival time and contact number`;

    mailOptions.html = `
    <p>${modifiedText}</p>
    <p></p>
    <p>
      <div>
        <img src="cid:unique@kreata.ee"alt="Logo Princes Street Hostel" width="96" height="96" />
      </div>
      <br/>
      <div>Princes Street Hostel</div>
      <div>5 West Register Street</div>
      <div>+44 (0)131 556 6894</div>
      <div>
        <a href="https://princesstreethostel.com">
          princesstreethostel.com
        </a>
      </div>
    </p>
    `
    

    try {
      await mailTransport.sendMail(mailOptions)
      response.json({ success: true })
    } catch (error) {
      functions.logger.error('Error in sendEmail: ', error)
      response.json({ success: false, error })
    }
  })
})