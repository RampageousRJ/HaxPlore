import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOutSuccess } from "../features/userSlice";
import { bookingSuccess } from "../features/bookingSlice";
import Logo from "../assets/Logo.png";
import toast from "react-hot-toast";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { IoCloseOutline } from "react-icons/io5";

function Navbar(props) {
  const scrollIntoView = props.scrollIntoView;
  const user = useSelector((state) => state.user.userDetails);

  const [text, setText] = useState("Login");
  const [link, setLink] = useState("/signin");
  const [openNavbar, setOpenNavbar] = useState(false);

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
      toast.error("Error in Logout");
      return console.log(data.error);
    }
    dispath(bookingSuccess());
    dispath(signOutSuccess());
    toast.success("Logged Out Successfully");
    navigate("/");
  };
  return (
    <div className="relative w-full py-2 flex justify-around items-center">
      <div className="text-2xl text-white">
        <img src={Logo} width={"100px"} height={"100px"} />
      </div>
      {/* Navbar Desktop */}
      <nav className="hidden md:flex items-center justify-between gap-5 md:gap-32 ">
        <Link to={"/"} className="text-white md:text-xl hover:text-slate-300">
          Home
        </Link>
        <Link
          to={"/allBookings"}
          className="text-white md:text-xl hover:text-slate-300"
        >
          Bookings
        </Link>
        <Link
          onClick={() => scrollIntoView()}
          className="text-white md:text-xl hover:text-slate-300"
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
      <HiMiniBars3BottomRight
        className="text-3xl cursor-pointer md:hidden text-white"
        onClick={() => setOpenNavbar((prev) => !prev)}
      />
      {openNavbar && (
        <>
          <div className=" md:hidden bg-glass-effect backdrop-blur-glass-effect shadow-xl rounded-lg pb-6 px-10 absolute right-4 top-20">
            <IoCloseOutline
              className="text-2xl text-white cursor-pointer relative left-20 top-2"
              onClick={() => setOpenNavbar((prev) => !prev)}
            />
            <nav className="flex flex-col items-center justify-between gap-7">
              <Link
                to={"/"}
                className="text-white md:text-xl hover:text-slate-300"
              >
                Home
              </Link>
              <Link
                to={"/allBookings"}
                className="text-white md:text-xl hover:text-slate-300"
              >
                Bookings
              </Link>
              <Link
                onClick={() => scrollIntoView()}
                className="text-white md:text-xl hover:text-slate-300"
              >
                Contact Us
              </Link>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;
