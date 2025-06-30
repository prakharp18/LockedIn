import TimerBlock from "./TimerBlock";
import FeatureIcons from "./FeatureIcons";
import { motion } from "framer-motion";
import { useState } from "react";

function LandingContent({ setActiveScreen, setFocusTime }) {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState({
    hours: "00",
    minutes: "25",
    seconds: "00",
  });

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

  return (
    <section className="flex flex-col gap-8 lg:w-1/2">
      <div>
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
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
                className="flex flex-col items-center text-center w-24"
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

      <button
        onClick={() => {
          const paddedTime = {
            hours: selectedTime.hours.padStart(2, "0"),
            minutes: selectedTime.minutes.padStart(2, "0"),
            seconds: selectedTime.seconds.padStart(2, "0"),
          };

          const totalSeconds =
            parseInt(paddedTime.hours) * 3600 +
            parseInt(paddedTime.minutes) * 60 +
            parseInt(paddedTime.seconds);

          if (totalSeconds < 60) {
            alert("Please enter at least 1 minute.");
            return;
          }

          setFocusTime(totalSeconds);
          setActiveScreen("focus");
        }}
        className="mx-auto px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow transition mt-4"
      >
        Start Focus
      </button>

      <FeatureIcons />
    </section>
  );
}

export default LandingContent;
