import React, { useState } from 'react';
import * as Tone from 'tone';

const AmbiencePlayer = () => {
  const [selectedAmbience, setSelectedAmbience] = useState('');
  const [ambience1, setAmbience1] = useState(null);
  const [ambience2, setAmbience2] = useState(null);
  const [ambience3, setAmbience3] = useState(null);

const loadAmbience = async (path) => {
  const buffer = await Tone.Buffer.fromUrl(path);
  return new Tone.Player(buffer).toDestination();
};

  const handleAmbienceChange = (event) => {
    const selected = event.target.value;
    setSelectedAmbience(selected);
  };

 
  const handlePlay = () => {
    // Stop any currently playing ambience
    ambience1?.state === 'started' && ambience1.stop();
    ambience2?.state === 'started' && ambience2.stop();
    ambience3?.state === 'started' && ambience3.stop();

    // Play the selected ambience
    if (selectedAmbience === 'ambience1') {
      ambience1?.start();
    } else if (selectedAmbience === 'ambience2') {
      ambience2?.start();
    } else if (selectedAmbience === 'ambience3') {
      ambience3?.start();
    }
  };


  const loadAmbiences = async () => {
    const ambience1 = await loadAmbience('./components/media/rain.mp3');
    const ambience2 = await loadAmbience('./media/jungle.mp3');
    const ambience3 = await loadAmbience('./media/creek.mp3');
    setAmbience1(ambience1);
    setAmbience2(ambience2);
    setAmbience3(ambience3);
  };

  // Load the ambience files when the component mounts
  React.useEffect(() => {
    loadAmbiences();
  }, []);

  return (
    <div>
      <select value={selectedAmbience} onChange={handleAmbienceChange}>
        <option value="">Select an ambience</option>
        <option value="ambience1">Ambience 1</option>
        <option value="ambience2">Ambience 2</option>
        <option value="ambience3">Ambience 3</option>
      </select>
      <button onClick={handlePlay}>Play</button>
    </div>
  );
};

export default AmbiencePlayer;
