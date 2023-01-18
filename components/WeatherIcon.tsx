// See https://openweathermap.org/weather-conditions
export interface WeatherIconProps {
    code: string;
}

const WeatherIcon = (props: WeatherIconProps) => {
    return (
        <img 
         src={`http://openweathermap.org/img/wn/${props.code}@4x.png`}
         />
      );
}

export default WeatherIcon;