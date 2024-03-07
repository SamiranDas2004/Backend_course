import { ApiError } from "../utils/Apierror.js";
import { asyncHandeler } from "../utils/asyncHandeler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudnary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const genarateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateRefreshToken();
    const refreshToken = user.generateAccessToken();

    user.refreshToken= refreshToken;
  await    user.save({validateBeforeSave: false})

  return {accessToken,refreshToken}

  } catch (error) {
    throw new ApiError(500, "something went wrong while genarating tokens");
  }
};

const registerUser = asyncHandeler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { fullname, email, username, password } = req.body;

  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "all fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(
      409,
      "User with email or username already exists i love you"
    );
  }

  const avatarLocalpath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalpath) {
    throw new ApiError(409, "Avatar is must localpath ");
  }

  const avatar = await uploadOnCloudnary(avatarLocalpath);
  const coverImage = await uploadOnCloudnary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(409, "Avatar is must ");
  }

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "something went wrong while registering a user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "user register susscessfully"));
});

const loginUser = asyncHandeler(async (req, res) => {
  // req body -> data
  // username or email
  //find the user
  //password check
  //access and referesh token
  //send cookie

  const { email, username, password } = req.body;

  if (!username || !email) {
    throw new ApiError(400, "email or usermane is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(409, "user is not register");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

 const {accessToken,refreshToken}=await genarateAccessAndRefreshToken(user._id);


const loggedInUser= await User.findById(user._id).select(  "-password -refreshToken")

const options={
  httpOnly:true,
  secure:true
}

return res.status(200).cookie("accessToken",accessToken,options).cookie('refreshToken',refreshToken).json(
  new ApiResponse(
    200,
    {
      user: loggedInUser,accessToken,refreshToken
    },
    "user loggedin Successfuly "
  )
)



});

export { registerUser, loginUser };
