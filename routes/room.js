const {getAllRoom,getDetailRoom,deleteRoom,updateRoom,createRoom} = require("../controllers/room.js")
const express = require("express");
const {adminToken} = require("../middleware/verify.js")

const router = express.Router();

router.get("/getAllRoom", getAllRoom)
router.get("/getDetailRoom/:id", getDetailRoom)
router.put("/updateRoom/id",adminToken, updateRoom)
router.post("/createRoom/:id/:hotelid",adminToken, createRoom)
router.delete("/deleteRoom/:id/:hotelid",adminToken, deleteRoom)








module.exports = router 