import mongoose, { Mongoose } from "mongoose";

export const waitlistSchema = new mongoose.Schema({
    pendingBookings: [
        {
            type: Mongoose.Schema.Types.ObjectId,
            ref: "Booking"
        }
    ]
}, { timestamps: true }
)

export const waitlistModel = mongoose.model("Waitlist", waitlistSchema);