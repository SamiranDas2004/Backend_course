import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import {ApiError} from "../utils/Apierror.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    // TODO: toggle subscription
    if (!isValidObjectId(channelId)) {
        throw new ApiError(400,"the channelId is not valid")
    }

    const isSubscribed= await Subscription.findOne({
        subscriber: req.user?._id,
        channel: channelId,
    })
    if (isSubscribed) {
     await Subscription.findByIdAndDelete(isSubscribed?._id)
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { subscribed: false },
                "unsunscribed successfully"
            )
        )
    }

  
          await Subscription.create({
        subscriber: req.user?._id,
        channel: channelId,
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { subscribed: true },
                "subscribed successfully"
            )
        );
    
   

    
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    // 
    const {channelId} = req.params
    if (!isValidObjectId(channelId)) {
        throw new ApiError(400,"channelId is not valid");
    }

   const allSubscribers = await Subscription.aggregate([
    {
        $match:{
            channel: new mongoose.Types.ObjectId(channelId)
        }
    },
    {
        $lookup:{
            from:'users',
            localField:'channel',
            foreignField:'_id',
            as:'allSubscriberss'
        }
    },
    {
        $addFields:{
            totalSubs:{
                $cond:{
                    if:{
                        $In:[
                            channelId,"$allSubscriberss.channel"
                        ]
                    },
                    then: true,
                    else:false
                }
            },
            totalSubscriber:{
                $size:"allSubscriberss"
            }
        }
    } ,
        {
            $project:{
                fullname:1
            }
        }
   ])

return res
.status(200)
.json(new ApiResponse(200,allSubscribers,'all subscriber fetched successfully'))

    

})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params

    if(!isValidObjectId(subscriberId)){
        throw new ApiError(400,"subscriberId is not a valid")
    }

    const subscribedTo=await Subscription.aggregate([
        {
            $match: new mongoose.Types.ObjectId(subscriberId)
        },
        {
            $lookup:{
                from:"uses",
                localField:"subscriber",
                foreignField:'_id',
                as:'subscribedTo'
            }
        },
        {
            $addFields:{
                subscribedChannels:{
                    $cond:{
                        $if:{
                            $In:[
                                subscriberId,
                                "$subscribedTo.subscriber"
                            ]
                        }
                    },
                    then:true,
                    else:false
                },

                totalSubscribed:{
                    $size:"$subscribedTo"
                }
            }
        },
        {
            $project:{
                fullname:1
            }
        }
    ])

    return res
.status(200)
.json(new ApiResponse(200,subscribedTo,'all subscribedTo fetched successfully'))

})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}