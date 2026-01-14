import React from 'react';
import { Sparkles, Moon, Sun, Heart } from 'lucide-react';
import { SectionCard } from './SectionCard';

export const ConceptCollage: React.FC = () => {
  return (
    <div className="w-full space-y-4">
      <div className="text-center mb-8">
        <h3 className="serif-text text-xl text-rose-100/90 mb-2">Imagined Moments</h3>
        <p className="text-xs tracking-widest uppercase text-rose-200/40">Feelings, not just memories</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Card 1 */}
        <div className="bg-gradient-to-br from-rose-950/30 to-black/30 border border-white/5 rounded-2xl p-6 flex items-center gap-4 group hover:border-white/10 transition-colors duration-700">
            <div className="p-3 bg-white/5 rounded-full text-rose-200/70">
                <Moon size={20} strokeWidth={1} />
            </div>
            <div>
                <p className="serif-text text-lg text-rose-100/90">Quiet Evenings</p>
                <p className="text-xs text-rose-200/50 font-light mt-1">Peace that doesn’t ask for effort.</p>
            </div>
        </div>

        {/* Card 2 */}
        <div className="bg-gradient-to-br from-rose-950/30 to-black/30 border border-white/5 rounded-2xl p-6 flex items-center gap-4 group hover:border-white/10 transition-colors duration-700 ml-4 md:ml-8">
            <div className="p-3 bg-white/5 rounded-full text-amber-100/60">
                <Sun size={20} strokeWidth={1} />
            </div>
            <div>
                <p className="serif-text text-lg text-rose-100/90">Gentle Mornings</p>
                <p className="text-xs text-rose-200/50 font-light mt-1">Trust that grows naturally.</p>
            </div>
        </div>

         {/* Card 3 */}
         <div className="bg-gradient-to-br from-rose-950/30 to-black/30 border border-white/5 rounded-2xl p-6 flex items-center gap-4 group hover:border-white/10 transition-colors duration-700">
            <div className="p-3 bg-white/5 rounded-full text-rose-300/60">
                <Heart size={20} strokeWidth={1} />
            </div>
            <div>
                <p className="serif-text text-lg text-rose-100/90">Being Chosen</p>
                <p className="text-xs text-rose-200/50 font-light mt-1">Softly, safely, and surely.</p>
            </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-6">
        <Sparkles className="text-rose-200/20 animate-pulse" size={16} />
      </div>
    </div>
  );
};