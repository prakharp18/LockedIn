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
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full shadow-lg flex items-center gap-3 text-white">
      <button onClick={togglePlayback} className="text-xl">
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <span className="text-sm font-heading opacity-80">Lofi Beats</span>
      <audio ref={audioRef} src="/lofi-beats.mp3" loop />
    </div>
  );
};

export default MiniMusicPlayer;
