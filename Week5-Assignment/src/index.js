import dotenv from "dotenv"
import { connectToDB } from "./db/db.js"
import { app } from "./app.js"

dotenv.config({
    path: "./env"
})


connectToDB()
    .then( () => {
        app.on("error", (err) => {
            console.log("error: ", err);
            throw err
        })
        app.listen(process.env.PORT || 8000, () => console.log("server started at port :", process.env.PORT))
    })
    .catch((err) => console.log("MongoDB on error :", err))