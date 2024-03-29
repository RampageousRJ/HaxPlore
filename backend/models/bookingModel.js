import mongoose, { Mongoose } from "mongoose";

export const bookingSchema = new mongoose.Schema({
    uid: {
        type: Mongoose.Schema.Types.ObjectId,
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
        required: true
    },
    attendees:{
        type: Number,
        required: true
    },
    seniors:{
        type: Number,
        required: true
    },
    infants:{
        type: Number,
        required: true
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

export const bookingModel = mongoose.model("Booking", bookingSchema);