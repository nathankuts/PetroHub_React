import React from 'react';
import L from 'leaflet';

const GasStationMarker = ({ station }) => {
  useEffect(() => {
    const popupContent = `<div class="popup-content"><b>${station.name}</b><br>`;
    station.fuel.forEach(fuel => {
      popupContent += `Fuel Type: <span class="fuel-type">${fuel.type}</span><br>Price: KES <span class="price">${fuel.price}</span><br>`;
    });
    popupContent += `<a href="gas_station_details_${station.name.replace(/\s+/g, '_').toLowerCase()}.html">More Details</a></div>`;
    
    const marker = L.marker([station.latitude, station.longitude]).addTo(map).bindPopup(popupContent);
    marker._icon.classList.add('blink');
  }, [station]);

  return null;
};

export default GasStationMarker;
