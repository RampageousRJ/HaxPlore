import { Router } from "express";
import { sendOTP ,verifyOTP ,setNewpassword } from "../controllers/otp.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router=Router();

router.get("/send-OTP/:email",sendOTP)
router.post("/verify-OTP/:id",verifyOTP)
router.post("/set-newPassword/:id",setNewpassword)

export default router