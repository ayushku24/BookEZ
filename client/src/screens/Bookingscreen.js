import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import Error from "../components/Error";
import moment from "moment";
import Swal from "sweetalert2";

import StripeCheckout from "react-stripe-checkout";

function Bookingscreen() {
  let { roomid, fromDate, toDate } = useParams();

  const [loading, setloading] = useState(true); //true becaz whenevr the componet is rendered we should set loading true
  const [error, seterror] = useState();
  const [room, setroom] = useState();

  const firstdate = moment(fromDate, "DD-MM-YYYY");
  const lastdate = moment(toDate, "DD-MM-YYYY");

  const totaldays = moment.duration(lastdate.diff(firstdate)).asDays() + 1;

  const [totalamount, settotalamount] = useState();

  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const data = (
          await axios.post("/api/rooms/getallroombyid", { roomid: roomid })
        ).data;
        settotalamount(data.rentperday * totaldays);
        setroom(data);
        setloading(false);
      } catch (error) {
        seterror(true);

        setloading(false);
      }
    };

    fetchData();
  }, []);

  async function onToken(token) {
    const bookingDetails = {
      room,
      userid: user.data._id,
      fromDate,
      toDate,
      totalamount,
      totaldays,
      token,
    };

    try {
      setloading(true);
      const result = await axios.post("/api/bookings/bookroom", bookingDetails);
      setloading(false);
      Swal.fire("Congratulations", "Your Room Booked Successfully", "success");
    } catch (error) {
      setloading(false);
      Swal.fire("Sorry", "Something went wrong", "error");
      console.log(error);
    }

    // Swal.fire("Congratulations", "Your Room Booked Successfully", "success");
  }

  return (
    <div className="m-5">
      {loading ? (
        <h1>
          <Loading />
        </h1>
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-10 bs">
            <div className="col-md-6">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} className="bigimg" />
            </div>
            <div className="col-md-6">
              <div className="sec-1" style={{ textAlign: "right" }}>
                <b>
                  <h1>Booking Details</h1>
                  <hr />
                  <p>Name : {user.data.name} </p>
                  <p>From Date : {fromDate}</p>
                  <p>To Date : {toDate}</p>
                  <p>Max Count : {room.maxcount}</p>
                </b>
              </div>

              <div className="sec-2" style={{ textAlign: "right" }}>
                <b>
                  <h1>Amount</h1>
                  <hr />
                  <p>Total Days : {totaldays}</p>
                  <p>Rent per Day : {room.rentperday}</p>
                  <p>Total Amount : {totalamount}</p>
                </b>
              </div>

              <div style={{ float: "right" }}>
                <StripeCheckout
                  amount={totalamount * 100}
                  token={onToken}
                  currency="INR"
                  stripeKey="pk_test_51NUrg4SByzrsgMahz0nzX0ZSLHAXgPmsrrwvTJT8ALPY9Wy3LzzlWPu9DEh08OuPIxh1iEJOr2T67hlTEpH0Azfm00gcMxoXrt"
                >
                  <button className="btn btn-primary">Pay Now</button>
                </StripeCheckout>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>
          <Error />
        </h1>
      )}
    </div>
  );
}

export default Bookingscreen;
