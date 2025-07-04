import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

function StatsScreen({ setActiveScreen }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("focusHistory")) || [];
    setHistory(stored);
  }, []);

  const tagCounts = history.reduce((acc, entry) => {
    const tag = entry.tag || "Focus";
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});

  const totalMinutes = history.reduce((sum, entry) => {
    const match = entry.duration.match(/(\d+)\s*min/) || [];
    return sum + (parseInt(match[1]) || 0);
  }, 0);

  const chartData = {
    labels: Object.keys(tagCounts),
    datasets: [
      {
        label: "Sessions",
        data: Object.values(tagCounts),
        backgroundColor: "#8b5cf6",
        borderRadius: 10,
        barThickness: 30,
      },
    ],
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setActiveScreen("home")}
          className="text-purple-400 hover:text-purple-300 transition text-sm"
        >
          ← Back
        </button>
        <h2 className="text-2xl font-bold text-white">📊 Stats</h2>
      </div>
      <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-6 shadow-inner flex flex-col gap-6 text-white">
        {/* Summary */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-sm text-gray-400">Total Sessions</p>
            <p className="text-xl font-semibold">{history.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Focus Time</p>
            <p className="text-xl font-semibold">{totalMinutes} min</p>
          </div>
        </div>

        {/* Chart */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4 text-center">
            Sessions by Tag
          </h3>
          {Object.keys(tagCounts).length === 0 ? (
            <p className="text-center text-gray-400 text-sm">
              No session data yet.
            </p>
          ) : (
            <Bar data={chartData} />
          )}
        </div>
      </div>
    </div>
  );
}

export default StatsScreen;
