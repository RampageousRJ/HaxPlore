import { Button } from "@nextui-org/react";
import React from "react";

function SlotAvailibilty(props) {
  const slot = props.slotDetails;
  const available = props.isAvailable;
  const number = props.number;
  const colorCoding = available ? "success" : "warning";
  const text = available ? "Available" : `Waiting (${number})`;
  return (
    <div className="flex items-center py-8 px-5 border-b-2 justify-around gap-12">
      <h1 className="text-xl font-semibold" style={{ color: "#A6A5A5" }}>
        {slot}
      </h1>
      <div>
        <h4 style={{ color: "#A6A5A5",marginBottom:"5px" }}>Select Add-ons</h4>
        <section className="flex gap-3 items-center">
          <div className="flex items-center justify-center gap-1">
            <input type="radio" name="wheelchair" id="wheelchair" />
            <label htmlFor="wheelchair" className="text-xs">Wheelchair Assistance</label>
          </div>
          <div className="flex items-center justify-center gap-1">
            <input type="radio" name="anna" id="anna" />
            <label htmlFor="anna" className="text-xs">Anna Seva</label>
          </div>
          <div className="flex items-center justify-center gap-1">
            <input type="radio" name="aarti" id="aarti" />
            <label htmlFor="aarti" className="text-xs">Aarti Seva</label>
          </div>
          <div className="flex items-center justify-center gap-1">
            <input type="radio" name="darshan" id="darshan" />
            <label htmlFor="darshan" className="text-xs">Priority Darshan</label>
          </div>
        </section>
      </div>
      <Button color={colorCoding} variant="solid" className="py-4 w-36 text-white font-semibold">
        {text}
      </Button>
    </div>
  );
}

export default SlotAvailibilty;
