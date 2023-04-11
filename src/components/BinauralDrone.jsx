import React, { useState, useRef, useEffect } from "react";
import './binaural.css'
const frequencyPairs = [
  { label: "addiction ", value: [110, 112], colors: ['90deg', '#ff8a00', '#ff0084'] },
  { label: "cosmic", value: [438, 461], colors: ['40deg', '#2F3C7E', '#FBEAEB'] },
  { label: "nirvanaz", value: [250, 253], colors: ['130deg', '#CCF381', '#4831D4'] },
  { label: "excel", value: [261.63, 311.13], colors: ['130deg', '#CCF381', '#4831D4'] },
  { label: "earthtone", value: [281, 278], colors: ['130deg', '#CCF381', '#4831D4'] },
  { label: "focus", value: [80.90, 97.09], colors: ['130deg', '#CCF381', '#4831D4'] },
  { label: "luv", value: [45, 67], colors: ['130deg', '#CCF381', '#4831D4'] },
    { label: "Major Third (5:4)", value: [220, 275], colors: ['130deg', '#CCF381', '#4831D4'] },
  { label: "Minor Third (6:5)", value: [220, 264], colors: ['130deg', '#CCF381', '#4831D4'] },
  { label: "Tritone (7:5)", value: [220, 308], colors: ['130deg', '#CCF381', '#4831D4'] },
];

function App() {
  const [isFirst, setIsFirst] = useState(true)
  const [volume, setVolume] = useState(50);
  const audioContextRef = useRef(null);
  const oscillator1Ref = useRef(null);
  const oscillator2Ref = useRef(null);
  const [selectedPair, setSelectedPair] = useState(frequencyPairs[0]);
  const [gradient, setGradient] = useState("");
  const [deg, setDeg] = useState("90deg")
  const [col1, setCol1] = useState("#FFF")
  const [col2, setCol2] = useState("#000")
  const [isStopped, setIsStopped] = useState(true);
const handleVolumeChange = (event) => {
  setVolume(event.target.value);
};
  const canvasRef = useRef(null);
  const handlePairChange = (event) => {
    // stop();
    const newPair = frequencyPairs.find(
      (pair) => pair.value.toString() === event.target.value
    );
    setSelectedPair(newPair);
    console.log(newPair)
    setDeg(newPair.colors?.[0])
    setCol1(newPair.colors?.[1])
    setCol2(newPair.colors?.[2])
    // play();
 
  };

  useEffect(() => {
    if (isFirst) {
      console.log(isFirst)
      setIsFirst(false);
      stop();
      return;
    }
    stop();
    play();
  }, [selectedPair])

  const suspendAudioContext = () => {
  if (audioContextRef.current) {
    audioContextRef.current.suspend();
  }
};

const resumeAudioContext = () => {
  if (audioContextRef.current) {
    audioContextRef.current.resume();
  }
};

  const play = () => {
  suspendAudioContext();
  setIsStopped(false);
  if (!audioContextRef.current) {
    audioContextRef.current = new AudioContext();
  }
  const context = audioContextRef.current;

  const oscillator1 = context.createOscillator();
  oscillator1.type = "sine";
  oscillator1.frequency.setValueAtTime(
    selectedPair.value[0],
    context.currentTime
  );
const gainNode1 = context.createGain();
gainNode1.gain.setValueAtTime(volume / 100, context.currentTime);
  oscillator1.connect(gainNode1);

  const oscillator2 = context.createOscillator();
  oscillator2.type = "sine";
  oscillator2.frequency.setValueAtTime(
    selectedPair.value[1],
    context.currentTime
  );
const gainNode2 = context.createGain();
gainNode2.gain.setValueAtTime(volume / 100, context.currentTime);
  oscillator2.connect(gainNode2);

  const merger = context.createChannelMerger(2);
  gainNode1.connect(merger, 0, 1);
  gainNode2.connect(merger, 0, 0);
  merger.connect(context.destination);

  oscillator1.start();
  oscillator2.start();

  oscillator1Ref.current = oscillator1;
  oscillator2Ref.current = oscillator2;
};


  const stop = () => {
    setIsStopped(true)
     resumeAudioContext();
    const oscillator1 = oscillator1Ref.current;
    const oscillator2 = oscillator2Ref.current;

    if (oscillator1 && oscillator2) {
      oscillator1.stop();
      oscillator2.stop();
      oscillator1.disconnect();
      oscillator2.disconnect();
    }

    // reset the state
    audioContextRef.current = null;
    oscillator1Ref.current = null;
    oscillator2Ref.current = null;
  };

  return (
    <div>
       
       {frequencyPairs.map((pair) => (
        <label key={pair.value}>
          <input
            type="radio"
            value={pair.value.toString()}
            checked={selectedPair.value.toString() === pair.value.toString()}
            onChange={handlePairChange}
          />
          {pair.label}
        </label>
       ))}
      <input type="range" min="0" max="100" value={volume} onChange={handleVolumeChange} />

      <button onClick={play}>Play</button>
      <button onClick={stop}>Stop</button>
        {!isStopped && <div className="gradient"
    
      
        style={{ border: "1px solid black", height: "300px", width: "300px",  background: `linear-gradient(${deg},${col1}, ${col2})` }}
      ></div>}
    </div>
  );
}

export default App;
