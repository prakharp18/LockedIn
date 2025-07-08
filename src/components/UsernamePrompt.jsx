import React, { useState } from "react";

export default function UsernamePrompt({ onSubmit }) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (name.trim().length > 0) {
      onSubmit(name.trim());
    } else {
      alert("Please enter a valid name.");
    }
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <h2 className="text-2xl mb-4 font-heading">Welcome! What's your name?</h2>
      <input
        type="text"
        placeholder="Enter your name"
        className="p-2 rounded text-black w-64 text-center font-heading"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="mt-4 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded font-heading"
      >
        Continue
      </button>
    </div>
  );
}
