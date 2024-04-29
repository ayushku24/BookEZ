const express = require("express");
const cors = require("cors")

const app = express();
const dbConfig = require("./db");
const roomsRoute = require("./routes/roomsRoute");
const usersRoute = require("./routes/userRoute");
const bookingsRoute = require("./routes/bookingsRoute")

app.use(cors())

app.use(express.json()); //to receive parameter for book room by id
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);
app.use("/api/bookings", bookingsRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on Port ${port}`));
