import { useEffect, useState } from "react";

function HistoryScreen({ setActiveScreen }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("focusHistory")) || [];
    setHistory(stored);
  }, []);

  const clearHistory = () => {
    if (confirm("Are you sure you want to clear all focus session history?")) {
      localStorage.removeItem("focusHistory");
      setHistory([]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-12">
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setActiveScreen("home")}
          className="text-purple-400 hover:text-purple-300 transition text-sm"
        >
          ← Back
        </button>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="text-red-400 hover:text-red-300 transition text-sm flex items-center gap-1"
          >
            🧹 Clear History
          </button>
        )}
      </div>

      <h2 className="text-2xl font-bold text-white text-center mb-6">
        📖 Focus History
      </h2>

      <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-6 shadow-inner text-white">
        {history.length === 0 ? (
          <p className="text-center text-gray-400 text-sm">
            No history available.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {history
              .slice()
              .reverse()
              .map((entry, index) => (
                <div
                  key={index}
                  className="bg-[#121212] border border-gray-600 rounded-lg p-4"
                >
                  <div className="text-sm text-gray-400 mb-1">
                    {new Date(entry.timestamp).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </div>
                  <div className="text-base font-medium text-white">
                    Duration: {entry.duration ?? "Unknown"}
                  </div>
                  <div
                    className={`text-sm mt-1 font-mono ${
                      entry.status === "completed"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {entry.status === "completed"
                      ? "✅ Completed"
                      : "❌ Ended Early"}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoryScreen;
