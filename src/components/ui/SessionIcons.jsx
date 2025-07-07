const sessionTypes = [
  { label: "Work", emoji: "💼" },
  { label: "Break", emoji: "☕" },
  { label: "Writing", emoji: "✍️" },
  { label: "Focus", emoji: "🧘" },
  { label: "Random", emoji: "🎲" },
];

function SessionIcons({ current, setCurrent }) {
  return (
    <div className="absolute bottom-6 right-8 flex gap-2">
      {sessionTypes.map((type) => (
        <button
          key={type.label}
          onClick={() => setCurrent(type.label)}
          className={`text-sm px-3 py-1 rounded-full font-medium transition-all ${
            current === type.label
              ? "bg-purple-600 text-white"
              : "bg-white/10 text-white/70"
          }`}
        >
          {type.emoji}
        </button>
      ))}
    </div>
  );
}

export default SessionIcons;
