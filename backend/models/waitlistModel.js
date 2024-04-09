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
    pendingBookings: [{
        bookings:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking"
        },
        attendees:{
            type:Number,
            required:true,
        }
    }]
}, { timestamps: true }
)

const Waitlist = mongoose.model("Waitlist", waitlistSchema);
export default Waitlist;