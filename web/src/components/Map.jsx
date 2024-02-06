import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import Icon_ubication from '../img/Icon_ubication.svg';

const Map = () => {
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (map) {
      setTimeout(() => {
        map.invalidateSize();
      }, 0);
    }
  }, [map]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      },
      (error) => {
        console.error('Error al obtener la ubicación:', error.message);
      }
    );
  }, []);

  const customIcon = new L.Icon({
    iconUrl: { Icon_ubication },
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const handleMapClick = (event) => {
    const { lat, lng } = event.latlng;
    setSelectedLocation([lat, lng]);
  };

  return (
    <MapContainer
      center={userLocation || [-4.032749, -79.202405]}
      zoom={13}
      whenCreated={setMap}
      style={{ height: "100%", width: "100%" }}
      onClick={handleMapClick} // Manejador de clic en el mapa
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {userLocation && (
        <Marker position={[-4.032749, -79.202405]} icon={customIcon}>
          <Popup>Tu ubicación actual.<br />Puedes personalizar esto según tus necesidades.</Popup>
        </Marker>
      )}
      {selectedLocation && (
        <Marker position={selectedLocation} icon={customIcon}>
          <Popup>Ubicación seleccionada.<br />Puedes personalizar esto según tus necesidades.</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default Map;
