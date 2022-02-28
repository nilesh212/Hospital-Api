const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    status: {
      type: "String",
      enum: [
        "Negative",
        "Travelled-Quarantine",
        "Symptoms-Quarantine",
        "Positive-Admit",
      ],
      required: true,
    },
    date: {
      type: "Date",
      required: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
