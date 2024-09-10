import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchButton from './SearchButton';
import Map from './Map';
import './styles/style.css';

function App() {
  return (
    <Router>
      <div id="app">
        <Routes>
          <Route path="/" element={<SearchButton />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
