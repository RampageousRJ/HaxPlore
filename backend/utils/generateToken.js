import jwt from 'jsonwebtoken'

const genTokenAndSetCookie=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'15d'
    })
    res.cookie("jwt",token,{
        maxAge: 2*60*60*1000,//ms
        httpOnly:true,// prevent XXS(cross side scripting) attacks, allows toekn to be accessable only thru html and not thru js
        sameSite:"strict",//prevents CSRF(Cross Site Request Forgery) attacks
        secure:process.env.NODE_ENV!=="development",
    })
}

export default genTokenAndSetCookie;