import mongoose from"mongoose"
import { DB_NAME } from "../constant.js"


const connectToDB = async () => {
    try {
        const connectionInstance = await mongoose.connect (`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log("\n mongoDB Successfully connected !! DB Host: ", connectionInstance.connection.host)
    } catch (error) {
        console.log("mongoDB Connecting Error", error);
        process.exit(1)
    }
}

export {connectToDB}