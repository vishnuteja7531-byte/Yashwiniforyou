import React from 'react';

const FloatingElements: React.FC = () => {
  // Creating more organic, slower, framing elements
  const elements = [
    { id: 1, type: 'petal', left: '5%', delay: '0s', duration: '15s', scale: 1 },
    { id: 2, type: 'petal', left: '85%', delay: '2s', duration: '18s', scale: 0.8 },
    { id: 3, type: 'leaf', left: '15%', delay: '5s', duration: '20s', scale: 0.6 },
    { id: 4, type: 'petal', left: '90%', delay: '7s', duration: '22s', scale: 0.9 },
    { id: 5, type: 'petal', left: '2%', delay: '10s', duration: '17s', scale: 0.7 },
    { id: 6, type: 'leaf', left: '80%', delay: '12s', duration: '25s', scale: 0.5 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute text-rose-300/20 drop-shadow-md"
          style={{
            left: el.left,
            top: '-50px',
            fontSize: `${20 * el.scale}px`,
            opacity: 0.4,
            animation: `float-down ${el.duration} linear infinite`,
            animationDelay: el.delay,
          }}
        >
          {el.type === 'petal' ? (
             <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C12 2 14 6 14 10C14 14 11 16 9 16C7 16 5 14 5 10C5 6 12 2 12 2Z"/></svg>
          ) : (
             <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C7 7 5 12 5 16C5 19 7 21 9 21C14 21 19 12 19 7C19 4 14 2 12 2Z"/></svg>
          )}
        </div>
      ))}
      <style>{`
        @keyframes float-down {
          0% {
            transform: translateY(-50px) rotate(0deg) translateX(0);
          }
          33% {
            transform: translateY(30vh) rotate(45deg) translateX(20px);
          }
          66% {
            transform: translateY(60vh) rotate(-15deg) translateX(-20px);
          }
          100% {
            transform: translateY(110vh) rotate(180deg) translateX(10px);
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingElements;