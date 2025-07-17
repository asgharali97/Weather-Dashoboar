import { useEffect, useRef } from 'react';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const LeafletMap = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
  
    const initializeMap = () => {
      if (mapRef.current && L && !mapInstanceRef.current) {
        
        mapInstanceRef.current = L.map(mapRef.current).setView([1.3508, 103.8198], 11);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(mapInstanceRef.current);
      }
    };

    initializeMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full bg-[#E7E5E4] text-[#374151] px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div 
            ref={mapRef} 
            className="w-full h-96 lg:h-[600px]"
            style={{ minHeight: '400px' }}
          />
        </div>

      </div>
    </div>
  );
};  

export default LeafletMap;