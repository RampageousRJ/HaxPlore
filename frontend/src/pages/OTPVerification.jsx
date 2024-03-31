import { Alert, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function OTPVerification() {
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setError(null);
    setLoading(false);
    setFormData(null);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (formData.OTP !== "Chutiya".toLocaleLowerCase())
      return setError("Invalid OTP");
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        onSubmit={handleSubmit}
        className="flex max-h-96 w-96 shadow-2xl p-12 rounded-2xl flex-col items-center gap-8"
      >
        <h1 className="text-2xl text-blue-400 font-bold uppercase">
          Verify OTP
        </h1>
        <i>Enter the code sent to your email</i>
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
        />
        <Button
          variant="contained"
          isLoading={loading}
          type="submit"
          name="otp-btn"
          color="primary"
          fullWidth={true}
        >
          Reset Password
        </Button>
        {error && <Alert severity="error">{error}</Alert>}
      </motion.form>
    </div>
  );
}

export default OTPVerification;
