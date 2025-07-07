// src/components/Settings.jsx
import React, { useEffect, useState } from "react";

export default function Settings({ onBack }) {
  const [username, setUsername] = useState("");
  const [soundOn, setSoundOn] = useState(true);
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [ambientMusic, setAmbientMusic] = useState(false);
  const [defaultTag, setDefaultTag] = useState("Focus");
  const [durations, setDurations] = useState({
    Work: 50,
    Focus: 25,
    Break: 10,
    Writing: 30,
  });

  useEffect(() => {
    const storedName = localStorage.getItem("username") || "";
    const sound = localStorage.getItem("soundOn") === "true";
    const notify = localStorage.getItem("notificationsOn") === "true";
    const music = localStorage.getItem("ambientMusic") === "true";
    const tag = localStorage.getItem("defaultTag") || "Focus";
    const storedDurations =
      JSON.parse(localStorage.getItem("sessionDurations")) || {};

    setUsername(storedName);
    setSoundOn(sound);
    setNotificationsOn(notify);
    setAmbientMusic(music);
    setDefaultTag(tag);
    setDurations((prev) => ({ ...prev, ...storedDurations }));
  }, []);

  const handleDurationChange = (label, value) => {
    const updated = { ...durations, [label]: parseInt(value) || 0 };
    setDurations(updated);
  };

  const saveSettings = () => {
    localStorage.setItem("username", username);
    localStorage.setItem("soundOn", soundOn);
    localStorage.setItem("notificationsOn", notificationsOn);
    localStorage.setItem("ambientMusic", ambientMusic);
    localStorage.setItem("defaultTag", defaultTag);
    localStorage.setItem("sessionDurations", JSON.stringify(durations));
    alert("Settings saved!");
  };

  const resetAll = () => {
    localStorage.clear();
    location.reload(); // start fresh
  };

  const clearHistory = () => {
    localStorage.removeItem("sessionHistory");
    alert("Session history cleared.");
  };

  const logout = () => {
    localStorage.removeItem("username");
    location.reload();
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col items-center p-6 overflow-y-auto">
      <button
        onClick={onBack}
        className="font-heading absolute top-16 left-4 text-sm text-white/90 bg-white/10 hover:bg-white/20 px-3 py-1 rounded transition-all z-50"
      >
        ← Back
      </button>

      <h2 className="text-3xl font-heading mb-6 mt-12">Settings</h2>

      {/* Username */}
      <div className="mb-6 w-full max-w-md">
        <label className="block text-sm mb-1 font-heading">Username</label>
        <input
          type="text"
          className="w-full p-2 rounded bg-white/10 text-white font-heading"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      {/* 🔧 Session Durations */}
      <div className="w-full max-w-md font-heading mb-6">
        <h3 className="text-lg mb-2">Session Duration Presets (minutes)</h3>
        {Object.entries(durations).map(([label, val]) => (
          <div key={label} className="flex items-center justify-between mb-2">
            <label>{label}</label>
            <input
              type="number"
              min="1"
              max="1440"
              value={val}
              onChange={(e) => handleDurationChange(label, e.target.value)}
              className="bg-white text-black px-2 py-1 rounded w-24 text-center"
            />
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="mt-6 space-y-2 w-full max-w-md font-heading">
        <button
          onClick={saveSettings}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded"
        >
          Save Settings
        </button>

        <button
          onClick={clearHistory}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
        >
          Clear Session History
        </button>

        <button
          onClick={resetAll}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded"
        >
          Reset All
        </button>

        <button
          onClick={logout}
          className="w-full bg-black/40 hover:bg-black/60 text-white py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
