const Doctor = require("./../models/doctor");
const jwt = require("jsonwebtoken");
const env = require("./../config/environment");

module.exports.registerDoctor = async function (req, res) {
  try {
    // console.log(req.body);
    let doctorWithName = await Doctor.find({ name: req.body.name });
    let doctorWithUserName = await Doctor.find({
      username: req.body.username,
    });
    let doctorWithEmail = await Doctor.find({ email: req.body.email });

    if (
      doctorWithName.length ||
      doctorWithUserName.length ||
      doctorWithEmail.length ||
      req.body.password != req.body.confirmPassword
    ) {
      console.log("*******************Error while registering Doctor");
      return res.status(401).json({
        message: "Could not register Account!",
      });
    }

    let doctorAccount = await Doctor.create(req.body);

    return res.status(200).json({
      message: "Registered Succesfully",
    });
  } catch (error) {
    console.log("*******************Error while registering Doctor \n", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.doctorLogin = async function (req, res) {
  try {
    let doctor = await Doctor.findOne({ username: req.body.username });

    if (!doctor || req.body.password != doctor.password) {
      return res.status(422).json({
        message: "Invalid username or password",
      });
    }

    return res.status(200).json({
      message: "Logged In Successfully!",
      data: {
        token: jwt.sign(doctor.toJSON(), env.jwt_secret, {
          expiresIn: "100000000",
        }),
      },
    });
  } catch (error) {
    console.log("*******************Error while Logging in Doctor \n", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
