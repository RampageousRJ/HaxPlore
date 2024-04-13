import { Router } from "express";
import { getAllBookings, getOneBooking, newBooking, removeBooking, getBookedSlots, storeTransactionId, getTransactionId } from "../controllers/booking.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router=Router();

router.get("/getBookings/:id",protectRoute,getAllBookings)
router.get("/getOneBooking/:bid",protectRoute,getOneBooking)
router.get("/getBookedSlots/:date",protectRoute,getBookedSlots)
router.post("/newBooking/:id",protectRoute,newBooking)
router.delete("/cancelBooking/:bid",protectRoute,removeBooking)
router.post("/store-transaction-records",storeTransactionId)
router.get("/get-transaction-record/:id",getTransactionId)

export default router