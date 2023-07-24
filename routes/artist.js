const express = require("express");
const router = express.Router();
const {
  getAllArtists,
  getArtistById,
  createArtist,
  deleteArtistById,
  updateArtist,
} = require("../controllers/artistController");

//* Middleware
const {
  getByIdMiddleware,
  createNewArtistMiddleware,
  updateArtistMiddleware,
  deleteArtistMiddleware,
} = require("../middleware/artistMiddleware");

router.get("/artist", getAllArtists);

router.get("/artist/:id", getByIdMiddleware, getArtistById);

router.post("/artist", createNewArtistMiddleware, createArtist);

router.delete("/artist/:id", deleteArtistMiddleware, deleteArtistById);

router.patch("/artist/:id", updateArtistMiddleware, updateArtist);

module.exports = router;
