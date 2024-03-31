import { Alert, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function OTPVerification() {
  const [formData, setFormData] = useState(null);
  const [OTPRecieved, setOTPRecieved] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setError(null);
    setLoading(false);
    setFormData(null);
  }, []);

  const getOTP = async () => {
    console.log(formData.email);
    if (!formData.email) return;
    const req = await fetch("http://localhost:3000/api/auth/forgotPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
      }),
    });
    setOTPRecieved(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    console.log(formData.OTP);
    const req = await fetch(
      "http://localhost:3000/api/booking/newBooking/66072c68de6394ca03c34a32",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData.OTP),
      }
    );
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        onSubmit={handleSubmit}
        className="flex w-96 shadow-2xl p-12 rounded-2xl flex-col items-center gap-8"
      >
        <h1 className="text-2xl text-blue-400 font-bold uppercase">
          Verify OTP
        </h1>
        <i>Enter the code sent to your email</i>
        <section className="flex items-center space-x-2">
          {/* Adjust spacing between elements */}
          <TextField
            variant="standard"
            size="small"
            placeholder="Enter Email for OTP..."
            name="email"
            id="email"
            color="primary"
            className="flex-grow"
            value={formData?.email || ""}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            disabled={OTPRecieved}
            type="button"
            name="otp-btn"
            color="primary"
            sx={{
              fontSize: "10px",
            }}
            onClick={getOTP}
          >
            Get OTP
          </Button>
        </section>

        <TextField
          variant="standard"
          size="small"
          placeholder="Enter OTP..."
          name="OTP"
          id="OTP"
          required
          color="primary"
          className="w-full"
          onChange={handleChange}
          value={formData?.OTP || ""}
        />
        <Button
          disabled={!OTPRecieved}
          variant="contained"
          type="submit"
          name="otp-btn"
          color="primary"
          fullWidth={true}
        >
          Reset Password
        </Button>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <Link to={"/signin"} className=" text-teal-500 self-start">
          Sign In
        </Link>
      </motion.form>
    </div>
  );
}

export default OTPVerification;
