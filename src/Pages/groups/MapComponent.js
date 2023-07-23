// MapComponent.js
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GoogleMap, useLoadScript, Autocomplete, Marker } from '@react-google-maps/api';

const libraries = ["places", "drawing"];

const MapComponent = ({setLocation }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries
  });

  const [drawingManager, setDrawingManager] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [center, setCenter] = useState({lat: 31.0461, lng: 34.8516}); // Set to initial coordinates
  const mapRef = useRef();
  const autoCompleteRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    const drawingManager = new window.google.maps.drawing.DrawingManager({
      drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: window.google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [window.google.maps.drawing.OverlayType.POLYGON],
      },
      polygonOptions: {
        fillColor: '#ADFF2F',
        fillOpacity: 0.5,
        editable: true,
        draggable: false,
      },
    });
    drawingManager.setMap(map);
    setDrawingManager(drawingManager);
  }, []);

  const onAutoCompleteLoad = useCallback((autoC) => {
    autoCompleteRef.current = autoC;
    autoCompleteRef.current.setOptions({ componentRestrictions: { country: 'il' } });
  }, []);

  const onPlaceChanged = () => {
    if(autoCompleteRef.current !== null) {
      const place = autoCompleteRef.current.getPlace();
      const coordinates = {
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng()
      }
      setLocation([coordinates]);  // Change to array for consistency
      setCenter({lat: coordinates.latitude, lng: coordinates.longitude}); // Update center
      mapRef.current.panTo(place.geometry.location);
    }
  };


useEffect(() => {
  if(drawingManager) {
    window.google.maps.event.addListener(drawingManager, 'polygoncomplete', (polygon) => {
      if(selectedShape){
        selectedShape.setMap(null);
      }
      polygon.setEditable(true);
      setSelectedShape(polygon);
      const newLocation = getPolygonCoords(polygon);
      setLocation(newLocation);
    });
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [drawingManager, selectedShape]);


  const getPolygonCoords = (polygon) => {
    const len = polygon.getPath().getLength();
    let location = [];
    for(let i = 0; i < len; i++) {
      const latLng = polygon.getPath().getAt(i).toUrlValue(6).split(',');
      location.push({
        latitude: parseFloat(latLng[0]),
        longitude: parseFloat(latLng[1]),
      });
    }
    return location;
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <Autocomplete
        onLoad={onAutoCompleteLoad}
        onPlaceChanged={onPlaceChanged}
      >
        <input
          type="text"
          placeholder="Search City"
          style={{ width: '100%', height: '40px', paddingLeft: '10px' }}
        />
      </Autocomplete>
      <GoogleMap
        id="map"
        mapContainerStyle={{ width: '400px', height: '400px' }}
        zoom={10}
        center={center}
        onLoad={onMapLoad}
      >
        {center && <Marker position={center} />}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
