import { useState, useEffect } from "react";
import Header from "./components/Header";
import LandingContent from "./components/LandingContent";
import PhonePreview from "./components/PhonePreview";
import HistoryScreen from "./components/HistoryScreen";
import StatsScreen from "./components/StatsScreen";
import GraphsPage from "./components/GraphsPage";
import SettingsPage from "./components/SettingsPage";
import WelcomeModal from "./components/WelcomeModal";

function App() {
  const [activeScreen, setActiveScreen] = useState("home");
  const [focusTime, setFocusTime] = useState(25 * 60);
  const [secondsLeft, setSecondsLeft] = useState(focusTime);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionSaved, setSessionSaved] = useState(false);
  const [sessionFinished, setSessionFinished] = useState(false);
  const [currentSessionType, setCurrentSessionType] = useState("Focus");

  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (!storedName) {
      setShowWelcomeModal(true);
    }
  }, []);

  const handleSetFocusTime = (time) => {
    setFocusTime(time);
    if (!isRunning) {
      setSecondsLeft(time);
    }
  };

  const startFocus = (type) => {
    setIsRunning(false);
    setSecondsLeft(focusTime);
    setSessionSaved(false);
    setSessionFinished(false);
    setCurrentSessionType(type);

    setTimeout(() => {
      setIsRunning(true);
      setActiveScreen("focus");
    }, 10);
  };

  if (showWelcomeModal)
    return <WelcomeModal setShowModal={setShowWelcomeModal} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f5f5] to-white dark:from-[#0f0f0f] dark:to-[#1a1a1a] text-[#1a1a1a] dark:text-[#f5f5f5] transition-colors duration-300">
      <Header />

      <main className="flex flex-col lg:flex-row items-start justify-center px-6 lg:px-24 py-12 gap-10 max-w-[1440px] mx-auto">
        {/* LEFT */}
        <div className="w-full lg:w-1/2">
          {activeScreen === "home" && (
            <LandingContent
              setActiveScreen={setActiveScreen}
              setFocusTime={handleSetFocusTime}
              setSecondsLeft={setSecondsLeft}
              startFocus={startFocus}
            />
          )}

          {activeScreen === "focus" && (
            <div className="mt-6 text-center text-base opacity-70">
              <p>💪 You're in focus mode. Stay on track!</p>
            </div>
          )}

          {activeScreen === "history" && (
            <div className="w-full flex justify-center">
              <HistoryScreen setActiveScreen={setActiveScreen} />
            </div>
          )}

          {activeScreen === "stats" && (
            <div className="w-full flex justify-center">
              <StatsScreen setActiveScreen={setActiveScreen} />
            </div>
          )}
        </div>

        {activeScreen === "graph" && (
          <div className="w-full flex justify-center">
            <GraphsPage setActiveScreen={setActiveScreen} />
          </div>
        )}

        {activeScreen === "settings" && (
          <div className="w-full flex justify-center">
            <SettingsPage setActiveScreen={setActiveScreen} />
          </div>
        )}

        {/* RIGHT */}
        <div className="w-full max-w-xs flex justify-center">
          {(activeScreen === "home" || activeScreen === "focus") && (
            <PhonePreview
              activeScreen={activeScreen}
              setActiveScreen={setActiveScreen}
              focusTime={focusTime}
              secondsLeft={secondsLeft}
              setSecondsLeft={setSecondsLeft}
              isRunning={isRunning}
              setIsRunning={setIsRunning}
              sessionSaved={sessionSaved}
              setSessionSaved={setSessionSaved}
              sessionFinished={sessionFinished}
              setSessionFinished={setSessionFinished}
              sessionType={currentSessionType}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
