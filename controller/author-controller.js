const express = require("express");
const router = express.Router();
const db = require("../models");
const path = require("path");

// authors route loads author-manager.html
router.get("/authors", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/author-manager.html"));
});

router.get("/api/authors", async (req, res) => {
  try {
    const data = await db.author.findAll({ include: [db.post] });

    res.json(data);

  } catch (error) {
    console.log(error);

    res.status(500).send();
  }
});

router.get("/api/authors/:id", async (req, res) => {
  try {
    const data = await db.author.findOne({
      where: {
        id: req.params.id
      },
      include: [db.post]
    });

    res.json(data);

  } catch (error) {
    console.log(error);

    res.status(500).send();
  }
});

router.post("/api/authors", async (req, res) => {
  try {
    const data = await db.author.create(req.body);

    res.json(data);

  } catch (error) {
    console.log(error);

    res.status(500).send();
  }
});

router.delete("/api/authors/:id", async (req, res) => {
  try {
    const data = await db.author.destroy({
      where: {
        id: req.params.id
      }
    });

    res.json(data);

  } catch (error) {
    console.log(error);

    res.status(500).send();
  }
});

module.exports = router;
