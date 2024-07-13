import {ApiError} from "../utils/apiError.js"
import {User} from "../models/users.model.js"
import { ApiResponse } from "../utils/apiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js"


const createUser = asyncHandler (async (req, res) => {
    const {fullName, username, email, password} = req.body;

    if (
        [username, email, fullName, password].some((field) => 
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All Fields are Required")
    }

    if(! email.includes("@")) {
        throw new ApiError(400, "email must contain @")
    }

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if(existedUser) throw new ApiError(400, "user already exists")

    const user = await User.create({
        fullName,
        username: username.toLowerCase(),
        email,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password"
    )

    if (! createdUser) {
        throw new ApiError(500, "something went wrong while creating user")
    }

    return res.status(201)
        .json(new ApiResponse(200, `userId: ${createdUser._id}`, "User Successfully Created"))
})

const readUser = asyncHandler(async(req, res) => {
    const userId = req.params.userId
    
    const user = await User.findById(userId).select(
        "-password"
    )

    if(!user) throw new ApiError(404, "user not found!!")

    return res.status(200)
        .json(
           new ApiResponse(200, user, "User Successfully Displayed !!")
        )
})

const updateUser = asyncHandler(async(req, res) => {
    const userId = req.params.userId
    const user = await User.findById(userId)
    
    if(!user){
        throw new ApiError(404, "User not Found!! please create new user and try again")
    }

    const {username, fullName, email} = req.body
    
    const updatedUser = await User.findByIdAndUpdate(userId, {
        username,
        fullName,
        email
    },
    {
    new:true
    }).select("-password")
    return res.status(200)
        .json(
            new ApiResponse(200, updatedUser, "User successfully updated")
        )
})

const deleteUser = asyncHandler (async (req, res) => {
    const userId = req.params.userId
    const currentUser = await User.findById(userId);
    if(!currentUser) throw new ApiError(404, "User Not Found !!")

    await User.findByIdAndDelete(userId)

    res.status(200)
        .json(
            new ApiResponse(200 , {}, "User SuccessFully Deleted!!")
        )
})

export {createUser,
        readUser,
        deleteUser,
        updateUser
}