// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { OpenWeatherApiResponse } from '../../types/OpenWeatherApiResponse';
import { OpenWeatherService } from '../../services/OpenWeatherService';
import { OpenWeatherAPIQueryParams } from '../../types/OpenWeatherApiQueryParams';

const openWeatherService = new OpenWeatherService();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OpenWeatherApiResponse>
) {
  try {
    let weatherData = await openWeatherService.GetCurrentWeatherForLocation(req.query);
    res.status(200).json(weatherData);
  } catch (e) {
    res.status(500).json(e as any);
  }
}
