import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextNoteTimeRef = useRef<number>(0);
  const timerIDRef = useRef<number | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const isUserPausedRef = useRef(false);

  // E Major Pentatonic Scale frequencies (Dreamy, Acoustic vibe)
  const NOTES = [
    164.81, // E3
    185.00, // F#3
    207.65, // G#3
    246.94, // B3
    277.18, // C#4
    329.63, // E4
    415.30, // G#4
    493.88, // B4
  ];

  // Initialize AudioContext lazily
  const initAudio = () => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioCtx();
      
      const masterGain = audioContextRef.current.createGain();
      masterGain.gain.value = 0.25; // Subtle background volume
      masterGain.connect(audioContextRef.current.destination);
      gainNodeRef.current = masterGain;
    }
  };

  // Play a single synthesized guitar-like tone
  const playTone = (time: number) => {
    if (!audioContextRef.current || !gainNodeRef.current) return;
    const ctx = audioContextRef.current;
    
    // Select random note from scale
    const noteIndex = Math.floor(Math.random() * NOTES.length);
    const freq = NOTES[noteIndex];

    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();
    
    // Triangle wave mimics the harmonics of a plucked string reasonably well for this purpose
    osc.type = 'triangle'; 
    osc.frequency.value = freq;

    // Envelope: Quick attack, long exponential decay
    noteGain.gain.setValueAtTime(0, time);
    noteGain.gain.linearRampToValueAtTime(0.1, time + 0.05); 
    noteGain.gain.exponentialRampToValueAtTime(0.001, time + 3.0);

    osc.connect(noteGain);
    noteGain.connect(gainNodeRef.current);

    osc.start(time);
    osc.stop(time + 3.5);
  };

  // Scheduler loop to queue notes
  const scheduler = useCallback(() => {
    if (!audioContextRef.current) return;
    
    // Schedule notes up to 0.1s in advance
    while (nextNoteTimeRef.current < audioContextRef.current.currentTime + 0.1) {
      playTone(nextNoteTimeRef.current);
      // Next note happens randomly between 0.8s and 2.5s for a natural, non-repetitive feel
      nextNoteTimeRef.current += 0.8 + Math.random() * 1.7;
    }
    timerIDRef.current = window.setTimeout(scheduler, 25);
  }, []);

  const startPlaying = async () => {
    initAudio();
    const ctx = audioContextRef.current;
    if (!ctx) return;

    // Ensure context is running (browsers suspend it until interaction)
    if (ctx.state === 'suspended') {
      try {
        await ctx.resume();
      } catch (err) {
        // Ignore resume errors
      }
    }
    
    if (!timerIDRef.current) {
        nextNoteTimeRef.current = ctx.currentTime + 0.1;
        scheduler();
    }
    setIsPlaying(true);
  };

  const stopPlaying = () => {
    if (timerIDRef.current) {
      clearTimeout(timerIDRef.current);
      timerIDRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.suspend();
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      isUserPausedRef.current = true;
      stopPlaying();
    } else {
      isUserPausedRef.current = false;
      startPlaying();
    }
  };

  // Setup auto-play on first interaction
  useEffect(() => {
    const handleInteraction = () => {
      if (!isUserPausedRef.current && !isPlaying && !timerIDRef.current) {
        startPlaying();
      }
    };

    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { once: true });
    window.addEventListener('scroll', handleInteraction, { once: true });
    window.addEventListener('keydown', handleInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      
      if (timerIDRef.current) clearTimeout(timerIDRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []); // eslint-disable-line

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3 animate-fade-in-up">
      <button
        onClick={togglePlay}
        className={`
          relative group flex items-center justify-center w-12 h-12 rounded-full shadow-lg border border-white/10 backdrop-blur-md transition-all duration-300
          ${isPlaying 
            ? 'bg-wood-600/90 text-white hover:bg-wood-500 hover:scale-105' 
            : 'bg-black/50 text-gray-400 hover:bg-black/70'}
        `}
        aria-label={isPlaying ? "Pausar Música" : "Tocar Música"}
      >
        {isPlaying && (
          <span className="absolute inset-0 rounded-full border border-wood-500 animate-ping opacity-20"></span>
        )}

        {isPlaying ? (
          <Volume2 size={20} />
        ) : (
          <VolumeX size={20} />
        )}

        {/* Tooltip */}
        <div className="absolute left-full ml-3 px-3 py-1 bg-black/80 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {isPlaying ? "Silenciar Ambiente" : "Ativar Dedilhado"}
        </div>
      </button>

      {/* Visual Equalizer Indicator */}
      {isPlaying && (
        <div className="hidden md:flex items-end gap-[2px] h-6">
          <div className="w-1 bg-wood-500 animate-[pulse_1s_ease-in-out_infinite] h-[40%]"></div>
          <div className="w-1 bg-wood-500 animate-[pulse_1.2s_ease-in-out_infinite] h-[100%]"></div>
          <div className="w-1 bg-wood-500 animate-[pulse_0.8s_ease-in-out_infinite] h-[60%]"></div>
          <div className="w-1 bg-wood-500 animate-[pulse_1.5s_ease-in-out_infinite] h-[80%]"></div>
        </div>
      )}
    </div>
  );
};