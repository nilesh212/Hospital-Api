const Patient = require("./../models/patient");
const Report = require("./../models/report");
const Doctor = require("./../models/doctor");

module.exports.registerPatient = async function (req, res) {
  try {
    let patientWithName = await Patient.findOne({ name: req.body.name });
    let patientWithEmail = await Patient.findOne({ email: req.body.email });
    let patientWithPhone = await Patient.findOne({ phone: req.body.phone });

    if (patientWithName || patientWithEmail || patientWithPhone) {
      let patient;
      if (patientWithName) patient = patientWithName;
      else if (patientWithEmail) patient = patientWithEmail;
      else patient = patientWithPhone;
      return res.status(401).json({
        message: "Patient Already Exists!",
        patient: {
          _id: patient._id,
          name: patient.name,
          phone: patient.phone,
          email: patient.email,
          age: patient.age,
        },
      });
    }

    if (req.body.phone >= 1000000000 && req.body.phone <= 9999999999) {
      let patient = await Patient.create(req.body);
      return res.status(200).json({
        message: "Patient Registered!",
        patient: {
          _id: patient._id,
          name: patient.name,
          phone: patient.phone,
          email: patient.email,
          age: patient.age,
        },
      });
    } else {
      return res.status(200).json({
        message: "Patient Not Registered",
        error: "Please enter Mobile number of 10 digit!",
      });
    }
  } catch (error) {
    console.log("************** Error while registering Patient \n", error);
    return res.status(401).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.createReport = async function (req, res) {
  try {
    let date = new Date();

    if (!req.body.status) {
      return res.status(401).json({
        message: "Give status",
      });
    }
    await Report.create({
      status: req.body.status,
      date: date,
      patient: req.params.id,
      doctor: req.user,
    });

    let report = await Report.find(
      { patient: req.params.id },
      { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }
    )
      .populate("patient", "-_id -createdAt -updatedAt -__v")
      .populate("doctor", "-password -_id -createdAt -updatedAt -__v");

    // console.log(report);
    return res.status(200).json({
      message: "Report created successfully",
      report: report,
    });
  } catch (error) {
    console.log(
      "**************************** Error while creating report\n",
      error
    );
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.allReports = async function (req, res) {
  try {
    let reports = await Report.find(
      { patient: req.params.id },
      { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }
    )
      .populate("patient", "-_id -createdAt -updatedAt -__v")
      .populate("doctor", "-password -_id -createdAt -updatedAt -__v");

    if (!reports) {
      return res.status(401).json({
        message: "NO reports",
      });
    }

    return res.status(200).json({
      message: "Reports Found!",
      reports: reports,
    });
  } catch (error) {
    console.log(
      "**************************** Error while getting all reports of a specific patient\n",
      error
    );
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
