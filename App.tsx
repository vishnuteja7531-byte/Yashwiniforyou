import React, { useState, useEffect, useRef } from 'react';
import { TemplateCard } from './components/TemplateCard';
import { SoulsAnimation } from './components/SoulsAnimation';
import FloatingElements from './components/FloatingElements';
import BackgroundOrbs from './components/BackgroundOrbs';
import { Volume2, VolumeX, Heart, ArrowDown } from 'lucide-react';

const App: React.FC = () => {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [isFinalSequence, setIsFinalSequence] = useState(false);
  const [response, setResponse] = useState<'yes' | 'time' | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const fadeIntervalRef = useRef<number | null>(null);

  const startFade = (targetVolume: number, duration: number, onComplete?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeIntervalRef.current) {
      window.clearInterval(fadeIntervalRef.current);
    }

    const startVolume = audio.volume;
    const steps = 20;
    const intervalTime = duration / steps;
    const stepAmount = (targetVolume - startVolume) / steps;

    let currentStep = 0;
    fadeIntervalRef.current = window.setInterval(() => {
      currentStep++;
      audio.volume = Math.max(0, Math.min(1, startVolume + stepAmount * currentStep));

      if (currentStep >= steps) {
        if (fadeIntervalRef.current) window.clearInterval(fadeIntervalRef.current);
        audio.volume = targetVolume;
        if (onComplete) onComplete();
      }
    }, intervalTime);
  };

  const handlePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      audio.volume = 0;
      await audio.play();
      setIsPlaying(true);
      startFade(0.25, 2000);
    } catch (err) {
      console.error("Playback failed:", err);
    }
  };

  const handlePause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    startFade(0, 1000, () => {
      audio.pause();
      setIsPlaying(false);
    });
  };

  const toggleMusic = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  useEffect(() => {
    // Only used to setup initial state or cleanup
    return () => {
      if (fadeIntervalRef.current) window.clearInterval(fadeIntervalRef.current);
    };
  }, []);

  const handleYes = () => {
    setResponse('yes');
    setTimeout(() => {
      setIsFinalSequence(true);
    }, 1000);
  };

  const handleTime = () => {
    setResponse('time');
  };

  return (
    <div className="min-h-screen w-full relative pb-24">

      <audio
        ref={audioRef}
        id="bg-music"
        preload="auto"
        loop
        playsInline
        className="hidden"
      >
        <source src="/audio/bombay-theme-instrumental.mp3" type="audio/mpeg" />
      </audio>

      <button
        onClick={toggleMusic}
        className={`fixed top-6 right-6 z-50 px-4 py-2 bg-black/20 backdrop-blur-md rounded-full border border-white/10 text-rose-100/70 text-xs uppercase tracking-widest hover:bg-black/40 transition-all duration-500 flex items-center gap-2 ${isFinalSequence ? 'opacity-0' : 'opacity-100'}`}
      >
        {isPlaying ? <Volume2 size={12} /> : <VolumeX size={12} />}
        <span>{isPlaying ? "On" : "Off"}</span>
      </button>

      {/* Ambient Background Lights */}
      <BackgroundOrbs />

      {/* Background Elements (Petals) */}
      <FloatingElements />

      {/* Cinematic Final Animation Overlay */}
      {isFinalSequence && <SoulsAnimation />}

      {/* Main Content Flow */}
      <div className={`w-full flex flex-col items-center pt-24 px-6 transition-all duration-1000 ${isFinalSequence ? 'opacity-0 pointer-events-none blur-sm' : 'opacity-100'} relative z-10`}>

        {/* Intro Section - Vertical Stack Start */}
        <div className="text-center mb-24 fade-in-up visible relative flex flex-col items-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-rose-500/10 rounded-full blur-[60px] -z-10"></div>

          {/* Aesthetic Dedication Text */}
          <div className="mb-10 px-6 py-2 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-[2px] inline-flex items-center gap-4">
            <span className="font-editorial text-lg text-rose-100/90 tracking-wide">Vishnu Teja</span>
            <span className="text-rose-400/60 text-[10px]">✦</span>
            <span className="font-editorial text-lg text-rose-100/90 tracking-wide">Yashwini</span>
          </div>

          <h1 className="font-editorial text-5xl md:text-7xl text-white tracking-tight leading-[1.1] mb-8 drop-shadow-2xl">
            A Quiet<br />Beginning
          </h1>
          <div className="animate-bounce mt-4 opacity-30 hover:opacity-50 transition-opacity">
            <ArrowDown size={18} className="mx-auto text-rose-100" />
          </div>
        </div>

        {/* Card 1: The Invitation - Rose Theme */}
        <TemplateCard
          theme="rose"
          flowerType="rose"
          lines={[
            "We don't need noise.",
            "We don't need rush.",
            "Just this moment."
          ]}
          delay={100}
        />

        {/* Card 2: Recognition - Gold Theme */}
        <TemplateCard
          theme="gold"
          flowerType="leaf"
          lines={[
            "I see your strength.",
            "I see your quiet.",
            "I see you."
          ]}
          delay={200}
        />

        {/* Card 3: Safety - Night Theme */}
        <TemplateCard
          theme="night"
          flowerType="rose"
          lines={[
            "No pressure to answer.",
            "No promises to keep today.",
            "Just a gentle direction."
          ]}
          delay={300}
        />

        {/* The Question - Intimate & Calm */}
        <div className="w-full max-w-md mx-auto mt-16 mb-24 text-center space-y-12 fade-in-up visible" style={{ transitionDelay: '500ms' }}>

          <div className="flex justify-center mb-6 text-rose-400/60">
            <Heart size={28} strokeWidth={1} />
          </div>

          <h2 className="font-editorial text-3xl md:text-5xl text-white tracking-wide leading-relaxed">
            Will you walk<br />this path with me?
          </h2>

          {!response ? (
            <div className="flex flex-col gap-5 w-full max-w-xs mx-auto">
              <button
                onClick={handleYes}
                className="py-5 bg-rose-900/20 backdrop-blur-md border border-rose-500/20 text-rose-50 text-sm uppercase tracking-[0.25em] rounded-[2rem] hover:bg-rose-800/30 hover:border-rose-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-700 shadow-[0_10px_30px_-10px_rgba(225,29,72,0.1)]"
              >
                Yes, I will
              </button>
              <button
                onClick={handleTime}
                className="py-4 text-rose-200/30 hover:text-rose-200/60 text-[10px] uppercase tracking-[0.25em] transition-all duration-500"
              >
                Not yet
              </button>
            </div>
          ) : (
            <div className="fade-in-up visible">
              {response === 'time' && (
                <div className="p-8 border-t border-b border-white/5 bg-white/[0.01]">
                  <p className="font-editorial text-2xl text-rose-200/80 italic">
                    "That is perfectly okay.<br />I am here."
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center opacity-20 pb-12 transition-opacity hover:opacity-40">
          <p className="font-editorial text-rose-100 text-xs tracking-widest">Vishnu Teja & Yashwini</p>
        </footer>

      </div>
    </div>
  );
};

export default App;