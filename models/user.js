const mongoose = require("mongoose")

// create schema
const userSchema = mongoose.Schema({

    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    // to provide admin panel access
    isAdmin:{
        type:Boolean,
        default:false
    }
},{
    timestamps : true,
})

// create model
const userModel = mongoose.model('users',userSchema)

module.exports = userModel
