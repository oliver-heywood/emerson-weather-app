import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css';
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

  const requestData = () => {
    setLoading(true)
    let url = '/api/weather?' + new URLSearchParams(locationQuery as any);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("data: " + data.main.temp)
        setWeatherData(data)
        setLoading(false)
      })
  }

  const onSubmitForm = (query: LocationQuery) => {
    setLocationQuery(query);
  }

  let weatherFound: Boolean = !!weatherData && !!weatherData.weather;
  
  return (
    <div className="row p-3">
      <div className="col">
        <LocationInputForm
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
