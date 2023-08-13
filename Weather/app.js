"use strict";

//api key for resource access
const API_KEY = `befb21f2b289d368bca1d14999c92e50`;

//selectors for dom manipulatitudeion
const timeZone = document.querySelector(".location-timeZone");
const weatherIcon = document.querySelector(".weather-icon");
const degree = document.querySelector(".temperature-degree");
const degree_notation = document.querySelector(".degree");
const desc = document.querySelector(".temperature-desc");
const degreeNotation = document.querySelector(".degree");
//variable declaration
let longitude;
let latitude;
let temp;


//location-error handler method
const showError = function(err){
    timeZone.textContent = err.message;
    degree.textContent="";
    degreeNotation.textContent="";
    desc.textContent="";

}

//geoLocation succesful response handler function
const success = (position) => {
   // console.log(pos);
   //latitude-longitude mapping
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      //api call
      const api = `https://api.openweathermap.org/data/2.5/weather?&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
    //fetching data from api
      fetch(api)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const { main, name, sys } = data;
          ({ temp } = main);
          //svg icon assignment
          const { icon } = data.weather[0];

          const { description } = data.weather[0];
          //displaying current temperature
          degree.textContent = Math.floor(temp - 273.15);
          //click event management
          //arrow function for degree conversion "onClick"
          degree.addEventListener("click", () => {

            let temperatureVal;
            //celsius to faren-heit conversion
            if (degreeNotation.textContent == "C") {
              temperatureVal = Math.floor((temp - 273.15) * (9 / 5) + 32);
              degree.textContent = temperatureVal;
              degreeNotation.textContent = "F";
            } 
            //faren-heit to celsius conversion
            else {
              temperatureVal = Math.floor(temp - 273.15);
              degree.textContent = temperatureVal;
              degreeNotation.textContent = "C";
            }
          });

          //updating dom with location & temperature values
          timeZone.textContent = name + "," + sys.country;
          desc.textContent = description;
          //svg modification dynamically
          weatherIcon.innerHTML = `<img src="icons/${icon}.png"/>`;
        });
    
}



//load eventListner
window.addEventListener("load", () => {
  if (navigator.geolocation) {
   //current location retrival & handler
   navigator.geolocation.getCurrentPosition( success,showError);
  }
});
