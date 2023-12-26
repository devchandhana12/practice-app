module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  rules: [
    {
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /(node_modules|bower_components)/,
      loader: "babel-loader",
      options: { presets: ["@babel/env", "@babel/preset-react"] },
    },
  ],
};
