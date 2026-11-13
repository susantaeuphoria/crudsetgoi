const mongo=require("mongoose")

const mySchema=mongo.Schema({
    name:String,
    email:String,
    number:Number
})

const mymodel=mongo.model("sets",mySchema)

module.exports=mymodel




// mydb=>data 
// mydb => users => data