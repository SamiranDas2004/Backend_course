import { ApiError } from "../utils/Apierror";
import { asyncHandeler } from "../utils/asyncHandeler";
import jwt from "jsonwebtoken"

import User from '../models/user.model.js'

export const verifiedJWT=asyncHandeler (async(req,res,next)=>{

 try {
   const token=  req.cookies?.accessToken || req.header(" Authorization")?.replace("Bearer",  "")
 
   if (!token) {
     throw new ApiError (401,"unauthharized error")
   }
   
   const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
 
 
  const user= await User.findById(decodedToken).select("-password -refreshtoken")
 
  if (!user) {
   throw new ApiError (401, "invalid access token")
 }
 
 req.user==user;
 next()
 } catch (error) {
  
 }
})  