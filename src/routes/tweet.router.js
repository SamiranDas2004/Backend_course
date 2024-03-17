import { Router } from "express";
import { verifiedJWT } from "../middlewares/auth.middlewares.js";
import { createTweet } from "../controllers/tweet.controller.js";

const tweetRouter=Router();

tweetRouter.route('/createTweet').post(createTweet);

export default tweetRouter