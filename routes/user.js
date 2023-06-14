const { allUser, detailUser, deleteUser, updateUser } = require("../controllers/user.js")
const express = require("express");
const {adminToken,userToken} = require("../middleware/verify.js")

const router = express.Router();

router.get("/allUser",adminToken, allUser)
router.get("/detailUser/:id",userToken, detailUser)
router.delete("/deleteUser/:id",userToken, deleteUser)
router.put("/updateUser/:id",userToken, updateUser)


module.exports = router