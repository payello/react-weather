import React from "react";
import "./App.css";
import Form from "./components/form";
import Titles from "./components/titles";
import Weather from "./components/weather";
import Forecast from "./components/forecast";

const API_KEY = "661c83108c2653b9dfa1cafb96dfd281";

class App extends React.Component {
  state = {
    temperature: null,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
    forecast: undefined
  };

  getWeather = async e => {
    const city = e.target.elements.city.value;
    e.preventDefault();
    const api_call = await fetch(
      // `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}`
      // `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${API_KEY}`
      `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=metric&cnt=5&APPID=${API_KEY}`
    );
    const response = await api_call.json();
    if (city) {
      this.setState({
        city: response.city.name,
        country: response.city.country,
        forecast: response.list
      });
    } else {
      this.setState({
        error: "Please enter the values"
      });
    }
  };

  getDate = dateTimeStamp => {
    let convertDate = new Date(dateTimeStamp * 1000);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    let year = convertDate.getFullYear();
    let month = months[convertDate.getMonth()];
    let date = convertDate.getDate();
    let dateString = date + " " + month + " " + year;

    return dateString;
  };

  getCleanTemp = maxTemp => {
    return Math.round(maxTemp);
  };

  render() {
    return (
      <div>
        <Titles />
        <Form loadWeather={this.getWeather} />
        <Weather
          city={this.state.city}
          country={this.state.country}
          error={this.state.error}
        />
        <div className="card__container">
          {this.state.forecast
            ? this.state.forecast.map(key => (
                <Forecast
                  key={key.dt}
                  forecastTempMin={this.getCleanTemp(key.temp.min)}
                  forecastTempMax={this.getCleanTemp(key.temp.max)}
                  forecastDesc={key.weather[0].description}
                  forecastIcon={key.weather[0].icon}
                  forecastDate={this.getDate(key.dt)}
                  forecastHumidity={key.humidity}
                  forecastWind={key.speed}
                  error={this.state.error}
                />
              ))
            : ""}
        </div>
      </div>
    );
  }
}

export default App;
