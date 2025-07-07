import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

// ⏱️ Format timer
function formatTime(secondsLeft) {
  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// 🎯 Session Template
function SessionTemplate({
  duration,
  onExit,
  bgUrl,
  ringColor = "#a855f7",
  sessionLabel,
}) {
  const [secondsLeft, setSecondsLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(true);
  const sessionEndedRef = useRef(false);

  const progress = ((duration - secondsLeft) / duration) * 100;

  // Reset on new session
  useEffect(() => {
    setSecondsLeft(duration);
    sessionEndedRef.current = false;
  }, [duration]);

  // Tick the timer
  useEffect(() => {
    if (!isRunning || sessionEndedRef.current) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          handleSessionEnd("completed");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  // 🔔 Tab title live update
  useEffect(() => {
    const updateTitle = () => {
      const mins = Math.floor(secondsLeft / 60)
        .toString()
        .padStart(2, "0");
      const secs = (secondsLeft % 60).toString().padStart(2, "0");
      document.title = `(${mins}:${secs}) LockedIn - ${sessionLabel}`;
    };

    updateTitle(); // initial
    const titleInterval = setInterval(updateTitle, 1000);

    return () => {
      clearInterval(titleInterval);
      document.title = "LockedIn";
    };
  }, [secondsLeft, sessionLabel]);

  // ⚙️ Log session end
  const handleSessionEnd = (status) => {
    if (sessionEndedRef.current) return;
    sessionEndedRef.current = true;
    document.title = `✓ LockedIn - ${sessionLabel} Complete`;

    const actualDuration =
      status === "completed"
        ? duration
        : duration - secondsLeft <= 0
        ? 1
        : duration - secondsLeft;

    const readableDuration =
      actualDuration >= 60
        ? `${Math.round(actualDuration / 60)} mins`
        : `${actualDuration} sec`;

    const newLog = {
      tag: sessionLabel,
      duration: readableDuration,
      timestamp: Date.now(),
      status,
    };

    const prevLogs = JSON.parse(localStorage.getItem("sessionHistory") || "[]");
    localStorage.setItem(
      "sessionHistory",
      JSON.stringify([...prevLogs, newLog])
    );
  };

  // 🧹 Before reload tab
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!sessionEndedRef.current) handleSessionEnd("ended");
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex flex-col items-center justify-center text-white relative"
      style={{ backgroundImage: `url('${bgUrl}')` }}
    >
      <button
        onClick={() => {
          handleSessionEnd("ended");
          onExit();
        }}
        className="font-heading absolute top-16 left-4 text-sm text-white/90 bg-white/10 hover:bg-white/20 px-3 py-1 rounded transition-all z-50"
      >
        ← Back
      </button>

      <div className="relative w-64 h-64 flex items-center justify-center">
        <motion.div
          className="absolute w-full h-full rounded-full border-4"
          style={{ borderColor: ringColor }}
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 180, 360],
            borderRadius: ["50%", "46%", "50%"],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="text-5xl font-heading z-10">
          {formatTime(secondsLeft)}
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 font-heading"
        >
          {isRunning ? "Pause" : "Play"}
        </button>
        <button
          onClick={() => {
            handleSessionEnd("ended");
            onExit();
          }}
          className="bg-red-500 px-4 py-2 rounded-full hover:bg-red-600 font-heading"
        >
          End
        </button>
      </div>
    </div>
  );
}

// 🧠 Pull durations from localStorage
const getStoredDuration = (label, fallbackMin) => {
  const stored = JSON.parse(localStorage.getItem("sessionDurations") || "{}");
  return (stored[label] || fallbackMin) * 60;
};

// ⏳ Variants
export function WorkSession({ onExit, customDuration }) {
  const safeDuration = customDuration || getStoredDuration("Work", 50);
  return (
    <SessionTemplate
      duration={safeDuration}
      onExit={onExit}
      sessionLabel="Work"
      bgUrl="/work.jpg"
      ringColor="#3b82f6"
    />
  );
}

export function BreakSession({ onExit }) {
  const safeDuration = getStoredDuration("Break", 10);
  return (
    <SessionTemplate
      duration={safeDuration}
      onExit={onExit}
      sessionLabel="Break"
      bgUrl="/break.jpg"
      ringColor="#10b981"
    />
  );
}

export function WritingSession({ onExit }) {
  const safeDuration = getStoredDuration("Writing", 30);
  return (
    <SessionTemplate
      duration={safeDuration}
      onExit={onExit}
      sessionLabel="Writing"
      bgUrl="/writing2.jpg"
      ringColor="#f59e0b"
    />
  );
}

export function FocusSession({ onExit }) {
  const safeDuration = getStoredDuration("Focus", 25);
  return (
    <SessionTemplate
      duration={safeDuration}
      onExit={onExit}
      sessionLabel="Focus"
      bgUrl="/focus.gif"
      ringColor="#D4BBA3"
    />
  );
}

export function RandomSession({ onExit, customDuration }) {
  const safeDuration = customDuration || 5 * 60;
  return (
    <SessionTemplate
      duration={safeDuration}
      onExit={onExit}
      sessionLabel="Random"
      bgUrl="/random.jpg"
      ringColor="#FFD1E3"
    />
  );
}

export default WorkSession;
