import React, { useState, useEffect } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { FaRobot } from "react-icons/fa";

function ChatBot() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen((prev) => !prev);
  };

  // Adding fixed positioning with Tailwind CSS classes
  const chatBotClasses = open
    ? "fixed bottom-5 right-5"
    : "fixed bottom-5 right-5";

  if (open) {
    return (
      <section
        className={`${chatBotClasses} shadow-custom-orange p-6 max-w-sm rounded-lg border border-gray-200 bg-white`}
      >
        <div className="relative">
          <FaRegWindowClose
            onClick={handleClose}
            className="absolute -top-6 -right-6 cursor-pointer text-black text-3xl"
          />
          <iframe
            allow="microphone;"
            width="350"
            style={{
              borderRadius: "20% 0%",
              minHeight: "450px",
            }}
            src="https://console.dialogflow.com/api-client/demo/embedded/a0a798b8-690f-453b-84cb-e28f30ca0f46"
          ></iframe>
                  
        </div>
      </section>
    );
  } else {
    return (
      <div
        className={`${chatBotClasses} rounded-full flex justify-center items-center bg-orange-600 text-white w-16 h-16`}
      >
        <FaRobot className="text-3xl cursor-pointer" onClick={handleClose} />
      </div>
    );
  }
}

export default ChatBot;
