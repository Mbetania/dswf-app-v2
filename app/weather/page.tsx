"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { WeatherWidget } from "@/components/weather-widget"
import { WeatherService, getRandomLocation } from "@/lib/weather-api"
import { weatherCache } from "@/lib/weather-cache"
import type { WeatherData } from "@/lib/types"

const weatherService = new WeatherService()

const defaultConfig = {
  provider: "openMeteo",
  lang: "es",
  tempUnit: "C" as const,
  windSpeedUnit: "kmh" as const,
}

export default function WeatherPage() {
  const [cachedWeather, setCachedWeather] = useState<WeatherData | null>(null)
  const [searchWeather, setSearchWeather] = useState<WeatherData | null>(null)
  const [randomWeather, setRandomWeather] = useState<WeatherData | null>(null)
  const [searchLocation, setSearchLocation] = useState("")
  const [loading, setLoading] = useState({ cached: false, search: false, random: false })
  const [errors, setErrors] = useState({ cached: "", search: "", random: "" })

  useEffect(() => {
    const cached = weatherCache.get()
    if (cached) {
      setCachedWeather(cached)
    } else {
      loadCachedWeather()
    }
    loadRandomWeather()
  }, [])

  const loadCachedWeather = async () => {
    setLoading((prev) => ({ ...prev, cached: true }))
    setErrors((prev) => ({ ...prev, cached: "" }))

    try {
      const weatherData = await weatherService.getWeather(defaultConfig, { autoLocate: "ip" })
      setCachedWeather(weatherData)
      weatherCache.set(weatherData)
    } catch (error) {
      setErrors((prev) => ({ ...prev, cached: "Error al cargar el clima de tu ubicación" }))
    } finally {
      setLoading((prev) => ({ ...prev, cached: false }))
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchLocation.trim()) return

    setLoading((prev) => ({ ...prev, search: true }))
    setErrors((prev) => ({ ...prev, search: "" }))

    try {
      const weatherData = await weatherService.getWeather(defaultConfig, { location: searchLocation })
      setSearchWeather(weatherData)
    } catch (error) {
      setErrors((prev) => ({ ...prev, search: error instanceof Error ? error.message : "Error al buscar el clima" }))
    } finally {
      setLoading((prev) => ({ ...prev, search: false }))
    }
  }

  const loadRandomWeather = async () => {
    setLoading((prev) => ({ ...prev, random: true }))
    setErrors((prev) => ({ ...prev, random: "" }))

    try {
      const randomLocation = getRandomLocation()
      const weatherData = await weatherService.getWeather(defaultConfig, { location: randomLocation })
      setRandomWeather(weatherData)
    } catch (error) {
      setErrors((prev) => ({ ...prev, random: "Error al cargar el clima aleatorio" }))
    } finally {
      setLoading((prev) => ({ ...prev, random: false }))
    }
  }

  const refreshRandomWeather = () => {
    sessionStorage.removeItem("randomLocation")
    loadRandomWeather()
  }

  return (
    <div className="max-w-7xl mx-auto pt-10 animate-fade-in-up">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Dashboard del Clima</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Consulta el clima actual desde diferentes fuentes: tu ubicación guardada, búsqueda personalizada y ubicaciones
          aleatorias del mundo.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Tu Ubicación</h2>
            <button
              onClick={loadCachedWeather}
              disabled={loading.cached}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 transition-colors duration-200"
            >
              {loading.cached ? "Cargando..." : "Actualizar"}
            </button>
          </div>
          <WeatherWidget
            weather={cachedWeather}
            loading={loading.cached}
            error={errors.cached}
            description="Clima basado en tu ubicación guardada en caché"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Buscar Ubicación</h2>
          <form onSubmit={handleSearch} className="space-y-3">
            <div className="flex space-x-2">
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Ej: Madrid, España"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
              <button
                type="submit"
                disabled={loading.search || !searchLocation.trim()}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors duration-200"
              >
                {loading.search ? "Buscando..." : "Buscar"}
              </button>
            </div>
          </form>
          <WeatherWidget
            weather={searchWeather}
            loading={loading.search}
            error={errors.search}
            description="Busca el clima de cualquier ciudad del mundo"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Ubicación Aleatoria</h2>
            <button
              onClick={refreshRandomWeather}
              disabled={loading.random}
              className="px-3 py-1 text-sm bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50 transition-colors duration-200"
            >
              {loading.random ? "Cargando..." : "Nueva Ubicación"}
            </button>
          </div>
          <WeatherWidget
            weather={randomWeather}
            loading={loading.random}
            error={errors.random}
            description="Descubre el clima en una ciudad aleatoria"
          />
        </div>
      </div>

      <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 animate-slide-in-bottom">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Información sobre la API</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">OpenMeteo</div>
            <div className="text-gray-600 dark:text-gray-300">API del Clima</div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Datos meteorológicos gratuitos y precisos</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">10 min</div>
            <div className="text-gray-600 dark:text-gray-300">Caché</div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Los datos se almacenan localmente por 10 minutos</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">20+</div>
            <div className="text-gray-600 dark:text-gray-300">Ubicaciones</div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Ciudades aleatorias disponibles</p>
          </div>
        </div>
      </div>
    </div>
  )
}
