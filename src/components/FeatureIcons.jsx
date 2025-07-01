import { BarChart2, History, LineChart, Settings } from "lucide-react";
import { motion } from "framer-motion";

function FeatureIcons({ setActiveScreen }) {
  const features = [
    { icon: <BarChart2 />, label: "Stats", screen: "stats" },
    { icon: <LineChart />, label: "Graph", screen: "graph" },
    { icon: <History />, label: "History", screen: "history" },
    { icon: <Settings />, label: "Settings", screen: "settings" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mt-4">
      {features.map((f, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.001 }}
          whileHover={{ scale: 1.04 }}
          onClick={() => setActiveScreen(f.screen)}
          className="cursor-pointer flex flex-col items-center justify-center p-3 rounded-xl bg-white dark:bg-[#1e1e1e] shadow-sm dark:shadow-none border border-gray-200 dark:border-gray-700 transition-all"
        >
          <div className="w-6 h-6 text-purple-500 mb-1">{f.icon}</div>
          <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">
            {f.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export default FeatureIcons;
