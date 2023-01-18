import { OpenWeatherApiResponse } from "../types/open_weather_api_response";
import { Axios } from "axios";
import { OpenWeatherAPIQueryParams } from "../types/open_weather_api_query_params";

export class OpenWeatherService {
    private service = new Axios({
        baseURL: "https://api.openweathermap.org/data/2.5",
        timeout: 1000,
    });

    public async GetCurrentWeatherForLocation(params: OpenWeatherAPIQueryParams): Promise<OpenWeatherApiResponse> {
        params = params || {};
        params.units = params.units || "imperial";
        params.appid = params.appid || process.env.OPEN_WEATHER_APP_ID;
        
        let response = await this.service.get("weather", { params });
        return JSON.parse(response.data);
    }
}