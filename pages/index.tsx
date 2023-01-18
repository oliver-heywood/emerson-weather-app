import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react'

export default function Home() {
  const [weather, setWeather] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const locationQuery = { q: "Seattle" };

  useEffect(() => {
    setLoading(true)
    let url = '/api/weather?' + new URLSearchParams(locationQuery);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setWeather(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!weather) return <p>No weather data</p>

  return (
    <div>
      <p>{JSON.stringify(weather)}</p>
    </div>
  )
}
