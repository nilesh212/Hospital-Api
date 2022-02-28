const Report = require("./../models/report");

module.exports.home = function (req, res) {
  return res.status(200).json({
    title: "Hospital Cell",
    body: "Welcome to the Hospital Cell API",
  });
};

module.exports.allReportsWithStatus = async function (req, res) {
  try {
    let reports = await Report.find(
      { status: req.params.status },
      { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }
    )
      .populate("patient", " -_id -createdAt -updatedAt -__v")
      .populate("doctor", "-password -_id -createdAt -updatedAt -__v");

    if (!reports) {
      return res.status(401).json({
        message: "No reports!",
      });
    }

    return res.status(200).json({
      message: "Reports Found",
      reports: reports,
    });
  } catch (error) {
    console.log(
      "**************************** Error while getting all reports of a specific status\n",
      error
    );
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
