class Fetch {
  async getLocation(input) {
    try {
      const apiKey = 'd48d4a508daae10de3432ba53d9f4175';

      const response = await fetch(
        `api.openweathermap.org/data/2.5/weather?q={${input}}&appid={${apiKey}}`
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

  updateUI(data) {
    this.uiContainer.innerHTML = ``;
  }
}
