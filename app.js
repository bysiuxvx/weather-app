class Fetch {
  async getLocation(input) {
    try {
      const myKey = 'd48d4a508daae10de3432ba53d9f4175';

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${myKey}`
      );

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

class UI {
  constructor() {
    this.uiContainer = document.querySelector('.result');
    this.city;
  }

  populateUI(data) {
    this.uiContainer.innerHTML = `
      <div class ='summaryBig'>
          <h2>${data.main.temp.toFixed(1)}&degC</h2>
          <h3>${data.name}, ${data.sys.country}</h3>
      </div>
      <div class ='summaryBig'>
          <img class="city-icon" src='https://openweathermap.org/img/wn/${
            data.weather[0]['icon']
          }@2x.png'>
          <p>${data.weather[0].description}</p>
      </div>
      <div class='summary'>
          <div class='summary-item'>
            <h3>Feels like</h3>
            <p>${data.main.feels_like.toFixed(1)}&degC</p>
          </div>
          <div class='summary-item'>
            <h3>Humidity</h3>
            <p>${data.main.humidity}%</p>
          </div>
          <div class='summary-item'>
            <h3>Pressure</h3>
            <p>${data.main.pressure} hPa</p>
          </div>
          <div class='summary-item'>
            <h3>Min Temp</h3>
            <p>${data.main.temp_min.toFixed(1)}&degC</p>
          </div>
          <div class='summary-item'>
            <h3>Max Temp</h3>
            <p>${data.main.temp_max.toFixed(1)}&degC</p>
          </div>
      </div>`;
  }
}

const fetchData = new Fetch();
const updateUI = new UI();

const input = document.querySelector('.searchCity');
const submitBtn = document.querySelector('.submitBtn');

// exectute by submit button
const executeSearch = () => {
  const currentValue = input.value;
  if (!currentValue) {
    alert('You need to enter a valid location!');
  } else {
    fetchData.getLocation(currentValue).then((data) => {
      updateUI.populateUI(data);
    });
    modalBody.classList.add('showModal');
    modalBody.classList.remove('hideModal');
  }
};

submitBtn.addEventListener('click', executeSearch);

// execute with enter
document.querySelector('.searchCity').addEventListener('keydown', (event) => {
  if (event.keyCode == 13) {
    executeSearch();
  } else return;
});

const closeBtn = document.querySelector('.modal-close');
const modalBody = document.querySelector('.modal');
const divPanel = document.querySelector('.panel');

// modal close by X
closeBtn.addEventListener('click', () => {
  modalBody.classList.add('hideModal');
  modalBody.classList.remove('showModal');
  input.value = '';
});

// modal target control
modalBody.addEventListener('click', (event) => {
  if (event.target == modalBody) {
    modalBody.classList.add('hideModal');
    modalBody.classList.remove('showModal');
    input.value = '';
  }
});

// footer links new window

document.querySelector('span.github').addEventListener('click', () => {
  window.open('https://github.com/bysiuxvx/weather-app', '_blank');
});

document.querySelector('span.apiLink').addEventListener('click', () => {
  window.open('https://openweathermap.org/api', '_blank');
});
