const { expect } = require("chai");
const request = require("supertest");
const app = require("../src/app");
const db = require("../src/db/index");

describe("Create artist", () => {
  describe("POST /artists", () => {
    it("creates a new artist in the database", async () => {
      const { status, body } = await request(app).post("/artists").send({
        name: "Tame Impala",
        genre: "rock",
      });

      expect(status).to.equal(201);
      expect(body.name).to.equal("Tame Impala");
      expect(body.genre).to.equal("rock");

      const {
        rows: [artistData],
      } = await db.query(`SELECT * FROM Artists WHERE id = ${body.id}`); //destructuring used  to extract the 'rows property from the result object
      //returned by the 'db.query()' method
      expect(artistData.name).to.equal("Tame Impala");
      expect(artistData.genre).to.equal("rock");
    });
  });
});
