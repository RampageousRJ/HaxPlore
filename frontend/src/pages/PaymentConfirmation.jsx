import React, { useEffect, useState } from "react";
import Ticket from "../components/Ticket";
import bookingSvg from "../assets/White Minimalist Simple Aesthetic Name Twitter Header-4 1.svg";
import { Button } from "@nextui-org/react";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader, PacmanLoader } from "react-spinners";
import { bookingDetailsUpdate } from "../features/bookingSlice";
import toast from "react-hot-toast";

function PaymentConfirmation() {
  const bookingDetails = useSelector((state) => state.bookings.bookingDetails);
  const [loading, setLoading] = useState(false);
  const [everything, setEverything] = useState(null);
  console.log(bookingDetails.visitors);

  useEffect(() => {
    const newBooking = async () => {
      console.log(bookingDetails);
      const wheelCost = bookingDetails.wheelchair ? parseInt(250) : 0;
      const annaCost = bookingDetails.anna
        ? parseInt(500) * parseInt(bookingDetails.visitors)
        : 0;
      const aartilCost = bookingDetails.aarti ? parseInt(200) : 0;
      const darshanCost = bookingDetails.darshan
        ? parseInt(400) * parseInt(bookingDetails.visitors)
        : 0;
      const infantsCost = parseInt(500) * parseInt(bookingDetails.infants);
      const seniorsCost = parseInt(500) * parseInt(bookingDetails.seniors);
      const amount =
        parseInt(1000) *
          (parseInt(bookingDetails.visitors) -
            (parseInt(bookingDetails.infants) +
              parseInt(bookingDetails.seniors))) +
        infantsCost +
        seniorsCost +
        wheelCost +
        aartilCost +
        annaCost +
        darshanCost;
      console.log("Amount: ", amount);
      setEverything({ ...bookingDetails, amount: amount });
    };
    if (bookingDetails) newBooking();
  }, [bookingDetails]);

  const handleClick = async (e) => {
    const items = [
      {
        name: "bill",
        price: everything.amount,
        qnty: 1,
      },
    ];
    {
      /* import.meta.env.STRIPE_PUBLISHABLE_KEY */
    }
    const stripe = await loadStripe(
      "pk_test_51OzkIrSDUKDjRLRHQYHYyVY6t2XwGI82VMIMiewZjDUErzCuIYOoZXkoSerqvbxsDoJkDgSfZoS7UoNCze3Ut2ZO00bFdwLV18"
    );
    const req = await fetch(
      "http://localhost:3000/api/payment/create-checkout-session",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(items),
      }
    );
    const session = await req.json();
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
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

  if (everything) {
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
          className="flex flex-col lg:flex-row py-10 px-48 justify-center gap-40 items-center"
          style={{ backgroundColor: "#F3F2F3 " }}
        >
          <Ticket />
          <section className="flex flex-col gap-2 min-w-72 text-gray-checkout">
            <h1 className="text-xl font-bold text-black">Bill details</h1>
            <section className="py-6 flex flex-col gap-3">
              <div className="flex justify-between items-center ">
                <p>
                  Adult Pass x{" "}
                  {everything.visitors -
                    everything.infants -
                    everything.seniors}
                </p>
                <p>
                  Rs.
                  {(everything.visitors -
                    everything.infants -
                    everything.seniors) *
                    500}
                </p>
              </div>
              <div className="flex justify-between items-center ">
                <p>Child Pass x {everything.infants}</p>
                <p>Rs.{everything.infants * 500}</p>
              </div>
              <div className="flex justify-between items-center ">
                <p>Old Age Pass x {everything.seniors}</p>
                <p>Rs.{everything.seniors * 500}</p>
              </div>
            </section>
            <hr className="h-0 border-2 border-black" />
            <div className="flex justify-between items-center font-bold text-black ">
              <p>To Pay</p>
              <p>{everything.amount}</p>
            </div>
            <Button color="warning" onClick={handleClick}>
              Procced to Pay
            </Button>
          </section>
        </section>
      </div>
    );
  }
}

export default PaymentConfirmation;
