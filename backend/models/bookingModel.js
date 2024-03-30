import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    slot: {
        type: String,
        required: true,
    },
    QRCode: {
        type: String,
    },
    attendees:{
        type: Number,
        required: true
    },
    seniors:{
        type: Number,
        required: true,
        default:0
    },
    infants:{
        type: Number,
        required: true,
        default:0
    },
    amount:{
        type: Number,
        required: true
    },
    isConfirmed:{
        type: Boolean,
        required: true
    }
}, { timestamps: true }
)

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking; 