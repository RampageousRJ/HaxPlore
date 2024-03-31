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
        const {date,name,phone,slot,attendees,seniors,infants,anna,aarti,darshan,wheelchair,isConfirmed}=req.body
        const wheelCost=wheelchair?parseInt(process.env.WHEELCHAIR_COST):0
        const annaCost=anna?parseInt(process.env.ANNA_COST)*parseInt(attendees):0
        const aartilCost=aarti?parseInt(process.env.AARTI_COST):0
        const darshanCost=darshan?parseInt(process.env.DARSHAN_COST)*parseInt(attendees):0
        const infantsCost=parseInt(process.env.INFANT_COST)*parseInt(infants)
        const seniorsCost=parseInt(process.env.SENIOR_COST)*parseInt(seniors)
        const amount=(parseInt(process.env.COST)*(parseInt(attendees)-(parseInt(infants)+parseInt(seniors))))+infantsCost+seniorsCost+wheelCost+aartilCost+annaCost+darshanCost;
        const newBooking= new Booking({
            uid:id,
            date,
            name,
            phone,
            slot,
            attendees,
            seniors,
            infants,
            anna,
            aarti,
            darshan,
            wheelchair,
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
                res.status(201).json(currentBooking)
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
        const waitlists=await Booking.find({$and:[{date},{isConfirmed:false}]})                 // add .select("-QRCode") if QR is to be excluded!
        //const bookedSlots=bookings.map((booking)=>booking._id)
        let totalbook=0;
        let totalwait=0;
        //const finalRes=[]
        const bookedCounts=bookings.map((booking)=>booking.attendees)
        for(let i=0;i<bookedCounts.length;i++){
            totalbook+=bookedCounts[i]
        }
        for(let i=0;i<waitlists.length;i++){
            totalwait+=waitlists[i]
        }
        const slot1Details=await Booking.find({$and:[{date},{slot:process.env.SLOT1},{isConfirmed:true}]})
        const wait1Details=await Booking.find({$and:[{date},{slot:process.env.SLOT1},{isConfirmed:false}]})
        const slot1=slot1Details.map((detail)=>detail.attendees)
        const wait1=wait1Details.map((detail)=>detail.attendees)
        let slot1Count=0;
        let wait1Count=0;
        for(let i=0;i<slot1.length;i++){
            slot1Count+=slot1[i]
        }
        for(let i=0;i<wait1.length;i++){
            wait1Count+=wait1[i]
        }
        const slot2Details=await Booking.find({$and:[{date},{slot:process.env.SLOT2},{isConfirmed:true}]})
        const wait2Details=await Booking.find({$and:[{date},{slot:process.env.SLOT2},{isConfirmed:false}]})
        const slot2=slot2Details.map((detail)=>detail.attendees)
        const wait2=wait2Details.map((detail)=>detail.attendees)
        let slot2Count=0;
        let wait2Count=0;
        for(let i=0;i<slot2.length;i++){
            slot2Count+=slot2[i]
        }
        for(let i=0;i<wait2.length;i++){
            wait2Count+=wait2[i]
        }
        const slot3Details=await Booking.find({$and:[{date},{slot:process.env.SLOT3},{isConfirmed:true}]})
        const wait3Details=await Booking.find({$and:[{date},{slot:process.env.SLOT3},{isConfirmed:false}]})
        const slot3=slot3Details.map((detail)=>detail.attendees)
        const wait3=wait3Details.map((detail)=>detail.attendees)
        let slot3Count=0;
        let wait3Count=0;
        for(let i=0;i<slot3.length;i++){
            slot3Count+=slot3[i]
        }
        for(let i=0;i<wait3.length;i++){
            wait3Count+=wait3[i]
        }
        const slot4Details=await Booking.find({$and:[{date},{slot:process.env.SLOT4},{isConfirmed:true}]})
        const wait4Details=await Booking.find({$and:[{date},{slot:process.env.SLOT4},{isConfirmed:false}]})
        const slot4=slot4Details.map((detail)=>detail.attendees)
        const wait4=wait4Details.map((detail)=>detail.attendees)
        let slot4Count=0;
        let wait4Count=0;
        for(let i=0;i<slot4.length;i++){
            slot4Count+=slot4[i]
        }
        for(let i=0;i<wait4.length;i++){
            wait4Count+=wait4[i]
        }
        let s1=process.env.SLOT1
        let s2=process.env.SLOT2
        let s3=process.env.SLOT3
        let s4=process.env.SLOT4
        res.status(200).json([{"slot":s1,"available":slot1Count,"waiting":wait1Count},
        {"slot":s2,"available":slot2Count,"waiting":wait2Count},
        {"slot":s3,"available":slot3Count,"waiting":wait3Count},
        {"slot":s4,"available":slot4Count,"waiting":wait4Count}])
    } catch (error) {
        console.log("Error in getBookedSlots:",error.message)
        res.status(500).json({error:"Internal Server Error!!"})
    }
}