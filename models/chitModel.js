const mongoose = require("mongoose")

const chitSchema = mongoose.Schema({
    name:{
        type: String,
        required:[true, "Please add the contact name"]
    },
    startDate:{
        type: Date,
        required: true
    },
    amount:{
        type: Number,
        required: [true,"Please add the Amount"]
    },
    endDate:{
        type: Date,
        required: true
    },
    settlementDate:{
        type: Date,
        required: true
    },
    settlementAmount:{
        type: Number,
        required: true
    },
    paidInstallments:{
        type: [String],
        required: true
    },
    status:{
        type: String,
    },
    sip:{
        type:Number,
        required:[true, "Please  provide the number of SIP"]
    },

},
{
    timestamps: true,
}
);

module.exports = mongoose.model("chit",chitSchema);