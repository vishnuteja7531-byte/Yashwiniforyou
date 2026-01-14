import React, { useEffect, useState } from 'react';

export const SoulsAnimation: React.FC = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Stage 1: Movement starts
    // Stage 2: Meeting & Glow
    // Stage 3: Text reveal

    const t1 = setTimeout(() => setStage(1), 100);
    const t2 = setTimeout(() => setStage(2), 3500);
    const t3 = setTimeout(() => setStage(3), 5000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden transition-colors duration-[2000ms] bg-black">

      {/* Soul 1: Bottom Left -> Center */}
      <div
        className="absolute w-3 h-3 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,1)]"
        style={{
          bottom: '10%',
          left: '10%',
          opacity: stage >= 1 ? 1 : 0,
          transform: stage >= 1 ? 'translate(calc(40vw - 10px), calc(-40vh + 10px))' : 'translate(0,0)',
          transition: 'transform 3.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease'
        }}
      />

      {/* Soul 2: Top Right -> Center */}
      <div
        className="absolute w-3 h-3 rounded-full bg-rose-200 shadow-[0_0_20px_rgba(255,200,200,1)]"
        style={{
          top: '10%',
          right: '10%',
          opacity: stage >= 1 ? 1 : 0,
          transform: stage >= 1 ? 'translate(calc(-40vw + 10px), calc(40vh - 10px))' : 'translate(0,0)',
          transition: 'transform 3.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease'
        }}
      />

      {/* Meeting Glow */}
      <div
        className={`absolute w-16 h-16 bg-white/20 rounded-full blur-[30px] transition-all duration-1000 ${stage >= 2 ? 'opacity-100 scale-150' : 'opacity-0 scale-0'}`}
      />
      <div
        className={`absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_40px_white] transition-opacity duration-1000 ${stage >= 2 ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Final Text */}
      <div className={`relative z-10 text-center transition-all duration-1000 ${stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h2 className="font-editorial text-2xl md:text-3xl text-white tracking-wider italic flex flex-col gap-3">
          <span>Thank you for choosing me.</span>
          <span className="text-white/60 text-lg md:text-xl font-light not-italic tracking-widest uppercase">I’ll choose you — gently, every day.</span>
        </h2>
      </div>
    </div>
  );
};