import { Alert, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function ForgotPassword() {
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setError(false);
    setLoading(false);
    setFormData(null);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    if (formData.newPassword !== formData.confirmPassword)
      return setError("Passwords do not match");
    const req = await fetch("http://localhost:3000/api/auth/forgotPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <motion.form
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        onSubmit={handleSubmit}
        className="flex min-h-96 w-96 shadow-2xl p-12 rounded-2xl flex-col justify-around items-center gap-8"
      >
        <h1 className="text-2xl text-orange-700 font-bold uppercase">
          Password Reset
        </h1>
        <TextField
          size="small"
          placeholder="Enter new password.."
          label="New Password"
          name="newPassword"
          id="newPassword"
          required
          color="warning"
          className="w-full"
          onChange={handleChange}
        />
        <TextField
          size="small"
          label="Confirm New Password"
          placeholder="Confirm new password.."
          name="confirmPassword"
          id="confirmPassword"
          required
          color="warning"
          className="w-full"
          onChange={handleChange}
        />
        <Button
          variant="contained"
          isLoading={loading}
          type="submit"
          name="reset-btn"
          color="warning"
          fullWidth={true}
        >
          Reset Password
        </Button>
        {error && <Alert severity="error">{error}</Alert>}
      </motion.form>
    </div>
  );
}

export default ForgotPassword;
