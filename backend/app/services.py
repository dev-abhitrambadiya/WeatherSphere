import httpx
import asyncio
from .schemas import WeatherResponse

async def fetch_weather_data(lat: float, lon: float) -> WeatherResponse:
    weather_url = "https://api.open-meteo.com/v1/forecast"
    weather_params = {
        "latitude": lat,
        "longitude": lon,
        "current_weather": True,
        "daily": ["weathercode", "temperature_2m_max", "temperature_2m_min"],
        "timezone": "auto"
    }
    
    geo_url = "https://nominatim.openstreetmap.org/reverse"
    geo_params = {
        "format": "json",
        "lat": lat,
        "lon": lon,
        "zoom": 10
    }
    
    async with httpx.AsyncClient() as client:
        weather_task = client.get(weather_url, params=weather_params)
        geo_task = client.get(geo_url, params=geo_params, headers={"User-Agent": "WeatherGlobeApp/1.0"})
        
        weather_res, geo_res = await asyncio.gather(weather_task, geo_task, return_exceptions=True)
        
        if isinstance(weather_res, Exception):
            raise weather_res
        weather_res.raise_for_status()
        data = weather_res.json()
        
        location_name = None
        if not isinstance(geo_res, Exception) and geo_res.status_code == 200:
            geo_data = geo_res.json()
            address = geo_data.get("address", {})
            location_name = address.get("city") or address.get("town") or address.get("village") or address.get("county") or address.get("country") or geo_data.get("name")
        
        return WeatherResponse(
            latitude=data["latitude"],
            longitude=data["longitude"],
            location_name=location_name,
            current_weather=data["current_weather"],
            daily=data["daily"]
        )
