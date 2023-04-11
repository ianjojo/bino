import React, { useState , useEffect} from 'react';
import './App.css';
import BinauralDrone from './components/BinauralDrone'
import AmbientSoundsDropdown from './components/Ambience';
import AmbiencePlayer from './components/AmbiencePlayer';
function App() {
  
    

return (
  <div className="App">
    <BinauralDrone />
  
 <AmbientSoundsDropdown />

  </div>
);
}

export default App;