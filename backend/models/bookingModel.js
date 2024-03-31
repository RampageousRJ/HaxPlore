import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
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
    visitors:{
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
    anna:{
        type: Boolean,
        required: true,
        default:false
    },
    aarti:{
        type: Boolean,
        required: true,
        default:false
    },
    darshan:{
        type: Boolean,
        required: true,
        default:false
    },
    wheelchair:{
        type: Boolean,
        required: true,
        default:false
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