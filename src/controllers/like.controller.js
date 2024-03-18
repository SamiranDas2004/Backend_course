
import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/Apierror.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { Tweet } from "../models/tweet.model.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    //TODO: toggle like on video

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400,'videoId is not valid');
    }

    const isLiked=await Like.findOne({
        likedBy:req.user?._id,
        video:videoId
    })

    if (isLiked) {
        await Like.findByIdAndDelete(isLiked)

        return res
        .status(200)
        .json(new ApiResponse(200,{"likes":false},"unLiked a video"))
    }

   await Like.create({
    likedBy:req.user?._id,
    video:videoId
   })

   return res
   .status(200)
   .json(new ApiResponse(200,{ "liked":true},"liked a video"))
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    //TODO: toggle like on comment

    if (!commentId) {
        throw new ApiError(400,"commentId is not valid ");
    }

    const isCommentLiked= await Like.findOne({
        liked:req.user?._id,
        comment:commentId
    })

    if (isCommentLiked) {
        await Like.findByIdAndDelete(isCommentLiked?._id)

        return res
        .status(200)
        .json(new ApiResponse(200,{"Liked":false},"disliked comment"))
    }

    await Like.create({
        likedBy:req.user?._id,
        comment:commentId
    })

    return res
    .status(200)
    .json(new ApiResponse(200,{"liked":true},"comment is liked "))
})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    //TODO: toggle like on tweet
     if(!tweetId){
        throw new ApiError(400,"tweetId is not valid")
     }

     const isTweetLiked=await Like.findOne({
        likedBy:req.user?._id,
        tweet:tweetId
     })

     if (isTweetLiked) {
        await Like.findByIdAndDelete(isTweetLiked)

        return res
        .status(200)
        .json(new ApiResponse(200,{"liked":false},"tweet unliked"))
     }

     await Like.create({
        likedBy:req.user?._id,
        tweet:tweetId
     })

     return res
     .status(200)
     .json(new ApiResponse(200,{"liked":true},"liked a tweet"))
}
)

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}
