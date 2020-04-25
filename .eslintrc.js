module.exports = {
  parser: "babel-eslint",
  extends: "airbnb",
  env: {
    browser: true,
    node: true,
  },
  rules: {
    "no-console": 0,
    quotes: 0,
    "linebreak-style": [0, "error", "windows"],
  },
};
