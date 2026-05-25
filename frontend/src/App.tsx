import { useState } from 'react';
import { Toaster, toast } from 'sonner';
import GlobeComponent from './components/Globe';
import GlassModal from './components/GlassModal';
import { useWeather } from './hooks/useWeather';
import { CloudRain } from 'lucide-react';

function App() {
  const { data, fetchWeather } = useWeather();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLocationClick = async (lat: number, lon: number) => {
    toast.promise(fetchWeather(lat, lon), {
      loading: 'Pinpointing location & fetching data...',
      success: () => {
        setIsModalOpen(true);
        return 'Data fetched successfully!';
      },
      error: 'Failed to fetch weather data.',
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative w-full h-screen bg-slate-900 overflow-hidden font-sans text-slate-50">
      <div className="absolute top-8 left-8 z-10 select-none">
        <div className="flex items-center space-x-3 backdrop-blur-md bg-white/5 p-4 rounded-2xl border border-white/10 shadow-2xl">
          <CloudRain className="w-8 h-8 text-blue-400" />
          <div>
            <h1 className="text-xl font-semibold tracking-wide text-white">WeatherSphere</h1>
            <p className="text-xs text-white/50 tracking-wider uppercase">Global Atmospheric Data</p>
          </div>
        </div>
      </div>
      
      <GlobeComponent 
        onLocationClick={handleLocationClick} 
        selectedLat={data?.latitude} 
        selectedLon={data?.longitude} 
      />
      
      <GlassModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        data={data} 
      />
      
      <Toaster 
        theme="dark" 
        position="top-center" 
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#fff',
          }
        }} 
      />
    </div>
  );
}

export default App;
