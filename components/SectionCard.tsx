import React, { useEffect, useRef, useState } from 'react';
import { SectionProps } from '../types';

export const SectionCard: React.FC<SectionProps> = ({ children, className = "", delay = 0, id }) => {
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
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      id={id}
      ref={ref}
      className={`
        w-full max-w-[90%] md:max-w-md mx-auto 
        bg-[#0f0f0f]
        border border-white/10
        rounded-sm
        p-8 md:p-10
        mb-12
        fade-in ${isVisible ? 'visible' : ''}
        ${className}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};