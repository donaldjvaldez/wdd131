// Static values based on Dominican Republic's climate
const temperature = 29; // °C
const windSpeed = 12;   // km/h
const unit = "C";

let windChill = "N/A";
if (temperature <= 10 && windSpeed > 4.8) {// Determine if wind chill is applicable
    windChill = calculateWindChill(temperature, windSpeed) + "°C";
}


// Display all weather info in order
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#temperature").textContent = `${temperature}°${unit}`;
    document.querySelector("#conditions").textContent = "Sunny";
    document.querySelector("#windspeed").textContent = `${windSpeed} km/h`;
    document.querySelector("#windchill").textContent = windChill;
});




//Footer//
const yearSpan = document.querySelector("#currentyear");
const today = new Date();
yearSpan.textContent = today.getFullYear();


const lastModifiedSpan = document.querySelector("#lastModified");
lastModifiedSpan.textContent = `Last Modified: ${document.lastModified}`;