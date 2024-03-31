import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookingDetailsUpdate } from "../features/bookingSlice.js";
import { useNavigate } from "react-router-dom";

function SlotAvailibilty(props) {
  const fn = props.fn;
  const fn2 = props.fn2;
  const { slot, isDisabled, waiting } = props.slotDetails;
  const available = props.isAvailable;
  const date = props.date;

  const colorCoding = available ? "success" : "warning";
  const text = available ? "Available" : `Waiting (${waiting})`;

  const [details, setDetails] = useState(null);
  const [shouldDispatch, setShouldDispatch] = useState(false);
  const bookingDetails = useSelector((state) => state.bookings.bookingDetails);
  const dispatch = useDispatch();
  const navigate=useNavigate();

  useEffect(() => {
    setDetails(null);
    fn2();
  }, [date]);

  useEffect(() => {
    const disableEntries = () => {
      if (!details) return;
      fn(slot);
    };
    disableEntries();
  }, [details]);

  useEffect(() => {
    const updateState = () => {
      if (details) {
        console.log(details);
        dispatch(bookingDetailsUpdate({ ...bookingDetails, ...details }));
        navigate("/")
      }
    };
    updateState();
  }, [shouldDispatch]);

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.checked,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    setDetails({
      ...details,
      ["slot"]: slot,
      ["date"]: date.toISOString().split("T")[0].split("-").reverse().join("-"),
    });
    setShouldDispatch(true);
  };

  return (
    <div className="flex items-center py-8 px-5 border-b-2 justify-around gap-12">
      <h1 className="text-xl font-semibold" style={{ color: "#A6A5A5" }}>
        {slot}
      </h1>
      <div>
        <h4 style={{ color: "#A6A5A5", marginBottom: "5px" }}>
          Select Add-ons
        </h4>
        <section className="flex gap-3 items-center">
          <div className="flex items-center justify-center gap-1">
            <input
              type="checkbox"
              name="wheelchair"
              disabled={isDisabled}
              value={details?.wheelchair || false}
              id="wheelchair"
              checked={details?.wheelchair ?? false}
              onChange={handleChange}
            />
            <label htmlFor="wheelchair" className="text-xs">
              Wheelchair Assistance
            </label>
          </div>
          <div className="flex items-center justify-center gap-1">
            <input
              type="checkbox"
              name="anna"
              disabled={isDisabled}
              value={details?.anna || false}
              checked={details?.anna || false}
              id="anna"
              onChange={handleChange}
            />
            <label htmlFor="anna" className="text-xs">
              Anna Seva
            </label>
          </div>
          <div className="flex items-center justify-center gap-1">
            <input
              type="checkbox"
              name="aarti"
              disabled={isDisabled}
              value={details?.aarti || false}
              checked={details?.aarti || false}
              id="aarti"
              onChange={handleChange}
            />
            <label htmlFor="aarti" className="text-xs">
              Aarti Seva
            </label>
          </div>
          <div className="flex items-center justify-center gap-1">
            <input
              type="checkbox"
              name="darshan"
              disabled={isDisabled}
              value={details?.darshan || false}
              checked={details?.darshan || false}
              id="darshan"
              onChange={handleChange}
            />
            <label htmlFor="darshan" className="text-xs">
              Priority Darshan
            </label>
          </div>
        </section>
      </div>
      <Button
        isDisabled={isDisabled}
        color={colorCoding}
        variant="solid"
        onClick={handleClick}
        className="py-4 w-36 text-white font-semibold cursor-pointer"
      >
        {text}
      </Button>
    </div>
  );
}

export default SlotAvailibilty;
