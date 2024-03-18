import { Router } from "express";
import { verifiedJWT } from "../middlewares/auth.middlewares.js";
import { createTweet,updateTweet,deleteTweet } from "../controllers/tweet.controller.js";

const tweetRouter=Router();

tweetRouter.route('/createTweet').post(createTweet);
tweetRouter.route("/:tweetId").patch(updateTweet).delete(deleteTweet)
export default tweetRouter