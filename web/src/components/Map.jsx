import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
    const [map, setMap] = useState(null);
    const [userLocation, setUserLocation] = useState(null);

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
    
    return (
        <MapContainer
            center={userLocation || [-4.032749, -79.202405]}
            zoom={13}
            whenCreated={setMap}
            style={{ height: "100%", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {userLocation && (
                <Marker position={[-4.032749, -79.202405]}>
                    <Popup>Tu ubicación actual.</Popup>
                </Marker>
            )}
        </MapContainer>
    );
}

export default Map;
