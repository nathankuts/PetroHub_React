import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './styles/map.css';

const Map = () => {
  useEffect(() => {
    // Initialize the map
    const map = L.map('map').setView([1.0151, 35.0077], 10);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Define gas stations
    const gasStations = [
      { 
        name: "Total", 
        fuel: [
          { type: "Regular", price: 125 },
          { type: "Diesel", price: 130 }
        ], 
        latitude: 1.0123, 
        longitude: 35.0112 
      },
      { 
        name: "Rubys", 
        fuel: [
          { type: "Regular", price: 130 },
          { type: "Premium", price: 150 }
        ], 
        latitude: 1.0187, 
        longitude: 35.0056 
      },
      // ... add other gas stations ensuring all have latitude and longitude
      { 
        name: "Kitale Filling Station", 
        fuel: [
          { type: "Regular", price: 132 },
          { type: "Premium", price: 132 }
        ], 
        latitude: 1.0151,  // Added latitude
        longitude: 35.00295 
      },
      // ... rest of the gas stations
    ];

    // Function to add markers
    gasStations.forEach(station => {
      const popupContent = `<div class="popup-content"><b>${station.name}</b><br>` +
        station.fuel.map(fuel => `
          Fuel Type: <span class="fuel-type">${fuel.type}</span><br>
          Price: KES <span class="price">${fuel.price}</span><br>
        `).join('') +
        `<a href="#">More Details</a></div>`; // Update link as needed

      const marker = L.marker([station.latitude, station.longitude]).addTo(map)
        .bindPopup(popupContent);

      // Add blink class to marker icon if desired
      if (marker._icon) {
        marker._icon.classList.add('blink');
      }
    });

    // Adjust map based on query parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('focus') === 'kitale') {
      map.setView([1.0151, 35.0077], 12);
    }

    // Handle user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        // Optionally add user location marker
        L.marker([latitude, longitude]).addTo(map)
          .bindPopup('You are here').openPopup();

        // Check nearby gas stations
        gasStations.forEach(station => {
          const distance = calculateDistance(latitude, longitude, station.latitude, station.longitude);
          if (distance < 0.5) { // 0.5 km threshold
            alert(`A gas station (${station.name}) is nearby!`);
          }
        });
      }, () => {
        console.log('Geolocation not allowed or not available.');
      });
    }

    // Function to calculate distance
    function calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371; // km
      const dLat = deg2rad(lat2 - lat1);
      const dLon = deg2rad(lon2 - lon1);
      const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2); 
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
      return R * c;
    }

    function deg2rad(deg) {
      return deg * (Math.PI / 180);
    }

    // Handle map clicks
    map.on('click', function(e) {
      const { lat, lng } = e.latlng;
      console.log(`Latitude: ${lat}, Longitude: ${lng}`);
    });

    // Cleanup on unmount
    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ height: '600px', width: '100%' }}></div>;
};

export default Map;
