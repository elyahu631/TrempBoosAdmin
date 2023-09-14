//LocationInput

/* global google */
import React, { useRef, useState } from 'react';
import { GoogleMap, StandaloneSearchBox, useJsApiLoader, Marker } from '@react-google-maps/api';
import Button from '@mui/material/Button';

const israelBounds = {
  north: 33.335631,
  south: 29.453802,
  west: 34.267387,
  east: 35.896244,
};

const inputStyle = {
  boxSizing: 'border-box',
  border: '1px solid #aaa',
  width: '100%',
  height: '40px',
  padding: '0 10px',
  borderRadius: '5px',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
  fontSize: '16px',
  outline: 'none',
  textOverflow: 'ellipses',
  margin: '10px auto',
  paddingLeft: '20px',
  backgroundColor: "rgba(0, 0, 0, 0.0)",
};

const mapContainerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '10px',
  overflow: 'hidden',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  marginTop: '10px'
};

const LIBRARIES = ['places'];


const LocationInput = ({ setLocation, onAddLocation }) => {
  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [geocoder, setGeocoder] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);

  const searchBoxRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });

  const onLoad = (loadedMap) => {
    setMap(loadedMap);
    const geo = new google.maps.Geocoder();
    setGeocoder(geo);
  };




  const onSelect = (e) => {
    if (!geocoder) return;

    const latLng = e.latLng;
    geocoder.geocode({ 'location': latLng }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results[0]) {
        let name = results[0].formatted_address;
        if (name.includes("+")) {
          name = (name.split(" ").slice(2).join(" ")).split(",")[0];
        }
        const newLocation = {
          lat: latLng.lat(),
          lng: latLng.lng(),
          name: name
        };
        setMarkerPosition({ lat: latLng.lat(), lng: latLng.lng() });
        setLocation(newLocation);
        setCurrentLocation(newLocation);
      }
    });
  };





  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      {isLoaded && (
        <>
          <StandaloneSearchBox
            onLoad={ref => {
              searchBoxRef.current = ref;
              const bounds = new google.maps.LatLngBounds(
                new google.maps.LatLng(israelBounds.south, israelBounds.west),
                new google.maps.LatLng(israelBounds.north, israelBounds.east)
              );
              ref.setBounds(bounds);
            }}
            onPlacesChanged={() => {
              const places = searchBoxRef.current.getPlaces();
              if (places && places.length > 0) {
                const loc = places[0].geometry.location;
                const newLocation = {
                  lat: loc.lat(),
                  lng: loc.lng(),
                  name: places[0].formatted_address  // Use the formatted address for more clarity
                };
                setLocation(newLocation);
                setCurrentLocation(newLocation);
                if (map) {
                  map.panTo(new google.maps.LatLng(loc.lat(), loc.lng()));
                }
              }
            }}

          >
            <div>
              <label htmlFor="locationSearch">Search for location:</label>
              <input
                type="text"
                id="locationSearch"
                placeholder="Search for location..."
                style={inputStyle}
                disabled={!map}
              />
          
              <Button
                variant="contained"
                color="primary"
                onClick={() => onAddLocation(currentLocation)}
                sx={{ marginLeft: 1 }}  // Add margin between input and button
              >
                Add Location
              </Button>
            </div>
          </StandaloneSearchBox>


          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={{ lat: 31.0461, lng: 34.8516 }}
            zoom={10}
            onLoad={onLoad}
            onClick={onSelect}
          >
            {markerPosition && <Marker position={markerPosition} />}
          </GoogleMap>


        </>
      )}
    </div>
  );
}

export default LocationInput;
