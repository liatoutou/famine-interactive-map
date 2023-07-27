import React, { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import axios from 'axios';

type MarkerData = {
  lat: number;
  long: number;
  name: string;
};

const DrawMarkers = () => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  // Fetching data from the back-end
  useEffect(() => {
    axios.get("http://localhost:3001/api/get_markers")
      .then((res) => setMarkers(res.data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <>
      {markers.map((markerData, index) => (
        <Marker
          key={index}
          position={[markerData.lat, markerData.long]}
        >
          <Popup>
            {markerData.name}
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default DrawMarkers;
