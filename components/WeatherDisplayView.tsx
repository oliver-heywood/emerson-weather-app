import { OpenWeatherApiResponse } from "../types/OpenWeatherApiResponse";
import WeatherIcon from "./WeatherIcon";

export interface WeatherDisplayViewProps {
    weatherData: OpenWeatherApiResponse;
}

const WeatherDisplayView = (props: WeatherDisplayViewProps) => {
    const { weatherData } = props;
    return (
        <div className="row border m-2">
            <div className="col">
                <WeatherIcon code={weatherData.weather[0].icon}/>
            </div>
            <div className="col display-1 pt-5">
                {Math.round(weatherData.main.temp)} &deg;F
            </div>
            <div className="col pt-5">
                <div>Feels Like: {Math.round(weatherData.main.feels_like)} &deg;F</div>
                <div>Humidity: {weatherData.main.humidity}%</div>
                <div>Wind: {weatherData.wind.speed} mph</div>
            </div>
            <div className="col pt-5">
                <div className="display-4">{weatherData.name}</div>
                <div>{weatherData.weather[0].description}</div>
            </div>
        </div>
    )
}

export default WeatherDisplayView;