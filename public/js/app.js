console.log("Client side javascriot loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageThree = document.querySelector("#message-3");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        const tempAndFeels =
          "It is " +
          data.temperature +
          " Celsium degrees and feels like " +
          data.feelslike +
          " Celsium degrees";
        const windAndHumidity =
          "The wind speed is " +
          data.wind_speed +
          "km/h and the humidity is " +
          data.humidity +
          "%";
        messageOne.textContent =
          data.address + ", " + data.region + ", " + data.country;
        messageTwo.textContent = tempAndFeels;
        messageThree.textContent = windAndHumidity;
      }
    });
  });
});
