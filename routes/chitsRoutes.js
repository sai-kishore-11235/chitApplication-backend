const express = require("express");
const router = express.Router();
const {getChits, updateChit,createChit,getChit,deleteChit} = require("../controllers/ChitController")


router.route("/").get(getChits);

router.route("/").post(createChit);

router.route("/:id").put(updateChit)

router.route("/:id").get(getChit);
router.route("/:id").delete(deleteChit);


module.exports= router;