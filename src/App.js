import { useState, useEffect } from "react";

function App() {
  const [place, setPlace] = useState('Phoenix')
  const [data, setData] = useState()
  const [error, setError] = useState();

  var appid = '4667d81af3fa93f4364ee69bb2a6e003';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${place},US&appid=${appid}`

  const fetchData = async () => {
    const response = await fetch(url)
    const data = await response.json();
    if (data.cod === 200) {
      setData(data);
      setPlace(data)
      console.log(data)
      setError()
    } else {
      setError(data.message)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  if (data != null || data === {}) {
    return (
      <>
        <div className="search">
          <img src="sunny.png" alt="sun-icon"></img>
          <input type="text" name="place" onChange={e => setPlace(e.target.value)} placeholder="City"></input>
          <button onClick={fetchData}>Search</button>
        </div>
        <Weather data={data} error={error}></Weather>
      </>
    )
  }
}

function Weather({ data, error }) {

  //convert sunrise and sunset from unix to time string
  var sunrise = data.sys.sunrise;
  sunrise = new Date(sunrise * 1000)
  sunrise = sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  var sunset = data.sys.sunset;
  sunset = new Date(sunset * 1000)
  sunset = sunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  //if error happened display error
  if (error !== undefined) {
    return (
      <h1 style={{padding:"20px"}}>Error!</h1>
    )
  } // else run as normal
  else {
    //change img depending on weather type 
    var src = "clear.png"
    if (data.weather[0].main === 'Clouds') {
      src = "cloudy.png"
    } else if (data.weather[0].main === 'Rain') {
      src = "rainy.png"
    } else if (data.weather[0].main === 'Mist') {
      src = "misty.png"
    } else if (data.weather[0].main === 'Hail') {
      src = "hail.png"
    } else if (data.weather[0].main === 'Snow') {
      src = "snow.png"
    } else {
      src = "clear.png"
    }

    var gust = data.wind.gust
    if (data.wind.gust == undefined) {
      //if gust is undefined show no answer
      gust = 'N/A'
    } else {
      // else convert gust from meter per second to miles per hour
      gust = Math.round(gust * 2.236936);
      gust = gust + " mph"
    }

    // convert speed from meter per second to miles per hour
    var speed = data.wind.speed;
    speed = Math.round(speed * 2.236936);
    speed = speed + " mph"

    //convert tempertures to Kelvin to Fahrenheit
    var temp = Math.round(((data.main.temp - 273.15) * 1.8) + 32);
    var feels = Math.round(((data.main.feels_like - 273.15) * 1.8) + 32);
    var max = Math.round(((data.main.temp_max - 273.15) * 1.8) + 32);
    var min = Math.round(((data.main.temp_min - 273.15) * 1.8) + 32);

    return (
      <div className="container">
        <div className="part1">
          <h2 className="center" style={{ color: "#ffa600" }}>{data.name}</h2>
          <h5 className="center">{data.weather[0].main}</h5>
          <h3 className="center">{temp} &deg;F</h3>
          <div className="box">
            <div className="left">
              <h5>H {max} &deg;F</h5>
              <h5>L {min} &deg;F</h5>
            </div>
            <div className="right">
              <img src={src} alt="weather-icon"></img>
            </div>
          </div>
        </div>

        <div className="part2">
          <h3>Feels Like</h3>
          <h5>{feels} &deg;F</h5>

          <h3>Sunrise</h3>
          <h5>{sunrise}</h5>

          <h3>Sunset</h3>
          <h5>{sunset}</h5>
        </div>

        <div className="part3">
          <h3 className="center">Wind</h3>
          <div className="list">
            <h3>Degree</h3>
            <h5>{data.wind.deg} &deg;</h5>

            <h3>Gust</h3>
            <h5>{gust}</h5>

            <h3>Speed</h3>
            <h5>{speed}</h5>
          </div>
        </div>
      </div>
    )
  }
}


export default App;

/*
 var appid = '4667d81af3fa93f4364ee69bb2a6e003';
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${place},US&appid=${appid}`
*/