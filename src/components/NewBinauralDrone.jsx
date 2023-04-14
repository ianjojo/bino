import React, { useState, useRef, useEffect } from "react";
import "./binaural.css";
import Select from "react-select";
const frequencyPairs = [
  {
    label: "sleep/relax (2hz)",
    value: [60, 62],
    colors: ["90deg", "#ff8a00", "#ff0084"],
  },
  {
    label: "creative (8hz)",
    value: [70, 78],
    colors: ["130deg", "#CCF381", "#4831D4"],
  },
  {
    label: "anxiety (12hz)",
    value: [50, 62],
    colors: ["50deg", "#949398FF", "#F4DF4EFF"],
  },
  {
    label: "concentrate (19hz)",
    value: [80, 99],
    colors: ["40deg", "#2F3C7E", "#FBEAEB"],
  },

  {
    label: "love (22hz)",
    value: [45, 67],
    colors: ["10deg", "#CBCE91FF", "#EA738DFF"],
  },

  {
    label: "memory (30hz)",
    value: [67, 97],
    colors: ["230deg", "#97BC62FF", "#2C5F2D"],
  },
];

function App() {
  const [isFirst, setIsFirst] = useState(true);
  const [volume, setVolume] = useState(50);
  const audioContextRef = useRef(null);
  const oscillator1Ref = useRef(null);
  const oscillator2Ref = useRef(null);
  const [selectedPair, setSelectedPair] = useState(frequencyPairs[0]);
  const [gradient, setGradient] = useState("");
  const [deg, setDeg] = useState("90deg");
  const [col1, setCol1] = useState("#FFF");
  const [col2, setCol2] = useState("#000");
  const [isStopped, setIsStopped] = useState(true);
  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };
  const canvasRef = useRef(null);
  const handlePairChange = (event) => {
    // stop();
    // const newPair = frequencyPairs.find(
    //   (pair) => pair.value.toString() === event.target.value
    // );
    console.log(event);
    const newPair = event;
    console.log(newPair);
    setSelectedPair(newPair);
    // console.log(newPair)
    setDeg(newPair.colors?.[0]);
    setCol1(newPair.colors?.[1]);
    setCol2(newPair.colors?.[2]);
    console.log(selectedPair);
  };

  useEffect(() => {
    if (isFirst) {
      console.log(isFirst);
      setIsFirst(false);
      stop();
      return;
    }
    stop();
    play();
  }, [selectedPair]);

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
    setIsStopped(true);
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
    <>
      <div className='flex flex-col p-12 bg-gray-300 rounded-l-2xl w-[295px]'>
        <h1 className='text-xl pb-4'>Binaural Beats</h1>
        <div className='container'>
          <div className='list pb-2'>
            <Select
              options={frequencyPairs}
              value={selectedPair}
              onChange={handlePairChange}
            />
          </div>
          {/* <input type="range" min="0" max="100" value={volume} onChange={handleVolumeChange} /> */}
        </div>
        {isStopped && <button onClick={play}>Play</button>}
        {!isStopped && <button onClick={stop}>Stop</button>}
        {!isStopped && (
          <div className='flex justify-center'>
            <div
              className='gradient'
              style={{
                height: "140px",
                width: "140px",
                background: `linear-gradient(${deg},${col1}, ${col2})`,
              }}
            ></div>
          </div>
        )}
        {isStopped && (
          <div className='flex justify-center'>
            <div
              className='gradient'
              style={{ height: "140px", width: "140px" }}
            ></div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
