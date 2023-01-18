import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react'
import LocationInputForm, { LocationQuery } from '../components/LocationInputForm';
import { OpenWeatherApiResponse } from '../types/open_weather_api_response';
import WeatherDisplayView from '../components/WeatherDisplayView';

export default function Home() {
  const [weatherData, setWeatherData] = useState<OpenWeatherApiResponse | null>(null)
  const [isLoading, setLoading] = useState<Boolean>(false)
  const [locationQuery, setLocationQuery] = useState<LocationQuery>({ q: "Seattle" })

  useEffect(() => {
    requestData();
  }, [locationQuery])

  const requestData = () => {
    setLoading(true)
    let url = '/api/weather?' + new URLSearchParams(locationQuery as any);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data)
        setLoading(false)
      })
  }

  const onSubmitForm = (query: LocationQuery) => {
    setLocationQuery(query);
  }
  
  return (
    <div>
      <div>
        <LocationInputForm
          onSubmitForm={onSubmitForm}
        />
      </div>
      { isLoading && <p>Loading...</p> }
      { !isLoading && <WeatherDisplayView weatherData={ weatherData }></WeatherDisplayView> }
    </div>
  )
}
