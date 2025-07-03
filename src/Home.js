import { useState, useEffect, useRef } from "react";

const Home = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("Session"); // "Session" ou "Break"
  const timerRef = useRef(null);

  // Conversion secondes -> mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Incrément/décrément Break
  const handleIncrementBreak = () => {
    if (breakLength < 60) setBreakLength((prev) => prev + 1);
  };
  const handleDecrementBreak = () => {
    if (breakLength > 1) setBreakLength((prev) => prev - 1);
  };

const handleIncrementSession = () => {
  if (sessionLength < 60) {
    const newSession = sessionLength + 1;
    setSessionLength(newSession);
    if (!isRunning) setTimeLeft(newSession * 60);
  }
};

const handleDecrementSession = () => {
  if (sessionLength > 1) {
    const newSession = sessionLength - 1;
    setSessionLength(newSession);
    if (!isRunning) setTimeLeft(newSession * 60);
  }
};


  // Start / Pause
  const handleStartStop = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    } else {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 0) {
            const newMode = mode === "Session" ? "Break" : "Session";
            setMode(newMode);
            return (newMode === "Session" ? sessionLength : breakLength) * 60;
          }
          return prev - 1;
        });
      }, 1000);
      setIsRunning(true);
    }
  };

  // Reset
  const handleReset = () => {
    clearInterval(timerRef.current);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    setIsRunning(false);
    setMode("Session");
    const beep = document.getElementById("beep");
    if (beep) {
      beep.pause();
      beep.currentTime = 0;
    }
  };

  // Si le temps arrive à 0 → son
  useEffect(() => {
    if (timeLeft === 0) {
      const beep = document.getElementById("beep");
      if (beep) beep.play();
    }
  }, [timeLeft]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-6 p-4 bg-gray-100">
      {/* Break */}
      <div className="flex flex-col bg-slate-600 p-4 rounded text-white">
        <h1 id="break-label">Break Length</h1>
        <h1 id="break-length">{breakLength}</h1>
        <div className="flex gap-2">
          <button id="break-increment" onClick={handleIncrementBreak}>+</button>
          <button id="break-decrement" onClick={handleDecrementBreak}>-</button>
        </div>
      </div>

      {/* Session */}
      <div className="flex flex-col bg-slate-600 p-4 rounded text-white">
        <h1 id="session-label">Session Length</h1>
        <h1 id="session-length">{sessionLength}</h1>
        <div className="flex gap-2">
          <button id="session-increment" onClick={handleIncrementSession}>+</button>
          <button id="session-decrement" onClick={handleDecrementSession}>-</button>
        </div>
      </div>

      {/* Timer */}
      <div className="flex flex-col items-center bg-black p-6 rounded text-white">
        <h1 id="timer-label">{mode}</h1>
        <h1 id="time-left" className="text-4xl">{formatTime(timeLeft)}</h1>
        <div className="flex gap-4 mt-4">
          <button id="start_stop" onClick={handleStartStop}>
            {isRunning ? "Pause" : "Start"}
          </button>
          <button id="reset" onClick={handleReset}>Reset</button>
        </div>
      </div>

      {/* Son */}
      <audio
        id="beep"
        src="https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
        preload="auto"
      />
    </div>
  );
};

export default Home;
