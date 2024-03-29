import mongoose, { Mongoose } from "mongoose";

const waitlistSchema = new mongoose.Schema({
    pendingBookings: [
        {
            type: Mongoose.Schema.Types.ObjectId,
            ref: "Booking"
        }
    ]
}, { timestamps: true }
)

const Waitlist = mongoose.model("Waitlist", waitlistSchema);
export default Waitlist;