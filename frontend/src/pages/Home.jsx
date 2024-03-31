import React, { useRef } from "react";
import JaiShreeRam from "../assets/Group.svg";
import HeroSection from "../components/HeroSection";
import BookingForm from "../components/BookingForm";
import { animate, motion, useTransform } from "framer-motion";
import { useScroll, useViewportScroll } from "framer-motion";

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
          <motion.div transition={{delay: 0.3, duration: 0.5}} style={{ x: x, opacity: opacity }}>
            <BookingForm />
          </motion.div>
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
    </div>
  );
}

export default Home;
