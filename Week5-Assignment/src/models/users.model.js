import mongoose, {Schema} from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new Schema (
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        username: {
            type: String,
            unique: true,
            required: true,
            index: true,
            lowercase: true,
            trim: true,

        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        password: {
            type: String,
            required: [true, "password is required"]

        }
    }, {timestamps: true})


userSchema.pre("save", async function (next) {
    if(! this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})


export const User = mongoose.model("User", userSchema)