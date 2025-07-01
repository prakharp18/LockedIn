import { useEffect, useRef } from "react";

function PhonePreview({
  focusTime,
  secondsLeft,
  setSecondsLeft,
  isRunning,
  setIsRunning,
  sessionSaved,
  setSessionSaved,
  sessionFinished,
  setSessionFinished,
  setActiveScreen,
  activeScreen,
}) {
  const audio = new Audio("/notify.mp3");
  const intervalRef = useRef(null);
  const hasSavedRef = useRef(false);

  const saveSession = (status = "completed") => {
    if (hasSavedRef.current) return;

    const sessions = JSON.parse(
      localStorage.getItem("lockedin_sessions") || "[]"
    );
    sessions.push({
      type: "focus",
      duration: focusTime,
      completedAt: new Date().toISOString(),
      status,
    });
    localStorage.setItem("lockedin_sessions", JSON.stringify(sessions));

    hasSavedRef.current = true;
    setSessionSaved(true);
  };

  // 🔁 Timer logic
  useEffect(() => {
    if (activeScreen !== "focus" || !isRunning || intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsRunning(false);

          if (!hasSavedRef.current) {
            saveSession("completed");
            setSessionFinished(true);
            audio.play().catch(() => {});
            if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
          }

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [isRunning, activeScreen]);

  useEffect(() => {
    if (activeScreen === "focus") {
      hasSavedRef.current = false;
      setSessionSaved(false);
      setSessionFinished(false);
      setSecondsLeft(focusTime);
    }
  }, [activeScreen, focusTime]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (
        activeScreen === "focus" &&
        secondsLeft < focusTime &&
        secondsLeft > 0 &&
        !hasSavedRef.current
      ) {
        saveSession("ended");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [secondsLeft, activeScreen]);

  const handleEnd = () => {
    if (!hasSavedRef.current && secondsLeft < focusTime && secondsLeft > 0) {
      saveSession("ended");
    }

    clearInterval(intervalRef.current);
    intervalRef.current = null;

    setIsRunning(false);
    setSessionFinished(false);
    setSessionSaved(false);
    hasSavedRef.current = false;

    setTimeout(() => {
      setSecondsLeft(focusTime);
      setActiveScreen("home");
    }, 10);
  };

  const formatTime = (secs) => {
    const min = String(Math.floor(secs / 60)).padStart(2, "0");
    const sec = String(secs % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const progress = Math.min(100, 100 - (secondsLeft / focusTime) * 100);

  return (
    <div className="w-[300px] h-[500px] bg-white/30 dark:bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/20 dark:border-white/5 shadow-inner p-6 flex flex-col justify-center items-center transition-all">
      <div className="text-center">
        <div className="w-full max-w-[220px] mb-4">
          <div className="w-full h-6 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-lg mt-2 font-mono">
            {formatTime(secondsLeft)}
          </div>
        </div>

        <p className="text-sm text-gray-400 mb-4">
          {sessionFinished ? "Session Completed 🎉" : "Focusing..."}
        </p>

        {sessionFinished && (
          <button
            onClick={() => {
              setSessionFinished(false);
              setSessionSaved(false);
              setSecondsLeft(focusTime);
              setActiveScreen("home");
            }}
            className="mt-2 px-4 py-1 rounded-md bg-green-600 hover:bg-green-700 text-white text-sm transition"
          >
            Go Back
          </button>
        )}

        {!sessionFinished && (
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                if (secondsLeft === 0 || secondsLeft === focusTime) {
                  setSecondsLeft(focusTime);
                  setIsRunning(true);
                } else {
                  setIsRunning((prev) => !prev);
                }
              }}
              className="px-4 py-1 rounded-md bg-purple-600 hover:bg-purple-700 text-white text-sm"
            >
              {secondsLeft === focusTime || secondsLeft === 0
                ? "Start"
                : isRunning
                ? "Pause"
                : "Resume"}
            </button>
            <button
              onClick={handleEnd}
              className="px-4 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm"
            >
              End
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PhonePreview;
