const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup hadnlebars engines and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectory));

// app.com
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Yuriy",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "Yuriy",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Yuriy",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address || req.query.address.length === 0) {
    return res.send({
      error: "No location provided",
    });
  }

  geocode(req.query.address, (error, data = {}) => {
    if (error) {
      return res.send({ error: error });
    }
    console.log("Error", error);
    console.log("Data", data);

    forecast(data.long, data.lat, (error, data) => {
      if (error) {
        return console.log(error);
      }
      // console.log("Error", error);
      // console.log("Data", data);
      res.send({
        address: data.location,
        country: data.country,
        temperature: data.temperature,
        feelslike: data.feelslike,
        country: data.country,
        wind_speed: data.wind_speed,
        humidity: data.humidity,
        region: data.region,
      });
    });
  });
});

// app.get("/products", (req, res) => {
//   if (!req.query.search) {
//     return res.send({
//       error: "You must provide a search term",
//     });
//   }

//   console.log(req.query.search);

//   res.send({
//     products: [],
//   });
// });

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorName: "Article has been found",
    title: "404",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorName: "Page not found",
    title: "404",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
