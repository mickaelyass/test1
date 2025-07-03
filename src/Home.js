import { useState } from "react";

import DrumPad from "./DrumpPad";

const Home =()=>{
  const [display, setDisplay] = useState("Click or press a key");

  const pads = [
  {
    letter: "Q",
    soundUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    displayText: "Heater 1"
  },
  {
    letter: "W",
    soundUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    displayText: "Heater 2"
  },
  {
    letter: "E",
    soundUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    displayText: "Heater 3"
  },
  {
    letter: "A",
    soundUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    displayText: "Heater 4"
  },
  {
    letter: "S",
    soundUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    displayText: "Clap"
  },
  {
    letter: "D",
    soundUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    displayText: "Open-HH"
  },
  {
    letter: "Z",
    soundUrl: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    displayText: "Kick-n'-Hat"
  },
  {
    letter: "X",
    soundUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    displayText: "Kick"
  },
  {
    letter: "C",
    soundUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    displayText: "Closed-HH"
  }
];

const handleDisplay = (text) => {
  setDisplay(text);
  console.log('Son joué :', text);
  // Ici tu peux mettre à jour un état, afficher dans un composant, etc.
};

    return(
        <div id="drum-machine"className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      
          <div id="display" className="my-4 text-3xl ">{display} </div> 
       
         <div className="grid grid-cols-3 gap-2 w-1/2 bg-slate-500 justify-center p-4 rounded-lg">
          {pads.map((pad) => (
            <DrumPad
              key={pad.letter}
              letter={pad.letter}
              soundUrl={pad.soundUrl}
              displayText={pad.displayText}
              handleDisplay={handleDisplay}
            />
          ))}
        </div>
        
      </div>
      
    )
}
export default Home;