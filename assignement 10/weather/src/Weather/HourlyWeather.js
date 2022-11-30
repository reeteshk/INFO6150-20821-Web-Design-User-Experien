import React, {useState, useEffect} from "react";
import CardGroup from 'react-bootstrap/CardGroup';
import { CardDetail } from "./CardDetail";

export const HourlyWeather = (HourlyWeatherProps) => {
    console.log(HourlyWeatherProps.date);
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        
        fetchWeatherData();
    }, [HourlyWeatherProps.date]);

    const fetchWeatherData = async () => {
        fetch(`${process.env.REACT_APP_API_URL}/forecast/?q=California,us&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(result => {

           var newWeatherData = result.list.filter(weather => weather.dt_txt.includes(HourlyWeatherProps.date));
           console.log(newWeatherData);

          setWeatherData(newWeatherData);
        }).catch(err => {
            console.error(err);
        });
    };

    if (weatherData === null) {
        return <p>still loading ... </p>
    }

    return(

        <div className="jumbotron jumbotron-fluid">

            <h2 style={{'color': 'Red'}}>Hourly Weather Forecast</h2>
            <h3 style={{'color': 'Red'}}>Date: {HourlyWeatherProps.date}</h3> 

            <hr/>
            <CardGroup>
            {
                weatherData.map((dayWeather, index) => {
                return (
                    <CardDetail icon={dayWeather.weather[0].icon}
                    description={dayWeather.weather[0].description} 
                    date={dayWeather.dt_txt} 
                    highestTemp={dayWeather.main.temp_max} 
                    averageTemp={dayWeather.main.temp} 
                    feelsLike={dayWeather.main.feels_like}
                    lowestTemp={dayWeather.main.temp_min} />
                )
                })
            }
            </CardGroup>

        </div>
    );
}