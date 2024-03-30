import Booking from '../models/bookingModel.js'
import qr from 'qrcode'

export const newBooking=async(req,res)=>{
    
    function generateQR(data) {
        return new Promise((resolve, reject) => {
          qr.toDataURL(data, (err, url) => {
            if (err) {
              reject(err);
            } else {
              resolve(url);
            }
          });
        });
      }
    try {
        const id=req.params.id;
        const {date,slot,attendees,seniors,infants,isConfirmed}=req.body
        const amount=process.env.COST*attendees;
        const newBooking= new Booking({
            uid:id,
            date,
            slot,
            attendees,
            seniors,
            infants,
            amount,
            isConfirmed
        })
        if(newBooking){
            await newBooking.save();
        }
            const QRCode=await generateQR(`http://localhost:3000/api/booking/getOneBooking/${newBooking._id}`)
            const currentBooking=await Booking.findOneAndUpdate({_id:newBooking._id},{QRCode:QRCode},{new:true})
            if(currentBooking){
                await currentBooking.save();
                res.status(201).json({bookingId:currentBooking._id,
                status : isConfirmed?"Slot Booked succesfully!":"In Waiting list!",
                totalAmount : newBooking.amount,
                attendees,
                isConfirmed,
                QRCode:currentBooking.QRCode
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

export const getBookedSlots=async(req,res)=>{
    try {
        const date=req.params.date
        const bookings=await Booking.find({$and:[{date},{isConfirmed:true}]})                 // add .select("-QRCode") if QR is to be excluded!
        const bookedSlots=bookings.map((booking)=>booking._id)
        res.status(200).json({"Booked slots":bookings.length,"Booked Slots IDs":bookedSlots})
    } catch (error) {
        console.log("Error in getBookedSlots:",error.message)
        res.status(500).json({error:"Internal Server Error!!"})
    }
}