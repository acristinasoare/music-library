const db = require("../db");

const createAlbum = async (req, res) => {
  const { artistId } = req.params;
  const { name, year } = req.body;

  try {
    const {
      rows: [album],
    } = await db.query(
      "INSERT INTO Albums (name, year, artistId) VALUES ($1, $2, $3) RETURNING *",
      [name, year, artistId]
    );
    res.status(201).json(album);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the album." });
  }
};

const readAlbums = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM Albums");
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: "An error occured while reading albums" });
  }
};

const readAlbumById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      rows: [album],
    } = await db.query("SELECT * FROM Albums WHERE ID = $1", [id]);

    if (!album) {
      return res.status(404).json({ message: `album ${id} does not exist` });
    }

    res.status(200).json(album);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occured while reading album by id" });
  }
};

const updateAlbum = async (req, res) => {
  const { id } = req.params;
  const { name, year, artistId } = req.body;

  let query;
  let params;

  if (name && year && artistId) {
    query =
      "UPDATE Albums SET name = $1, year = $2, artistId = $3 WHERE id = $4 RETURNING *";
    params = [name, year, artistId, id];
  } else if (name && year) {
    query = "UPDATE Albums SET name = $1, year = $2 WHERE id = $3 RETURNING *";
    params = [name, year, id];
  } else if (name && artistId) {
    query =
      "UPDATE Albums SET name = $1, artistId = $2 WHERE id = $3 RETURNING *";
    params = [name, artistId, id];
  } else if (year && artistId) {
    query =
      "UPDATE Albums SET year = $1, artistId = $2 WHERE id = $3 RETURNING *";
    params = [year, artistId, id];
  } else if (name) {
    query = "UPDATE Albums SET name = $1 WHERE id = $2 RETURNING *";
    params = [name, id];
  } else if (year) {
    query = "UPDATE Albums SET year = $1 WHERE id = $2 RETURNING *";
    params = [year, id];
  } else if (artistId) {
    query = "UPDATE Albums SET artistId = $1 WHERE id = $2 RETURNING *";
    params = [artistId, id];
  }

  try {
    const {
      rows: [album],
    } = await db.query(query, params);

    if (!album) {
      return res.status(404).json({ message: `album ${id} does not exist` });
    }

    res.status(200).json(album);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};

const deleteAlbumById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      rows: [album],
    } = await db.query("DELETE FROM Albums WHERE ID = $1 RETURNING *", [id]);

    if (!album) {
      return res.status(404).json({ message: `album ${id} does not exist` });
    }

    res.status(200).json(album);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occured while reading album by id" });
  }
};

module.exports = {
  createAlbum,
  readAlbums,
  readAlbumById,
  updateAlbum,
  deleteAlbumById,
};
