/* eslint-disable @typescript-eslint/no-explicit-any */
interface CacheData {
  data: any
  timestamp: number
  location: string
}

const CACHE_KEY = "weather_data"
const CACHE_DURATION = 10 * 60 * 1000 // 10 minutes

export const weatherCache = {
  set(data: any): void {
    const cacheData: CacheData = {
      data,
      timestamp: Date.now(),
      location: data.location,
    }

    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
    } catch (error) {
      console.warn("Failed to cache weather data:", error)
    }
  },

  get(location?: string): any | null {
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (!cached) return null

      const cacheData: CacheData = JSON.parse(cached)
      const isExpired = Date.now() - cacheData.timestamp > CACHE_DURATION
      const isLocationMatch = !location || cacheData.location === location

      if (isExpired || !isLocationMatch) {
        this.clear()
        return null
      }

      return cacheData.data
    } catch (error) {
      console.warn("Failed to get cached weather data:", error)
      this.clear()
      return null
    }
  },

  clear(): void {
    try {
      localStorage.removeItem(CACHE_KEY)
    } catch (error) {
      console.warn("Failed to clear weather cache:", error)
    }
  },
}
