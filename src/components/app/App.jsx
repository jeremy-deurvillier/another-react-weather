import { useEffect, useState } from 'react'
import { Info } from 'luxon'
import Header from '../header/Header'
import Weather from '../weather/Weather'
import './App.css'

function App() {
  const days = Info.weekdays('long', { locale: navigator.language })
  const [datas, setDatas] = useState({})
  const [current, setCurrent] = useState({})
  const [city, setCity] = useState('Lyon')

  function updateCity(value) {
    console.log(value)
    setCity(value)
  }

  function selectDay(datas) {
    let currentDay = {}

    currentDay.temp_c = datas.temp_c
    currentDay.wind_kph = datas.wind_kph
    currentDay.wind_degree = datas.wind_degree
    currentDay.icon = datas.condition.icon

    setCurrent(currentDay)
  }

  function handleCurrent(index) {
    selectDay(datas.sets[index].hour[8])
  }

  useEffect(() => {
    function loadDefaultWeatherData() {
      let WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY

      fetch('https://api.weatherapi.com/v1/forecast.json?key=' + WEATHER_API_KEY + '&q=' + city + '&days=5&aqi=no&alerts=no')
        .then(res => res.json())
        .then(datas => {
          selectDay(datas.forecast.forecastday[0].hour[8])

          setDatas({city: datas.location.name, sets: datas.forecast.forecastday})
        })
        .catch(error => console.log(error))
    }

    loadDefaultWeatherData()
  }, [])

  return (
    <div className="App">
      <Header />
      <Weather city={ datas.city } datas={ current } days={ days } changeCurrent={ handleCurrent } changeCity={ updateCity } />
    </div>
  )
}

export default App