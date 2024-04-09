import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function PaymentFailed() {
  const navigate = useNavigate();

  useEffect(() => {
    const handlePaymentFailed = () => {
      toast.error("Booking Failed");
      navigate("/paymentDetails");
    };
    handlePaymentFailed();
  }, []);
  return (
    <div className=" min-h-screen flex justify-center items-center">
      <h1 className="text-3xl text-full">Payment Failed</h1>
    </div>
  );
}

export default PaymentFailed;
