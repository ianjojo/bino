import { useState, useRef } from 'react';
import Select from 'react-select';

const options = [
  { value: 'rain', label: 'Rain' },
  { value: 'jungle', label: 'Jungle' },
  { value: 'creek', label: 'Creek' },
];

const AmbientSoundsDropdown = () => {
  const [volume, setVolume] = useState(50);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentSound, setCurrentSound] = useState(null);
  const audioRef = useRef();

  const playSound = () => {
    if (selectedOption) {
      const sound = new Audio(`./media/${selectedOption.value}.mp3`);
      sound.volume = volume / 100;
      sound.play();
      if (currentSound) {
        currentSound.pause();
        currentSound.currentTime = 0;
      }
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
    if (currentSound) {
      currentSound.pause();
      currentSound.currentTime = 0;
    }
  };

  return (
    <div>
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={volume}
        onChange={handleVolumeChange}
      />
      <Select
        options={options}
        value={selectedOption}
        onChange={handleSoundChange}
      />
      <button onClick={playSound}>Play Sound</button>
    </div>
  );
};

export default AmbientSoundsDropdown;
