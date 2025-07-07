import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function formatTime(secondsLeft) {
  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function SessionTemplate({ duration, onExit, bgUrl, ringColor = "#a855f7" }) {
  const [secondsLeft, setSecondsLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(true);
  const progress = ((duration - secondsLeft) / duration) * 100;

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex flex-col items-center justify-center text-white relative"
      style={{ backgroundImage: `url('${bgUrl}')` }}
    >
      {/* Back Button */}
      <button
        onClick={onExit}
        className="absolute top-16 left-4 text-sm text-white/90 bg-white/10 hover:bg-white/20 px-3 py-1 rounded transition-all z-50"
      >
        ← Back
      </button>

      {/* Timer + Wavy Ring */}
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
        <div className="text-5xl font-mono z-10">{formatTime(secondsLeft)}</div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="bg-white/20 px-4 py-2 rounded-full hover:bg-white/30"
        >
          {isRunning ? "Pause" : "Play"}
        </button>
        <button
          onClick={onExit}
          className="bg-red-500 px-4 py-2 rounded-full hover:bg-red-600"
        >
          End
        </button>
      </div>
    </div>
  );
}

// Work Session
export function WorkSession({ onExit }) {
  return (
    <SessionTemplate
      duration={50 * 60}
      onExit={onExit}
      bgUrl="/48a8673b-af75-4ecb-9ad4-ef9db2d91473.png"
      ringColor="#3b82f6"
    />
  );
}

// Focus Session
export function FocusSession({ onExit }) {
  return (
    <SessionTemplate
      duration={25 * 60}
      onExit={onExit}
      bgUrl="/focus-bg.jpg"
      ringColor="#a855f7"
    />
  );
}

// Break Session
export function BreakSession({ onExit }) {
  return (
    <SessionTemplate
      duration={5 * 60}
      onExit={onExit}
      bgUrl="/break-bg.jpg"
      ringColor="#10b981"
    />
  );
}

// Writing Session
export function WritingSession({ onExit }) {
  return (
    <SessionTemplate
      duration={30 * 60}
      onExit={onExit}
      bgUrl="/writing-bg.jpg"
      ringColor="#f59e0b"
    />
  );
}

export default WorkSession;
