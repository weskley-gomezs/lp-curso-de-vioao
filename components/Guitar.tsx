import React, { useEffect, useRef, useState, useCallback } from 'react';

// Guitar frequencies (Standard Tuning: E A D G B E)
const STRING_FREQUENCIES = [
  329.63, // E4 (High)
  246.94, // B3
  196.00, // G3
  146.83, // D3
  110.00, // A2
  82.41   // E2 (Low)
];

const STRING_NAMES = ["e", "B", "G", "D", "A", "E"];

export const Guitar: React.FC = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const lastPlayedStringRef = useRef<number | null>(null); // Track last played string for strumming
  const [vibratingString, setVibratingString] = useState<number | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  useEffect(() => {
    // Initialize AudioContext lazily to comply with browser policies
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const initAudio = () => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioCtx();
    }
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume();
    }
    setIsAudioEnabled(true);
  };

  const playNote = useCallback((frequency: number, index: number) => {
    if (!audioContextRef.current) {
      initAudio();
    }
    
    // Safety check if init failed or still suspended (though initAudio handles resume)
    const ctx = audioContextRef.current;
    if (!ctx) return;

    // Trigger vibration animation
    setVibratingString(index);
    setTimeout(() => setVibratingString(null), 300);

    // Create Oscillator (Sound source)
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    // Guitar-like tone: Triangle wave has good harmonics but not too harsh
    oscillator.type = 'triangle';
    oscillator.frequency.value = frequency;

    // Envelope (Attack and Decay) to simulate a pluck
    const now = ctx.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.4, now + 0.05); // Attack
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 2.0); // Decay

    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Start and Stop
    oscillator.start(now);
    oscillator.stop(now + 2.0);
  }, []);

  // Handle touch interactions (Tap and Slide/Strum)
  const handleTouch = useCallback((e: React.TouchEvent) => {
    // Attempt to init audio on first touch if not already active
    if (e.type === 'touchstart') {
      initAudio();
    }

    const touch = e.touches[0];
    // Identify which element is under the finger
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    // Check if it's one of our string elements (or child of one)
    const stringDiv = element?.closest('[data-string-index]');
    
    if (stringDiv) {
      const index = parseInt(stringDiv.getAttribute('data-string-index') || '-1', 10);
      
      // Play only if it's a valid string and distinct from the last one played in this sequence
      // This prevents machine-gun repeating while holding finger on one string, 
      // but allows re-playing if you move off and back on.
      if (index !== -1 && index !== lastPlayedStringRef.current) {
        playNote(STRING_FREQUENCIES[index], index);
        lastPlayedStringRef.current = index;
      }
    } else {
      // Finger is in the gap between strings
      lastPlayedStringRef.current = null;
    }
  }, [playNote]);

  return (
    <div className="relative w-full max-w-2xl mx-auto my-8 select-none touch-none">
      {/* Guitar Body Representation */}
      <div className="relative bg-wood-700 rounded-3xl shadow-2xl overflow-hidden border-4 border-wood-900 aspect-[4/3] md:aspect-[2/1] flex flex-col items-center justify-center">
        
        {/* Wood Texture Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-wood-600 via-wood-700 to-wood-900 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-20"></div>

        {/* Soundhole */}
        <div className="absolute w-64 h-64 md:w-80 md:h-80 bg-wood-900 rounded-full border-8 border-wood-400 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] flex items-center justify-center z-0 left-1/2 transform -translate-x-1/2">
             <div className="w-[90%] h-[90%] bg-black rounded-full opacity-90"></div>
        </div>

        {/* Bridge (Stylized) */}
        <div className="absolute bottom-0 w-1/4 h-16 bg-wood-900 rounded-t-lg z-10 border-t-4 border-wood-300 shadow-lg"></div>

        {/* Strings Container - Handles Touch Events for Strumming */}
        <div 
          className="absolute inset-0 flex flex-col justify-center space-y-6 md:space-y-8 z-20 py-10"
          onMouseLeave={() => setVibratingString(null)}
          onTouchStart={handleTouch}
          onTouchMove={handleTouch}
          onTouchEnd={() => { lastPlayedStringRef.current = null; }}
        >
          
          {!isAudioEnabled && (
            <div 
              onClick={initAudio}
              className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm cursor-pointer transition-opacity hover:bg-black/30"
            >
              <div className="bg-white/90 text-wood-900 px-6 py-3 rounded-full font-bold shadow-xl animate-pulse cursor-pointer">
                🎵 Clique para Ativar o Som
              </div>
            </div>
          )}

          {STRING_FREQUENCIES.map((freq, index) => {
            // Strings get thicker as pitch gets lower
            const thickness = 1 + (index * 0.5); 
            // Bronze/Silver color gradient for strings
            const stringColor = index > 1 ? 'bg-amber-200' : 'bg-gray-300'; 
            
            return (
              <div
                key={index}
                data-string-index={index}
                className="relative w-full h-10 flex items-center group cursor-pointer"
                onMouseEnter={() => playNote(freq, index)}
              >
                {/* Visual String */}
                <div 
                  className={`w-full ${stringColor} shadow-md transition-transform duration-75 relative
                    ${vibratingString === index ? 'animate-vibrate' : ''}
                  `}
                  style={{ 
                    height: `${thickness}px`,
                    opacity: 0.9
                  }}
                >
                    {/* Light reflection on string */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/50 pointer-events-none"></div>
                </div>
                
                {/* String Name Label */}
                <span className="absolute left-4 text-white/50 font-mono text-xs select-none pointer-events-none">
                  {STRING_NAMES[index]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <p className="text-center text-wood-600 mt-4 text-sm font-medium">
        {isAudioEnabled ? "Passe o mouse ou deslize o dedo nas cordas para tocar!" : "Ative o som para uma experiência imersiva"}
      </p>
    </div>
  );
};