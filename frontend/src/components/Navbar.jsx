import {Button} from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="w-full py-8 px-2 flex justify-between md:justify-around items-center">
      <div className="text-2xl text-white">NamasteAyodhya</div>
      <nav className="flex items-center justify-between gap-12 md:gap-32 ">
        <Link to={"/"} className="text-white text-xl hover:text-slate-300">
          Home
        </Link>
        <Link
          to={"/Booking"}
          className="text-white text-xl hover:text-slate-300"
        >
          Booking
        </Link>
        <Link
          to={"/contact"}
          className="text-white text-xl hover:text-slate-300"
        >
          Contact Us
        </Link>
      </nav>
      <div className="flex justify-center items-center">
      <Button color="warning" variant="faded" className=" text-main-btn-text">
        Login
      </Button> 
      </div>
    </div>
  );
}

export default Navbar;
