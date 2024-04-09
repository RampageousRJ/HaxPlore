import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  reload,
  signInFailure,
  signInStart,
  signInSuccess,
} from "../features/userSlice.js";
import OAuth from "../components/OAuth";
import toast from "react-hot-toast";

function SignIn() {
  useEffect(() => {
    dispatch(reload());
  }, []);

  const userState = useSelector((state) => state.user);
  const [formData, setFormData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // To navigate to homme upon succes in signin

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      dispatch(signInStart());
      const req = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // HTTP only handles text data
      });
      const data = await req.json();
      if (data.error) {
        dispatch(signInFailure(data.error));
        toast.error(data.error);
        return;
      } else {
        dispatch(signInSuccess(data.user));
        setFormData(null);
        toast.success("Successfull Sign In");
        navigate("/");
        return;
      }
    } catch (e) {
      setFormData(null);
      dispatch(signInFailure(e));
      toast.error(e);
      navigate("/");
      return;
    }
  };

  const handleChange = (e) => {
    const input = e.target.id;
    const val = e.target.value.trim();
    const temp = { ...formData, [input]: val };
    setFormData(temp);
  };

  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="flex flex-col gap-4 shadow-2xl rounded-xl p-10">
        <form
          action=""
          method="POST"
          className="flex flex-col gap-5"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl text-orange-800 font-medium self-center">
            SIGN IN
          </h1>
          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            autoComplete="current-email"
            variant="standard"
            color="warning"
            value={formData?.email || ""}
            helperText="We'll never share your email."
            onChange={handleChange}
            sx={{
              width: "300px",
            }}
          />
          <TextField
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            color="warning"
            value={formData?.password || ""}
            required={true}
            onChange={handleChange}
          />

          {/* Sign up Button */}
          <Button
            variant="contained"
            color="warning"
            type="submit"
            disabled={userState.loading ? true : false}
          >
            SIGN IN
          </Button>
        </form>

        {/* Google Continue */}
        <OAuth />
        {/* Signup Required */}
        <p className="flex justify-between">
          <em>New User? </em>
          <Link to={"/signup"} className=" text-teal-500">
            Register
          </Link>
        </p>

        {/* Forgot Password */}
        <p className="flex justify-between">
          <em>Forgot Password? </em>
          <Link to={"/otpVerification"} className=" text-teal-500">
            Reset Password
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
