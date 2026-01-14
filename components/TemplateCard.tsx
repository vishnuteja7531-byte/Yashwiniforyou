import React, { useEffect, useRef, useState } from 'react';

interface TemplateCardProps {
  lines: string[];
  theme?: 'rose' | 'night' | 'gold';
  delay?: number;
  className?: string;
  flowerType?: 'rose' | 'leaf';
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ 
  lines, 
  theme = 'rose', 
  delay = 0, 
  className = "",
  flowerType = 'rose'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Theme configurations - Slightly more transparent for depth effect
  const themeStyles = {
    rose: "from-[#3a151c] to-[#1a0508]/80",
    night: "from-[#1a1219] to-[#0f050a]/80",
    gold: "from-[#2d2018] to-[#1a0b08]/80",
  };

  const accentColors = {
    rose: "text-rose-200/60",
    night: "text-purple-200/60",
    gold: "text-amber-100/60",
  };

  return (
    <div
      ref={ref}
      className={`
        relative w-full max-w-[90%] md:max-w-[380px] mx-auto
        min-h-[420px] md:min-h-[460px]
        flex flex-col items-center justify-center text-center
        
        /* Updated Shape: Organic, Asymmetrical Petal Flow */
        rounded-tl-[80px] rounded-tr-[30px] rounded-br-[80px] rounded-bl-[30px]
        
        /* Background & Depth */
        bg-gradient-to-b ${themeStyles[theme]}
        border border-white/[0.07]
        shadow-[inset_0_0_80px_rgba(0,0,0,0.6),_0_20px_40px_-20px_rgba(0,0,0,0.8)]
        backdrop-blur-[2px]
        
        p-8 md:p-14 mb-20 overflow-hidden
        fade-in-up ${isVisible ? 'visible' : ''}
        ${className}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Texture: Subtle Grain */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>
      
      {/* Ambient Inner Glow */}
      <div className={`absolute top-0 left-0 w-full h-full opacity-10 bg-gradient-to-b from-white/10 to-transparent pointer-events-none`}></div>
      
      {/* Soft Glow Spot behind text */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-[80px] opacity-20 ${theme === 'rose' ? 'bg-rose-500' : theme === 'gold' ? 'bg-amber-500' : 'bg-purple-500'}`}></div>

      {/* Floral Decoration Top - Smaller & subtler */}
      <div className="absolute top-10 opacity-5">
         <FlowerIcon type={flowerType} size={60} />
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-8 mt-6">
        {lines.map((line, i) => (
          <p 
            key={i} 
            className={`font-editorial text-2xl md:text-3xl leading-relaxed tracking-wide ${i === 0 ? 'text-white/95' : 'text-white/70'} drop-shadow-md`}
          >
            {line}
          </p>
        ))}
      </div>

      {/* Decorative Bottom */}
      <div className={`absolute bottom-8 text-xl opacity-30 ${accentColors[theme]}`}>
         ❦
      </div>
      
      {/* Inner Border Line for refined finish */}
      <div className="absolute inset-4 border border-white/[0.03] rounded-tl-[70px] rounded-tr-[25px] rounded-br-[70px] rounded-bl-[25px] pointer-events-none"></div>
    </div>
  );
};

const FlowerIcon: React.FC<{ type: 'rose' | 'leaf', size: number }> = ({ type, size }) => {
    if (type === 'rose') {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-white">
                <path d="M12 2C9 2 7 3.5 7 5.5C7 7.5 9 8 10 9C9 9 6 9.5 6 12C6 14.5 8 16 11 16C11 18.5 9.5 20.5 8 21C11.5 21 14.5 19 15.5 16.5C18.5 17 21 15 21 12C21 9.5 19 8.5 17 8C17 5 15 2 12 2ZM12 4C14 4 15 5.5 15 7C15 8.5 14 9.5 12 10C10 9.5 9 8.5 9 7C9 5.5 10 4 12 4ZM15.5 9.5C17 9.8 19 10.5 19 12C19 13.5 17 14.5 15 14.2V9.5ZM13 10.5V15.5C11 15.3 8 14.5 8 12C8 10.5 9.5 10 11 9.8L13 10.5Z" fillOpacity="0.8"/>
            </svg>
        )
    }
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-white">
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" fillOpacity="0.8"/>
        </svg>
    )
}