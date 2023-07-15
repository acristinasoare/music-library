const db = require("../db/index");

const createArtist = async (req, res) => {
  const { name, genre } = req.body;

  try {
    const {
      rows: [artist],
    } = await db.query(
      `INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *`,
      [name, genre]
    );
    res.status(201).json(artist);
  } catch (err) {
    res.status(500).json({ error: "An error occured while creating artist" });
  }
};

const readArtists = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM ARTISTS");
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: "An error occured while readint artist" });
  }
};

module.exports = { createArtist, readArtists };
