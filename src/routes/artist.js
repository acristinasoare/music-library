const express = require("express");
const {
  createArtist,
  readArtists,
  readArtistById,
  updateArtist,
  deleteArtistById,
} = require("../controllers/artist");

const { createAlbum } = require("../controllers/album");

const artistRouter = express.Router();

artistRouter.post("/", createArtist);

artistRouter.get("/", readArtists);

artistRouter.get("/:id", readArtistById);

artistRouter.patch("/:id", updateArtist);

artistRouter.delete("/:id", deleteArtistById);

artistRouter.post("/:artistId/albums", createAlbum);

module.exports = { artistRouter };
