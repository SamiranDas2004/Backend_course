import { Router } from "express";
import { loginUser, logoutUser, registerUser,
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentUser, 
    updateUserAvatar, 
    updateUserCoverImage, 
    getUserChannelProfile, 
    getwatchHistory, 
    updateAccountDetails } from "../controllers/user.controller.js";
import {upload} from '../middlewares/multer.middleware.js'
import {verifiedJWT} from '../middlewares/auth.middlewares.js'


const userrouter= Router();

userrouter.route("/register").post(
    upload.fields([
        {
            name:'avatar',
            maxCount:1
        },
        {
            name:'coverImage',
            maxCount:1
            
        }
    ]),
    registerUser
    )
userrouter.route("/login").post(loginUser)

userrouter.route("/logout").post(
    
    verifiedJWT
    ,logoutUser)
userrouter.route("/refresh-token").post(refreshAccessToken)

userrouter.route("/change-password").post(verifiedJWT, changeCurrentPassword)
userrouter.route("/current-user").get(verifiedJWT, getCurrentUser)
userrouter.route("/update-account").patch(verifiedJWT, updateAccountDetails)

userrouter.route("/avatar").patch(verifiedJWT, upload.single("avatar"), updateUserAvatar)
userrouter.route("/cover-image").patch(verifiedJWT, upload.single("coverImage"), updateUserCoverImage)

userrouter.route("/c/:username").get(verifiedJWT, getUserChannelProfile)
userrouter.route("/history").get(verifiedJWT, getwatchHistory)
export default userrouter;