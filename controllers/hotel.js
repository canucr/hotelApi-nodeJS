const Hotel = require("../models/Hotel.js");
const Room = require("../models/Room.js");

const createHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.create(req.body);
    res.status(201).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
const updateHotel = async (req, res, next) => {
  const { id } = req.params;
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
const deleteHotel = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Hotel.findByIdAndDelete(id);
    res.status(200).json({ message: "Delete is successfully completed..." });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
const getSingleHotel = async (req, res, next) => {
  const { id } = req.params;
  try {
    const hotel = await Hotel.findById(id);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
const getAllHotel = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotel = await Hotel.findById({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max | 999 }, //$gt= greater than, $lt:least than
    }).limit(req.query.limit);
    //direkt Hotel.find() yapmamamızın sebebi filtreleme yani max-min kavramlarını kullabilmek

    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
const typeByCount = async (req, res, next) => {
  try {
    const hotel = await Hotel.countDocuments({ type: "hotel" });
    const villa = await Hotel.countDocuments({ type: "villa" });
    res.status(200).json([
      { type: "hotel", count: hotel },
      { type: "villa", count: villa },
    ]);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
const typeByCity = async (req, res, next) => {
  try {
    const cities = req.query.cities.split(",");

    const hotel = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );

    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  typeByCity,
  typeByCount,
  updateHotel,
  getAllHotel,
  getSingleHotel,
  deleteHotel,
  createHotel,
};
