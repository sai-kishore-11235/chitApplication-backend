const express = require("express")
const { registerUser, loginUser, currentUser } = require("../controllers/UserController")
const validateToken = require("../middleware/validateTokenHandler")

const router = express.Router()

router.post("/login",loginUser)
router.get("/current",validateToken,currentUser)

module.exports = router;