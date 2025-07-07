import React, { useState, useEffect } from "react";

function SessionHistoryControl() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem("sessionHistory") || "[]");
    setCount(logs.length);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("sessionHistory");
    setCount(0);
    alert("Session history cleared!");
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={clearHistory}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-heading text-sm"
      >
        Clear History ({count})
      </button>
    </div>
  );
}

export default SessionHistoryControl;
