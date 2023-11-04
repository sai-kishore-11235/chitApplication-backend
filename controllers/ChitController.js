const asyncHandler = require("express-async-handler")
const Chit = require("../models/chitModel")
const moment = require("moment");

//desc getchits
//@route /api/chits
//@access public

const getChits = asyncHandler(async(req, res) => {
    const chits = await Chit.find()
    res.status(200).json(chits);
})
const createChit = asyncHandler(async(req, res) => {
    console.log(req.body)
    const { name,startDate,amount} = req.body;
    if(!name || !startDate || !amount){
        res.status(400)
        throw new Error("All fields are mandatory !!")
    }
    const startDateObj = moment(startDate);
    if (!startDateObj.isValid()) {
        res.status(400);
        throw new Error("Invalid start date");
      }
      console.log(startDateObj.toDate())
      const endDateObj = moment().add(10,'months',startDate)
      const settlementDateObj = moment().add(12,'months',startDate)
      let totalamount = amount*10;
      let settlementAmount = ((totalamount*0.15)+totalamount)

      console.log(endDateObj,settlementDateObj,settlementAmount)
    const chit = await Chit.create({
        name,
        startDate:startDateObj.toDate(),
        amount,
        endDate: endDateObj.toDate(),
        settlementDate: settlementDateObj.toDate(),
        settlementAmount: settlementAmount
    })
    res.status(201).json(chit)
})
const updateChit = asyncHandler(async(req, res) => {
    const chit = await Chit.findById(req.params.id)
    if(!chit){
        res.status(404);
        throw new Error("Chit not Found!!")
    }
    const updatedChit = await Chit.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(updatedChit)
})

const getChit = asyncHandler(async(req, res) => {
    const chit = await Chit.findById(req.params.id)
    if(!chit){
        res.status(404);
        throw new Error("Chit not Found!!")
    }
    res.status(200).json(chit)
})
const deleteChit = asyncHandler(async(req, res) => {
    const chit = await Chit.findById(req.params.id)
    if(!chit){
        res.status(404);
        throw new Error("Chit not Found!!")
    }
    await Chit.deleteOne({ _id: req.params.id })
    res.status(204).json(chit)
})

module.exports = { getChits, createChit, updateChit, getChit, deleteChit };