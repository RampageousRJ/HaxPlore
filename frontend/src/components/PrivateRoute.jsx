import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoute() {
    const userDetails  = useSelector(state => state.user.userDetails)
    console.log("User Details: ",userDetails);
    return (
        userDetails ? <Outlet /> : <Navigate to="/signin" />
    )
}

export default PrivateRoute