const { Router } = require("express");

const {
  getAllDocuments,
  insertDocument,
  deleteDocument,
  getFilteredDocuments,
} = require("../utilities/db-utils");

const songsRoutes = Router();

songsRoutes.get("/", (req, res) => {
  getAllDocuments("songs").then(data => res.json(data));
});

//   /songs/filtered?rating=3
songsRoutes.get("/filtered", (req, res) => {
  const rating = Number(req.query.rating);
  getFilteredDocuments("songs", { rating: rating }).then(data =>
    res.json(data)
  );
});

//   /songs/filter-less-than?rating=3
songsRoutes.get("/filter-less-than", (req, res) => {
  const rating = Number(req.query.rating);
  getFilteredDocuments("songs", { rating: { $lte: rating } }).then(data =>
    res.json(data)
  );
});

//to create a NEW object in the database
songsRoutes.post("/", (req, res) => {
  ///:id converts this to an objectid
  const body = req.body;
  insertDocument("songs", body).then(data => res.json([]));
});

songsRoutes.delete("/:id", (req, res) => {
  const id = req.params.id;
  deleteDocument("songs", id).then(x => {
    res.json([]);
  });
});

module.exports = { songsRoutes };

//how do we know somthing is a promise?  It comes with a .then()
//advantage of promise,

//[PUT] entire document is replaced

//[Patch] does just the fields changed, but does not add new fields nor does it delete fields.  Only the existing fields are changed.
