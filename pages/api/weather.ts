// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { OpenWeatherApiResponse } from '../../types/open_weather_api_response';
import { OpenWeatherService } from '../../services/open_weather_service';
import { OpenWeatherAPIQueryParams } from '../../types/open_weather_api_query_params';

const openWeatherService = new OpenWeatherService();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OpenWeatherApiResponse>
) {
  try {
    let weatherData = await openWeatherService.GetCurrentWeatherForLocation(req.query);
    res.status(200).json(weatherData);
  } catch (e) {
    res.status(500).json(e);
  }
}
