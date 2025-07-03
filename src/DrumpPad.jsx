import { useEffect } from "react";

const DrumPad = ({ letter, soundUrl, displayText,handleDisplay }) => {

  // Fonction pour jouer le son
  const playSound = () => {
    const audio = document.getElementById(letter);
    audio.play();
    handleDisplay(displayText);
  };

  // Ecoute du clavier
  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key.toUpperCase() === letter) {
        playSound();
        
      }
    };

    window.addEventListener("keydown", handleKeydown);

    // Nettoyage de l'écouteur quand le composant est démonté
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [letter]);

  return (
    <button className="drum-pad w-10 h-10 bg-red-400" id={displayText} 
    onClick={playSound}>{letter}
      <audio id={letter} src={soundUrl} className="clip"></audio>
    </button>
  );
};

export default DrumPad;