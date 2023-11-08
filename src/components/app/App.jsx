import { useEffect, useState } from 'react'
import Header from '../header/Header'
import Weather from '../weather/Weather'
import './App.css'

function App() {
  const [datas, setDatas] = useState({})
  const [current, setCurrent] = useState({})
  const [city, setCity] = useState('Londres')
  const [graph, setGraph] = useState({ labels: [], datas: [] })

  function initGraph(datas, index) {
    let labels = datas[index].hour.map(h => h.time)
    let tempC = datas[index].hour.map(h => h.heatindex_c)
    let humidity = datas[index].hour.map(h => h.humidity)
    let graph = {
      temp: tempC,
      humidity
    }

    setGraph({ labels: labels, datas: graph })
  }

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
    initGraph(datas.sets, index)
  }

  function loadDefaultWeatherData(query = city) {
    let WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY

    fetch('https://api.weatherapi.com/v1/forecast.json?key=' + WEATHER_API_KEY + '&q=' + query + '&days=3&aqi=no&alerts=no')
      .then(res => res.json())
      .then(datas => {
        initGraph(datas.forecast.forecastday, 0)

        selectDay(datas.forecast.forecastday[0].hour[8])

        setDatas({ city: datas.location.name, sets: datas.forecast.forecastday })

        setCity(datas.location.name)
      })
      .catch(error => alert('Impossible de faire cette recherche (' + city + ')'))
  }

  useEffect(() => loadDefaultWeatherData(), [])

  useEffect(() => {
    function success(data) {
      let lat = data.coords.latitude
      let lon = data.coords.longitude

      loadDefaultWeatherData(lat + ',' + lon)
    }

    function error(error) { console.log(error) }

    navigator.geolocation.getCurrentPosition(success, error);
  }, [])

  return (
    <div className="App">
      <Header />
      <Weather city={city} datas={current} changeCurrent={handleCurrent} changeCity={updateCity} api={loadDefaultWeatherData} hours={graph} />
    </div>
  )
}

export default App