import React from "react";
import Navbar from "./Navbar";
import mandir from "../assets/Mandir.svg";
import mandala from "../assets/mandala.svg";
import { animate, motion } from "framer-motion";

function HeroSection(props) {

  const scrollIntoView=props.scrollIntoView
  return (
    <main className=" bg-custom-gradient-mobile md:bg-custom-gradient w-full h-unit-8xl md:h-screen relative overflow-hidden">
      <div className="w-full flex justify-center absolute -bottom-24 md:top-48">
        <motion.img
          src={mandala}
          alt="mandala image"
          className="w-2/3"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 * 100 }} // Rotate 100 times to minimize the restart effect
          transition={{
            duration: 15 * 100, // Adjust duration accordingly to keep the speed constant
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
      <Navbar scrollIntoView={scrollIntoView} />
      <div className="w-full h-2/3 flex text-center">
        <h2 className="text-xl md:text-4xl w-full text-white self-center">
          SHRI RAM JANMABHOOMI MANDIR, AYODHYA
        </h2>
      </div>
      <div className="w-full flex justify-center absolute bottom-1 md:bottom-5">
        <img src={mandir} alt="mandir image" className="w-full md:w-2/3" />
      </div>
    </main>
  );
}

export default HeroSection;