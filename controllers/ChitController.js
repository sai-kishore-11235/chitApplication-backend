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
    const { name,startDate,amount,paidInstallments,sip} = req.body;
    if(!name || !startDate || !amount || !paidInstallments || !sip){
        res.status(400)
        throw new Error("All fields are mandatory !!")
    }
    const startDateObj = moment(startDate);
    if (!startDateObj.isValid()) {
        res.status(400);
        throw new Error("Invalid start date");
      }
      console.log(startDateObj.toDate())
      const endDateObj = moment(startDate).add(9, 'month')
      const settlementDateObj = moment(startDate).add(11, 'month')
      let totalamount = amount*10;
      let settlementAmount = ((totalamount*0.15)+totalamount)

      console.log(endDateObj,settlementDateObj,settlementAmount)
    const chit = await Chit.create({
        name,
        startDate:startDateObj.toDate(),
        amount,
        endDate: endDateObj.toDate(),
        settlementDate: settlementDateObj.toDate(),
        settlementAmount: settlementAmount,
        paidInstallments,
        sip
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
const getCalculatedChitAmount = asyncHandler(async(req, res) => {
    let chits = await Chit.find()
    let totalAmount =0;
    let totalSettlementAmount =0;
    let sip=0;
    let totalSip=0;
    chits.forEach(element => {
        if(element.sip &&  moment(element.endDate).month()>=  moment().month()){
            totalSip+= element.sip
        }
        // if((element.paidInstallments.includes(moment().format("MMM"))&& ((element.endDate).month() <= moment().month()))){
        //     totalAmount +=element.amount;
        // }
        // // console.log(moment(element.settlementDate).month())
        // // console.log(moment().month())
        // if((moment(element.settlementDate)).month() <= moment().month() && (element.status =="Not settled")){
        //     totalSettlementAmount +=element.settlementAmount;
        // }
    });

    let obj = {"totalAmount" : totalAmount ,"totalSettlementAmount" : totalSettlementAmount, "totalSip" : totalSip}
    res.status(200).json(obj);
})

module.exports = { getChits, createChit, updateChit, getChit, deleteChit,getCalculatedChitAmount };