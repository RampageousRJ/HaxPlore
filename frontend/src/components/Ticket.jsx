import React from "react";
import darshanIcon from "../assets/Chipdarshan.svg";
import annaIcon from "../assets/Chipanna.svg";
import aartiIcon from "../assets/Chipaarti.svg";
import wheelchairIcon from "../assets/Chipwheelchair.svg";
import { useDispatch, useSelector } from "react-redux";

const Ticket = (props) => {
  const dispatch = useDispatch();
  const {
    date,
    slot,
    _id,
    visitors,
    infants,
    seniors,
    name,
    QRCode,
    anna,
    aarti,
    darshan,
    wheelchair,
  } =
    props.details ||
    useSelector((state) => state.bookings.bookingDetails) ||
    {};

  return (
    <div className="flex flex-col rounded-lg shadow-md min-w-96">
      <section className="bg-ticket-orange rounded-t-lg rounded-b-3xl pb-4 flex flex-col">
        <div className="w-full h-20 shadow-2xl" />
        <div className="flex flex-col gap-1 px-4 py-5">
          <h1 className="text-2xl text-white moul-regular space-x-1">
            SHRI RAM
          </h1>
          <h1 className="text-2xl text-white moul-regular space-x-1">
            JANMABHOOMI
          </h1>
          <h1 className="text-2xl text-white moul-regular space-x-1">MANDIR</h1>
          <p className="text-white font-thin">AYODHYA</p>
        </div>
        <hr className="text-white h-2 w-2/3 self-center opacity-60" />
        <div className="flex justify-between py-2 px-3">
          <p className="text-white">{slot}</p>
          <p className="text-white">{date}</p>
        </div>
      </section>
      <div className="px-4 flex flex-col">
        <section className="flex items-center justify-between px-2 py-2">
          <div className="flex flex-col gap-1 items-center">
            <h3 className="text-md font-semibold self-start text-ticket-orange">
              Booking ID
            </h3>
            <p className="text-md font-semibold self-start">
              {_id || "id after payment"}
            </p>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <h3 className="text-md font-semibold self-end text-ticket-orange">
              No. of Visitors
            </h3>
            <p className="text-md font-semibold self-end">{visitors}</p>
          </div>
        </section>
        <hr className="w-full h-2 font-bold self-center" />
        <section className="flex items-center justify-between px-2 py-2">
          <div className="flex flex-col gap-1 items-center">
            <h3 className="text-md font-semibold self-start text-ticket-orange">
              No. of Senior Citizens
            </h3>
            <p className="text-md font-semibold self-start">{seniors}</p>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <h3 className="text-md font-semibold self-end text-ticket-orange">
              No. of Children
            </h3>
            <p className="text-md font-semibold self-end">{infants}</p>
          </div>
        </section>
        <section
          id="svgs"
          className="flex gap-5 py-3 justify-center flex-wrap items-center"
        >
          {darshan && <img src={darshanIcon} alt="darshan availed confirmation" />}
          {anna && <img src={annaIcon} alt="anna availed confirmation" />}
          {aarti && <img src={aartiIcon} alt="anna availed confirmation" />}
          {wheelchair && (
            <img src={wheelchairIcon} alt="wheelchair availed confirmation" />
          )}
        </section>
        <hr className="border-t border-dashed border-gray-400 h-0" />
        <section className="flex justify-between px-2 items-center py-3">
          {QRCode && <img src={QRCode} alt="QR Code" />}
          <div className="flex flex-col gap-0 ">
            <h2 className="text-md text-ticket-orange ">
              Booking in the name of
            </h2>
            <h1 className="text-xl font-extrabold">{name}</h1>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Ticket;
