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

const { authorizationMiddleware } = require("../auth/authMiddleware");

router.use(authorizationMiddleware);

router.get("/", getAllArtists);

router.get("/:id", getByIdMiddleware, getArtistById);

router.post("/", createNewArtistMiddleware, createArtist);

router.delete("/:id", deleteArtistMiddleware, deleteArtistById);

router.patch("/:id", updateArtistMiddleware, updateArtist);

router.use("*", (req, res) => {
  res.redirect("/api/artist");
});

module.exports = router;
