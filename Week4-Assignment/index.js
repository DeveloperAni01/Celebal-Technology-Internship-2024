//Set up a simple web server using Express.js that can handle basic routing and middleware. Implement routes to respond to at least two different endpoints.

import express from "express"

const app = express()


//middlewires
app.use((req, res, next) => {
    console.log(`${req.method} request for url: ${req.url}`);
    next()
})

//routes
app.get("/", (req, res) => {
    res.send("Hello from Server")
})
app.get("/about", (req, res) => {
    return res.send("This is About Page !")
})




app.listen(3000, () => console.log(`Server Listen at PORT 3000 !!`))