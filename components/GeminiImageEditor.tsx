import React, { useState, useRef } from 'react';
import { Upload, Wand2, Loader2, Image as ImageIcon, Sparkles } from 'lucide-react';
import { editImage } from '../services/geminiService';
import { ImageEditorState } from '../types';

export const GeminiImageEditor: React.FC = () => {
  const [state, setState] = useState<ImageEditorState>({
    image: null,
    prompt: '',
    isGenerating: false,
    generatedImage: null,
    error: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setState(prev => ({ ...prev, image: reader.result as string, generatedImage: null, error: null }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!state.image || !state.prompt) return;

    setState(prev => ({ ...prev, isGenerating: true, error: null }));

    try {
      const result = await editImage(state.image, state.prompt);
      setState(prev => ({ ...prev, generatedImage: result, isGenerating: false }));
    } catch (err) {
      setState(prev => ({ 
        ...prev, 
        isGenerating: false, 
        error: "Something went wrong. Maybe try a simpler thought?" 
      }));
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-full text-center mb-2">
        <h3 className="serif-text text-xl text-rose-100 mb-1">A Shared Memory</h3>
        <p className="text-sm text-rose-200/60 font-light">
          Upload a photo of a moment we cherish. Let's imagine it together.
        </p>
      </div>

      {/* Image Preview Area */}
      <div className="relative w-full aspect-square bg-black/20 rounded-2xl overflow-hidden border border-rose-100/10 flex items-center justify-center group cursor-pointer transition-all hover:border-rose-500/30"
           onClick={() => !state.image && fileInputRef.current?.click()}>
        
        {state.generatedImage ? (
           <img src={state.generatedImage} alt="Magic result" className="w-full h-full object-cover transition-opacity duration-500" />
        ) : state.image ? (
          <img src={state.image} alt="Original" className="w-full h-full object-cover opacity-90" />
        ) : (
          <div className="flex flex-col items-center text-rose-400/50 transition-colors group-hover:text-rose-400">
            <ImageIcon size={40} strokeWidth={1} />
            <span className="text-xs mt-3 font-medium tracking-wide">Tap to upload</span>
          </div>
        )}

        {/* Loading Overlay */}
        {state.isGenerating && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10">
            <Loader2 className="animate-spin text-rose-400" size={32} />
          </div>
        )}
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />

      {state.image && (
        <div className="w-full space-y-3">
          <div className="relative">
             <input
              type="text"
              value={state.prompt}
              onChange={(e) => setState(prev => ({ ...prev, prompt: e.target.value }))}
              placeholder="Make it look like a vintage painting..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-rose-50 placeholder:text-rose-200/20 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/20 shadow-inner transition-all"
              disabled={state.isGenerating}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Sparkles size={16} className="text-rose-400/60" />
            </div>
          </div>
         
          <div className="flex gap-2">
             <button
              onClick={handleGenerate}
              disabled={!state.prompt || state.isGenerating}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all duration-500
                ${(!state.prompt || state.isGenerating) 
                  ? 'bg-white/5 text-white/20 cursor-not-allowed' 
                  : 'bg-rose-900/80 text-rose-100 border border-rose-700/50 hover:bg-rose-800 shadow-[0_0_15px_rgba(225,29,72,0.15)]'
                }`}
            >
              <Wand2 size={16} />
              {state.isGenerating ? 'Dreaming...' : 'Add Magic'}
            </button>
            <button 
                onClick={() => setState({image: null, prompt: '', generatedImage: null, isGenerating: false, error: null})}
                className="px-4 py-3 rounded-xl bg-transparent border border-white/10 text-rose-200/50 text-sm hover:bg-white/5 transition-colors"
            >
                Clear
            </button>
          </div>
         
          {state.error && (
            <p className="text-xs text-center text-rose-400 mt-2 fade-in-up visible">{state.error}</p>
          )}
        </div>
      )}
    </div>
  );
};