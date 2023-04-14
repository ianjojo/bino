import { useState, useRef, useEffect } from "react";
import Select from "react-select";
import rainy from "../media/rain.gif";
import jungley from "../media/jungle.gif";
import creeky from "../media/creek.gif";
const options = [
  { value: "rain", label: "rain" },
  { value: "jungle", label: "jungle" },
  { value: "creek", label: "creek" },
];

const AmbientSoundsDropdown = () => {
  const [volume, setVolume] = useState(50);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentSound, setCurrentSound] = useState(null);
  const [rain, setRain] = useState(false);
  const [jungle, setJungle] = useState(false);
  const [creek, setCreek] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef();
  const playSound = () => {
    if (selectedOption) {
      if (currentSound) {
        currentSound.pause();
        currentSound.currentTime = 0;
        setCurrentSound(null);
        setPlaying(false);
      }
      if (selectedOption.value == "rain") {
        setRain(true);
        setPlaying(true);
      } else if (selectedOption.value == "jungle") {
        setJungle(true);
        setPlaying(true);
      } else {
        setCreek(true);
        setPlaying(true);
      }
      const sound = new Audio(`./media/${selectedOption.value}.mp3`);
      sound.volume = volume / 100;
      sound.loop = true;
      sound.addEventListener("ended", () => {
        sound.currentTime = 0;
        sound.play();
      });
      sound.play();
      setCurrentSound(sound);
      audioRef.current = sound;
      setPlaying(true);
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
    if (selectedOption.value == "rain") {
      setRain(true);
      setJungle(false);
      setCreek(false);
      setPlaying(false);
    } else if (selectedOption.value == "jungle") {
      setRain(false);
      setJungle(true);
      setCreek(false);
      setPlaying(false);
    } else {
      setRain(false);
      setJungle(false);
      setCreek(true);
      setPlaying(false);
    }

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
      if (selectedOption.value == "rain") {
        setRain(false);
        setPlaying(false);
      } else if (selectedOption.value == "jungle") {
        setJungle(false);
        setPlaying(false);
      } else {
        setCreek(false);
        setPlaying(false);
      }
    }
  };
  return (
    <div className='p-12 bg-gray-200 rounded-r-2xl'>
      <h1 className='text-xl pb-4'>Ambience</h1>
      <Select
        className='z-50'
        options={options}
        value={selectedOption}
        onChange={handleSoundChange}
      />
      <div className='flex justify-center z-50'></div>
      <div className='sidebyside z-50'>
        {!currentSound && (
          <button className='mt-3 z-50' onClick={playSound}>
            Play
          </button>
        )}
        {currentSound && (
          <button className='mt-3 z-50' onClick={stopSound}>
            Stop
          </button>
        )}
        <input
          type='range'
          min='0'
          max='100'
          step='1'
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
      <div className='flex flex-col justify-center relative'>
        {!rain && !jungle && !creek && !playing && (
          <div
            style={{ height: "140px", width: "140px" }}
            className='gradient'
          ></div>
        )}

        {rain && playing && (
          <img className='ambienceimg gradient' src={rainy} alt='' />
        )}
        {jungle && playing && (
          <img className='ambienceimg gradient ' src={jungley} alt='' />
        )}
        {creek && playing && (
          <img className='ambienceimg gradient' src={creeky} alt='' />
        )}
      </div>
    </div>
  );
};

export default AmbientSoundsDropdown;
