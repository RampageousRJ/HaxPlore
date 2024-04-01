import React, { useEffect, useState } from "react";
import "./results.css";
import IndividualRow from "../components/IndividualRow";
import { motion } from "framer-motion";
import { ClipLoader, PacmanLoader } from "react-spinners";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Ticket from "../components/Ticket";
import { IoIosCloseCircle } from "react-icons/io";
import { useSelector } from "react-redux";
import { GiConfirmed } from "react-icons/gi";

function Bookings() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.userDetails._id);
  const [showTicket, setShowTicket] = useState(false);
  const [removed, setRemoved] = useState(null);
  const [result, setResult] = useState([
    {
      name: "Swapnil",
      _id: "54",
      date: "1 2 3 4",
      slot: "24",
    },
  ]);

  // UseEffect to fetch stored details
  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      let results = await fetch(
        `http://localhost:3000/api/booking/getBookings/${userId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data = await results.json();
      if (data.error) return console.log("Error");
      let finalData = data;
      console.log(finalData);
      setResult(finalData);
      setLoading(false);
    };
    if (userId) fetchDetails();
  }, [userId]);

  const view = async (id) => {
    console.log(id);
    setLoading(true);
    const req = await fetch(
      `http://localhost:3000/api/booking/getOneBooking/${id}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await req.json();
    if (data.error) return console.log(data.error);
    console.log(data);
    setLoading(false);
    setShowTicket(data);
  };

  const remove = async (id) => {
    console.log(id);
    const req = await fetch(
      `http://localhost:3000/api/booking/cancelBooking/${id}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await req.json();
    if (data.error) console.log(data.error);
    const req2 = await fetch(
      `http://localhost:3000/api/security/get-transaction-record/${id}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data2 = await req2.json();
    if (data2.error) console.log(data2.error);
    setRemoved(data2.transactionId);

    navigate("/allBookings");
  };

  const handleClose = () => {
    setShowTicket(false);
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

  if (showTicket) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <section className="relative">
          <Ticket details={showTicket} />
          <IoIosCloseCircle
            className="absolute top-2 cursor-pointer text-white text-2xl right-2"
            onClick={handleClose}
          />
        </section>
      </div>
    );
  }

  return (
    <div className="p-6">
      <table className="w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Booking Id</th>
            <th>Date</th>
            <th>Slot</th>
            <th>View</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {result.map((result, index) => (
            <motion.tr
              key={index}
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 * index }}
            >
              <IndividualRow
                key={index}
                details={result}
                fn={view}
                fn2={remove}
              />
            </motion.tr>
          ))}
        </tbody>
      </table>
      <Button
        color="primary"
        variant="contained"
        type="submit"
        sx={{
          background: "linear-gradient(to right, #ff7e5f, #feb47b)",
          boxShadow: "0 8px 20px rgba(99, 179, 237, 0.5)",
        }}
        onClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      >
        Go Back
      </Button>
      {removed && (
        <h1 className="mt-4 text-2xl bg-orange-800">
          Refund Processed for Transaction ID: {removed} <GiConfirmed />{" "}
        </h1>
      )}
    </div>
  );
}

export default Bookings;
