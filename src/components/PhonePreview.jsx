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
  sessionType,
}) {
  const audio = new Audio("/notify.mp3");
  const intervalRef = useRef(null);
  const hasSavedRef = useRef(false);

  // Timer Logic
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
            playAlert();
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

  // Ask for Notification
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission().catch(() => {});
    }
  }, []);

  // Reset
  useEffect(() => {
    if (activeScreen === "focus") {
      hasSavedRef.current = false;
      setSessionSaved(false);
      setSessionFinished(false);
      setSecondsLeft(focusTime);
    }
  }, [activeScreen, focusTime]);

  // Save session to history
  const saveSession = (status = "completed") => {
    if (hasSavedRef.current) return;

    const stored = JSON.parse(localStorage.getItem("focusHistory") || "[]");
    const mins = Math.floor(focusTime / 60);
    const secs = focusTime % 60;
    const durationStr =
      mins > 0
        ? `${mins} min${mins > 1 ? "s" : ""}${secs > 0 ? ` ${secs} sec` : ""}`
        : `${secs} sec`;
    duration: durationStr,
      stored.push({
        timestamp: Date.now(),
        duration: durationStr,
        status,
        tag: sessionType || "Focus",
      });
    localStorage.setItem("focusHistory", JSON.stringify(stored));

    hasSavedRef.current = true;
    setSessionSaved(true);
  };

  // Desk Noti.
  const playAlert = () => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("✅ Focus Session Completed!", {
        body: "Take a break or start another session.",
        icon: "src/assets/focus_17194259.png",
      });
    }
    audio.play().catch(() => {});
    if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
  };

  // End Sesh.
  const handleEnd = () => {
    if (!hasSavedRef.current) {
      const status = secondsLeft === 0 ? "completed" : "ended";
      saveSession(status);
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

  // Format time
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
