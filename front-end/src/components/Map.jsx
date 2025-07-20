import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import "leaflet-velocity";
const LeafletMap = () => {
  // console.log(Windy);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    const initializeMap = () => {
      if (mapRef.current && L && !mapInstanceRef.current) {
        const map = L.map(mapRef.current).setView([37.0902, -95.7129], 4);

        mapInstanceRef.current = map;
        const osmTileLayer = L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            attribution: "OpenStreetMap contributors",
            minZoom: 1,
            maxZoom: 10,
          }
        );

        const googleStreetsTileLayer = L.tileLayer(
          "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
          {
            maxZoom: 20,
            subdomains: ["mt0", "mt1", "mt2", "mt3"],
          }
        );
        const baseLayers = {
          OpenStreetMap: osmTileLayer,
          "Google Streets": googleStreetsTileLayer,
        };
        L.control
          .layers(baseLayers, {}, { collapsed: false })
          .addTo(mapInstanceRef.current);
        osmTileLayer.addTo(mapInstanceRef.current);
      }
      const heatLayer = L.heatLayer(
        [
          [37.0902, -95.7129],
          [37.0902, -95.7139],
          [37.0903, -95.7139],
          [37.0903, -95.7129],
          [37.0902, -95.7129],
        ],
        {
          radius: 50,
          blur: 14,
          gradient: { 0.2: "blue", 0.5: "lime", 0.8: "red" },
        }
      );
      heatLayer.addTo(mapInstanceRef.current);
      
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
            style={{ minHeight: "400px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default LeafletMap;
