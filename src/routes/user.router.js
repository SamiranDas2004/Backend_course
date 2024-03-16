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


const router= Router();

router.route("/register").post(
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
router.route("/login").post(loginUser)

router.route("/logout").post(
    
    verifiedJWT
    ,logoutUser)
router.route("/refresh-token").post(refreshAccessToken)

router.route("/change-password").post(verifiedJWT, changeCurrentPassword)
router.route("/current-user").get(verifiedJWT, getCurrentUser)
router.route("/update-account").patch(verifiedJWT, updateAccountDetails)

router.route("/avatar").patch(verifiedJWT, upload.single("avatar"), updateUserAvatar)
router.route("/cover-image").patch(verifiedJWT, upload.single("coverImage"), updateUserCoverImage)

router.route("/c/:username").get(verifiedJWT, getUserChannelProfile)
router.route("/history").get(verifiedJWT, getwatchHistory)
export default router;