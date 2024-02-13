const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    ["global"]: "./src/global.js",
    ["home"]: "./src/home.js",
    ["the-work"]: "./src/the-work.js",
    ["about"]: "./src/about.js",
    ["case-study-template"]: "./src/case-study-template.js",
    ["team"]: "./src/team.js",
    ["swamp-originals"]: "./src/swamp-originals.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: "[name]",
    libraryTarget: "umd",
    globalObject: "this",
    umdNamedDefine: true,
    clean: true,
  },
};
