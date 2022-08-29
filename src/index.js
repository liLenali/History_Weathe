//ТЕСТ___-История

function getMonth(date) {
  let days = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return days[date.getMonth()];
}

function getWeekDay(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[date.getDay()];
}

function getWeekDayShort(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function imgClouds(clouds1) {
  var imgs = new Array(
    "img/cloud.png",
    "img/rain.png",
    "img/sun_cloud.png",
    "img/sun_rain_cloud.png",
    "img/sun.png",
    "img/haze.png"
  );
  //
  let imgC111 = document.getElementById("imgCloud");
  if (clouds1 === "clear sky") {
    //чистое небо
    imgC111.src = imgs[0];
  }
  if (clouds1 === "few clouds") {
    //несколько облаков
    imgC111.src = imgs[1];
  }
  if (clouds1 === "scattered clouds") {
    //рассеянные облака
    imgC111.src = imgs[4];
  }
  if (clouds1 === "broken clouds") {
    //разбитые облака
    imgC111.src = imgs[5];
  }
  if (clouds1 === "shower rain") {
    //душ дождь
    imgC111.src = imgs[5];
  }
  if (clouds1 === "rain") {
    //дождь
    imgC111.src = imgs[5];
  }
  if (clouds1 === "thunderstorm") {
    //гроза
    imgC111.src = imgs[5];
  }
  if (clouds1 === "snow") {
    //снег
    imgC111.src = imgs[5];
  }
  if (clouds1 === "mist") {
    //туман
    imgC111.src = imgs[5];
  }
}

function printDate(date) {
  var hours = date.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  var min = date.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  var day = date.getDate();

  document.getElementById("result_weekDay").innerHTML = getWeekDay(date) + ", ";
  document.getElementById("result_month").innerHTML = getMonth(date);
  document.getElementById("result_day").innerHTML = day;
  document.getElementById("result_hours").innerHTML = hours + ":";
  document.getElementById("result_min").innerHTML = min;
}
//--------------------------
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let min = date.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }

  let day = date.getDate();
  document.getElementById("last").innerHTML = "Last updated: ";
  document.getElementById("result_weekDay").innerHTML = getWeekDay(date) + ", ";
  document.getElementById("result_month").innerHTML = getMonth(date);
  document.getElementById("result_day").innerHTML = day;
  document.getElementById("result_hours").innerHTML = hours + ":";
  document.getElementById("result_min").innerHTML = min;
}
//------------------------
function formatDatePrognoz(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let min = date.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }

  let day = date.getDate();

  let weekday = getWeekDayShort(date);
  result = weekday + day;
  return result;
}
//-----------------------------------------------
function searchCity(city) {
  var apiKey = "50e56fa212f8363db506fc2abece70d9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then((res) => {
    console.log("ФУНКЦИЯ ___  searchCity    res");
    console.log(res);

    let temperatureElement = document.querySelector("h1");
    celsiusTemperature = res.data.main.temp;
    temperatureElement.innerHTML = Math.round(celsiusTemperature);

    console.log(res.data.main.temp);
    console.log(res.data.wind.speed);
    let h1 = document.querySelector("h1");
    h1.innerHTML = Math.round(res.data.main.temp);
    document.getElementById("result_humidity").innerHTML =
      res.data.main.humidity;
    document.getElementById("result_wind").innerHTML =
      "Wind: " + res.data.wind.speed + "km/h";
    document.getElementById("result_city").innerHTML = city;
    document.getElementById("result_clouds").innerHTML =
      res.data.weather[0].description;
    let clouds = res.data.weather[0].description;
    console.log(clouds);

    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`
    );
    //imgClouds(clouds);
    console.log("ШО это   ???    res.data.dt * 1000");
    console.log(res.data.dt * 1000);
    formatDate(res.data.dt * 1000);
    console.log("НИЖЕ  formatDate(res.data.dt * 1000)");
    console.log(formatDate(res.data.dt * 1000));
    //
    //

    console.log(res.data.coord);
    getForecast(res.data.coord);
    //
    //

    HistoryP(res.data.coord);
  });
}

//**********==================================== */
//**********==================================== */
function getForecast(coordinates) {
  console.log(coordinates);
  console.log("+++++++++++++++++++++++++++++++");
  var apiKey = "50e56fa212f8363db506fc2abece70d9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;
  // это АПИ для прогноза
  axios.get(apiUrl).then((res) => {
    console.log(res.data); // здесь мы выводим наши данные откуда можно взять подневной и почасовой прогноз
    console.log(res.data.daily); // выводим прогноз на 8 дней массив
    console.log(res.data.daily[0].temp.max);
    console.log("+++++++++++++++____________++++++++++++++++");

    //
    document.getElementById("temp-1").innerHTML =
      Math.round(res.data.daily[1].temp.max) + "°C";
    document.getElementById("temp-1i").innerHTML =
      Math.round(res.data.daily[1].temp.min) + "°C";
    document.getElementById("weekday-1").innerHTML = formatDatePrognoz(
      res.data.daily[1].dt * 1000
    );
    let iconElement1 = document.querySelector("#icon-1");
    iconElement1.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${res.data.daily[1].weather[0].icon}@2x.png`
    );

    //
    //
    document.getElementById("temp-2").innerHTML =
      Math.round(res.data.daily[2].temp.max) + "°C";
    document.getElementById("temp-2i").innerHTML =
      Math.round(res.data.daily[2].temp.min) + "°C";
    document.getElementById("weekday-2").innerHTML = formatDatePrognoz(
      res.data.daily[2].dt * 1000
    );
    let iconElement2 = document.querySelector("#icon-2");
    iconElement2.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${res.data.daily[2].weather[0].icon}@2x.png`
    );

    //

    //
    document.getElementById("temp-3").innerHTML =
      Math.round(res.data.daily[3].temp.max) + "°C";
    document.getElementById("temp-3i").innerHTML =
      Math.round(res.data.daily[3].temp.min) + "°C";
    document.getElementById("weekday-3").innerHTML = formatDatePrognoz(
      res.data.daily[3].dt * 1000
    );
    let iconElement3 = document.querySelector("#icon-3");
    iconElement3.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${res.data.daily[3].weather[0].icon}@2x.png`
    );

    //

    //
    document.getElementById("temp-4").innerHTML =
      Math.round(res.data.daily[4].temp.max) + "°C";
    document.getElementById("temp-4i").innerHTML =
      Math.round(res.data.daily[4].temp.min) + "°C";
    document.getElementById("weekday-4").innerHTML = formatDatePrognoz(
      res.data.daily[4].dt * 1000
    );
    let iconElement4 = document.querySelector("#icon-4");
    iconElement4.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${res.data.daily[4].weather[0].icon}@2x.png`
    );

    //
    //
    document.getElementById("temp-5").innerHTML =
      Math.round(res.data.daily[5].temp.max) + "°C";
    document.getElementById("temp-5i").innerHTML =
      Math.round(res.data.daily[5].temp.min) + "°C";
    document.getElementById("weekday-5").innerHTML = formatDatePrognoz(
      res.data.daily[5].dt * 1000
    );
    let iconElement5 = document.querySelector("#icon-5");
    iconElement5.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${res.data.daily[5].weather[0].icon}@2x.png`
    );

    //
    //

    //
  });
}

//**********==================================== */
//**********==================================== */

function search(event) {
  event.preventDefault();

  var cityInput = document.querySelector("#city-input");

  var city = cityInput.value;
  searchCity(city);
}
//------------+++++++++++++++++++++++
let apiKey = "50e56fa212f8363db506fc2abece70d9";

function searchLocation(position) {
  let apiKey = "50e56fa212f8363db506fc2abece70d9";

  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=en&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then((res) => {
    console.log("Функция searchLocation    res");
    console.log(res);
    console.log(res.data.main.temp);
    console.log(res.data.wind.speed);

    //
    //

    let temperatureElement = document.querySelector("h1");
    celsiusTemperature = res.data.main.temp;
    temperatureElement.innerHTML = Math.round(celsiusTemperature);

    //
    //

    let h1 = document.querySelector("h1");
    h1.innerHTML = Math.round(res.data.main.temp);
    document.getElementById("result_humidity").innerHTML =
      res.data.main.humidity;
    document.getElementById("result_wind").innerHTML =
      "Wind: " + res.data.wind.speed + "km/h";
    document.getElementById("result_clouds").innerHTML =
      res.data.weather[0].description;
    document.getElementById("result_city").innerHTML = res.data.name;
    let clouds = res.data.weather[0].description;
    //imgClouds(clouds);

    let iconElementL = document.querySelector("#icon");
    iconElementL.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`
    );
    formatDate(res.data.dt * 1000);
    getForecast(res.data.coord);
    //HistoryP(res.data.coord);
  });
}
//*************************** *

function getPrognoz() {
  //event.preventDefault();
  navigator.geolocation.getCurrentPosition(Prognoz);
}

function Prognoz(position) {
  let apiKeyP = "50e56fa212f8363db506fc2abece70d9";
  let latP = position.coords.latitude;
  let lonP = position.coords.longitude;
  let apiUrlP = `https://api.openweathermap.org/data/2.5/forecast/?lat=${latP}&lon=${lonP}&units=metric&count=10&appid=${apiKeyP}`;
  //let apiUrlPP = `http://api.openweathermap.org/data/2.5/weather?lat=${latP}&lon=${lonP}&lang=en&units=metric&appid=${apiKey}`;

  axios.get(apiUrlP).then((res) => {
    console.log("res  ниже ");
    console.log(res);
    console.log("res.data.list[1].main.temp   ниже");
    console.log(res.data.list[1].main.temp);

    console.log(res.data.list[1].wind.speed);
    console.log(res.data.list[1].weather[0].main);
    // эти данне надо пораспихивать в прогнозы выюрать с каким индексом будет подходящий день и час
    //
    document.getElementById("temp-1").innerHTML =
      Math.round(res.data.list[9].main.temp) + "°C";
    document.getElementById("weekday-1").innerHTML = formatDatePrognoz(
      res.data.list[9].dt * 1000
    );
    let iconElement1 = document.querySelector("#icon-1");
    iconElement1.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${res.data.list[9].weather[0].icon}@2x.png`
    );

    //
    document.getElementById("temp-2").innerHTML =
      Math.round(res.data.list[17].main.temp) + "°C";
    document.getElementById("weekday-2").innerHTML = formatDatePrognoz(
      res.data.list[17].dt * 1000
    );
    let iconElement2 = document.querySelector("#icon-2");
    iconElement2.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${res.data.list[17].weather[0].icon}@2x.png`
    );
    //

    document.getElementById("temp-3").innerHTML =
      Math.round(res.data.list[24].main.temp) + "°C";
    document.getElementById("weekday-3").innerHTML = formatDatePrognoz(
      res.data.list[24].dt * 1000
    );
    let iconElement3 = document.querySelector("#icon-3");
    iconElement3.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${res.data.list[24].weather[0].icon}@2x.png`
    );
    //

    document.getElementById("temp-4").innerHTML =
      Math.round(res.data.list[33].main.temp) + "°C";
    document.getElementById("weekday-4").innerHTML = formatDatePrognoz(
      res.data.list[33].dt * 1000
    );
    let iconElement4 = document.querySelector("#icon-4");
    iconElement4.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${res.data.list[33].weather[0].icon}@2x.png`
    );
    //

    document.getElementById("temp-5").innerHTML =
      Math.round(res.data.list[39].main.temp) + "°C";
    document.getElementById("weekday-5").innerHTML = formatDatePrognoz(
      res.data.list[39].dt * 1000
    );
    let iconElement5 = document.querySelector("#icon-5");
    iconElement5.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${res.data.list[39].weather[0].icon}@2x.png`
    );
  });
}
//******************************************************************** */
//******************************************************************** */

//*************************** *

//function getHistory() {
//event.preventDefault();
//navigator.geolocation.getCurrentPosition(HistoryP);
//}

function HistoryP(coordinates) {
  let apiKeyH = "50e56fa212f8363db506fc2abece70d9";

  console.log("____Начало функции   HistoryP _____");

  let apiUrlH = `https://history.openweathermap.org/data/2.5/history/city?lat=${coordinates.lat}&lon=${coordinates.lon}&type=day&units=metric&appid=${apiKeyH}`;
  //let apiUrlH = `http://history.openweathermap.org/data/2.5/history/city?lat=${coordinates.lat}&lon=${coordinates.lon}&type=hour&start=${startH}&end=${endH}&appid=${apiKeyH}`;
  // это АПИ для ИСТОРИИ
  axios.get(apiUrlH).then((res) => {
    console.log(
      "res.data  -сейчас должен быть сам массив__ПЕРВЫЙ раз печатаем"
    );
    console.log(res.data); // здесь мы выводим наши данные откуда можно взять подневной и почасовой прогноз
    console.log("res.data.list");
    console.log(res.data.list); //
    console.log("res.data.list[0].main.temp");
    console.log(res.data.list[0].main.temp);
    endHys = res.data.list[0].dt * 1000;
    console.log("endHys   res.data.list[0].dt");
    console.log(endHys);

    //*************начало вставки ******************

    //let startH = 1643720400;
    //formatDateHistory(startH);//пример значений
    //let endHH = 1643806800;

    let endHH = endHys / 1000; //в общем здесь, выяснили вчерашнюю дату и дату недели назад

    let startH = endHH - 3600 * 24 * 7;

    //);
    console.log(" начало диапазона   startH");
    console.log(startH);
    console.log("formatDateHistory(startH) дата начала диапазона");
    formatDateHistory(startH * 1000);
    console.log(" конец диапазона   endHH");
    console.log(endHH);
    console.log("formatDateHistory(endHH) дата конца диапазона");
    formatDateHistory(endHH * 1000);
    //let cntH = 10; ////__________________________остановилась здесь
    //
    let apiUrlH_Week = `https://history.openweathermap.org/data/2.5/history/city?lat=${coordinates.lat}&lon=${coordinates.lon}&type=hour&units=metric&start=${startH}&end=${endHH}&appid=${apiKeyH}`;
    // это АПИ для ИСТОРИИ
    axios.get(apiUrlH_Week).then((res) => {
      console.log(
        "res.data  -сейчас должен быть сам ВНУТРИ !!!  массив ВТОРОЙ РАЗ!!!!!!! история за неделю"
      );
      console.log(res.data); // здесь мы выводим наши данные откуда можно взять подневной и почасовой прогноз
      console.log("res.data.list   __ВНУТРИ__история за неделю");
      console.log(res.data.list); //
      console.log(
        "res.data.list[0].dt  __ВНУТРИ_в это время была температура НАЧАЛО ДИАПАЗОНА "
      );
      formatDateHistory(res.data.list[0].dt * 1000);
      console.log("res.data.list[0].main.temp  __ВНУТРИ");
      console.log(res.data.list[0].main.temp);

      console.log(
        "res.data.list[168].dt  __ВНУТРИ_в это время была температура КОНЕЦ ДИАПАЗОНА "
      );
      formatDateHistory(res.data.list[168].dt * 1000);
      console.log("res.data.list[168].main.temp  __ВНУТРИ");
      console.log(res.data.list[168].main.temp);
      console.log(
        "********************************************************************"
      );
      for (let i = 0; i < 169; i = i + 24) {
        //печатаем температуру за последнюю прошедщую неделю с щагом в 24 часа
        console.log("res.data.list[" + i + "].dt");
        formatDateHistory(res.data.list[i].dt * 1000);
        console.log("res.data.list[" + i + "].main.temp");
        console.log(res.data.list[i].main.temp);
        console.log("*********************************");
      }

      ///  ---------------ТАБЛИЦА---первой недели с конца-------------

      for (let i = 168; i > 0; i = i - 24) {
        var dt = getFormatDateHistory(res.data.list[i].dt * 1000);
        var temp = res.data.list[i].main.temp;
        let tr = "<tr>"; // создаем строку таблицы
        tr += "<td>" + dt + "</td>"; // добавляем столбцы в строку
        tr += "<td>" + temp + "</td>";
        tr += "</td>";
        $("#history > tbody:last-child").append(tr); // добавляем полученную строку в дом
      }

      ///  -------------конец --ТАБЛИЦы--- первой недели-------------
      //

      //+++++++++++++ начало второй вставки++++++++++
      let endHH1 = startH; //в общем здесь, выяснили дату неделю назад

      let startH1 = endHH1 - 3600 * 24 * 7;

      //);
      //console.log(" начало диапазона   startH1");
      //console.log(startH1);
      //console.log("formatDateHistory(startH1) дата начала диапазона");
      //formatDateHistory(startH1 * 1000);
      //console.log(" конец диапазона   endHH1");
      //console.log(endHH1);
      //console.log("formatDateHistory(endHH1) дата конца диапазона");
      //formatDateHistory(endHH1 * 1000);

      //
      let apiUrlH_Week1 = `https://history.openweathermap.org/data/2.5/history/city?lat=${coordinates.lat}&lon=${coordinates.lon}&type=hour&units=metric&start=${startH1}&end=${endHH1}&appid=${apiKeyH}`;
      // это АПИ для ИСТОРИИ
      axios.get(apiUrlH_Week1).then((res) => {
        //console.log(
        // "res.data  -сейчас должен быть сам ВНУТРИ !!!  массив ВТОРОЙ РАЗ!!!!!!! история история за вторую неделю"
        //);
        //console.log(res.data); // здесь мы выводим наши данные откуда можно взять подневной и почасовой прогноз
        //console.log("res.data.list   __ВНУТРИ__история за вторую неделю");
        //console.log(res.data.list); //
        //console.log(
        // "res.data.list[0].dt  __ВНУТРИ_в это время была температура НАЧАЛО ДИАПАЗОНА "
        //);
        //formatDateHistory(res.data.list[0].dt * 1000);
        //console.log("res.data.list[0].main.temp  __ВНУТРИ");
        //console.log(res.data.list[0].main.temp);

        //console.log(
        // "res.data.list[168].dt  __ВНУТРИ_в это время была температура КОНЕЦ ДИАПАЗОНА "
        //);
        //formatDateHistory(res.data.list[168].dt * 1000);
        //console.log("res.data.list[168].main.temp  __ВНУТРИ");
        //console.log(res.data.list[168].main.temp);
        //console.log(
        //"********************************************************************"
        //);
        //for (let i = 0; i < 169; i = i + 24) {
        //печатаем температуру за 2ю последнюю прошедщую неделю с щагом в 24 часа
        //console.log("res.data.list[" + i + "].dt");
        //formatDateHistory(res.data.list[i].dt * 1000);
        //console.log("res.data.list[" + i + "].main.temp");
        //console.log(res.data.list[i].main.temp);
        //console.log("*********************************");
        //}

        ///  ---------------ТАБЛИЦА----второй недели------------

        for (let i = 168; i > 0; i = i - 24) {
          var dt = getFormatDateHistory(res.data.list[i].dt * 1000);
          var temp = res.data.list[i].main.temp;
          let tr = "<tr>"; // создаем строку таблицы
          tr += "<td>" + dt + "</td>"; // добавляем столбцы в строку
          tr += "<td>" + temp + "</td>";
          tr += "</td>";
          $("#history1 > tbody:last-child").append(tr); // добавляем полученную строку в дом
        }

        ///  -------------конец --ТАБЛИЦы--второй недели--------------

        ////////////////начало третьей вставки
        let endHH2 = startH1; //в общем здесь, выяснили дату неделю назад

        let startH2 = endHH2 - 3600 * 24 * 7;

        //
        let apiUrlH_Week2 = `https://history.openweathermap.org/data/2.5/history/city?lat=${coordinates.lat}&lon=${coordinates.lon}&type=hour&units=metric&start=${startH2}&end=${endHH2}&appid=${apiKeyH}`;
        // это АПИ для ИСТОРИИ
        axios.get(apiUrlH_Week2).then((res) => {
          ///  ---------------ТАБЛИЦА----третьей недели------------

          for (let i = 168; i > 0; i = i - 24) {
            var dt = getFormatDateHistory(res.data.list[i].dt * 1000);
            var temp = res.data.list[i].main.temp;
            let tr = "<tr>"; // создаем строку таблицы
            tr += "<td>" + dt + "</td>"; // добавляем столбцы в строку
            tr += "<td>" + temp + "</td>";
            tr += "</td>";
            $("#history2 > tbody:last-child").append(tr); // добавляем полученную строку в дом
          }

          ///  -------------конец --ТАБЛИЦы--третьей недели--------------

          ////////////////начало четвертой вставки
          let endHH3 = startH2; //в общем здесь, выяснили дату неделю назад

          let startH3 = endHH3 - 3600 * 24 * 7;

          //
          let apiUrlH_Week3 = `https://history.openweathermap.org/data/2.5/history/city?lat=${coordinates.lat}&lon=${coordinates.lon}&type=hour&units=metric&start=${startH3}&end=${endHH3}&appid=${apiKeyH}`;
          // это АПИ для ИСТОРИИ
          axios.get(apiUrlH_Week3).then((res) => {
            ///  ---------------ТАБЛИЦА----третьей недели------------

            for (let i = 168; i > 0; i = i - 24) {
              var dt = getFormatDateHistory(res.data.list[i].dt * 1000);
              var temp = res.data.list[i].main.temp;
              let tr = "<tr>"; // создаем строку таблицы
              tr += "<td>" + dt + "</td>"; // добавляем столбцы в строку
              tr += "<td>" + temp + "</td>";
              tr += "</td>";
              $("#history3 > tbody:last-child").append(tr); // добавляем полученную строку в дом
            }

            ///  -------------конец --ТАБЛИЦы--четвертой недели--------------
          });
          ////////////////конец четвертой вставки
        });
        ////////////////конец третьей вставки
      });

      //+++++++++++++ конец  второй вставки  ++++++++++
    });
  });

  //

  let today = new Date();
  let value = today.valueOf();
  console.log("value");
  console.log(value);
  console.log("дата, на основе value = .... ниже ");
  formatDateHistory(value);

  console.log("____Конец функции   HistoryP _____");
  //__*****************__Конец функции   HistoryP _____
}

function formatDateHistory(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let min = date.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  let year = date.getFullYear();
  let month_1 = getMonth(date);
  let day = date.getDate();
  //console.log(date.getDate());
  let resultDate =
    "_++_ИСКОМАЯ ДАТА и время _++_" +
    day +
    " " +
    month_1 +
    " " +
    year +
    " " +
    hours +
    ":" +
    min;
  //let weekday = getWeekDayShort(date);
  //return resultDate;
  console.log(resultDate);
}

function getFormatDateHistory(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let min = date.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  let year = date.getFullYear();
  let month_1 = getMonth(date);
  let day = date.getDate();
  let weekday = getWeekDayShort(date);

  let resultDate =
    weekday + " " + day + " " + month_1 + " " + year + " " + hours + ":" + min;

  return resultDate;
}
//******************************************************************** */
//******************************************************************** */

function displayWeatherCondition(response) {
  console.log(res.data.main.temp);
  document.getElementById("result_city").innerHTML = response.data.name;
  document.getElementById("result_temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.getElementById("result_humidity").innerHTML =
    response.data.main.humidity;
}

function getCurrentLocation() {
  //event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("h1");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("h1");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
//let endH = 0;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//**************************
//********************** *

//var dateElement = document.querySelector("#date");
var currentTime = new Date();
printDate(currentTime);
//dateElement.innerHTML = data1(currentTime);

var searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

var currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

//console.log("*******************************");
//console.log("*******************************");
//var currentLocationButtonP = document.querySelector("#current-buttonP");
//currentLocationButtonP.addEventListener("click", getPrognoz);
//console.log("*******************************");
//var currentLocationButtonP = document.querySelector("#current-buttonH");
//currentLocationButtonP.addEventListener("click", getHistory);
//console.log("*******************************");
searchCity("Odesa");
//getPrognoz();
//
//
//
//
//
