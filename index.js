const weatherApi = "https://api.weather.gov/alerts/active?area=";

const input = document.getElementById("state-input");
const button = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

function fetchWeatherData(state) {
  if (!state) {
    displayError("Invalid input");
    return;
  }

  fetch(`${weatherApi}${state.toUpperCase()}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network failure");
      }
      return res.json();
    })
    .then((data) => {
      displayWeather(data);
      input.value = ""; // ✅ clear input
    })
    .catch((err) => {
      displayError(err.message);
    });
}

function displayWeather(data) {
  alertsDisplay.innerHTML = "";
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden"); // ✅ hide error on success

  const alerts = data.features || [];

  const heading = document.createElement("h2");
  heading.textContent = `Weather Alerts: ${alerts.length}`;
  alertsDisplay.appendChild(heading);

  alerts.forEach((alert) => {
    const p = document.createElement("p");
    p.textContent = alert.properties.headline;
    alertsDisplay.appendChild(p);
  });
}

function displayError(message) {
  alertsDisplay.innerHTML = "";
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden"); // ✅ show error
}

button.addEventListener("click", () => {
  fetchWeatherData(input.value.trim());
});
