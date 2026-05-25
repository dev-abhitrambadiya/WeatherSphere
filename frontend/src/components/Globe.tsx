import { useEffect, useRef, useState } from 'react';
import GlobeGl from 'react-globe.gl';

interface GlobeProps {
  onLocationClick: (lat: number, lon: number) => void;
  selectedLat?: number;
  selectedLon?: number;
}

const GlobeComponent = ({ onLocationClick, selectedLat, selectedLon }: GlobeProps) => {
  const globeEl = useRef<any>(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);

  const markerData = selectedLat !== undefined && selectedLon !== undefined 
    ? [{ lat: selectedLat, lng: selectedLon }] 
    : [];

  return (
    <div className="absolute inset-0 z-0 bg-slate-900 cursor-crosshair overflow-hidden">
      <GlobeGl
        ref={globeEl}
        width={windowSize.width}
        height={windowSize.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        onGlobeClick={(coords: { lat: number; lng: number }) => {
          onLocationClick(coords.lat, coords.lng);
        }}
        htmlElementsData={markerData}
        htmlElement={() => {
          const el = document.createElement('div');
          el.innerHTML = `
            <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-full cursor-pointer pointer-events-none">
              <div class="absolute w-4 h-4 bg-red-500 rounded-full animate-ping opacity-75"></div>
              <div class="relative w-3 h-3 bg-red-600 rounded-full border-2 border-white shadow-[0_0_10px_rgba(255,0,0,0.8)]"></div>
              <div class="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-red-600 to-transparent"></div>
            </div>
          `;
          return el;
        }}
      />
    </div>
  );
};

export default GlobeComponent;
