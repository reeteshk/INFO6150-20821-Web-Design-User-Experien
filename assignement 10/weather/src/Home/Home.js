import React, {useState, useEffect} from "react";
import { CardDetail } from "../Weather/CardDetail";
import CardGroup from 'react-bootstrap/CardGroup';



export const Home = (HomeProps) => {

    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        fetchWeatherData();
    }, []);

    const fetchWeatherData = async () => {
        fetch(`${process.env.REACT_APP_API_URL}/forecast/?q=California,us&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(result => {

           var newWeatherData = result.list.filter(weather => weather.dt_txt.includes("00:00:00"));
           console.log(newWeatherData);

          setWeatherData(newWeatherData);
        }).catch(err => {
            console.error(err);
        });
    };


    if (weatherData === null) {
        return <p>still loading ... </p>
    }

    return (
    <div className="jumbotron jumbotron-fluid">
        <h2>Weather Forecast</h2>
        <hr/>
        <CardGroup>
        {
            weatherData.map((dayWeather, index) => {
                return (
                    <CardDetail icon={dayWeather.weather[0].icon}
                    description={dayWeather.weather[0].description} 
                    date={dayWeather.dt_txt.replace("00:00:00", '')} 
                    highestTemp={dayWeather.main.temp_max} 
                    averageTemp={dayWeather.main.temp} 
                    feelsLike={dayWeather.main.feels_like}
                    lowestTemp={dayWeather.main.temp_min}/>
                );

            })
        }

        </CardGroup>
        
        


    </div>
    );


};

