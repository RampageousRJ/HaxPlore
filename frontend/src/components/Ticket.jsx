import React from "react";
import darshan from "../assets/Chipdarshan.svg";
import anna from "../assets/Chipanna.svg";
import aarti from "../assets/Chipaarti.svg";
import wheelchair from "../assets/Chipwheelchair.svg";

const Ticket = () => {
  return (
    <div className="flex flex-col rounded-lg shadow-md">
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
          <p className="text-white">8:00 AM - 10:00 AM</p>
          <p className="text-white">WED, JAN 4 </p>
        </div>
      </section>
      <div className="px-4 flex flex-col">
        <section className="flex items-center justify-between px-2 py-2">
          <div className="flex flex-col gap-1 items-center">
            <h3 className="text-md font-semibold self-start text-ticket-orange">
              Booking ID
            </h3>
            <p className="text-md font-semibold self-start">1876542</p>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <h3 className="text-md font-semibold self-end text-ticket-orange">
              Booking ID
            </h3>
            <p className="text-md font-semibold self-end">1876542</p>
          </div>
        </section>
        <hr className="w-full h-2 font-bold self-center" />
        <section className="flex items-center justify-between px-2 py-2">
          <div className="flex flex-col gap-1 items-center">
            <h3 className="text-md font-semibold self-start text-ticket-orange">
              Booking ID
            </h3>
            <p className="text-md font-semibold self-start">1876542</p>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <h3 className="text-md font-semibold self-end text-ticket-orange">
              Booking ID
            </h3>
            <p className="text-md font-semibold self-end">1876542</p>
          </div>
        </section>
        <section
          id="svgs"
          className="flex gap-5 py-3 justify-center flex-wrap items-center"
        >
          <img src={darshan} alt="darshan availed confirmation" />
          <img src={anna} alt="anna availed confirmation" />
          <img src={aarti} alt="aarti availed confirmation" />
          <img src={wheelchair} alt="wheelchair availed confirmation" />
        </section>
        <hr class="border-t border-dashed border-gray-400 h-0" />
        <section className="flex justify-between px-2 items-center py-3">
          <img
            src="data:image/png;base64,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"
            alt="QR Code"
          />
          <div className="flex flex-col gap-0 ">
            <h2 className="text-md text-ticket-orange ">
              Booking in the name of
            </h2>
            <h1 className="text-xl font-extrabold">Mr. Swapnil Jha</h1>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Ticket;
