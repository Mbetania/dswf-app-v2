import { Cloud, Droplets, Thermometer } from "lucide-react"

interface WeatherData {
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

interface WeatherWidgetProps {
  weather: WeatherData | null
  loading: boolean
  error: string
  description: string
}

export function WeatherWidget({ weather, loading, error, description }: WeatherWidgetProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 h-80">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 h-80 flex items-center justify-center">
        <div className="text-center">
          <Cloud className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-red-600 font-medium mb-2">Error</p>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  if (!weather) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 h-80 flex items-center justify-center">
        <div className="text-center">
          <Cloud className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    )
  }

  const getWeatherIcon = (weatherType: string) => {
    switch (weatherType.toLowerCase()) {
      case 'clear':
        return '☀️'
      case 'cloudy':
        return '☁️'
      case 'rain':
      case 'lightrain':
      case 'moderaterain':
        return '🌧️'
      case 'snow':
      case 'lightsnow':
      case 'heavysnow':
        return '❄️'
      case 'thunderstorm':
        return '⛈️'
      case 'fog':
        return '🌫️'
      default:
        return '🌤️'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-80">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{weather.location}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      <div className="text-center mb-6">
        <div className="text-4xl mb-2">{getWeatherIcon(weather.weather_type)}</div>
        <div className="text-3xl font-bold text-gray-800 mb-1">
          {weather.temperature}{weather.units.temp}
        </div>
        <p className="text-gray-600 capitalize">{weather.weather_desc}</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Thermometer className="w-4 h-4 text-orange-500" />
            <span className="text-sm text-gray-600">Sensación térmica</span>
          </div>
          <span className="text-sm font-medium">{weather.feels_like}{weather.units.temp}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Droplets className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-gray-600">Humedad</span>
          </div>
          <span className="text-sm font-medium">{weather.humidity}%</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Cloud className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Viento</span>
          </div>
          <span className="text-sm font-medium">{weather.wind} {weather.units.wind}</span>
        </div>
      </div>
    </div>
  )
}
