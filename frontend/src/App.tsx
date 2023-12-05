import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import SolarPanelsComponent from './Components/SolarPanels/SolarPanelsComponent';
import Error404 from './page/Error404';

const App: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/solarpanels"
        element={<SolarPanelsComponent />}
      />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default App;
