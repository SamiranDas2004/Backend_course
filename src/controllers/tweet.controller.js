import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/Apierror.js"
import {ApiResponse} from "../utils/ApiResponse.js"

import { asyncHandeler } from "../utils/asyncHandeler.js"

const createTweet = asyncHandeler(async (req, res) => {
    //TODO: create tweet
    // content & owner -> reeq.body
    //
    const {content}=req.body;

    if(!content ){
        throw new ApiError(409,"tweet is not been created peroblem at featching the data")
    }
      
   const tweet= await Tweet.create(
        {
            content,
            
        }
    )
    if (!tweet) {
        throw new ApiError (409, "tweet is not created")
    }
    return res
    .status(201)
    .json(new ApiResponse(200, tweet, "tweet is created / susscessfully"));
})

const getUserTweets = asyncHandeler(async (req, res) => {
    // TODO: get user tweets
})

const updateTweet = asyncHandeler(async (req, res) => {
    //TODO: update tweet


    
})

const deleteTweet = asyncHandeler(async (req, res) => {
    //TODO: delete tweet
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}