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

  return (
    <div className="relative w-full max-w-2xl mx-auto my-8 select-none">
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

        {/* Strings Container */}
        <div className="absolute inset-0 flex flex-col justify-center space-y-6 md:space-y-8 z-20 py-10"
             onMouseLeave={() => setVibratingString(null)}>
          
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
                className="relative w-full h-10 flex items-center group cursor-pointer"
                onMouseEnter={() => playNote(freq, index)}
                onTouchStart={(e) => {
                  e.preventDefault(); // Prevent scrolling on mobile while playing
                  playNote(freq, index);
                }}
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
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/50"></div>
                </div>
                
                {/* String Name Label (Hidden on mobile usually, visible here for education) */}
                <span className="absolute left-4 text-white/50 font-mono text-xs select-none pointer-events-none">
                  {STRING_NAMES[index]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <p className="text-center text-wood-600 mt-4 text-sm font-medium">
        {isAudioEnabled ? "Passe o mouse ou toque nas cordas para ouvir!" : "Ative o som para uma experiência imersiva"}
      </p>
    </div>
  );
};
