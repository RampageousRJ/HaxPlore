import React, { useEffect, useState } from "react";
import bookingSvg from "../assets/White Minimalist Simple Aesthetic Name Twitter Header-4 1.svg";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import SlotAvailibilty from "../components/SlotAvailibilty";

const slots = [
  {
    slot: "8:00-9:00",
    available: 50,
    waiting: 0,
  },
  {
    slot: "9:00-10:00",
    available: 10,
    waiting: 0,
  },
  {
    slot: "10:00-11:00",
    available: 0,
    waiting: 20,
  },
];

function Booking() {
  const [dates, setDates] = useState(null);

  useEffect(() => {
    const generateDates = (currDate = "30-06-2023") => {
      // Convert DD-MM-YYYY to YYYY-MM-DD
      const [day, month, year] = currDate.split("-");
      const formattedDate = `${year}-${month}-${day}`;

      const date = new Date(formattedDate);
      const nextDate = new Date(date.getTime());
      nextDate.setDate(date.getDate() + 1);
      const next2Date = new Date(date.getTime());
      next2Date.setDate(date.getDate() + 2);
      const prevDate = new Date(date.getTime());
      prevDate.setDate(date.getDate() - 1);
      const prev2Date = new Date(date.getTime());
      prev2Date.setDate(date.getDate() - 2);
      setDates([prev2Date, prevDate, date, nextDate, next2Date]);
    };
    generateDates();
  }, []);

  const [active, setActive] = useState(2);

  const decreaseDate = (e) => {
    e.preventDefault();
    const currDates = [...dates];
    const temp = new Date(currDates.at(0));
    const prevDate = new Date(temp.getTime());
    prevDate.setDate(temp.getDate() - 1);
    currDates.pop();
    currDates.unshift(prevDate);
    setDates(currDates);
  };

  const increaseDate = (e) => {
    e.preventDefault();
    const currDates = [...dates];
    const temp = new Date(currDates.at(currDates.length - 1));
    const prevDate = new Date(temp.getTime());
    prevDate.setDate(temp.getDate() + 1);
    currDates.shift();
    currDates.push(prevDate);
    setDates(currDates);
  };

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
        className=" py-4 flex justify-center items-center overflow-x-scroll"
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
                  onClick={() => setActive(ind)}
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
              {slots.map((item, ind) => {
                const number = 20;
                let isAvailable = false;
                if (item.available - number >= 0) isAvailable = true;
                return (
                  <SlotAvailibilty
                    key={ind}
                    slotDetails={item.slot}
                    isAvailable={isAvailable}
                    number={item.waiting}
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
