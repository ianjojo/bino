import React, { useState, useEffect } from "react";
import "./App.css";
import BinauralDrone from "./components/NewBinauralDrone";
import AmbientSoundsDropdown from "./components/Ambience";

function App() {
  return (
    <div className=' bg-gray-50 h-screen'>
      <div className='maincontainer'>
        <h1 className='text-3xl font-bold text-center w-full'>Hocus Focus</h1>
        <div className=' titlecontainer flex justify-between w-full align-bottom items-end relative'>
          <p className='text-center w-full italic lg:absolute lg:left-[110px] lg:top-0'>
            by ianjojo
          </p>
          {/* 
          <div className='hidden lg:inline-block'>
            <h3 className='align-bottom italic  '>
              <span>s</span>
              <span>o</span>
              <span>u</span>
              <span>n</span>
              <span>d</span>
              <span>s</span>
              <span> </span>
              <span>t</span>
              <span>o</span>
              <span> </span>
              <span>b</span>
              <span>l</span>
              <span>o</span>
              <span>c</span>
              <span>k</span>
              <span> </span>
              <span>i</span>
              <span>t</span>
              <span> </span>
              <span>a</span>
              <span>l</span>
              <span>l</span>
              <span> </span>
              <span>o</span>
              <span>u</span>
              <span>t</span>
            </h3>
          </div> */}
        </div>
        <div className='flex flex-col lg:flex-row rounded-xl  lg:justify-center lg:items-start lg:mt-8 '>
          <BinauralDrone />

          <AmbientSoundsDropdown />
        </div>
        <div className='flex flex-col justify-center w-full items-center'>
          <p className='italic p-4 max-w-[550px] text-sm'>
            A binaural beat is an illusion created by the brain when you listen
            to two tones with slightly different frequencies at the same time.
          </p>
          <p className='italic p-4 max-w-[550px] text-sm'>
            Your brain interprets the two tones as a beat of its own. The two
            tones align with your brain waves to produce a beat with a different
            frequency. This frequency is the difference in hertz (Hz) between
            the frequencies of the two tones.
          </p>
          <p className='italic p-4 max-w-[550px] text-sm'>
            For example, if you are listening to a 440 Hz tone with your left
            ear and a 444 Hz tone with your right ear, you would be hearing a 4
            Hz tone.
          </p>
          <p className='italic p-4 max-w-[550px] text-sm'>
            When you listen to binaural beats, your brain activity matches the
            frequency set by the frequency of the beat. This is called the
            frequency-following effect. This means you can use binaural beats to
            entrain your mind to reach a certain mental state. Read more at{" "}
            <a
              target='_blank'
              href='https://www.webmd.com/balance/what-are-binaural-beats'
            >
              WebMD.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
