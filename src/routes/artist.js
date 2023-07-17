const express = require("express");
const {
  createArtist,
  readArtists,
  readArtistById,
  updateArtist,
  deleteArtistById,
} = require("../controllers/artist");

const artistRouter = express.Router();

artistRouter.post("/", createArtist);

artistRouter.get("/", readArtists);

artistRouter.get("/:id", readArtistById);

artistRouter.patch("/:id", updateArtist);

artistRouter.delete("/:id", deleteArtistById);

module.exports = { artistRouter };
