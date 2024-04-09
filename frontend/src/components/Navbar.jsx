import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOutSuccess } from "../features/userSlice";
import { bookingSuccess } from "../features/bookingSlice";
import Logo from "../assets/Logo.png";
import toast from 'react-hot-toast'

function Navbar() {
  const user = useSelector((state) => state.user.userDetails);

  const [text, setText] = useState("Login");
  const [link, setLink] = useState("/signin");
  const navigate = useNavigate();
  const dispath = useDispatch();

  useEffect(() => {
    const fn1 = () => {
      if (user) {
        setText("Logout");
        setLink("/signout");
      } else {
        setText("Login");
        setLink("/signin");
      }
    };
    fn1();
  }, [user]);

  const handleClick = async (e) => {
    if (link === "/signin") return navigate("/signin");
    let url = "http://localhost:3000/api/auth/signout";
    const req = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await req.json();
    if (data.error) {
      toast.error("Error in Logout")
      return console.log(data.error);
    }
    dispath(bookingSuccess());
    dispath(signOutSuccess());
    toast.success("Logged Out Successfully")
    navigate("/");
  };
  return (
    <div className="w-full py-2 flex justify-between md:justify-around items-center">
      <div className="text-2xl text-white">
        <img src={Logo} width={"100px"} height={"100px"} />
      </div>
      <nav className="flex items-center justify-between gap-12 md:gap-32 ">
        <Link to={"/"} className="text-white text-xl hover:text-slate-300">
          Home
        </Link>
        <Link
          to={"/allBookings"}
          className="text-white text-xl hover:text-slate-300"
        >
          Bookings
        </Link>
        <Link
          to={"/contact"}
          className="text-white text-xl hover:text-slate-300"
        >
          Contact Us
        </Link>
      </nav>
      <div className="flex justify-center items-center">
        <Button
          onClick={handleClick}
          color="warning"
          variant="faded"
          className=" text-main-btn-text"
        >
          {text}
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
