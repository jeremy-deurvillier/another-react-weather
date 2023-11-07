import { useEffect, useState } from 'react'
import Header from '../header/Header'
import Weather from '../weather/Weather'
import './App.css'

function App() {
  const [datas, setDatas] = useState({})
  const [current, setCurrent] = useState({})
  const [city, setCity] = useState('Lyon')

  function updateCity(value) {
    setCity(value)
  }

  function selectDay(datas) {
    let currentDay = {}

    currentDay.temp_c = datas.temp_c
    currentDay.wind_kph = datas.wind_kph
    currentDay.wind_degree = datas.wind_degree
    currentDay.icon = datas.condition.icon
    currentDay.text = datas.condition.text

    setCurrent(currentDay)
  }

  function handleCurrent(index) {
    selectDay(datas.sets[index].hour[8])
  }

  function loadDefaultWeatherData() {
    let WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY

    fetch('https://api.weatherapi.com/v1/forecast.json?key=' + WEATHER_API_KEY + '&q=' + city + '&days=3&aqi=no&alerts=no')
      .then(res => res.json())
      .then(datas => {
        selectDay(datas.forecast.forecastday[0].hour[8])

        setDatas({city: datas.location.name, sets: datas.forecast.forecastday})
      })
      .catch(error => alert('Impossible de faire cette recherche (' + city + ')'))
  }

  useEffect(() => loadDefaultWeatherData(), [])

  return (
    <div className="App">
      <Header />
      <Weather city={ city } datas={ current } changeCurrent={ handleCurrent } changeCity={ updateCity } api={ loadDefaultWeatherData } />
    </div>
  )
}

export default App