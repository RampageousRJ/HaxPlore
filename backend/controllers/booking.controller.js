import Booking from '../models/bookingModel.js'

export const newBooking=async(req,res)=>{
    try {
        const id=req.params.id;
        const {date,slot,attendees,seniors,infants}=req.body
        const QRCode="Generate QR"                           //Code for Qr Here
        const amount=process.env.COST*attendees;
        const isConfirmed=false                              //Payment Code Here
        const newBooking= new Booking({
            uid:id,
            date,
            slot,
            QRCode,
            attendees,
            seniors,
            infants,
            amount,
            isConfirmed
        })
        if(newBooking){
            await newBooking.save();
            res.status(201).json({bookingId:newBooking._id,
            status : "Payment Pending",
            totalAmount : newBooking.amount,
            attendees,
            isConfirmed
            })
        }   
        else{
            res.status(400).json({error:"Invalid Booking data"})
        }
    } catch (error) {
        console.log("Error in CreateBooking:",error.message)
        res.status(500).json({error:"Internal Server Error!!"})
    }
}

export const getAllBookings=async(req,res)=>{
    try {
        const id=req.params.id
        const bookings=await Booking.find({uid:id})                 // add .select("-QRCode") if QR is to be excluded!
        res.status(200).json(bookings)
    } catch (error) {
        console.log("Error in getBookings:",error.message)
        res.status(500).json({error:"Internal Server Error!!"})
    }
}

export const removeBooking=async(req,res)=>{
    try {
        const _id=req.params.bid
        const cancelledBooking=await Booking.findOne({_id})                 // add .select("-QRCode") if QR is to be excluded!
        if(!cancelledBooking){
            res.status(400).json({"message":"No such Booking exists."})
        }
        else{
            await Booking.deleteOne({_id})
            res.status(200).json({"status":"Booking Cancelled Succesfully",_id})
        }
    } catch (error) {
        console.log("Error in removeBooking:",error.message)
        res.status(500).json({error:"Internal Server Error!!"})
    }
}

export const getOneBooking=async(req,res)=>{
    try {
        const id=req.params.id
        const bookingId=req.params.bid
        const booking=await Booking.findOne({_id:bookingId})                 // add .select("-QRCode") if QR is to be excluded!
        res.status(200).json(booking)
    } catch (error) {
        console.log("Error in getOneBooking:",error.message)
        res.status(500).json({error:"Internal Server Error!!"})
    }
}