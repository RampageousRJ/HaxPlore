import React, { useState } from "react";
import { app } from "../firebase/firebase.config.js";
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../features/userSlice.js";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function OAuth() {
  const [failure, setFailure] = useState(null);
  // For navigation
  const navigate = useNavigate();

  // To manage GoogleAuth
  const auth = getAuth(app);

  // For google continue we will directly signin
  const dispatch = useDispatch();

  //Signing using Google Firebase

  const googleAuth = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();

    // To always ask user for account preference
    provider.setCustomParameters({
      prompt: "select_account",
    });

    try {
      dispatch(signInStart());
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      // Submit data for database
      try {
        const res = await fetch("/api/v1/google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: result.user.email,
            name: result.user.displayName,
          }),
        });
        const data = await res.json();
        if (data.success == false) {
          dispatch(signInFailure());
          return setFailure(data.message);
        }
        dispatch(signInSuccess(data.sendInfo));
      } catch (error) {
        setFailure(error.message);
        navigate("/");
        return;
      }
    } catch (error) {
      setFailure(error.message);
      navigate("/");
      return;
    }
    navigate("/home");
  };

  return (
    <>
      {/* Google Login */}

      <Button
        variant="outlined"
        color="warning"
        endIcon={<FcGoogle />}
        onClick={googleAuth}
      >
        Continue With Google
      </Button>
    </>
  );
}

export default OAuth;
