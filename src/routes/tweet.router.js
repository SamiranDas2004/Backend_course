import { Router } from "express";
import { verifiedJWT } from "../middlewares/auth.middlewares.js";
import { createTweet,updateTweet } from "../controllers/tweet.controller.js";

const tweetRouter=Router();

tweetRouter.route('/createTweet').post(createTweet);
tweetRouter.route('/updateTweet').post(updateTweet)
export default tweetRouter