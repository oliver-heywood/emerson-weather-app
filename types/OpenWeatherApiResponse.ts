export interface OpenWeatherApiResponse {
    coord: Coordinates;
    weather: WeatherDescription[];
    base: string;
    main: MainMetrics;
    visibility: number;
    wind: WindMetrics;
    clouds: CloudMetrics;
    rain?: RainMetrics;
    dt: number;
    sys: SysMetrics;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export interface Coordinates {
    lat: number;
    lon: number;
}

export interface WeatherDescription {
    id: number;
    main: string;
    description: string;
    icon: string
}

export interface MainMetrics {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
}

export interface WindMetrics {
    speed: number;
    degree: number;
    gust: number;
}

export interface RainMetrics {
    "1h": number;
}

export interface CloudMetrics {
    all: number;
}

export interface SysMetrics {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}