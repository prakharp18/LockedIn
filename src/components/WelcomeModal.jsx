import { useState } from "react";
import { motion } from "framer-motion";

function WelcomeModal({ setShowModal }) {
  const [username, setUsername] = useState("");

  const handleSave = () => {
    if (username.trim()) {
      localStorage.setItem("username", username.trim());
      setShowModal(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a] rounded-2xl border border-white/10 p-8 w-full max-w-md shadow-xl text-center text-white"
      >
        <h2 className="text-2xl font-bold mb-4">👋 Welcome to LockedIn</h2>
        <p className="text-gray-400 mb-6">Please enter your name.</p>

        <input
          type="text"
          placeholder="Your name"
          className="w-full px-4 py-2 rounded-md bg-[#121212] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button
          onClick={handleSave}
          className="mt-6 w-full py-2 rounded-md bg-purple-600 hover:bg-purple-700 transition text-white font-medium"
        >
          Continue
        </button>
      </motion.div>
    </div>
  );
}

export default WelcomeModal;
