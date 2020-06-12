require("dotenv").config();

const express = require("express");
const webpackMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const compression = require("compression");

const app = express();
app.use(compression());

const webpackConfig = require("./webpack.config.js");

if (process.env.NODE_ENV === "production") {
  webpackConfig.plugins.push(
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  );
}

app.use(webpackMiddleware(webpack(webpackConfig)));

app.use("*", (req, res) => {
  res.redirect("/");
});

const PORT = process.env.PORT || 8081;

const server = app.listen(PORT, () => {
  const port = server.address().port;
  const host = server.address().address;

  console.log("------------ %s ------------", "Server Info");
  console.log("Nodejs vsersion : %s", process.version);
  console.log("Server Port : %s", port);
  console.log("Server Address : %s", host);
  console.log(`Listening at http://localhost:${PORT}`);
});
