const request = require("request");

const forecast = (long, lat, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=378ded7c846cfd0a53dfadaed48d1df5&query=" +
    lat +
    "," +
    long +
    "";
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        temperature: response.body.current.temperature,
        feelslike: response.body.current.feelslike,
        location: response.body.location.name,
        country: response.body.location.country,
      });
    }
  });
};

module.exports = forecast;
