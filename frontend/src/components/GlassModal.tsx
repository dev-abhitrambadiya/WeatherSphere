import { motion, AnimatePresence } from 'framer-motion';
import type { WeatherData } from '../hooks/useWeather';
import WeatherCard, { getWeatherIcon } from './WeatherCard';
import { X, Wind, MapPin } from 'lucide-react';

interface GlassModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: WeatherData | null;
}

const GlassModal = ({ isOpen, onClose, data }: GlassModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && data && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
          className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-black/40 backdrop-blur-xl shadow-2xl p-5 sm:p-8">

            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-8">

              {/* Left Content */}
              <div className="flex items-center gap-4 min-w-0 flex-1">
                {/* Weather Icon */}
                <div className="p-3 sm:p-4 bg-white/10 rounded-2xl border border-white/10 shrink-0">
                  {getWeatherIcon(
                    data.current_weather.weathercode,
                    'w-12 h-12 sm:w-16 sm:h-16'
                  )}
                </div>

                {/* Temperature + Location */}
                <div className="min-w-0">
                  <h2 className="text-4xl sm:text-5xl font-light text-white leading-none">
                    {Math.round(data.current_weather.temperature)}°C
                  </h2>

                  <div className="flex items-center gap-1.5 text-white/90 mt-2 min-w-0">
                    <MapPin className="w-4 h-4 shrink-0 text-blue-300" />

                    <span className="truncate font-medium">
                      {data.location_name || 'Unknown Location'}
                    </span>
                  </div>

                  <p className="text-white/50 text-sm mt-1">
                    {data.latitude.toFixed(4)}°,{' '}
                    {data.longitude.toFixed(4)}°
                  </p>
                </div>
              </div>

              {/* Right Side */}
              <div className="flex items-start gap-3 shrink-0">

                {/* Wind Card */}
                <div className="flex flex-col items-center justify-center px-4 py-3 bg-white/5 rounded-2xl border border-white/10 min-w-[90px]">
                  <Wind className="w-5 h-5 text-blue-300 mb-1" />

                  <span className="text-white text-sm font-semibold">
                    {data.current_weather.windspeed}
                  </span>

                  <span className="text-white/50 text-xs">
                    km/h
                  </span>
                </div>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white p-2 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Forecast Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {data.daily.time.slice(0, 7).map((time, index) => (
                <WeatherCard
                  key={time}
                  date={time}
                  maxTemp={data.daily.temperature_2m_max[index]}
                  minTemp={data.daily.temperature_2m_min[index]}
                  weatherCode={data.daily.weathercode[index]}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlassModal;