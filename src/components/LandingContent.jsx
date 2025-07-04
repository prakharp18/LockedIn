import TimerBlock from "./TimerBlock";
import FeatureIcons from "./FeatureIcons";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { sessionConfigs } from "./sessionConfigs";

function LandingContent({
  setActiveScreen,
  setFocusTime,
  setSecondsLeft,
  startFocus,
}) {
  const [showPicker, setShowPicker] = useState(false);
  const [sessionType, setSessionType] = useState("Focus");

  const [selectedTime, setSelectedTime] = useState({
    hours: "00",
    minutes: "25",
    seconds: "00",
  });

  const sessionTypes = [
    { label: "Study", emoji: "🧠" },
    { label: "Work", emoji: "💼" },
    { label: "Break", emoji: "☕" },
    { label: "Writing", emoji: "✍️" },
    { label: "Focus", emoji: "🧘" },
  ];

  useEffect(() => {
    const config = sessionConfigs[sessionType];
    const mins = Math.floor(config.defaultDuration / 60)
      .toString()
      .padStart(2, "0");
    const secs = (config.defaultDuration % 60).toString().padStart(2, "0");

    setSelectedTime({
      hours: "00",
      minutes: mins,
      seconds: secs,
    });
  }, [sessionType]);

  const handleChange = (field, value) => {
    if (!/^\d*$/.test(value)) return;
    const cleaned = value.replace(/^0+(?=\d)/, "");

    if (field === "hours" && +cleaned > 23) return;
    if ((field === "minutes" || field === "seconds") && +cleaned > 59) return;

    setSelectedTime((prev) => ({
      ...prev,
      [field]: cleaned,
    }));
  };

  const handleStart = () => {
    const config = sessionConfigs[sessionType];
    const totalSeconds =
      parseInt(selectedTime.hours || "0") * 3600 +
      parseInt(selectedTime.minutes || "0") * 60 +
      parseInt(selectedTime.seconds || "0");

    const finalTime =
      totalSeconds >= 60 ? totalSeconds : config.defaultDuration;

    setFocusTime(finalTime);
    setSecondsLeft(finalTime);
    startFocus(sessionType);
  };

  return (
    <section className="flex flex-col gap-8">
      <div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold font-heading"
        >
          Stay Focused with LockedIn
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg mt-2 text-gray-700 dark:text-gray-300 font-heading"
        >
          Conquer your time. Track your focus. Build your streak.
        </motion.p>
      </div>

      <TimerBlock onClick={() => setShowPicker(!showPicker)} />

      {showPicker && (
        <div className="flex justify-center items-center gap-6 mt-6">
          {["Hours", "Minutes", "Seconds"].map((label) => {
            const field = label.toLowerCase();

            return (
              <div
                key={field}
                className="flex flex-column items-center text-center w-24"
              >
                <label className="text-sm mb-1 text-gray-400">{label}</label>
                <input
                  type="number"
                  min="0"
                  max={field === "hours" ? "23" : "59"}
                  value={selectedTime[field] || ""}
                  onChange={(e) => handleChange(field, e.target.value)}
                  className="w-full text-center bg-gray-900 border border-gray-700 text-white text-lg rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                />
              </div>
            );
          })}
        </div>
      )}

      <div className="flex flex-wrap gap-2 justify-center mt-2">
        {sessionTypes.map((type) => (
          <button
            key={type.label}
            onClick={() => {
              console.log("Selected session type:", type.label);
              setSessionType(type.label);
            }}
            className={`px-3 py-1 rounded-full text-sm transition-all border font-medium ${
              sessionType === type.label
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-white/10 text-gray-400 border-gray-600"
            }`}
          >
            {type.emoji} {type.label}
          </button>
        ))}
      </div>

      <button
        onClick={handleStart}
        className="mx-auto px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow transition mt-4"
      >
        Start Focus
      </button>

      <FeatureIcons setActiveScreen={setActiveScreen} />
    </section>
  );
}

export default LandingContent;
