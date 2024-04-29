const mongoose = require("mongoose");

var mongoURL =
  "mongodb+srv://kritikanc2003:3NdwZHEYe5RAVHpy@cluster0.kf61r2l.mongodb.net/room-data";

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var connection = mongoose.connection;

connection.on("error", () => {
  console.log("Mongo DB connection failed");
});

connection.on("connected", () => {
  console.log("Mongo DB connection successful");
});

module.exports = mongoose;
