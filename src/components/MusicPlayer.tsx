import React, { useState, useRef, useEffect } from 'react';

const TRACKS = [
  { id: 1, title: 'DATA_STREAM_01.WAV', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 2, title: 'VOID_RESONANCE.WAV', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 3, title: 'SYNTHETIC_PULSE.WAV', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(e => {
        console.error("Audio playback failed:", e);
        setIsPlaying(false);
      });
    } else if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const nextTrack = () => { setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length); setProgress(0); };
  const prevTrack = () => { setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length); setProgress(0); };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) setProgress((current / duration) * 100);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const bounds = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const percentage = x / bounds.width;
      audioRef.current.currentTime = percentage * audioRef.current.duration;
      setProgress(percentage * 100);
    }
  };

  const currentTrack = TRACKS[currentTrackIndex];

  return (
    <div className="w-full bg-black border-4 border-cyan-400 p-4 shadow-[8px_8px_0_#f0f] relative overflow-hidden">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextTrack}
      />
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
        <div className="flex-1 w-full">
          <div className="text-fuchsia-500 text-lg uppercase mb-1">CURRENT_PROCESS:</div>
          <h3 className="text-cyan-400 font-display text-lg md:text-xl truncate">{currentTrack.title}</h3>
        </div>
        
        {/* Visualizer bars */}
        <div className="flex items-end gap-1 h-12 border border-fuchsia-600 p-1 w-32 shrink-0">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div 
              key={i} 
              className={`flex-1 bg-cyan-400 ${isPlaying ? 'animate-pulse' : ''}`}
              style={{ 
                height: isPlaying ? `${Math.max(10, Math.random() * 100)}%` : '10%',
                animationDelay: `${i * 0.05}s`,
                animationDuration: '0.2s'
              }}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div 
        className="h-6 w-full bg-black border-2 border-fuchsia-600 mb-4 cursor-pointer relative"
        onClick={handleProgressClick}
      >
        <div 
          className="h-full bg-fuchsia-600 transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-black font-display text-xs mix-blend-difference pointer-events-none">
          {Math.floor(progress)}%
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-cyan-400 uppercase">VOL:</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-24 h-4 bg-black border-2 border-cyan-400 appearance-none cursor-pointer accent-fuchsia-500"
            style={{
              background: `linear-gradient(to right, #0ff ${volume * 100}%, #000 ${volume * 100}%)`
            }}
          />
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={prevTrack}
            className="px-4 py-2 bg-black border-2 border-fuchsia-600 text-fuchsia-500 font-display hover:bg-fuchsia-600 hover:text-black active:translate-y-1"
          >
            {'<<'}
          </button>
          
          <button 
            onClick={togglePlay}
            className="px-6 py-2 bg-cyan-400 border-2 border-cyan-400 text-black font-display hover:bg-black hover:text-cyan-400 active:translate-y-1"
          >
            {isPlaying ? 'PAUSE' : 'EXEC'}
          </button>
          
          <button 
            onClick={nextTrack}
            className="px-4 py-2 bg-black border-2 border-fuchsia-600 text-fuchsia-500 font-display hover:bg-fuchsia-600 hover:text-black active:translate-y-1"
          >
            {'>>'}
          </button>
        </div>
      </div>
    </div>
  );
}
