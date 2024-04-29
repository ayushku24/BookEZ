const mongoose = require("mongoose")

const roomsschema = mongoose.Schema({

    name : {
        type:String,
        required:true
    },
    maxCount : {
        type:Number,
        required:false
    },
    phonenumber : {
        type:Number,
        required:true
    },
    rentperday : {
        type:Number,
        required:true
    },
    imageurls : [],
    currentbookings: [],
    type : {
        type:String,
        required:true
    },
    description : {
        type:String,
        required:true
    },

},{
    timestamps:true,
})

const roommodel = mongoose.model('rooms', roomsschema)

module.exports = roommodel