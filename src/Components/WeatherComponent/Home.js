import React, {useState } from 'react';
import Weather from './Weather';
import Form from './Form';


function Home() {

    const [weather,setWeather] = useState([])
    const APIKEY = 'e91d431bc2fb748414692fcd3298d836'
    async function fetchData(e) {
      const city = e.target.elements.city.value
      const country = e.target.elements.country.value
        e.preventDefault()
      const apiData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${APIKEY}`)
        .then( res => res.json())
        .then(data => data)
        if(city && country) {
        setWeather({
          data: apiData,
          city: apiData.city,
          country: apiData.sys.country,
          description: apiData.weather[0].description,
          temperature: Math.round(apiData.main.temp * 9/5 - 459.67),
          error:""
        }
        )} else {
          setWeather({
            data: '',
            city: '',
            country: '',
            description: '',
            temperature: '',
            error:"Please Type A City And Country"
        }
        )}
    }
  
    return (
  
      <div className="App">

        <h3>WEATHER APP</h3>
  
        <Form getWeather={fetchData} />
  
        <Weather
        city={weather.city}
        country={weather.country}
        description={weather.description}
        temperature={weather.temperature}
        error={weather.error}
        />
        {console.log(weather.data)}
      </div>
    );
  }
  
  export default Home;