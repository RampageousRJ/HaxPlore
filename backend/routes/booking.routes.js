import { Router } from "express";
import { getAllBookings, getOneBooking, newBooking, removeBooking, getBookedSlots } from "../controllers/booking.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router=Router();

router.get("/getBookings/:id",protectRoute,getAllBookings)
router.get("/getOneBooking/:id/:bid",protectRoute,getOneBooking)
router.get("/getBookedSlots/:date",protectRoute,getBookedSlots)
router.post("/newBooking/:id",protectRoute,newBooking)
router.delete("/cancelBooking/:bid",protectRoute,removeBooking)

export default router