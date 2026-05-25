import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning } from 'lucide-react';

interface WeatherCardProps {
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
}

export const getWeatherIcon = (code: number, className: string = "w-6 h-6") => {
  if (code <= 1) return <Sun className={`${className} text-yellow-400`} />;
  if (code <= 3) return <Cloud className={`${className} text-gray-300`} />;
  if (code <= 69) return <CloudRain className={`${className} text-blue-400`} />;
  if (code <= 79) return <CloudSnow className={`${className} text-white`} />;
  if (code <= 99) return <CloudLightning className={`${className} text-purple-400`} />;
  return <Sun className={`${className} text-yellow-400`} />;
};

const WeatherCard = ({ date, maxTemp, minTemp, weatherCode }: WeatherCardProps) => {
  const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
  
  return (
    <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm">
      <span className="text-white/80 text-sm mb-2">{dayName}</span>
      {getWeatherIcon(weatherCode)}
      <div className="mt-2 flex items-center space-x-2 text-xs">
        <span className="text-white font-medium">{Math.round(maxTemp)}°</span>
        <span className="text-white/50">{Math.round(minTemp)}°</span>
      </div>
    </div>
  );
};

export default WeatherCard;
