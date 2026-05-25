import { useState } from 'react';

export interface WeatherData {
  latitude: number;
  longitude: number;
  location_name?: string;
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
    time: string;
  };
  daily: {
    time: string[];
    weathercode: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

export function useWeather() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const BACKEND_URL = "https://weathersphere-t746.onrender.com";

  const fetchWeather = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BACKEND_URL}/api/weather?lat=${lat}&lon=${lon}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchWeather, setData };
}
