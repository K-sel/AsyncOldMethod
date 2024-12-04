"use strict";

const req = new XMLHttpRequest();

req.open(
  "GET",
  "http://transport.opendata.ch/v1/stationboard?station=lausanne"
);
req.send();

req.addEventListener("load", () => {
  document.querySelector("main").classList.add("loaded");
  const data = JSON.parse(req.response);
  console.log(data);

  document.querySelector("h1").textContent = data.station.name;

  data.stationboard.forEach((connexion) => {
    let trainCategory = connexion.category;
    let destination = connexion.to;
    let deparature = new Date(connexion.stop.departure).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    

    let html = `  <article>
                      <div class="time">${deparature}</div>
                       <div class="category" data-category="${trainCategory}">${trainCategory}</div>
                      <div class="destination">${destination}</div>
                  </article>
  `;

    document.querySelector("#board").insertAdjacentHTML("afterbegin", html);
  });
});
