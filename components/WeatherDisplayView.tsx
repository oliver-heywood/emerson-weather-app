import { OpenWeatherApiResponse } from "../types/open_weather_api_response";

export interface WeatherDisplayViewProps {
    weatherData: OpenWeatherApiResponse | null;
}

const WeatherDisplayView = (props: WeatherDisplayViewProps) => {
    const { weatherData } = props;
    return <div>{JSON.stringify(weatherData)}</div>
}

export default WeatherDisplayView;