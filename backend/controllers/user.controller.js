import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import genTokenAndSetCookie from "../utils/generateToken.js"

export const signup=async(req,res)=>{
    try {
        const {name,email,password,confirmPassword,phone}=req.body
        const userEmail=await User.findOne({email}).select("-password")
        const userPhone=await User.findOne({phone})
        if(userEmail || userPhone){
            if(userEmail){
                genTokenAndSetCookie(userEmail._id,res)
                return res.status(200).json({message:"Account already exists",userEmail})
            }else{
                return res.status(200).json({message:"Account already exists"})
            }
        }
        if(!password && !phone){
            password=Math.random().toString(36).slice(-8)
        }
        if(confirmPassword){
            if(password!==confirmPassword){
                return res.status(400).json({error:"Passwords dont match"})
            }
        }
        //HASH password here
        const salt= await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        const newUser= new User({
            name,
            email,
            password:hashedPassword,
            phone,
        })
        if(newUser){
            //Generate JWT token
            genTokenAndSetCookie(newUser._id,res)
            await newUser.save();
            res.status(201).json({_id:newUser._id,
            status : "User Created Successful"
            })
        }   
        else{
            res.status(400).json({error:"Invalid user data"})
        }
        

    } catch (err) {
        console.log("Error in signUp",err.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const signin=async(req,res)=>{
    try {
        const {email,password}=req.body
        const user= await User.findOne({email})
        const isPasswordCorrect=await bcrypt.compare(password,user?.password || "")
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid username or password"})
        }
        genTokenAndSetCookie(user._id,res)
        delete user.password     
        res.status(200).json({user})

    } catch (err) {
        console.log("Error in login",err.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const signout =async(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:'Logged out successfully'})
    } catch (err) {
        onsole.log("Error in logout",err.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}


export const google=(req,res)=>{
    res.json({success:true})
}