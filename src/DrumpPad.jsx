import { useEffect, useCallback } from "react";

const DrumPad = ({ letter, soundUrl, displayText, handleDisplay }) => {

  const playSound = useCallback(() => {
    const audio = document.getElementById(letter);
    if (audio) {
      audio.currentTime = 0; // Pour rejouer immédiatement si déjà joué
      audio.play();
      handleDisplay(displayText);
    }
  }, [letter, displayText, handleDisplay]);

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key.toUpperCase() === letter) {
        playSound();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [letter, playSound]);

  return (
    <button
      className="drum-pad w-10 h-10 bg-red-400"
      id={displayText}
      onClick={playSound}
    >
      {letter}
      <audio id={letter} src={soundUrl} className="clip"></audio>
    </button>
  );
};

export default DrumPad;
