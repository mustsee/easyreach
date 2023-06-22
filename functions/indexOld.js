const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const axios = require("axios");

const beds24URL = "https://api.beds24.com/json/getBookings";
const beds24ApiKey = process.env.BEDS24APIKEY;
const beds24PropKey = process.env.BEDS24PROPKEY;

const getBookings = async (date) => {
  let auth = {
    authentication: { apiKey: beds24ApiKey, propKey: beds24PropKey },
    arrivalFrom: date ? date : "20230303",
    arrivalTo: date ? date : "20230303",
  };

  const res = await axios.post(beds24URL, auth);
  return res.data;
};

exports.getArrivals = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { date, updateData } = req.query;
    const bookings = await getBookings();
    // Update in DB
    res.send({
      success: true,
      length: bookings.length,
    });
  });
});
