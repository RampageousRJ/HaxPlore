import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: true,
    },
    transactionId: {
        type: String,
        required: true
    },
});

const Transaction = mongoose.model('transaction', transactionSchema);
export default Transaction;