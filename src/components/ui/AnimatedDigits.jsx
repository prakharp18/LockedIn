import { motion, AnimatePresence } from "framer-motion";

function AnimatedDigit({ value }) {
  return (
    <div className="overflow-hidden h-14 w-10 inline-block relative">
      <AnimatePresence initial={false}>
        <motion.span
          key={value}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 flex justify-center items-center text-5xl font-bold font-mono"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default AnimatedDigit;
