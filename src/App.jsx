// App.jsx
import React, { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import {
  WorkSession,
  BreakSession,
  WritingSession,
  FocusSession,
  RandomSession,
} from "./components/sessions/SessionScreens";
import HistoryPage from "./components/History";
import SessionHistoryControl from "./components/SessionHistoryControl";
import MiniMusicPlayer from "./components/MiniMusicPlayer";
import UsernamePrompt from "./components/UsernamePrompt";
import Settings from "./components/Settings";

export default function App() {
  const [username, setUsername] = useState(null);
  const [activeSession, setActiveSession] = useState(null);
  const [customDuration, setCustomDuration] = useState(null);
  const [view, setView] = useState("Landing");

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) setUsername(storedName);
  }, []);

  const handleNameSubmit = (name) => {
    localStorage.setItem("username", name);
    setUsername(name);
  };

  const startSession = (label, durationInSeconds = null) => {
    setCustomDuration(durationInSeconds);
    setActiveSession(label);
    setView(label);
  };

  const goBack = () => {
    setActiveSession(null);
    setCustomDuration(null);
    setView("Landing");
  };

  if (!username) return <UsernamePrompt onSubmit={handleNameSubmit} />;

  switch (view) {
    case "Work":
      return (
        <>
          <WorkSession onExit={goBack} customDuration={customDuration} />
          <MiniMusicPlayer />
        </>
      );
    case "Break":
      return (
        <>
          <BreakSession onExit={goBack} />
          <MiniMusicPlayer />
        </>
      );
    case "Writing":
      return (
        <>
          <WritingSession onExit={goBack} />
          <MiniMusicPlayer />
        </>
      );
    case "Focus":
      return (
        <>
          <FocusSession onExit={goBack} />
          <MiniMusicPlayer />
        </>
      );
    case "Random":
      return (
        <>
          <RandomSession onExit={goBack} customDuration={customDuration} />
          <MiniMusicPlayer />
        </>
      );
    case "Settings":
      return <Settings onBack={goBack} />;

    case "History":
      return (
        <>
          <SessionHistoryControl />
          <HistoryPage onBack={goBack} />
          <MiniMusicPlayer />
        </>
      );
    default:
      return (
        <>
          <LandingPage
            username={username}
            startSession={startSession}
            openHistory={() => setView("History")}
            openSettings={() => setView("Settings")}
          />
          {/* ❌ Not showing ClearHistory on landing */}
          <MiniMusicPlayer />
        </>
      );
  }
}
