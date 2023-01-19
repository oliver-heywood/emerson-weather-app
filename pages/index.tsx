import { useState, useEffect } from 'react'
import LocationInputForm, { LocationQuery } from '../components/LocationInputForm';
import { OpenWeatherApiResponse } from '../types/OpenWeatherApiResponse';
import WeatherDisplayView from '../components/WeatherDisplayView';
import 'bootstrap/dist/css/bootstrap.css';

export default function Home() {
  const [weatherData, setWeatherData] = useState<OpenWeatherApiResponse | null>(null)
  const [isLoading, setLoading] = useState<Boolean>(false)
  const [locationQuery, setLocationQuery] = useState<LocationQuery | null>(null)

  useEffect(() => {
    if (locationQuery) {
      requestData();
    }
  }, [locationQuery])

  useEffect(() => {
    if (navigator.geolocation && locationQuery === null) {
      setLoading(true)
      navigator.geolocation.getCurrentPosition(pos => {
        setLocationQuery({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      }, err => {
        setLocationQuery({ q: "Seattle" });
      });
    }
  });

  const requestData = (): void => {
    setLoading(true)
    let url = '/api/weather?' + new URLSearchParams(locationQuery as any);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data)
        setLoading(false)
      })
  }

  const onSubmitForm = (query: LocationQuery): void => {
    setLocationQuery(query);
  }

  let weatherFound: Boolean = !!weatherData && !!weatherData.weather;

  return (
    <div className="row p-3">
      <div className="col">
        <LocationInputForm
          isFormDisabled={locationQuery === null}
          onSubmitForm={onSubmitForm}
        />
      </div>
      <div className="col-8">
      { isLoading && <p>Loading...</p> }
      { !isLoading && !weatherFound && <p>Not able to find weather for this query</p>}
      { !isLoading && weatherFound && <WeatherDisplayView weatherData={ weatherData as any }></WeatherDisplayView> }
      </div>
    </div>
  )
}
