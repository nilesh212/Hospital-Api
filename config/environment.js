const fs = require("fs");
const path = require("path");
const rfs = require("rotating-file-stream").createStream;

const logDirectory = path.join(__dirname, "../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs("access.log", {
  interval: "1d",
  path: logDirectory,
});

const development = {
  name: "development",
  jwt_secret: "fqUTJemNGgAAD9ysZh9CEMxuiPGObUtG",
  db: "hospitalCell_development",
  morgan: {
    mode: "dev",
    options: { stream: accessLogStream },
  },
};

const production = {
  name: process.env.HOSPITAL_ENVIRONMENT,
  jwt_secret: process.env.HOSPITAL_JWT_SECRET,
  db: process.env.HOSPITAL_DB,
  morgan: {
    mode: "combined",
    options: { stream: accessLogStream },
  },
};

module.exports =
  eval(process.env.HOSPITAL_ENVIRONMENT) == undefined
    ? development
    : eval(process.env.HOSPITAL_ENVIRONMENT);
