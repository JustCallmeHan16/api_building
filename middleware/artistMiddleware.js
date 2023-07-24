const mongoose = require("mongoose");
const Artist = require("../database/models/artistModel");

//* id check middleware
const getByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;

  try {
    //* when u use the middleware just return the fun if u don't u will get error
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "ID is not valid" });
    }

    const artist = await Artist.findById({ _id: id });

    if (!artist) {
      return res.status(404).json({ error: "No such artist" });
    }

    req.artist = artist;
    next();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//* create middleware
const createNewArtistMiddleware = async (req, res, next) => {
  const { name, song } = req.body;

  try {
    const artistBox = [];

    if (!name) {
      artistBox.push("name");
    }

    if (!song) {
      artistBox.push("song");
    }

    if (artistBox.length > 0) {
      return res.status(404).json({ error: "All fileds must be fill" });
    }

    const aritst = {
      name: name,
      song: song,
    };

    const newArtist = await Artist.create(aritst);

    req.artist = newArtist;
    next();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//* update or edit artist
const updateArtistMiddleware = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "ID is not valid" });
    }

    const artist = await Artist.findOneAndUpdate({ _id: id }, { ...req.body });

    if (!artist) {
      return res.status(404).json({ error: "No such artist" });
    }
    req.update = artist;
    next();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//* deleteArtistMiddleware
const deleteArtistMiddleware = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "ID is not valid" });
    }

    const artist = await Artist.findByIdAndDelete({ _id: id });

    if (!artist) {
      return res.status(404).json({ error: "No such artist" });
    }

    req.delete = artist;
    next();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getByIdMiddleware,
  createNewArtistMiddleware,
  updateArtistMiddleware,
  deleteArtistMiddleware,
};
