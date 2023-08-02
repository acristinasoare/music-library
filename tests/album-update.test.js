const { expect } = require("chai");
const request = require("supertest");
const db = require("../src/db");
const app = require("../src/app");

describe("PATCH /albums/{id}", () => {
  let album;
  let artist;
  beforeEach(async () => {
    const { rows: artistRows } = await db.query(
      "INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *",
      ["Tame Impala", "rock"]
    );

    artist = artistRows[0];

    const { rows: albumRows } = await db.query(
      "INSERT INTO Albums (name, year, artistid) VALUES ($1, $2, $3) RETURNING *",
      ["Currents", 2015, artist.id]
    );

    album = albumRows[0];
  });

  describe("Update Album", () => {
    it("updates the album and returns the updated record", async () => {
      const { status, body } = await request(app)
        .patch(`/albums/${album.id}`)
        .send({ name: "something different", year: 2023, artistId: artist.id });

      expect(status).to.equal(200);

      expect(body).to.deep.equal({
        id: album.id,
        name: "something different",
        year: 2023,
        artistid: artist.id,
      });
    });

    it("returns a 404 if the album does not exist", async () => {
      const { status, body } = await request(app)
        .patch("/albums/999999999")
        .send({ name: "something different", year: 2023 });

      expect(status).to.equal(404);
      expect(body.message).to.equal("album 999999999 does not exist");
    });
  });
});
