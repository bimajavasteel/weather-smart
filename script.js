const apiKey = "a55d6601b8119a6699ec27ce294ad2b7";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
//create ubah gmbr suhu sesuai informasi api, fungsi ada didlam async wait
const iconSuhu = document.querySelector(".suhu-icon");

// membuat async await untuk API

async function cekSuhu(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  let data = await response.json();

  //memunculkan info dri api ke html

  //store data
  const kota = document.querySelector(".city");
  const temp = document.querySelector(".temp");
  const lembab = document.querySelector(".kelembapan");
  const angin = document.querySelector(".angin");
  const terasa = document.querySelector(".feel-like");

  // Error handling
  if (data.cod === "404") {
    // Jika kota tidak ditemukan, tampilkan pesan kesalahan
    kota.innerHTML = " 'Salah masukan nama kota' ";
    temp.textContent = "---";
    lembab.textContent = "---";
    angin.textContent = "---";
    terasa.textContent = "---";
    return;
  }
  console.log(data);

  // nama kota
  kota.innerHTML = data.name;
  //info suhu
  temp.innerHTML = data.main.temp + ` °C`;
  //info kelembapan
  lembab.innerHTML = data.main.humidity + ` %`;
  //info angin
  angin.innerHTML = data.wind.speed + ` km/jam`;
  //info feel-like
  terasa.innerHTML = `Terasa seperti ` + data.main.feels_like + ` °C`;

  //ubah gmbr suhu sesuai informasi api,
  if (data.weather[0].main == "Clouds") {
    iconSuhu.src = "images/clouds.png";
  } else if (data.weather[0].main == "Clear") {
    iconSuhu.src = "images/clear.png";
  } else if (data.weather[0].main == "Rain") {
    iconSuhu.src = "images/rain.png";
  } else if (data.weather[0].main == "Drizzle") {
    iconSuhu.src = "images/drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    iconSuhu.src = "images/mist.png";
  }
}

//buat store tmbol pencari
const pencariInput = document.querySelector(".pencari input");
const tmbolPencari = document.querySelector(".pencari button");
//mebuat fnsi tmbol pencari
tmbolPencari.addEventListener("click", () => {
  cekSuhu(pencariInput.value);
});
//membuat fnsi enter untuk pencarian
pencariInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    cekSuhu(pencariInput.value);
  }
});

cekSuhu("medan");
