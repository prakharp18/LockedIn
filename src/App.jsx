import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import {
  WorkSession,
  BreakSession,
  WritingSession,
  FocusSession,
} from "./components/sessions/SessionScreens";

export default function App() {
  const [activeSession, setActiveSession] = useState(null);

  const renderSessionScreen = () => {
    switch (activeSession) {
      case "Work":
        return <WorkSession onExit={() => setActiveSession(null)} />;
      case "Break":
        return <BreakSession onExit={() => setActiveSession(null)} />;
      case "Writing":
        return <WritingSession onExit={() => setActiveSession(null)} />;
      case "Focus":
        return <FocusSession onExit={() => setActiveSession(null)} />;
      default:
        return (
          <LandingPage
            setSelectedSession={(label) => setActiveSession(label)}
          />
        );
    }
  };

  return <>{renderSessionScreen()}</>;
}
