import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

function GraphsPage({ setActiveScreen }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("focusHistory")) || [];
    setHistory(stored.reverse());
  }, []);

  const pieData = [
    {
      label: "Completed",
      value: history.filter((h) => h.status === "completed").length,
    },
    {
      label: "Ended Early",
      value: history.filter((h) => h.status !== "completed").length,
    },
  ];

  const barData = Object.entries(
    history.reduce((acc, entry) => {
      const date = new Date(entry.timestamp).toLocaleDateString("en-IN");
      const min = parseInt(entry.duration.split(" ")[0]) || 0;
      acc[date] = (acc[date] || 0) + min;
      return acc;
    }, {})
  ).map(([date, minutes]) => ({ date, minutes }));

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setActiveScreen("home")}
          className="text-purple-400 hover:text-purple-300 transition text-sm"
        >
          ← Back
        </button>
        <h2 className="text-2xl font-bold text-white">📈 Graphs</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-6">
        {/* Bar Chart */}
        <div className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-700 shadow-inner">
          <h3 className="text-white mb-3">Minutes Focused Per Day</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="date" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="minutes" fill="#a78bfa" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-700 shadow-inner">
          <h3 className="text-white mb-3">Completion Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="label"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.label === "Completed" ? "#4ade80" : "#f87171"}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default GraphsPage;
