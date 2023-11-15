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
        required: [true,"Please add the Amoubt"]
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

},
{
    timestamps: true,
}
);

module.exports = mongoose.model("chit",chitSchema);