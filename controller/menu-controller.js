const express = require("express");
const passport = require("passport");
const router = express.Router();
const db = require("../models");

require("../config/passport")(passport);
router.use(passport.initialize());
router.use(passport.session());

router.get("/users", async (req, res) => {
  try {
    if (req.user) {
      const data = await db.user.findAll();

      res.render("user", { users: data });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.error(error);

    res.status(500).send();
  }
});

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const data = await db.user.findAll({ include: [db.menu] });

      res.render("index", { table: data });
    } catch (error) {
      console.error(error);

      res.status(500).send();
    }
  }
);

router.post(
  "/menu/user_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const data = await db.menu.create({
        ...req.body,
        user_id: req.params.user_id,
      });
      res.redirect("/", { table: data });
    } catch (err) {
      console.error("err");
      res.status(500).send();
    }
  }
);

module.exports = router;
// router.post(
//   "/menu",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     const data = await db.user.create(req.body);

//     res.json(data);
//   }
// );
