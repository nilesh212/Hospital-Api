const express = require("express");
const passport = require("passport");
const router = express.Router();

const patientController = require("./../controllers/patients_controller");

router.post("/register", patientController.registerPatient);
router.post("/:id/create_report", patientController.createReport);
router.get("/:id/all_reports", patientController.allReports);

module.exports = router;
