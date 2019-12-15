import React, { Component } from "react";
import "../App.css";

class Forecast extends Component {
  render() {
    return (
      <div className="card">
        {this.props.forecastIcon && (
          <div>
            <img
              src={`https://openweathermap.org/img/w/${this.props.forecastIcon}.png`}
              alt=""
            />
          </div>
        )}
        {this.props.forecastDate && (
          <div>
            <h3>{this.props.forecastDate}</h3>
          </div>
        )}

        {this.props.forecastTempMin && (
          <div>
            <p className="inline">Min: {this.props.forecastTempMin}</p>
            <p className="inline">Max: {this.props.forecastTempMax}</p>
          </div>
        )}

        {this.props.forecastDesc && <p>Forecast: {this.props.forecastDesc}</p>}
        {this.props.forecastHumidity && (
          <p>{this.props.forecastHumidity}% Humidity</p>
        )}
        {this.props.forecastWind && <p>Wind: {this.props.forecastWind}</p>}
        {this.props.error && <p>{this.props.error}</p>}
      </div>
    );
  }
}

export default Forecast;
