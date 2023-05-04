const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  node: false,
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
