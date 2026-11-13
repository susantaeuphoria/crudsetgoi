const express = require("express")
const cors = require("cors")
const mongo = require("mongoose")
require("dotenv").config()
const app = express()

app.use(cors()) // connect one domain to another domain 
app.use(express.json()) // when data send from cllient side server....

mongo.connect(process.env.MONGO_URL).then(() => {
    console.log("Db connected");
}).catch((err) => {
    console.log(err);

})


const MyUser = require("./model/db")

// crete ------
app.post("/create", async (req, res) => {
    const result = await MyUser.create(req.body) // name email number
    res.json({
        message: "Done",
        result: result
    })
})

// read --------
app.get("/", async (req, res) => {
    const result = await MyUser.find({}) // get all data from database....
    res.json({
        message: "Done",
        result: result
    })
})

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    const result = await MyUser.findByIdAndDelete({ _id: id })
    res.json({
        message: "Done",
        result: result
    })
})

// update get api ---
app.get("/update/:id", async (req, res) => {
    const id = req.params.id
    const result = await MyUser.findById({ _id: id })
    res.json({
        message: "Done",
        result: result
    })
})

app.put("/update/:id", async (req, res) => {
    const id = req.params.id
    const result = await MyUser.findByIdAndUpdate({ _id: id }, {
        name: req.body.name,
        email: req.body.email,
        number: req.body.number
    })
    res.json({
        message: "Done",
        result: result
    })

})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log("Server is running on 4500 port...");

})