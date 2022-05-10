//To give mongo db connection details

//import mongoose
const mongoose = require('mongoose')

//state connection string 
mongoose.connect('mongodb://localhost:27017/bank',{
    useNewUrlParser:true
})

//model creation or collection creation
const User = mongoose.model('User',{
    acno:Number,
    uname:String,
    password:String,
    balance:Number,
    transaction:[]
})

//export model- User
module.exports = {
    User
}
