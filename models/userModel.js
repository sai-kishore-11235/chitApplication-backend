const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true,"Please Provide the Username"]
    },
    mobileNumber: {
        type: Number,
        required : [true,"Please Provide the Mobile Number"],
        unique: [true,"Mobile Number Already Exists"]
    },
    password:{
        type : String,
        required: [true, "Please provide the User Password"]
    },
},{
    timestamps: true
}
)

module.exports = mongoose.model("User",userSchema)