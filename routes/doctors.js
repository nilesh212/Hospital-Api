const express = require("express");

const router = express.Router();

const doctorsController = require("./../controllers/doctors_controller");

router.post("/register", doctorsController.registerDoctor);
router.get("/login", doctorsController.doctorLogin);

module.exports = router;
