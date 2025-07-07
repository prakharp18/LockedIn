import React, { useEffect, useState } from "react";
import {
  WorkSession,
  BreakSession,
  WritingSession,
  FocusSession,
} from "./sessions/SessionScreens";

const sessionTypes = [
  { label: "Work", emoji: "💼" },
  { label: "Break", emoji: "☕" },
  { label: "Writing", emoji: "✍️" },
  { label: "Focus", emoji: "🧘" },
  { label: "Random", emoji: "🎲" },
];

const navIcons = [
  { label: "Stats", emoji: "📊" },
  { label: "History", emoji: "🕒" },
  { label: "Settings", emoji: "⚙️" },
];

export default function LandingPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  if (selectedSession === "Work")
    return <WorkSession onExit={() => setSelectedSession(null)} />;
  if (selectedSession === "Break")
    return <BreakSession onExit={() => setSelectedSession(null)} />;
  if (selectedSession === "Writing")
    return <WritingSession onExit={() => setSelectedSession(null)} />;
  if (selectedSession === "Focus")
    return <FocusSession onExit={() => setSelectedSession(null)} />;

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex flex-col items-center justify-center text-white px-6 relative"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      {/* Top Nav */}
      <div className="absolute top-4 right-4">
        <a
          href="https://chcekit.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm underline"
        >
          Check Out CheckIt →
        </a>
      </div>

      {/* Center Content */}
      <div className="text-center mt-6 space-y-2">
        <h1 className="text-2xl sm:text-3xl font-heading font-semibold">
          Hey Pizza, welcome to LockedIn — time to lock in!
        </h1>
        <div className="text-6xl sm:text-7xl font-mono">{formattedTime}</div>
        <p className="text-xl sm:text-2xl text-white/90 italic">
          It's you vs. you.
        </p>
      </div>

      {/* Bottom Left: Navigation Icons */}
      <div className="absolute bottom-6 left-6 flex gap-2">
        {navIcons.map((icon) => (
          <button
            key={icon.label}
            title={icon.label}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-xl bg-black/40 hover:bg-white/20 transition-all"
          >
            {icon.emoji}
          </button>
        ))}
      </div>

      {/* Bottom Right: Session Icons */}
      <div className="absolute bottom-6 right-6 flex gap-2">
        {sessionTypes.map((type) => (
          <button
            key={type.label}
            title={type.label}
            onClick={() => setSelectedSession(type.label)}
            className={`w-10 h-10 flex items-center justify-center rounded-xl text-xl transition-all duration-200 ${
              selectedSession === type.label
                ? "bg-purple-600 text-white scale-105 shadow-lg"
                : "bg-black/40 text-white/70 hover:bg-white/20 hover:text-white"
            }`}
          >
            {type.emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
