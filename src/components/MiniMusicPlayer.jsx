import React, { useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const MiniMusicPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 bg-white/10 backdrop-blur-lg px-4 py-1.5 rounded-full shadow-md flex items-center gap-2 text-white border border-white/10 text-sm sm:text-base max-w-[90%]">
      <button
        onClick={togglePlayback}
        className="text-lg sm:text-xl p-1 hover:scale-110 transition-transform"
        aria-label="Toggle music"
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <span className="font-heading opacity-90 whitespace-nowrap">
        Lofi Beats
      </span>
      <audio ref={audioRef} src="/lofi-beats.mp3" loop />
    </div>
  );
};

export default MiniMusicPlayer;
