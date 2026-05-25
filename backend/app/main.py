from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .schemas import WeatherResponse
from .services import fetch_weather_data
import httpx

app = FastAPI(title="Weather Globe API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/weather", response_model=WeatherResponse)
async def get_weather(lat: float, lon: float):
    try:
        return await fetch_weather_data(lat, lon)
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=f"Open-Meteo API error: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
