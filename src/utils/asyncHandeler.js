const asyncHandeler=(requestHandeler)=async(req,res,next)=>{
    try {
        await requestHandeler(req,res,next)
    } catch (error) {
        res.status(error.code || 500 ). json({
            success:false,
            message: error.message
        })
    }

}

export {asyncHandeler}



// const asyncHandler = (requestHandler) => {
//     return (req, res, next) => {
//         Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
//     }
// }