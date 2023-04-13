import { useState, useRef } from 'react';
import Select from 'react-select';
import rainy from '../media/rain.gif'
import jungley from '../media/jungle.gif'
import creeky from '../media/creek.gif'
const options = [
  { value: 'rain', label: 'Rain' },
  { value: 'jungle', label: 'Jungle' },
  { value: 'creek', label: 'Creek' },
];

const AmbientSoundsDropdown = () => {
  const [volume, setVolume] = useState(50);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentSound, setCurrentSound] = useState(null);
  const [rain, setRain] = useState(false);
  const [jungle, setJungle] = useState(false);
  const [creek, setCreek] = useState(false);
  const audioRef = useRef();

const playSound = () => {
  if (selectedOption) {
    if (currentSound) {
      currentSound.pause();
      currentSound.currentTime = 0;
      setCurrentSound(null);
    }
    const sound = new Audio(`./media/${selectedOption.value}.mp3`);
    sound.volume = volume / 100;
    sound.play();
    setCurrentSound(sound);
    audioRef.current = sound;
  }
};
  const handleVolumeChange = (event) => {
    const value = event.target.value;
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value / 100;
    }
  };

  const handleSoundChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    if (selectedOption.value == 'rain') {
      setRain(true);
      setJungle(false);
      setCreek(false);

    } else if (selectedOption.value == 'jungle') {
       setRain(false);
      setJungle(true);
      setCreek(false);
 
    } else {
        setRain(false);
      setJungle(false);
      setCreek(true);
   
    }
    console.log(selectedOption.value)
    if (currentSound) {
      currentSound.pause();
      currentSound.currentTime = 0;
          setCurrentSound(null);
      
    }
  };
const stopSound = () => {
  if (currentSound) {
    currentSound.pause();
    currentSound.currentTime = 0;
    setCurrentSound(null);
       setRain(false);
      setJungle(true);
      setCreek(false);
  }
};
  return (
    <div className="p-12 bg-gray-200">
      <h1 className="text-xl pb-4">Ambience</h1>
      <Select
        options={options}
        value={selectedOption}
        onChange={handleSoundChange}
      />
      <div className="flex justify-center">
      {rain && <img className="ambienceimg" src={rainy} alt="" />}
      {jungle && <img className="ambienceimg" src={jungley} alt="" />}
      {creek && <img className="ambienceimg" src={creeky} alt="" />}
 </div>
      <div className="sidebyside">
    {!currentSound && <button className="mt-10" onClick={playSound}>Play</button>}
{currentSound && <button className="mt-10" onClick={stopSound}>Stop</button>}
    <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={volume}
        onChange={handleVolumeChange}
      />
      </div>
     
    </div>
  );
};

export default AmbientSoundsDropdown;
