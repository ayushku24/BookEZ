const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const moment = require("moment");
const Room = require("../models/room");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51NUrg4SByzrsgMah7lp5a2YkRNyWFJVvh0O1lH7uyYLa0ovTOrGM9Ya4c2nevI1qptRdF6yJfkDY0djxI77GepjJ00g8SnKZkU"
);

router.post("/bookroom", async (req, res) => {
  const { room, userid, fromDate, toDate, totalamount, totaldays, token } =
    req.body;


  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const payment = await stripe.paymentIntents.create(
      {
        amount: totalamount * 100,
        customer: customer.id,
        currency: "inr",
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );
      console.log(payment?true:false)
    // if (true) {
     
        // create model
        const newbooking = new Booking({
          room: room.name,
          roomid: room._id,
          userid,
          fromDate,
          toDate,
          totalamount,
          totaldays,
          transactionid: "1234",
        });

        const booking = await newbooking.save();
        // update current bookings array in room.js
        const roomtemp = await Room.findOne({ _id: room._id });
        // // console.log(roomtemp);

        roomtemp.currentbookings.push({
          name: booking.name,
          bookingid: booking._id,
          fromDate: fromDate,
          toDate: toDate,
          userid: userid,
          status: booking.status,
        });
        currentbookings = [];

        await roomtemp.save();

        res.send("Room booked successfully");
      
    // }
    res.send("Payment Successfully , Your room is booked");
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
