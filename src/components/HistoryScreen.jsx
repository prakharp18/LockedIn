import { useEffect, useState } from "react";

function HistoryScreen({ setActiveScreen }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("lockedin_sessions")) || [];
    setHistory(stored);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("lockedin_sessions");
    setHistory([]);
  };

  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-2xl py-10">
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

        <h2 className="text-3xl font-bold mb-6 text-center text-white font-heading ">
          Focus History
        </h2>

        {history.length === 0 ? (
          <p className="text-center text-gray-500 text-sm">
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
                  className="bg-[#1f1f1f] border border-gray-700 rounded-xl p-4 shadow-inner"
                >
                  <div className="text-sm text-gray-400 mb-1 font-mono">
                    {new Date(entry.completedAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </div>
                  <div className="text-base font-semibold text-white">
                    Duration: {Math.floor(entry.duration / 60)} min
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
