const express = require("express")
const cors = require("cors")
const mongo = require("mongoose")
const app = express()

app.use(cors()) // connect one domain to another domain 
app.use(express.json()) // when data send from cllient side server....

mongo.connect("mongodb://susanta9749:1234@ac-qmhwcd3-shard-00-00.3qzygls.mongodb.net:27017,ac-qmhwcd3-shard-00-01.3qzygls.mongodb.net:27017,ac-qmhwcd3-shard-00-02.3qzygls.mongodb.net:27017/?ssl=true&replicaSet=atlas-yamy8j-shard-0&authSource=admin&appName=Cluster0").then(() => {
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


app.listen(4500, () => {
    console.log("Server is running on 4500 port...");

})