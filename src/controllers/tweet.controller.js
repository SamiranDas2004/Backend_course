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
    // const {username}=req.body;

    // const ownerName= await User.aggregate([
    //     {
    //         $match:{
    //             username: username
    //         }
    //     },
    //     {
    //         $lookup:{
    //             from:'users',
    //             localField:'owner',
    //             foreignField:'_id',
    //             as:'owners'
    //         }
    //     },
    //     {
    //         $addFields:{
    //             ownerDetails:{
    //                 $size:'$owners'
    //             }
    //         }
    //     },
    //     {
    //         $project:{
                
    //             username:1
    //         }
    //     }
    // ])

    // if (!ownerName?.length) {
    //     throw new ApiError(409,'the owner is not defined i');
    // }


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

    //check if the content is emptey or not
    //check twtterId validation
    //find the tweet by Id
    //check for the owner
    //update meathod
    
    const {content}=req.body;
    const {tweetId}=req.params;

    if (!content) {
        throw new ApiError (409,"content is empty")
    }
    if (!isValidObjectId(tweetId)) {
        throw new ApiError(409,"tweetId is Invalid");
    }
    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
        throw new ApiError(404, "Tweet not found");
    }
    
    if (tweet?.owner !== req.user?._id) {
        throw new ApiError(400, "only owner can edit thier tweet");
    }

    const newtweet=await Tweet.findByIdAndUpdate(
        tweetId,
        {
            $set:{
                content
            }
        },
        {
            new:true
        }
    ).select("-owner")

    return res
    .status(200)
    .json(new ApiResponse(200, newtweet, "tweet updated successfully"));
})



const deleteTweet = asyncHandeler(async (req, res) => {
    //TODO: delete tweet
    // 
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}