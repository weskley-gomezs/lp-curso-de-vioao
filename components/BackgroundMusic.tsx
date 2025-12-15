import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextNoteTimeRef = useRef<number>(0);
  const timerIDRef = useRef<number | null>(null);
  
  // Controle de estado musical
  const currentNoteIndexRef = useRef(0);
  const currentChordIndexRef = useRef(0);

  // --- CONFIGURAÇÃO MUSICAL ---
  
  // Progressão de Acordes (Frequências das cordas para cada acorde)
  // Formato: [Baixo, Corda 3, Corda 2, Corda 1]
  const CHORDS = [
    [164.81, 196.00, 246.94, 329.63], // Em (Mi menor)
    [130.81, 196.00, 261.63, 329.63], // C7M (Dó com Sétima Maior)
    [196.00, 196.00, 246.94, 293.66], // G (Sol Maior)
    [146.83, 220.00, 293.66, 369.99], // D (Ré Maior)
  ];

  // Padrão de Dedilhado (Índices do array do acorde)
  // 0 = Baixo, 1 = Meio, 2 = Agudo, 3 = Muito Agudo
  // Padrão simples: Baixo -> 3 -> 2 -> 1 -> 2 -> 3 (Compasso 6/8 lento)
  const ARPEGGIO_PATTERN = [0, 1, 2, 3, 2, 1];
  
  const TEMPO = 90; // BPM
  const SECONDS_PER_BEAT = 60 / TEMPO;
  const NOTE_DURATION = SECONDS_PER_BEAT / 2; // Colcheias

  // Inicializa o AudioContext
  const initAudio = () => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioCtx();
    }
  };

  // --- SÍNTESE DO SOM DE VIOLÃO (Nylon) ---
  const playGuitarString = (time: number, freq: number, isBass: boolean) => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;

    // 1. Oscilador (Fonte do som)
    const osc = ctx.createOscillator();
    // Onda dente de serra suavizada soa mais rica que triangulo simples para cordas
    osc.type = 'sawtooth'; 
    osc.frequency.value = freq;

    // 2. Filtro (Corpo do som) - O segredo do som de violão
    // O filtro corta os agudos estridentes, simulando o nylon
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.value = 1; // Ressonância leve

    // 3. Controle de Volume (Envelope)
    const gainNode = ctx.createGain();
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.15; // Volume geral baixo para fundo

    // Conexões: Oscilador -> Filtro -> Gain -> Master -> Saída
    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(masterGain);
    masterGain.connect(ctx.destination);

    // --- ENVELOPES (O formato do som no tempo) ---
    
    // Envelope de Filtro (Simula a "batida" na corda)
    // O filtro abre rápido e fecha devagar, imitando o timbre mudando
    filter.frequency.setValueAtTime(isBass ? 400 : 800, time);
    filter.frequency.exponentialRampToValueAtTime(isBass ? 100 : 300, time + 0.1); // Ataque percussivo
    filter.frequency.linearRampToValueAtTime(isBass ? 50 : 150, time + 2); // Decay longo

    // Envelope de Volume
    gainNode.gain.setValueAtTime(0, time);
    gainNode.gain.linearRampToValueAtTime(1, time + 0.02); // Ataque muito rápido
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + (isBass ? 3.5 : 2.5)); // Cordas graves soam por mais tempo

    osc.start(time);
    osc.stop(time + 4); // Para depois de 4 segundos
  };

  // --- AGENDADOR DE NOTAS ---
  const scheduler = useCallback(() => {
    if (!audioContextRef.current) return;
    
    // Enquanto houver notas para tocar nos próximos 0.1s
    while (nextNoteTimeRef.current < audioContextRef.current.currentTime + 0.1) {
      
      // 1. Descobre qual nota tocar
      const currentChord = CHORDS[currentChordIndexRef.current];
      const stringIndex = ARPEGGIO_PATTERN[currentNoteIndexRef.current];
      const freq = currentChord[stringIndex];
      const isBass = stringIndex === 0;

      // 2. Toca a nota
      playGuitarString(nextNoteTimeRef.current, freq, isBass);

      // 3. Avança o tempo para a próxima nota
      nextNoteTimeRef.current += NOTE_DURATION;

      // 4. Lógica de Sequenciamento (Próxima nota / Próximo acorde)
      currentNoteIndexRef.current++;
      
      // Se terminou o padrão de dedilhado (6 notas)
      if (currentNoteIndexRef.current >= ARPEGGIO_PATTERN.length) {
        currentNoteIndexRef.current = 0;
        
        // A cada 2 repetições do padrão, muda o acorde (opcional, aqui muda a cada ciclo para fluidez)
        currentChordIndexRef.current++;
        if (currentChordIndexRef.current >= CHORDS.length) {
          currentChordIndexRef.current = 0;
        }
      }
    }
    
    timerIDRef.current = window.setTimeout(scheduler, 25);
  }, []);

  const startPlaying = async () => {
    initAudio();
    const ctx = audioContextRef.current;
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      await ctx.resume();
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
      stopPlaying();
    } else {
      startPlaying();
    }
  };

  // Auto-play na primeira interação
  useEffect(() => {
    const handleInteraction = () => {
      if (!isPlaying && !timerIDRef.current) {
        startPlaying();
      }
    };

    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { once: true });
    window.addEventListener('scroll', handleInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
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
        </div>
      )}
    </div>
  );
};