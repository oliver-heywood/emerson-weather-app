# emerson-weather-app

An app to demonstrate the capabilities of the [OpenWeather API](https://openweathermap.org/api)

Pushes to `main` branch will automatically build to [https://emerson-weather-app.vercel.app/](https://emerson-weather-app.vercel.app/)

This app uses the [NextJS Framework](https://nextjs.org/learn/foundations/about-nextjs?utm_source=next-site&utm_medium=homepage-cta&utm_campaign=next-website) and is hosted for free on [Vercel](https://vercel.com/).

## Building Locally 

Requirements - Node.js version 14.x.x or higher.

In the root folder install dependencies with `npm install`. 

Copy contents of `.example.env` to a new file `.env` and save a value for OPEN_WEATHER_APP_ID

Then run `npm run dev` to start a local development server on http://localhost:3000. 

To test a production build run `npm run build` and then `npm run start`.
