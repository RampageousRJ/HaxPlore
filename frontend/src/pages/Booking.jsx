import React, { useEffect, useState } from "react";
import { ClipLoader, PacmanLoader } from "react-spinners";
import bookingSvg from "../assets/White Minimalist Simple Aesthetic Name Twitter Header-4 1.svg";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import SlotAvailibilty from "../components/SlotAvailibilty";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { useSocketContext } from "../context/SocketContext";

function Booking() {
  const [dates, setDates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(null);
  const { socket } = useSocketContext();
  const [change, setChange] = useState("false");
  let currDate = useSelector((state) => state.bookings.bookingDetails.date);
  const number = useSelector((state) => state.bookings.bookingDetails.visitors);

  const [slots, setSlots] = useState(null);
  useEffect(() => {
    console.log(socket);
    let cDate = "";
    let m_date = new Date(date);
    console.log("ndate:", m_date);
    const day = m_date.getDate();
    const month = m_date.getMonth() + 1; // Months are zero-based, so we add 1
    const year = m_date.getFullYear();

    // Pad day and month with leading zeros if necessary
    const formattedDay = String(day).padStart(2, "0");
    const formattedMonth = String(month).padStart(2, "0");

    // Format the date string as dd-mm-yyyy
    const p_Date = `${formattedDay}-${formattedMonth}-${year}`;
    console.log("pDate:", p_Date);
    socket?.on("updatedBooking", (currentBooking) => {
      /*if (p_Date.split("-")[0].length > 2) {
        // console.log(currDate);
        const [day, month, year] = p_Date.split("-");
        const formattedDate = `${year}-${month}-${day}`;
        cDate = formattedDate;
      }else{
        cDate=p_Date
      }*/
      console.log("Compare", p_Date, currentBooking.date);
      if (p_Date === currentBooking.date) {
        console.log("Message Received!");
        console.log("socket:", currentBooking);
        setChange((prev) => !prev);
      }
    });
    return () => socket?.off("updatedBooking");
  }, [socket, slots, setSlots, date]);

  useEffect(() => {
    const generateDates = () => {
      // Convert DD-MM-YYYY to YYYY-MM-DD
      setLoading(true);
      if (currDate.split("-")[0].length <= 2) {
        // console.log(currDate);
        const [day, month, year] = currDate.split("-");
        const formattedDate = `${year}-${month}-${day}`;
        currDate = formattedDate;
      }
      const date = new Date(currDate);
      const nextDate = new Date(date.getTime());
      nextDate.setDate(date.getDate() + 1);
      const next2Date = new Date(date.getTime());
      next2Date.setDate(date.getDate() + 2);
      const prevDate = new Date(date.getTime());
      prevDate.setDate(date.getDate() - 1);
      const prev2Date = new Date(date.getTime());
      prev2Date.setDate(date.getDate() - 2);
      setDates([prev2Date, prevDate, date, nextDate, next2Date]);
      setLoading(false);
    };
    const setFirstTime = () => {
      console.log(currDate);
      setDate(currDate);
    };
    if (currDate) {
      generateDates();
      setFirstTime();
    }
  }, [currDate]);

  useEffect(() => {
    const retrieveData = async () => {
      setLoading(true);
      if (currDate.split("-")[0].length > 2) {
        // console.log(currDate);
        const [year, month, day] = currDate.split("-");
        const formattedDate = `${day}-${month}-${year}`;
        currDate = formattedDate;
      }
      console.log(date);
      let n_date = new Date(date);
      console.log("ndate:", n_date);
      const day = n_date.getDate();
      const month = n_date.getMonth() + 1; // Months are zero-based, so we add 1
      const year = n_date.getFullYear();

      // Pad day and month with leading zeros if necessary
      const formattedDay = String(day).padStart(2, "0");
      const formattedMonth = String(month).padStart(2, "0");

      // Format the date string as dd-mm-yyyy
      const passDate = `${formattedDay}-${formattedMonth}-${year}`;
      console.log("pass:", passDate);
      const req = await fetch(
        `http://localhost:3000/api/booking/getBookedSlots/${passDate}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await req.json();
      console.log(data);
      setSlots(data);
      setLoading(false);
    };
    if (date) retrieveData();
  }, [date, change, setChange]);

  const [active, setActive] = useState(2);

  const decreaseDate = (e) => {
    setLoading(true);
    const currDates = [...dates];
    const temp = new Date(currDates.at(0));
    const prevDate = new Date(temp.getTime());
    prevDate.setDate(temp.getDate() - 1);
    currDates.pop();
    currDates.unshift(prevDate);
    setDates(currDates);
    setLoading(false);
  };

  const increaseDate = (e) => {
    setLoading(true);
    const currDates = [...dates];
    const temp = new Date(currDates.at(currDates.length - 1));
    const prevDate = new Date(temp.getTime());
    prevDate.setDate(temp.getDate() + 1);
    currDates.shift();
    currDates.push(prevDate);
    setDates(currDates);
    setLoading(false);
  };

  // Function to make not selected items disabled
  const fn1 = (slot) => {
    const tempSlots = [...slots];
    tempSlots.map((item, ind) => {
      if (item.slot !== slot) {
        item.isDisabled = true;
      }
    });
    setSlots(tempSlots);
  };

  // Function to clear disabled feature for all
  const fn2 = () => {
    const tempSlots = [...slots];
    tempSlots.map((item) => (item.isDisabled = false));
    setSlots(tempSlots);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col gap-3 justify-center items-center ">
        <ClipLoader
          color={"teal"}
          loading={loading}
          size={70}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="w-full border-b-2 relative">
        <img src={bookingSvg} alt="" className="w-full h-24" />
        <h1
          style={{ color: "#A65C06" }}
          className="w-full font-bold absolute bottom-3 text-center"
        >
          SHRI RAM JANMABHOOMI MANDIR, AYODHYA
        </h1>
      </div>
      <section
        id="date-section"
        className=" py-4 flex justify-center items-center"
      >
        <div className="w-1/4 flex gap-4 items-center justify-center">
          <IoIosArrowBack
            cursor={"pointer"}
            size={"40px"}
            onClick={decreaseDate}
            color="#C0BFBF"
          />
          {dates &&
            dates.map((item, ind) => {
              let textcolor = ind == active ? "white" : "#A6A5A5";
              let backgroundColor = ind == active ? "#E78B53" : "white";
              const [day, month, date] = item.toString().split(" ");
              return (
                <div
                  key={ind}
                  className="px-2 flex flex-col text-center rounded-xl cursor-pointer"
                  style={{
                    color: textcolor,
                    backgroundColor: backgroundColor,
                  }}
                  onClick={() => {
                    setDate(dates[ind]);
                    setActive(ind);
                  }}
                >
                  <i>{day}</i>
                  <strong>{date}</strong>
                  <p>{month}</p>
                </div>
              );
            })}
          <IoIosArrowForward
            cursor={"pointer"}
            size={"40px"}
            color="#C0BFBF"
            onClick={increaseDate}
          />
        </div>
      </section>
      {/* Section to show availibilities */}
      <section
        className="w-full flex justify-center items-center p-10 "
        style={{ backgroundColor: "#F3F2F3" }}
      >
        <div className="bg-white text-sm">
          <section className="pt-3 pb-1.5 pl-10 flex gap-8 border-b-2 mb-2">
            <p>ANNA SEVA : INR 500</p>
            <p>AARTI SEVA : INR 200</p>
            <p>PRIORITY DARSHAN : INR 400(PER PERSON)</p>
          </section>
          <section className="py-4 flex ">
            <div className=" mx-auto flex flex-col gap-2 px-10">
              {slots &&
                slots.map((item, ind) => {
                  let isAvailable = false;
                  // console.log(item.available, Number(number), item);
                  if (20 - item.available - Number(number) >= 0)
                    isAvailable = true;
                  return (
                    <SlotAvailibilty
                      key={ind}
                      slotDetails={item}
                      isAvailable={isAvailable}
                      fn={fn1}
                      fn2={fn2}
                      date={dates?.[active] || 2}
                    />
                  );
                })}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

export default Booking;
