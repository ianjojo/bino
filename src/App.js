import React, { useState , useEffect} from 'react';
import './App.css';
import BinauralDrone from './components/BinauralDrone'
import AmbientSoundsDropdown from './components/Ambience';
import AmbiencePlayer from './components/AmbiencePlayer';
function App() {
  
    

return (
  <div className="App">
    <div className="maincontainer">

      <div className="titlecontainer flex justify-between w-full align-bottom items-end">
        
        <h1 className="text-3xl font-bold">Hocus Focus</h1>
        <h3 className="align-bottom italic">sounds to block it all out</h3>
  </div>
      <div className="subcontainer">


    <BinauralDrone />
  
        <AmbientSoundsDropdown />
              </div>
        </div>

  </div>
);
}

export default App;