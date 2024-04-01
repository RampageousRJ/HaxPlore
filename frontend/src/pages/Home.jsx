import React, { useRef } from "react";
import JaiShreeRam from "../assets/Group.svg";
import HeroSection from "../components/HeroSection";
import BookingForm from "../components/BookingForm";
import { animate, motion, useTransform } from "framer-motion";
import { useScroll, useViewportScroll } from "framer-motion";
import copyright from "../assets/Copyright © 2024 All rights reserved _ Made by MISTE.svg";
import { FaInstagram } from "react-icons/fa";
import { ImLinkedin } from "react-icons/im";
import { FaFacebook } from "react-icons/fa6";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";

function Home() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const x = useTransform(scrollYProgress, [0, 1], [0, -100]);
  return (
    <div className="min-h-screen flex flex-col items-center">
      <HeroSection />
      <section className="min-h-screen w-full bg-main-light-orange flex flex-col gap-16">
        <section
          ref={ref}
          className="flex mt-10 flex-col md:flex-row items-center justify-around p-12"
        >
          <BookingForm />
          <div className="flex justify-center items-center">
            <motion.img
              src={JaiShreeRam}
              alt="Image of Jai Shree Ram"
              style={{
                opacity: opacity,
                width: "400px",
                height: "400px",
              }}
            />
          </div>
        </section>
      </section>
      <footer
        className="flex flex-col gap-6 w-full p-10"
        style={{ color: "#4A2800", fontSize:"1.05rem", fontWeight:"600" }}
      >
        <section className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="font-extrabold text-3xl">SHRI RAM JANMABHOOMI MANDIR, AYODHYA</h1>
            <h5>Pincode : 05278</h5>
          </div>
          <div className="flex flex-col gap-2">
            <h1>Contact Us</h1>
            <div>
              <p>Mail: managment@ayodhyamadir.com</p>
              <p>Ph. No. +91 9711599906</p>
            </div>
          </div>
        </section>
        <section className="flex justify-between items-center">
          <div className="px-4 py-2 rounded-lg text-2xl flex gap-4" style={{
            backgroundColor:"#FF8900"
          }}>
            <FaFacebook className=" text-white" />
            <FaInstagram className=" text-white" />
            <ImLinkedin className=" text-white" />
          </div>
          <img src={copyright} style={{width:"350px"}} />
        </section>
      </footer>
    </div>
  );
}

export default Home;
