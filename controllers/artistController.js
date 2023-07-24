const { default: mongoose } = require("mongoose");
const Artist = require("../database/models/artistModel");

//* get all artists
const getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find().sort({ creatAt: -1 });

    if (artists.length === 0) {
      return res.status(500).json({ message: "Empty" });
    }

    res.status(200).json(artists);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//* get artist by id
const getArtistById = async (req, res) => {
  const artist = req.artist;
  res.status(200).json(artist);
};

//* create artist
const createArtist = async (req, res) => {
  const newArtist = req.artist;
  res.status(201).json(newArtist);
};

//* delete artist
const deleteArtistById = async (req, res) => {
  const deleteArtist = req.delete;
  res.status(200).json(deleteArtist);
};

//* update artist
const updateArtist = async (req, res) => {
  const artist = req.update;
  res.status(404).json(artist);
};

module.exports = {
  getAllArtists,
  getArtistById,
  createArtist,
  deleteArtistById,
  updateArtist,
};
