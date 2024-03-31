import React, { useEffect, useState } from "react";
import { ClipLoader, PacmanLoader } from "react-spinners";
import bookingSvg from "../assets/White Minimalist Simple Aesthetic Name Twitter Header-4 1.svg";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import SlotAvailibilty from "../components/SlotAvailibilty";

function Booking() {
  const [dates, setDates] = useState(null);
  const [loading,setLoading]=useState(false);

  const [slots, setSlots] = useState([
    {
      slot: "8:00-9:00",
      available: 50,
      waiting: 0,
      isDisabled: false,
    },
    {
      slot: "9:00-10:00",
      available: 10,
      waiting: 0,
      isDisabled: false,
    },
    {
      slot: "10:00-11:00",
      available: 0,
      waiting: 20,
      isDisabled: false,
    },
  ]);

  useEffect(() => {
    const generateDates = (currDate = "30-06-2023") => {
      // Convert DD-MM-YYYY to YYYY-MM-DD
      setLoading(true)
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
      setLoading(false)
    };
    generateDates();
  }, []);

  const [active, setActive] = useState(2);

  const decreaseDate = (e) => {
    setLoading(true)
    const currDates = [...dates];
    const temp = new Date(currDates.at(0));
    const prevDate = new Date(temp.getTime());
    prevDate.setDate(temp.getDate() - 1);
    currDates.pop();
    currDates.unshift(prevDate);
    setDates(currDates);
    setLoading(false)
  };

  const increaseDate = (e) => {
    setLoading(true)
    const currDates = [...dates];
    const temp = new Date(currDates.at(currDates.length - 1));
    const prevDate = new Date(temp.getTime());
    prevDate.setDate(temp.getDate() + 1);
    currDates.shift();
    currDates.push(prevDate);
    setDates(currDates);
    setLoading(false)
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
    tempSlots.map((item) => item.isDisabled = false);
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
