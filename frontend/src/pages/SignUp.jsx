import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

function SignUp() {
  // For form of custom signup
  const [formData, setFormData] = useState({});

  // States to deal with loading and failure
  const [failure, setFailure] = useState(null);
  const [loading, setLoading] = useState(false);

  // To navigate to sign in upon succes in signup
  const navigate = useNavigate();

  // Signing In using custom username, password by filling the form

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setFailure(null);
      setLoading(true);
      const req = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // HTTP only handles text data
      });
      const data = await req.json();
      if (data.error)
        return setFailure(data.error);
    } catch (e) {
      setFailure(e);
    }
    setFormData(null);
    setLoading(false);
    navigate("/signin");
  };

  const handleChange = (e) => {
    const input = e.target.id || e.target.name;
    const val = e.target.value.trim(); //.trim() to get rid of useless white spaces at start
    const temp = { ...formData, [input]: val };
    setFormData(temp);
  };

  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="flex flex-col gap-4 py-10 px-20 rounded-lg shadow-xl ">
        {/* Main Form */}

        <form
          action=""
          method="POST"
          className="flex flex-col gap-5 "
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl text-orange-800 font-medium self-center">
            REGISTER
          </h1>
          <TextField
            id="name"
            label="Name"
            type="name"
            autoComplete="current-name"
            variant="standard"
            color="warning"
            sx={{
              width: "300px",
            }}
            value={formData?.name || ''}
            required
            onChange={handleChange}
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            autoComplete="current-email"
            variant="standard"
            color="warning"
            value={formData?.email || ""}
            helperText="We'll never share your email."
            required
            onChange={handleChange}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            color="warning"
            value={formData?.password || ""}
            required
            onChange={handleChange}
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            color="warning"
            value={formData?.confirmPassword || ""}
            required
            onChange={handleChange}
          />
          <TextField
            id="phone"
            name="phone"
            label="Phone Number"
            type="phone"
            autoComplete="current-phone"
            variant="standard"
            color="warning"
            value={formData?.phone || ""}
            required
            onChange={handleChange}
          />
          {/* Sign up Button */}

          {!loading && (
            <Button variant="contained" type="submit" color="warning" disabled={loading}>
              SIGN UP
            </Button>
          )}
        </form>

        {/* Google Continue */}
        <OAuth />
        {/* Alreedy Signed Up */}
        <p className="flex justify-between">
          <i>Already signed up? </i>
          <Link to={"/signin"} className=" text-teal-500">
            Sign In
          </Link>
        </p>
        {/* Alert Section */}
        {failure && (
          <Alert
            severity="error"
            sx={{
              marginTop: "1.12rem",
            }}
          >
            {failure}
          </Alert>
        )}
      </div>
    </div>
  );
}

export default SignUp;
