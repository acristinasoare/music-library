const express = require("express");
const { createArtist, readArtists } = require("../controllers/artist");

const artistRouter = express.Router();

artistRouter.post("/", createArtist);

artistRouter.get("/", readArtists);

module.exports = { artistRouter };
