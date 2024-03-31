import { Router } from "express";
import { sendOTP ,verifyOTP ,setNewpassword } from "../controllers/otp.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router=Router();

router.get("/send-OTP/:email",protectRoute,sendOTP)
router.post("/verify-OTP/:id",protectRoute,verifyOTP)
router.post("/set-newPassword/:id",protectRoute,setNewpassword)

export default router