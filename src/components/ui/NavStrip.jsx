function NavStrip({ setActiveScreen }) {
  return (
    <div className="absolute bottom-6 left-8 flex gap-4 text-white/80 text-sm">
      <button
        onClick={() => setActiveScreen("stats")}
        className="hover:text-white"
      >
        📊 Stats
      </button>
      <button
        onClick={() => setActiveScreen("history")}
        className="hover:text-white"
      >
        📜 History
      </button>
      <button
        onClick={() => setActiveScreen("settings")}
        className="hover:text-white"
      >
        ⚙️ Settings
      </button>
    </div>
  );
}

export default NavStrip;
