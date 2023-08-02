const express = require("express");
const {
  readAlbums,
  readAlbumById,
  updateAlbum,
  deleteAlbumById,
} = require("../controllers/album");

const albumRouter = express.Router();

albumRouter.get("/", readAlbums);
albumRouter.get("/:id", readAlbumById);
albumRouter.patch("/:id", updateAlbum);
albumRouter.delete("/:id", deleteAlbumById);

module.exports = {
  albumRouter,
};
