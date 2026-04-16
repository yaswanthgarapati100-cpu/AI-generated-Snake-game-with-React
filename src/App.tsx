/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-black text-cyan-400 font-sans flex flex-col items-center justify-between p-6 overflow-hidden relative crt-flicker">
      <div className="scanlines" />
      <div className="static-noise" />
      
      {/* Header */}
      <header className="w-full max-w-4xl flex items-center justify-between z-10 mb-8 border-b-4 border-fuchsia-600 pb-4 screen-tear">
        <div>
          <h1 className="text-2xl md:text-4xl font-display tracking-tighter text-cyan-400 uppercase glitch-text" data-text="SYSTEM.SNAKE_EXEC">
            SYSTEM.SNAKE_EXEC
          </h1>
          <p className="text-fuchsia-500 text-xl tracking-widest uppercase mt-2">STATUS: ONLINE // AUDIO_LINK: ESTABLISHED</p>
        </div>
        
        <div className="bg-black border-2 border-cyan-400 px-6 py-2 shadow-[4px_4px_0_#f0f]">
          <span className="text-fuchsia-500 text-xl uppercase tracking-wider mr-3">CYCLES:</span>
          <span className="text-3xl font-display text-cyan-400">
            {score.toString().padStart(4, '0')}
          </span>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="flex-1 flex items-center justify-center w-full z-10 mb-8">
        <SnakeGame onScoreUpdate={setScore} />
      </main>

      {/* Footer / Music Player */}
      <footer className="w-full max-w-4xl z-10 border-t-4 border-cyan-400 pt-4">
        <MusicPlayer />
      </footer>
    </div>
  );
}
