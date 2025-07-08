import React, { useEffect, useState } from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function Stats({ onBack }) {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("sessionHistory")) || [];
    setSessions(stored);
  }, []);

  const parseDuration = (str) => {
    if (typeof str !== "string") return 0;
    const lower = str.toLowerCase();
    if (lower.includes("sec")) return parseInt(lower) || 0;
    if (lower.includes("min")) return (parseInt(lower) || 0) * 60;
    return 0;
  };

  const parsedSessions = sessions.map((s) => ({
    ...s,
    durationSecs: parseDuration(s.duration),
  }));

  const totalFocusTime = parsedSessions.reduce(
    (acc, s) => acc + s.durationSecs,
    0
  );

  const avgDuration =
    parsedSessions.length > 0
      ? Math.floor(totalFocusTime / parsedSessions.length / 60)
      : 0;

  const longest = Math.max(...parsedSessions.map((s) => s.durationSecs), 0);

  const sessionCounts = parsedSessions.reduce((acc, s) => {
    const tag = s.tag || s.type || "Unknown";
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});

  const statusCounts = parsedSessions.reduce(
    (acc, s) => {
      if (s.status === "completed") acc.completed += 1;
      else if (s.status === "ended") acc.ended += 1;
      return acc;
    },
    { completed: 0, ended: 0 }
  );

  const radialData = Object.keys(sessionCounts).map((tag, i) => ({
    name: tag,
    count: sessionCounts[tag],
    fill: ["#a78bfa", "#4ade80", "#facc15", "#fb7185", "#22d3ee"][i % 5],
  }));

  const dailyBarData = (() => {
    const dateMap = {};
    parsedSessions.forEach((s) => {
      const date = new Date(s.timestamp);
      if (!isNaN(date)) {
        const key = date.toISOString().split("T")[0];
        dateMap[key] = (dateMap[key] || 0) + 1;
      }
    });

    const result = [];
    const today = new Date();
    const past = new Date();
    past.setDate(today.getDate() - 60);

    for (let d = new Date(past); d <= today; d.setDate(d.getDate() + 1)) {
      const key = d.toISOString().split("T")[0];
      result.push({
        date: key.slice(5),
        count: dateMap[key] || 0,
      });
    }

    return result;
  })();

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col items-center p-4 sm:p-9 overflow-y-auto">
      <div className="w-full max-w-6xl">
        <button
          onClick={onBack}
          className="font-heading absolute top-16 left-4 text-sm text-white/90 bg-white/10 hover:bg-white/20 px-3 py-1 rounded transition-all z-50"
        >
          ← Back
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-heading mb-1">Statistics</h2>
          <div className="text-sm text-white/80 font-heading">
            <span className="text-green-400 font-heading">
              🟢 {statusCounts.completed}
            </span>{" "}
            Completed &nbsp;|&nbsp;
            <span className="text-red-400 font-heading">
              🔴 {statusCounts.ended}
            </span>{" "}
            Ended
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <StatCard label="Total Sessions" value={parsedSessions.length} />
          <StatCard
            label="Total Time"
            value={`${Math.floor(totalFocusTime / 60)} mins`}
          />
          <StatCard label="Avg Duration" value={`${avgDuration} mins`} />
          <StatCard
            label="Longest Session"
            value={`${Math.floor(longest / 60)} mins`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {/* Radial Chart */}
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-4 w-full">
            <h3 className="text-base sm:text-lg font-heading mb-2 text-white/90 text-center">
              Session Type Usage
            </h3>
            <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] font-heading">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="30%"
                  outerRadius="80%"
                  barSize={10}
                  data={radialData}
                >
                  <RadialBar background dataKey="count" />
                  <Legend
                    iconSize={8}
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    wrapperStyle={{ fontSize: "12px" }}
                  />
                  <Tooltip />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-4 w-full">
            <h3 className="text-base sm:text-lg font-heading mb-4 text-white/90 text-center">
              Daily Session Activity (Last 60 Days)
            </h3>
            <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] font-heading">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyBarData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 10, fill: "#ccc" }}
                    tickLine={false}
                    interval={6}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "#ccc" }}
                    allowDecimals={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f1f1f",
                      borderColor: "#444",
                    }}
                    labelStyle={{ color: "#fff" }}
                    formatter={(value) => [`${value} sessions`, "Count"]}
                  />
                  <Bar dataKey="count" fill="#a78bfa" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-black/30 rounded-xl p-3 text-center shadow border border-white/10">
      <div className="text-xl font-heading text-purple-300">{value}</div>
      <div className="text-xs font-heading text-white/60 mt-1">{label}</div>
    </div>
  );
}
