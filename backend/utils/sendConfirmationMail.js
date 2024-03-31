import User from "../models/userModel.js"
import nodemailer from 'nodemailer'
import { google } from 'googleapis'

export const sendConfirmMail=async(booking,email)=>{
    console.log(email)
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
    const user=await User.findOne({email})
    const mailOptions={
        from:`${process.env.AUTH_EMAIL}`,
        to:user.email,
        subject:"Confirmation: You Have Been Moved from the Waiting List",
        Text:`Dear ${user.name},\n

        We are pleased to inform you that you have been successfully moved from the waiting list to the confirmed list for Ayodhya Temple Booking. Congratulations!\n
        
        Your spot has been confirmed, and you are now officially registered for Ayodhya Temple Visit, which is scheduled to take place on ${booking.date} at Ayodhya Temple. We are thrilled to have you join us!
        \n\n
        Please find below the details of your registration:\n
        \n
        - Name: ${user.name}\n
        - Email: ${email}\n
        - Event/Service/Program: Ayodhya Temple Visit\n
        - Date: ${booking.date}\n
        - Slot: ${booking.slot}\n
        
        If you have any questions or concerns, feel free to contact us at ${process.env.AUTH_EMAIL}.\n
        
        Thank you for your patience and understanding. We look forward to seeing you at the event!\n
        
        Best regards,\n
        
        Rishav,\n
        Developer,\n
        Namaste Ayodhya Team\n`,
    }
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.error(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })
    } catch (error) {
    console.log("Error in sending OTP:",error.message)
    //res.status(500).json({error:"Internal Server Error!!"})
}}