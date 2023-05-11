const { Router } = require("express");
const { getAllDocuments, insertDocument } = require("../utilities/db-utils");

const postRoutes = Router();

postRoutes.get("/", (req, res) => {
  getAllDocuments("posts").then(data => {
    res.json(data);
  });
});

postRoutes.post("/", (req, res) => {
  insertDocument("posts", req.body).then(data => {
    res.json(data);
  });
});

module.exports = { postRoutes };
