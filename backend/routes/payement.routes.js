import { Router } from "express";
import { confirmBooking, newOrder, refundMoney } from "../controllers/payement.controller.js";

const router=Router();

router.post("/create-checkout-session",newOrder)
router.post("/confirm",confirmBooking)
router.post("/refund",refundMoney)

export default router