import { useEffect, useState } from "react";

function PhonePreview({ activeScreen, setActiveScreen, focusTime }) {
  const [secondsLeft, setSecondsLeft] = useState(focusTime);

  useEffect(() => {
    setSecondsLeft(focusTime);
  }, [focusTime, activeScreen]);
  const [isRunning, setIsRunning] = useState(false);
  const FOCUS_DURATION = focusTime || 25 * 60;

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    const h = hours > 0 ? String(hours).padStart(2, "0") + ":" : "";
    const m = String(mins).padStart(2, "0");
    const s = String(secs).padStart(2, "0");

    return `${h}${m}:${s}`;
  };

  useEffect(() => {
    if (activeScreen !== "focus") return;

    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, activeScreen]);

  return (
    <div className="w-[300px] h-[500px] bg-white/30 dark:bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/20 dark:border-white/5 shadow-inner p-6 flex flex-col justify-center items-center transition-all">
      {activeScreen === "focus" ? (
        <div className="text-center">
          <p className="text-4xl font-mono mb-2">{formatTime(secondsLeft)}</p>
          <p className="text-sm text-gray-400 mb-4">Focusing...</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setIsRunning((prev) => !prev)}
              className="px-4 py-1 rounded-md bg-purple-600 hover:bg-purple-700 text-white text-sm shadow transition"
            >
              {isRunning ? "Pause" : "Resume"}
            </button>
            <button
              onClick={() => {
                setIsRunning(false);
                setSecondsLeft(FOCUS_DURATION);
                setActiveScreen("home");
              }}
              className="px-4 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm shadow transition"
            >
              End
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-300">
          Timer Preview <br />
        </p>
      )}
    </div>
  );
}

export default PhonePreview;
