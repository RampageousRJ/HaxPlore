import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { bookingDetailsUpdate } from "../features/bookingSlice.js";

function PaymentSuccesful() {
  const bookingID = useSelector((state) => state.bookings.bookingDetails._id);
  const userId = useSelector((state) => state.user.userDetails._id);
  const bookingDetails = useSelector((state) => state.bookings.bookingDetails);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  
  useEffect(() => {
    const newBooking = async () => {
      const req = await fetch(
        `http://localhost:3000/api/booking/newBooking/${userId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...bookingDetails }),
        }
      );

      const data = await req.json();
      if (data.error) return toast.error(data.error);
      toast.success("Booking Confirmed")
      dispatch(bookingDetailsUpdate(data));
    };
    if (userId) newBooking();
  }, [userId]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const transactionId = urlParams.get("session_id");
    const saveInBlockChain = async () => {
      console.log("Hello",bookingID,transactionId);
      const req = await fetch(`http://localhost:3000/api/booking/store-transaction-records`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId: bookingID,
          transactionId: transactionId,
        }),
      });
      const res = await req.json();
      if(res.error)
        toast.error("Could not submit to Blockchain")
      if(res.success)
        toast.success("Transaction Submitted Successfully to blockchain")
      navigate("/")
    };
    if (bookingID) saveInBlockChain();
  }, [bookingID]);
  return (
    <div className=" min-h-screen flex justify-center items-center">
      <h1 className="text-3xl text-available">Payment Successful </h1>
    </div>
  );
}

export default PaymentSuccesful;
