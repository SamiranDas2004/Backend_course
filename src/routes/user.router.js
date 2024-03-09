import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import {upload} from '../middlewares/multer.middleware.js'
import {verifiedJWT} from '../middlewares/auth.middlewares.js'
import { refreshAccessToken } from "../controllers/user.controller.js";


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
export default router;