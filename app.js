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
    <div class ='cityTemp'>
    <h5>${data.name}</h5>
    <h6>${((data.main.temp_max + data.main.temp_min) / 2).toFixed(1)}C.</h6>
    <p>${data.weather[0].description}</p>
    </div>`;
  }
}

const fetchData = new Fetch();
const updateUI = new UI();

const input = document.querySelector('.searchCity');
const submitBtn = document.querySelector('.submitBtn');

submitBtn.addEventListener('click', () => {
  const currentValue = input.value;

  fetchData.getLocation(currentValue).then((data) => {
    updateUI.populateUI(data);
  });
});
