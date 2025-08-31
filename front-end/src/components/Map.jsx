import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import "leaflet-velocity";

// --- Heatmap sample data ---
let heatData = {
  points: [
    [17.0902, -95.7129, 0.6],
    [17.0902, -95.7139, 0.7],
    [17.0903, -95.7139, 0.8],
    [17.0903, -95.7129, 0.9],
    [17.0904, -95.7128, 0.5],
    [17.0905, -95.713, 0.6],
    [17.0906, -95.7132, 0.7],
    [17.0907, -95.7134, 0.8],
    [17.0908, -95.7136, 0.9],
    [17.0909, -95.7138, 1.0],
    [37.0909, -95.7138, 1.0],
  ],
};

// // --- Wind sample data ---
// let windData = {
//   header: {
//     lo1: -96, // left longitude
//     la1: 38, // top latitude
//     lo2: -95, // right longitude
//     la2: 37, // bottom latitude
//     nx: 10, // number of columns
//     ny: 10, // number of rows
//     dx: 0.1, // longitude step
//     dy: 0.1, // latitude step
//     parameterNumber: 2,
//     parameterUnit: "m/s",
//     refTime: new Date().toISOString(),
//   },
//   data: [],
// };

// // Fill with random wind vectors (u = east/west, v = north/south)
// for (let i = 0; i < 100; i++) {
//   const u = Math.random() * 10 - 5; // east/west wind
//   const v = Math.random() * 10 - 5; // north/south wind
//   windData.data.push({ u, v });
// }

// --- Wind sample data ---
let nx = 10; // cols
let ny = 10; // rows

let windHeader = {
  lo1: -96, // left lon
  la1: 38, // top lat
  lo2: -95, // right lon
  la2: 37, // bottom lat
  nx,
  ny,
  dx: 0.1,
  dy: 0.1,
  refTime: new Date().toISOString(),
  parameterUnit: "m/s",
};

// Fill U and V grids
let uData = [];
let vData = [];

for (let j = 0; j < ny; j++) {
  for (let i = 0; i < nx; i++) {
    const u = Math.random() * 10 - 5; // east-west
    const v = Math.random() * 10 - 5; // north-south
    uData.push(u);
    vData.push(v);
  }
}

// Now build the two datasets
const uComponent = {
  header: {
    ...windHeader,
    parameterNumber: 2,
    parameterCategory: 2,
    parameterNumberName: "U-component_of_wind",
  },
  data: uData,
};

const vComponent = {
  header: {
    ...windHeader,
    parameterNumber: 3,
    parameterCategory: 2,
    parameterNumberName: "V-component_of_wind",
  },
  data: vData,
};

const LeafletMap = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // add this helper above initializeMap
async function addRainViewerTile(map) {
  try {
    const resp = await fetch("https://api.rainviewer.com/public/weather-maps.json");
    const manifest = await resp.json();
    // manifest.radar & .tiles contains frames[]; we take the latest frame (last one)
    const frames = manifest.radar?.past || manifest.radar?.now?.frames || manifest?.radar?.frames || manifest?.tiles;
    // more robust approach:
    const timestamps = manifest?.radar?.past?.map(f => f.time) 
                    || manifest?.past?.map(f => f.time) 
                    || (manifest?.radar?.frames?.map(f=>f.time)) 
                    || manifest?.frames?.map(f=>f.time);
    const latest = (timestamps && timestamps.length) ? timestamps[timestamps.length - 1] : "now";
    // If manifest supports "now", you can also use "now" instead of timestamp
    const tileUrl = `https://tilecache.rainviewer.com/v2/radar/${latest}/{z}/{x}/{y}.png`;
    // add tile layer
    L.tileLayer(tileUrl, {
      attribution: "RainViewer",
      opacity: 0.55,
      zIndex: 400
    }).addTo(map);
  } catch (err) {
    console.warn("RainViewer tile add failed:", err.message);
  }
}

    const initializeMap = () => {
      if (mapRef.current && L && !mapInstanceRef.current) {
        const map = L.map(mapRef.current).setView([37.0902, -95.7129], 8);

        mapInstanceRef.current = map;
        
        addRainViewerTile(map)
        const osmTileLayer = L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            attribution: "OpenStreetMap contributors",
            minZoom: 1,
            maxZoom: 10,
          }
        );
        L.tileLayer(
          "https://api.rainviewer.com/public/weather-maps.json"
        ).addTo(map);

        osmTileLayer.addTo(map);

        // ---- Heat Layer ----
        const heatLayer = L.heatLayer(heatData.points, {
          radius: 50,
          blur: 14,
          gradient: {
            0.2: "blue",
            0.5: "lime",
            0.8: "red",
          },
        });
        heatLayer.addTo(map);

        // ---- Wind Layer (Velocity) ----
        const velocityLayer = L.velocityLayer({
          displayValues: true,
          displayOptions: {
            // label prefix
            velocityType: "Global Wind",

            // leaflet control position
            position: "bottomleft",

            // no data at cursor
            emptyString: "No velocity data",

            // see explanation below
            angleConvention: "bearingCW",

            // display cardinal direction alongside degrees
            showCardinal: false,

            // one of: ['ms', 'k/h', 'mph', 'kt']
            speedUnit: "ms",

            // direction label prefix
            directionString: "Direction",

            // speed label prefix
            speedString: "Speed",
          },
          data: [uComponent, vComponent], // ✅ structured correctly
          minVelocity: 5,
          maxVelocity: 60,
          velocityScale: 0.01,
          colorScale: ["#00f", "#0ff", "#0f0", "#ff0", "#f00"],
          opacity: 0.5,
        });
        velocityLayer.addTo(map);
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
            style={{ minHeight: "400px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default LeafletMap;