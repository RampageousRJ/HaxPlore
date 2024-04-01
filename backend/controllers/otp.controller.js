import Booking from '../models/bookingModel.js'
import nodemailer from 'nodemailer'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import VerifiedUser from '../models/userVerificationModel.js'
import { google } from 'googleapis'

export const sendOTP=async(req,res)=>{

    const oAuth2Client = new google.auth.OAuth2(
        process.env.OAUTH_CLIENT_ID,
        process.env.OAUTH_CLIENT_SECRET,
        process.env.REDIRECT_URL // Typically http://localhost if you're running locally
      );

    /*console.log('Authorize this app by visiting:', oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://mail.google.com/']
    }));
    */
   oAuth2Client.setCredentials({refresh_token:process.env.REFRESH_TOKEN})
        
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'rishavbiswas33@gmail.com',
          clientId: process.env.OAUTH_CLIENT_ID,
          clientSecret: process.env.OAUTH_CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN, // Generated or obtained when authorizing the app
          accessToken: oAuth2Client.getAccessToken(), // Optional, will be generated automatically
          expires: 3599 // Optional, will be generated automatically
        }
      });
    transporter.verify((error,success)=>{
        if(error){
            console.log(error)
        }else{
            console.log("Ready for Messages")
            console.log(success)
        }
    })

    try {
    const otp=`${Math.floor(1000+Math.random()*9000)}`
    const email=req.params.email
    const user=await User.findOne({email})
    const id=user._id
    const doesOtpexists=await VerifiedUser.find({uid:user._id})
    if(doesOtpexists){
        await VerifiedUser.deleteMany({uid:user._id})
    }
    const mailOptions={
        from:`${process.env.AUTH_EMAIL}`,
        to:user.email,
        subject:"Change Password!",
        html:`<p>Enter <b>${otp}</b> in App to verify!</p>
        <p>This code will expire in 5 minutes</p>`,
    }

    const salt=10
    const hashedOTP=await bcrypt.hash(otp,salt)
    const verifyUser= new VerifiedUser({
        uid:id,
        otp:hashedOTP,
        createdAt:Date.now(),
        expiresAt:Date.now()+300000,
    })
    await verifyUser.save()
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.error(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })
    res.json({
        status:"Pending!",
        message:"OTP sent!",
        data:{
            userId:id,
            email:user.email
        }
    })
    } catch (error) {
    console.log("Error in sending OTP:",error.message)
    res.status(500).json({error:"Internal Server Error!!"})
}}

export const verifyOTP=async(req,res)=>{
    try{
        const {otp}= req.body
        const uid=req.params.id
        if(!uid || !otp){
            res.status(400).json({error:"Empty OTP details not allowed!",validation:"False"})
        }
        const userToBeVerified=await VerifiedUser.findOne({uid})
        if(userToBeVerified.length <= 0){
            res.status(400).json({error:"Account does not exist or is already verified!",validation:false})
        }
        const {expiresAt}=userToBeVerified
        const hashedOTP=userToBeVerified.otp
        if(expiresAt<Date.now()){
            await VerifiedUser.deleteMany({uid})
            res.status(400).json({error:"OTP has expired! Please request again.",validation:false})
        }
        const isValid=bcrypt.compare(otp,hashedOTP)
        if(!isValid){
            res.status(400).json({error:"Invalid OTP",validation:false})
        }
        res.status(200).json({message:"OTP Verification Successful!",validation:true,data:{userId:uid,email:userToBeVerified.email}})
        await VerifiedUser.deleteMany({uid})
    }catch(error){
        console.log("Error in verifyOTP:",error.message)
        res.status(500).json({error:"Internal Server Error!!"})
    }
}

export const setNewpassword=async(req,res)=>{
    try {
        const id=req.params.id
        const {password,confirmPassword}=req.body
        if(password!==confirmPassword){
            return res.status(400).json({error:"Passwords dont match"})
        }
        //HASH password here
        const salt= await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        const updatedUser=await User.findByIdAndUpdate({_id:id},{password:hashedPassword})
        await updatedUser.save()
        if(updatedUser){
            res.status(201).json({_id:updatedUser._id,
                status : "Password Updated Successfully"
            })
        }

    } catch (err) {
        console.log("Error in Set New password ",err.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}
