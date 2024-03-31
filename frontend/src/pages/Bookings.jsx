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

function Bookings() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.userDetails._id);
  const [showTicket, setShowTicket] = useState(false);
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
        `http://localhost:3000/api/booking/getBookings/${userId}`
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
    setLoading(true);
    const req = await fetch(
      `http://localhost:3000/api/booking/getOneBooking/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await req.json();
    if (data.error) console.log(data.error);
    else setShowTicket(data);
  };

  const remove = async (id) => {
    const req = await fetch(
      `http://localhost:3000/api/booking/cancelBooking/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await req.json();
    if (data.error) console.log(data.error);
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
            className="absolute top-2 right-2"
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
              transition={{ duration: 1.5, delay: 0.35 * index }}
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
        <Button
          color="primary"
          variant="contained"
          type="submit"
          sx={{
            background: "linear-gradient(to right, #4fd1c5, #3b82f6);",
            boxShadow: "0 8px 20px rgba(99, 179, 237, 0.5)",
          }}
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          Go Back
        </Button>
      </table>
    </div>
  );
}

export default Bookings;
