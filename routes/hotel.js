const {typeByCity, typeByCount, updateHotel, getAllHotel, getSingleHotel, deleteHotel,createHotel,} = require("../controllers/hotel.js")
const express = require("express")
const {adminToken} = require("../middleware/verify.js")

const router =express.Router();
router.get("/typeByCity", typeByCity)
router.get("/typeByCount", typeByCount)
router.post("/createHotel",adminToken, createHotel)
router.put("/updateHotel/:id",adminToken, updateHotel)
router.delete("/deleteHotel:id",adminToken, deleteHotel)
router.get("/getSingleHotel:id", getSingleHotel)
router.get("/getAllHotel", getAllHotel)



module.exports = router