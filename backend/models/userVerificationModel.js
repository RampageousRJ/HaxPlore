import mongoose from "mongoose";

const userVerificationSchema = new mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    otp: {
        type: String,
    },
    createdAt: {
        type: Date,
    },
    expiresAt: {
        type: Date,
    }
}, { timestamps: true }
)

const VerifiedUser = mongoose.model("VerifiedUser", userVerificationSchema);
export default VerifiedUser;