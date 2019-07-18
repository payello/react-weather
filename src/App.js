import React from 'react';
import './App.css';
import Form from './components/form'
import Titles from './components/titles'
import Weather from './components/weather'

const API_KEY = '661c83108c2653b9dfa1cafb96dfd281'

class App extends React.Component {
  getWeather = async(e) => {

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    e.preventDefault();
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=${ API_KEY }`);
    const response = await api_call.json();

    console.log(response);
  }
  render() {
    return(
      <div>
        <Titles />
        <Form loadWeather={this.getWeather}/>
        <Weather />
      </div>
    )
  }
}

export default App;
