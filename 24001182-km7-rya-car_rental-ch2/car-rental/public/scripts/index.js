document.addEventListener("DOMContentLoaded", () => {
  const driverElement = document.getElementById("driver");
  const dateElement = document.getElementById("date");
  const timeElement = document.getElementById("time");
  const searchButtonElement = document.getElementById("search");

  const evaluateButtonState = () => {
    const driverIsValid = driverElement.value !== driverElement.options[0].value;
    const dateIsValid = dateElement.value !== "";
    const timeIsValid = timeElement.value !== timeElement.options[0].value;

    searchButtonElement.disabled = !(driverIsValid && dateIsValid && timeIsValid);
  }

  evaluateButtonState();

  driverElement.addEventListener("change", evaluateButtonState);
  dateElement.addEventListener("change", evaluateButtonState);
  timeElement.addEventListener("change", evaluateButtonState);
});
