const apikey = "728c2aba91063cb654326f5858a0c093";
const container = document.getElementById("container");
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// api
const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&lang=tr`;

// api'den bilgileri alma
async function lokasyonBilgisi(city) {
  try {
    const resp = await fetch(url(city));
    const respData = await resp.json();

    if (respData.cod === "404") {
      uyariMesaji();
    } else {
      havaDurumuBilgisi(respData);
    }
  } catch (error) {
    uyariMesaji();
  }
}

function havaDurumuBilgisi(data) {
  const temp = dereceCevirme(data.main.temp);

  const weather = document.createElement("div");
  weather.classList.add("weather");

  weather.innerHTML = `
        <h2>
          <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> 
          ${temp}°C 
        </h2>
        <small>${data.weather[0].main} - </small>
        <small><label>${data.sys.country}</label>,</small>
        <small>${data.name}</small>
    `;

  // önceki içeriği sil
  main.innerHTML = "";
  main.appendChild(weather);
}

function dereceCevirme(K) {
  return Math.floor(K - 273.15);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = search.value.trim();

  if (city) {
    lokasyonBilgisi(city);
  } else {
    uyariMesaji();
  }
});

function uyariMesaji() {
  const notif = document.createElement("div");
  notif.classList.add("mesaj");
  notif.innerText = " Konum bilgisi bulunmamaktadır !!! ";
  container.appendChild(notif);

  setTimeout(() => {
    notif.remove();
  }, 2000);

  // sadece ekranı temizle
  main.innerHTML = "";
}
