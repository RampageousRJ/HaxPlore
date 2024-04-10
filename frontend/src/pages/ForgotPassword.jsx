import { Alert, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userID = useSelector((state) => state?.user?.userDetails?._id ?? "");

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
    setLoading(true);
    if (formData.newPassword !== formData.confirmPassword)
      return setError("Passwords do not match");
    console.log(formData, userID);
    const res = await fetch(
      `http://localhost:3000/api/forgot-password/set-newPassword/${userID}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        }),
      }
    );
    const data = await res.json();
    if (data.error) return toast.error(data.error);
    toast.success("Password Successfully Reset");
    navigate("/signin");
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
          type="password"
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
          type="password"
          required
          color="warning"
          className="w-full"
          onChange={handleChange}
        />
        <Button
          variant="contained"
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
