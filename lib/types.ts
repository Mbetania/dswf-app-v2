export interface WeatherData {
  location: string
  temperature: number
  humidity: number
  weather_desc: string
  weather_type: string
  feels_like: number
  wind: number
  units: {
    temp: string
    wind: string
  }
} 