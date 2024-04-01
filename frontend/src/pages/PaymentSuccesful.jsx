import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PaymentSuccesful() {
  const bookingID = useSelector((state) => state.bookings.bookingDetails._id);
  const navigate=useNavigate()
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const transactionId = urlParams.get("session_id");
    const saveInBlockChain = async () => {
      console.log("Hello",bookingID,transactionId);
      const req = await fetch(`http://localhost:3000/api/security/store-transaction-records`, {
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
      console.log(res);
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
