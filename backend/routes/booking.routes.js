import { Router } from "express";
import { getAllBookings, getOneBooking, newBooking, removeBooking } from "../controllers/booking.controller.js";

const router=Router();

router.get("/getBookings",getAllBookings)
router.get("/getOneBooking",getOneBooking)
router.post("/newBooking",newBooking)
router.delete("/cancelBooking",removeBooking)

export default router