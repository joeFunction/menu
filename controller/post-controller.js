// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Post model
const express = require("express");
const router = express.Router();
const db = require("../models");
const path = require("path");

// Routes
// =============================================================
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/blog.html"));
});

// Route to the cms page
router.get("/cms", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/cms.html"));
});

// blog route loads blog.html
router.get("/blog", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/blog.html"));
});

// GET route for getting all of the posts
router.get("/api/posts", async (req, res) => {
  try {
    const query = {};
    if (req.query.author_id) {
      query.author_id = req.query.author_id;
    }

    const data = await db.post.findAll({
      where: query,
      include: [db.author]
    });

    res.json(data);

  } catch (error) {
    console.log(error);

    res.status(500).send();
  }
});

// Get route for retrieving a single post
router.get("/api/posts/:id", async (req, res) => {
  try {
    const data = await db.post.findOne({
      where: {
        id: req.params.id
      },
      include: [db.author]
    });

    res.json(data);

  } catch (error) {
    console.log(error);

    res.status(500).send();
  }
});

// POST route for saving a new post
router.post("/api/posts", async (req, res) => {
  try {
    const data = await db.post.create(req.body);

    res.json(data);

  } catch (error) {
    console.log(error);

    res.status(500).send();
  }
});

// DELETE route for deleting posts
router.delete("/api/posts/:id", async (req, res) => {
  try {
    const data = await db.post.destroy({
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

// PUT route for updating posts
router.put("/api/posts/:id", async (req, res) => {
  try {
    const data = await db.post.update(req.body, {
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

module.exports = router
