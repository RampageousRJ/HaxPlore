import mongoose from "mongoose";

const waitlistSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    slot: {
        type: String,
        required: true,
    },
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