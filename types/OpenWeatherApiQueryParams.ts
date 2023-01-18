// See https://openweathermap.org/current
export interface OpenWeatherAPIQueryParams {
    lat?: number;
    lon?: number;
    zip?: number;
    q?: string;
    mode?: string;
    units?: string;
    lang?: string;
    appid?: string;
}