const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
//desc Regiter the User
//@route /api/users/register
//@access public

const registerUser = asyncHandler(async(req, res) => {
    const {username,mobileNumber,password }= req.body;
    if(!username || !mobileNumber || !password){
        res.status(400);
        throw new Error("All Fields are mandatory")
    }
    const userAvailable = await User.findOne({mobileNumber: mobileNumber})
    if(userAvailable){
        res.status(400);
        throw new Error("Mobile Number Already Exists")
    }
    //Hash Password
    const hashedPassword = await bcrypt.hash(password,10);
    console.log(hashedPassword)
    const user =await User.create({
        username,
        mobileNumber,
        password: hashedPassword,
    }
    )
    console.log(`user is created,${user}`)
    if(user){
        res.status(201).json({_id: user._id,username:user.username})
    }
    else{
        res.status(400)
        throw new Error("User Data is not valid")
    }

})

const loginUser = asyncHandler(async(req, res) => {

    const {mobileNumber,password} = req.body;
    if(!mobileNumber || !password){
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const user = await User.findOne({mobileNumber: mobileNumber})
    //compare password with hashed password
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                mobileNumber: user.mobileNumber,
                id: user.id
            },    
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "1m"}
        )

        res.status(200).json({accessToken})
    }
    else{
        res.status(401)
        throw new Error("UserName or Password is not valid")
    }

})

const currentUser = asyncHandler(async(req, res) => {
    res.json(req.user)

})

module.exports={registerUser,loginUser,currentUser}