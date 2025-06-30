import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const pad = (n) => n.toString().padStart(2, "0");

const hoursList = Array.from({ length: 24 }, (_, i) => pad(i));
const minutesList = Array.from({ length: 60 }, (_, i) => pad(i));
const secondsList = Array.from({ length: 60 }, (_, i) => pad(i));

const getRandomTime = () => ({
  hours: hoursList[Math.floor(Math.random() * hoursList.length)],
  minutes: minutesList[Math.floor(Math.random() * minutesList.length)],
  seconds: secondsList[Math.floor(Math.random() * secondsList.length)],
});

function ScrollingDigit({ value, list }) {
  const index = list.indexOf(value);
  const itemHeight = 64;
  const safeIndex = index >= 0 ? index : 0;
  const offset = -safeIndex * itemHeight;

  return (
    <div className="relative h-16 w-14 overflow-hidden inline-block text-center align-middle">
      <motion.div
        animate={{ y: offset }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {list.map((val) => (
          <div
            key={val}
            className="h-16 flex items-center justify-center text-4xl font-mono"
          >
            {val}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function TimerBlock({ onClick }) {
  const [time, setTime] = useState(getRandomTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getRandomTime());
    }, 2100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition"
    >
      <h3 className="text-2xl font-semibold mb-4">Choose Your Timer</h3>
      <div className="flex justify-center items-center space-x-2">
        <ScrollingDigit value={time.hours} list={hoursList} />
        <div className="h-16 w-4 flex items-center justify-center text-4xl font-mono">
          :
        </div>
        <ScrollingDigit value={time.minutes} list={minutesList} />
        <div className="h-16 w-4 flex items-center justify-center text-4xl font-mono">
          :
        </div>
        <ScrollingDigit value={time.seconds} list={secondsList} />
      </div>
      <p className="text-sm text-gray-500 mt-4">Tap to select a duration</p>
    </div>
  );
}

export default TimerBlock;
