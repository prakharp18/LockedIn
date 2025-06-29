import TimerBlock from "./TimerBlock";
import FeatureIcons from "./FeatureIcons";
import { motion } from "framer-motion";
function LandingContent() {
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
      <TimerBlock />
      <FeatureIcons />
    </section>
  );
}

export default LandingContent;
