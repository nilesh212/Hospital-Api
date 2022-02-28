const express = require("express");
const router = express.Router();
const passport = require("passport");

const homeController = require("./../controllers/home_controller");

router.get("/", homeController.home);
router.use("/doctors", require("./doctors"));
router.use(
  "/patients",
  passport.authenticate("jwt", { session: false }),
  require("./patients")
);

router.get(
  "/reports/:status",
  passport.authenticate("jwt", { session: false }),
  homeController.allReportsWithStatus
);

module.exports = router;
