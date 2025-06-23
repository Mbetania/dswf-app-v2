/* eslint-disable @typescript-eslint/no-explicit-any */
interface WeatherCode {
  key: string
  description: string
}

const WEATHER_CODES: Record<number, WeatherCode> = {
  0: { key: "Clear", description: "ClearSky" },
  1: { key: "Cloudy", description: "MainlyClear" },
  2: { key: "Cloudy", description: "PartlyCloudy" },
  3: { key: "Cloudy", description: "Overcast" },
  45: { key: "Fog", description: "Fog" },
  48: { key: "Fog", description: "DepositingRimeFog" },
  51: { key: "LightShowerRain", description: "LightDrizzle" },
  53: { key: "ShowerRain", description: "ModerateDrizzle" },
  55: { key: "ShowerRain", description: "DenseDrizzle" },
  61: { key: "LightRain", description: "SlightRain" },
  63: { key: "ModerateRain", description: "ModerateRain" },
  65: { key: "ShowerRain", description: "HeavyRain" },
  71: { key: "LightSnow", description: "SlightSnow" },
  73: { key: "HeavySnow", description: "ModerateSnow" },
  75: { key: "HeavySnow", description: "HeavySnow" },
  80: { key: "LightShowerRain", description: "SlightShowerRain" },
  81: { key: "ShowerRain", description: "ModerateShowerRain" },
  82: { key: "ShowerRain", description: "ViolentShowerRain" },
  95: { key: "Thunderstorm", description: "Thunderstorm" },
}

const RANDOM_LOCATIONS: string[] = [
  "Tokyo, Japan",
  "New York, USA",
  "London, UK",
  "Paris, France",
  "Sydney, Australia",
  "Rio de Janeiro, Brazil",
  "Cairo, Egypt",
  "Mumbai, India",
  "Moscow, Russia",
  "Cape Town, South Africa",
  "Bangkok, Thailand",
  "Berlin, Germany",
  "Toronto, Canada",
  "Buenos Aires, Argentina",
  "Seoul, South Korea",
  "Dubai, UAE",
  "Stockholm, Sweden",
  "Mexico City, Mexico",
  "Singapore",
  "Istanbul, Turkey",
]

type TemperatureUnit = "C" | "F" | "K"
type SpeedUnit = "kmh" | "mph" | "ms"

interface WeatherUnits {
  temp: string
  wind: string
}

interface WeatherData {
  location: string
  isNight: boolean
  temperature: number
  humidity: number
  weather_desc: string
  weather_type: string
  feels_like: number
  wind: number
  units: WeatherUnits
}

interface Coordinates {
  lat: number
  lon: number
}

interface WeatherConfig {
  provider: string
  apiKey?: string
  lang: string
  tempUnit: TemperatureUnit
  windSpeedUnit: SpeedUnit
}

interface WeatherParams {
  lat?: number
  lon?: number
  location?: string
  autoLocate?: "gps" | "ip"
}

export const unitConverter = {
  temperature: (temp: number, unit: TemperatureUnit): number => {
    switch (unit) {
      case "F":
        return (temp * 9) / 5 + 32
      case "K":
        return temp + 273.15
      default:
        return temp
    }
  },

  windSpeed: (speed: number, unit: SpeedUnit): number => {
    switch (unit) {
      case "mph":
        return speed * 0.621371
      case "ms":
        return speed / 3.6
      default:
        return speed
    }
  },

  getTempUnit: (unit: TemperatureUnit): string => {
    switch (unit) {
      case "F":
        return "°F"
      case "K":
        return "K"
      default:
        return "°C"
    }
  },

  getSpeedUnit: (unit: SpeedUnit): string => {
    switch (unit) {
      case "mph":
        return "mph"
      case "ms":
        return "m/s"
      default:
        return "km/h"
    }
  },
}

async function apiRequest(url: string, params: Record<string, any>, signal?: AbortSignal): Promise<any> {
  const urlObj = new URL(url)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      urlObj.searchParams.append(key, String(value))
    }
  })

  const response = await fetch(urlObj.toString(), { signal })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json()
}

export const geolocation = {
  async getGPSLocation(): Promise<Coordinates> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation not supported"))
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) =>
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          }),
        () => reject(new Error("Geolocation permission denied")),
        { timeout: 10000 },
      )
    })
  },

  async getIPLocation(): Promise<Coordinates> {
    const data = await apiRequest("https://ipapi.co/json/", {})
    return {
      lat: data.latitude,
      lon: data.longitude,
    }
  },
}

export function getRandomLocation(): string {
  const savedRandom = sessionStorage.getItem("randomLocation")
  if (savedRandom) {
    return savedRandom
  }

  const randomLocation = RANDOM_LOCATIONS[Math.floor(Math.random() * RANDOM_LOCATIONS.length)]
  sessionStorage.setItem("randomLocation", randomLocation)
  return randomLocation
}

class OpenMeteoAPI {
  async getWeather(config: WeatherConfig, params: WeatherParams, signal?: AbortSignal): Promise<WeatherData> {
    // Get location coordinates
    let coords: Coordinates
    let locationName: string

    if (params.lat && params.lon) {
      coords = { lat: params.lat, lon: params.lon }
      const locationData = await apiRequest(
        "https://api.bigdatacloud.net/data/reverse-geocode-client",
        { latitude: params.lat, longitude: params.lon, localityLanguage: config.lang },
        signal,
      )
      locationName = locationData.city || "Unknown Location"
    } else if (params.location) {
      const locationData = await apiRequest(
        "https://geocoding-api.open-meteo.com/v1/search",
        { name: params.location, count: 1, language: config.lang },
        signal,
      )

      if (!locationData.results?.length) {
        throw new Error(
          `No se pudo encontrar la ubicación "${params.location}". Verifica que el nombre esté escrito correctamente o intenta con una ciudad diferente.`,
        )
      }

      coords = {
        lat: locationData.results[0].latitude,
        lon: locationData.results[0].longitude,
      }
      locationName = locationData.results[0].name
    } else {
      throw new Error("No location provided")
    }

    const weatherData = await apiRequest(
      "https://api.open-meteo.com/v1/forecast",
      {
        latitude: coords.lat,
        longitude: coords.lon,
        current: "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
        daily: "sunrise,sunset",
        wind_speed_unit: "ms",
        timezone: "GMT",
      },
      signal,
    )

    return this.transformData(weatherData, config, locationName)
  }

  transformData(data: any, config: WeatherConfig, location: string): WeatherData {
    const weatherCode = WEATHER_CODES[data.current.weather_code]
    const isNight = this.isNight(data.daily.sunrise[0], data.daily.sunset[0], data.current.time)

    return {
      location,
      isNight,
      temperature: Math.round(unitConverter.temperature(data.current.temperature_2m, config.tempUnit)),
      humidity: data.current.relative_humidity_2m,
      weather_desc: weatherCode?.description || "Unknown",
      weather_type: weatherCode?.key || "Unknown",
      feels_like: Math.round(unitConverter.temperature(data.current.apparent_temperature, config.tempUnit)),
      wind: Math.round(unitConverter.windSpeed(data.current.wind_speed_10m * 3.6, config.windSpeedUnit) * 10) / 10,
      units: {
        temp: unitConverter.getTempUnit(config.tempUnit),
        wind: unitConverter.getSpeedUnit(config.windSpeedUnit),
      },
    }
  }

  isNight(sunrise: string, sunset: string, current: string): boolean {
    const currentTime = new Date(current).getTime()
    const sunriseTime = new Date(sunrise).getTime()
    const sunsetTime = new Date(sunset).getTime()
    return currentTime < sunriseTime || currentTime > sunsetTime
  }
}

export class WeatherService {
  private openMeteo: OpenMeteoAPI

  constructor() {
    this.openMeteo = new OpenMeteoAPI()
  }

  async getWeather(config: WeatherConfig, params: WeatherParams, signal?: AbortSignal): Promise<WeatherData> {
    if (params.autoLocate) {
      try {
        const coords =
          params.autoLocate === "gps" ? await geolocation.getGPSLocation() : await geolocation.getIPLocation()
        params = { ...params, lat: coords.lat, lon: coords.lon }
      } catch (error) {
        if (params.autoLocate === "gps") {
          const coords = await geolocation.getIPLocation()
          params = { ...params, lat: coords.lat, lon: coords.lon }
        } else {
          throw error
        }
      }
    }

    return this.openMeteo.getWeather(config, params, signal)
  }
}
