import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/Apierror.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    // TODO: get video, upload to cloudinary, create video

    if(!title && !description){
        throw new ApiError(400,"title and description is reqired")
    }

    const videoLocalpath=req.files?.videoFile[0].path;
    const thumbnailLocalpath=req.files?.thumbnail[0].path;

    if (!videoLocalpath) {
        throw new ApiError(400,"the videolocal path is not found")
    }

    if (!thumbnailLocalpath) {
        throw new ApiError(400,"the videolocal path is not found")
    }
    const video=uploadOnCloudinary(videoLocalpath);
    const thumbnail=uploadOnCloudinary(thumbnailLocalpath);

    if (!video) {
        throw new ApiError(400,'faild to upload the video')
    }

    if (!thumbnail) {
        throw new ApiError(400,"filed to upload the thumbnail")
    }

    const finalVideo= await Video.create({
        title,
        description,
        duration:video.duration,
        videoFile:{
            url: videoFile.url,
            public_id: videoFile.public_id,
        },
        thumbnail:{
            url: thumbnail.url,
            public_id: thumbnail.public_id
        },
        owner:req.user?._id,
        isPublished:false


    })

    return res 
    .status(200)
    .json(new ApiError(200,finalVideo,"published a video "))

})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}