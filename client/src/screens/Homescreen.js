import React, { useEffect, useState } from "react";
import { DatePicker, Space } from "antd";
import axios from "axios";
import Room from "../components/Room";
import Loading from "../components/Loading";
import Error from "../components/Error";
import moment from "moment"; //for simple display of dates for calculation

import "antd/dist/reset.css";

function Homescreen() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState();

  const [fromDate, setfromDate] = useState();
  const [toDate, settoDate] = useState();
  const [duplicaterooms, setduplicaterooms] = useState([]);

  const { RangePicker } = DatePicker;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const data = (await axios.get("/api/rooms/getallrooms")).data;
        setrooms(data);
        setduplicaterooms(data);
        setloading(false);
        console.log(data);
      } catch (error) {
        seterror(true);
        console.log(error);
        setloading(false);
      }
    };

    fetchData();
  }, []);

  const filterByDate = (dates) => {
    const from = dates[0].format("DD-MM-YYYY");
    const to = dates[1].format("DD-MM-YYYY");

    setfromDate(from);
    settoDate(to);

    var tempRooms = [];

    for (const room of duplicaterooms) {
      var availability = false;

      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          //check between or equal to dates
          if (
            !moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
              booking.fromDate,
              booking.toDate
            ) &&
            !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
              booking.fromDate,
              booking.toDate
            )
          ) {
            if (
              dates[0].format("DD-MM-YYYY") !== booking.fromDate &&
              dates[0].format("DD-MM-YYYY") !== booking.toDate &&
              dates[1].format("DD-MM-YYYY") !== booking.fromDate &&
              dates[1].format("DD-MM-YYYY") !== booking.toDate
            ) {
              availability = true;
            }
          }
        }
      } else {
        availability = true;
      }

      if (availability === true) {
        tempRooms.push(room);
      }
    }

    setrooms(tempRooms);
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>
      </div>

      <div className="row justify-content-center mt-5 mb-5">
        {loading ? (
          <h1>
            <Loading />
          </h1>
        ) : rooms.length > 1 ? (
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-2 mb-2">
                <Room room={room} fromDate={fromDate} toDate={toDate} />
              </div>
            );
          })
        ) : (
          <h1>
            <Error />
          </h1>
        )}
      </div>
    </div>
  );
}

export default Homescreen;
