import React from 'react';
import { useNavigate } from 'react-router-dom';

const SearchButton = () => {
  const navigate = useNavigate();

  const searchGasStations = () => {
    navigate('/map?focus=kitale');
  };

  return (
    <div>
      <h1>PetroHub</h1>
      <button onClick={searchGasStations}>Search available gas stations</button>
    </div>
  );
};

export default SearchButton;
