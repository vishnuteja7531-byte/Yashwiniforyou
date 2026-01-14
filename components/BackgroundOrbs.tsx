import React from 'react';

const BackgroundOrbs: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Orb 1: Rose Pink - Top Left drifting */}
      <div className="absolute -top-[10%] -left-[10%] w-[70vw] h-[70vw] bg-rose-400/15 rounded-full blur-[100px] animate-orb-float-1 mix-blend-screen" />
      
      {/* Orb 2: Lavender - Middle Right drifting */}
      <div className="absolute top-[30%] -right-[20%] w-[60vw] h-[60vw] bg-purple-300/15 rounded-full blur-[120px] animate-orb-float-2 mix-blend-screen" />
      
      {/* Orb 3: Champagne - Bottom Left drifting */}
      <div className="absolute -bottom-[10%] -left-[10%] w-[80vw] h-[80vw] bg-amber-100/10 rounded-full blur-[130px] animate-orb-float-3 mix-blend-overlay" />

      {/* Orb 4: Muted Plum - Top Center/Right drifting */}
      <div className="absolute top-[-20%] right-[10%] w-[50vw] h-[50vw] bg-fuchsia-900/20 rounded-full blur-[110px] animate-orb-float-4 mix-blend-screen" />

      <style>{`
        @keyframes orb-float-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(5%, 5%) scale(1.1); }
          66% { transform: translate(-5%, 10%) scale(0.9); }
        }
        @keyframes orb-float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-10%, 5%) scale(1.05); }
        }
        @keyframes orb-float-3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(5%, -5%) rotate(5deg); }
        }
        @keyframes orb-float-4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(10%, 10%) scale(1.15); }
        }
        .animate-orb-float-1 { animation: orb-float-1 45s infinite ease-in-out; }
        .animate-orb-float-2 { animation: orb-float-2 55s infinite ease-in-out; }
        .animate-orb-float-3 { animation: orb-float-3 65s infinite ease-in-out; }
        .animate-orb-float-4 { animation: orb-float-4 50s infinite ease-in-out; }
      `}</style>
    </div>
  );
};

export default BackgroundOrbs;