import React, { useEffect, useState } from "react";

export default function History({ onBack }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("sessionHistory");
    if (data) setLogs(JSON.parse(data));
  }, []);

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col items-center p-6 overflow-y-auto">
      <button
        onClick={onBack}
        className="font-heading absolute top-16 left-4 text-sm text-white/90 bg-white/10 hover:bg-white/20 px-3 py-1 rounded transition-all z-50"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-semibold mb-6 font-heading">
        Session History
      </h2>

      {logs.length === 0 ? (
        <p className="text-gray-400 font-heading">No sessions logged yet.</p>
      ) : (
        <ul className="w-full max-w-md space-y-4">
          {[...logs].reverse().map((log, i) => (
            <li
              key={i}
              className="p-4 bg-white/10 rounded-md border border-white/20"
            >
              <div className="font-bold font-heading">
                {log.tag || log.type}
              </div>

              <div className="text-sm text-gray-300 font-heading">
                Duration: {log.duration}
              </div>

              <div className="text-sm text-gray-400 font-heading">
                Status: {log.status}
              </div>

              <div className="text-sm text-gray-400 font-heading">
                {new Date(log.timestamp).toLocaleString("en-IN")}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
