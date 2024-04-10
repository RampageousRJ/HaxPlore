import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Signin from "../pages/SignIn";
import toast from "react-hot-toast";

function PrivateRoute() {
  const user = useSelector((state) => state.user.userDetails);

  if (!user) {
    toast.error("Signin first!!");
    return <Signin />;
  } else return <Outlet />;
}

export default PrivateRoute;
