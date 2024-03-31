import React from "react";
import Ticket from "../components/Ticket";
import bookingSvg from "../assets/White Minimalist Simple Aesthetic Name Twitter Header-4 1.svg";
import payButton from "../assets/Rectangle 8button.svg";
import { Button } from "@nextui-org/react";

function PaymentConfirmation() {
  const handleClick = (e) => {};

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
        className="flex py-10 px-48 justify-center gap-40 items-center"
        style={{ backgroundColor: "#F3F2F3 " }}
      >
        <Ticket />
        <section className="flex flex-col gap-2 min-w-72 text-gray-checkout">
          <h1 className="text-xl font-bold text-black">Bill details</h1>
          <section className="py-6 flex flex-col gap-3">
            <div className="flex justify-between items-center ">
              <p>Adult Pass x 3</p>
              <p>$200</p>
            </div>
            <div className="flex justify-between items-center ">
              <p>Adult Pass x 3</p>
              <p>$200</p>
            </div>
            <div className="flex justify-between items-center ">
              <p>Adult Pass x 3</p>
              <p>$200</p>
            </div>
          </section>
          <hr className="h-0 border-2 border-black" />
          <div className="flex justify-between items-center font-bold text-black ">
            <p>To Pay</p>
            <p>$1000</p>
          </div>
          <Button color="warning" onClick={handleClick}>
            Procced to Pay
          </Button>
        </section>
      </section>
    </div>
  );
}

export default PaymentConfirmation;
