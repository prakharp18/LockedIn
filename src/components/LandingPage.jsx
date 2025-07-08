import React, { useEffect, useState } from "react";

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

export default function LandingPage({
  username,
  startSession,
  openHistory,
  openSettings,
  openStats,
}) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [customMinutes, setCustomMinutes] = useState("");
  const [customHours, setCustomHours] = useState("");

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const imagesToPreload = [
      "/work.jpg",
      "/break.jpg",
      "/writing2.jpg",
      "/focus.gif",
      "/random.jpg",
      "/japan-bg.jpg",
    ];

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const formattedTime = currentTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const handleSessionClick = (label) => {
    if (label === "Random") {
      setShowModal(true);
    } else {
      startSession(label);
    }
  };

  const handleNavClick = (label) => {
    if (label === "History") openHistory();
    else if (label === "Settings") openSettings();
    else if (label === "Stats") openStats();
    else alert(`${label} not implemented yet.`);
  };

  const startRandomSession = () => {
    const mins = parseInt(customMinutes) || 0;
    const hrs = parseInt(customHours) || 0;
    const totalMinutes = hrs * 60 + mins;

    if (totalMinutes > 0 && totalMinutes <= 1440) {
      startSession("Random", totalMinutes * 60);
      setCustomMinutes("");
      setCustomHours("");
      setShowModal(false);
    } else {
      alert("Enter a valid duration up to 24 hours (1440 minutes).");
    }
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex flex-col items-center justify-center text-white px-6 relative"
      style={{
        backgroundImage: "url('/japan-bg.jpg')",
        filter: "brightness(76%)",
      }}
    >
      {/* Top Right: External Link */}
      <div className="absolute top-4 right-4">
        <a
          href="https://chcekit.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm underline font-heading"
        >
          Check Out CheckIt →
        </a>
      </div>

      {/* Center Content */}
      <div className="text-center mt-6 space-y-2">
        <h1 className="text-2xl sm:text-3xl font-heading font-semibold">
          Hey {username}, welcome to LockedIn — time to lock in!
        </h1>
        <div className="text-6xl sm:text-7xl font-heading">{formattedTime}</div>
      </div>

      {/* Bottom Left: Navigation Icons */}
      <div className="absolute bottom-6 left-6 flex gap-2">
        {navIcons.map((icon) => (
          <button
            key={icon.label}
            title={icon.label}
            onClick={() => handleNavClick(icon.label)}
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
            onClick={() => handleSessionClick(type.label)}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-xl transition-all duration-200 bg-black/40 text-white/70 hover:bg-white/20 hover:text-white"
          >
            {type.emoji}
          </button>
        ))}
      </div>

      {showModal && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-xl p-6 w-80 shadow-lg space-y-4">
            <h2 className="text-lg font-semibold text-center font-heading">
              Set Custom Duration
            </h2>

            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                max="24"
                placeholder="Hours"
                className="w-1/2 p-2 border rounded text-center font-heading"
                value={customHours}
                onChange={(e) => setCustomHours(e.target.value)}
              />
              <input
                type="number"
                min="0"
                max="59"
                placeholder="Minutes"
                className="w-1/2 p-2 border rounded text-center font-heading"
                value={customMinutes}
                onChange={(e) => setCustomMinutes(e.target.value)}
              />
            </div>

            <div className="flex justify-between gap-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setCustomHours("");
                  setCustomMinutes("");
                }}
                className="font-heading flex-1 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Cancel
              </button>
              <button
                onClick={startRandomSession}
                className="font-heading flex-1 py-2 bg-purple-600 text-white hover:bg-purple-700 rounded"
              >
                Start
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
