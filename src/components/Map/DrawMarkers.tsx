import React, { useEffect, useState } from 'react';
import { Marker, Popup, } from 'react-leaflet';
import { Drawer, List, Avatar, Divider } from 'antd';
import axios from 'axios';
import L from 'leaflet';
import "../Layout/Layout.css";


type MarkerData = {
  lat: number;
  long: number;
  name: string;
  art: string;
  date: string;
};
const getIconByName = (name:string) => {
  switch(name) {
      case 'Conflict and Violence':
          return new L.Icon({
              iconUrl: 'https://cdn0.iconfinder.com/data/icons/office-colored/128/contactscolored-07-1024.png',
              iconSize: [45, 50],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34]
          });
      case 'Humanitarian aid':
          return new L.Icon({
              iconUrl: 'https://cdn1.iconfinder.com/data/icons/location-pins-soft-fill/60/First-Aid-Kit-Maps-gps-point-1024.png',
              iconSize: [35, 40],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34]
          });
      case 'Economic issues':
          return new L.Icon({
              iconUrl: "https://cdn3.iconfinder.com/data/icons/business-filled-line-9/48/Location-1024.png" ,
              iconSize: [35, 35],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34]
          });      
      case 'Food crises':
          return new L.Icon({
              iconUrl: 'https://cdn1.iconfinder.com/data/icons/maps-and-navigation-70/504/food-location-caf-restaurant-service-1024.png',
              iconSize: [35,35],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34]
          });
      case 'Land-related issues':
          return new L.Icon({
              iconUrl: 'https://cdn0.iconfinder.com/data/icons/land-management-1/64/location-location_pin-map-navigation-maps_and_location-pin_point-1024.png',
              iconSize: [35, 35],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34]
          });
      case 'Environmental issues':
          return new L.Icon({
              iconUrl: 'https://cdn4.iconfinder.com/data/icons/location-pin-filled-outline/64/GARDEN-placeholder-farm-location-pin-1024.png',
              iconSize: [30, 35],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34]
          });      
      case 'Political instability':
          return new L.Icon({
              iconUrl: 'https://cdn1.iconfinder.com/data/icons/law-crime-and-justice-3/32/location-court-map-marker-pin-navigation-courthouse-1024.png',
              iconSize: [35, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34]
          });      
      case 'Pests and diseases':
          return new L.Icon({
              iconUrl: 'https://cdn1.iconfinder.com/data/icons/coronavirus-93/64/location_corona_virus_outbreak_sick_location_pin_covid-19-1024.png',
              iconSize: [35, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34]
          });
      case 'Forced displacements':
          return new L.Icon({
              iconUrl: 'https://cdn0.iconfinder.com/data/icons/gym-fitness-1/100/gym-08-1024.png',
              iconSize: [35, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34]
          });
      case 'Weather conditions':
          return new L.Icon({
              iconUrl: "https://cdn0.iconfinder.com/data/icons/weather-soft-fill/60/Rain-Location-climate-forecast-map-pin-1024.png",
              iconSize: [35, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34]
          });
      
            
      default:
          return new L.Icon.Default();  // Default marker icon
  }
}

type Props = {
  minDate: Date | null;
  maxDate: Date | null;
  countryselection: string;
};

const DrawMarkers = ({ minDate, maxDate, countryselection}: Props) => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [open, setOpen] = useState(false);
  const [currentArticles, setCurrentArticles] = useState<string>("");
  const [currentDates, setCurrentDates] = useState<string>("");
  const [currentName, setCurrentName] = useState<string>("");

  useEffect(() => {
    console.log('use effect called')
    if (minDate === null || maxDate === null) {
      setMarkers([]);
      return;
    }
    console.log(minDate.toISOString());
    axios.get("http://localhost:3001/api/get_markers", {
      params: {
        minDate: minDate.getTime() / 1000,
        maxDate: maxDate.getTime() / 1000,
        country: countryselection
      },
    }).then((response) => {
      setMarkers(response.data);
      console.log(response.data);
    });
  }, [minDate, maxDate,countryselection]);

  return (
    <>
      {markers.map((markerData, index) => (
        <Marker
          key={index}
          position={[markerData.lat, markerData.long]}
          icon={getIconByName(markerData.name)}
          eventHandlers={{
            click: () => {
              setCurrentName(markerData.name);
              setCurrentArticles(markerData.art);
              setCurrentDates(markerData.date);
              setOpen(true);
              console.log("Entire Marker Data:", markerData);
    },
  }}
/>      
      ))}
        <Drawer
          title={currentName} // Set the drawer title to the name (event type)
          placement="right"
          onClose={() => setOpen(false)}
          visible={open}
        >
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  src="https://w7.pngwing.com/pngs/753/703/png-transparent-allafrica-com-news-ethiopia-media-source-try-square.png"
                  shape="square"
                />
              }
              title={currentName}
              description={
                <>
                  <p style={{ margin: 0, padding: 0, color: "#404040" }}>
                    Published on: {currentDates}
                  </p>
                  <Divider style={{ margin: 0, padding: 0 }} />
                  <p>
                    {currentArticles.trim()}
                  </p>
                </>
              }
            />
          </List.Item>
        </Drawer>
    </>
    
  );
};

export default DrawMarkers;
