import mongoose from "mongoose";

const waitlistSchema = new mongoose.Schema({
    pendingBookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking"
        }
    ]
}, { timestamps: true }
)

const Waitlist = mongoose.model("Waitlist", waitlistSchema);
export default Waitlist;