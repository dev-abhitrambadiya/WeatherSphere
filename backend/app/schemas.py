from pydantic import BaseModel
from typing import List, Optional

class WeatherCurrent(BaseModel):
    temperature: float
    windspeed: float
    weathercode: int
    time: str

class DailyForecast(BaseModel):
    time: List[str]
    weathercode: List[int]
    temperature_2m_max: List[float]
    temperature_2m_min: List[float]

class WeatherResponse(BaseModel):
    latitude: float
    longitude: float
    location_name: Optional[str] = None
    current_weather: WeatherCurrent
    daily: DailyForecast
