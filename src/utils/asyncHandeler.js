const asyncHandeler = (requestHandeler) => async (req, res, next) => {
  try {
    return await requestHandeler(req, res, next);
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: error.message,
    });
  }
};



// const asyncHandeler = (requestHandler) => {
//     return (req, res, next) => {
//         Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
//     }
// }
export { asyncHandeler };