
import React from 'react';
import { DailyThought } from '../types';

interface ThoughtCardProps {
  thought: DailyThought;
}

export const ThoughtCard: React.FC<ThoughtCardProps> = ({ thought }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Title Section */}
      <div className="text-center mb-8">
        <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-amber-100/90 mb-2">
          {thought.synthesis.title}
        </h2>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto" />
      </div>

      {/* The Pillars Grid (2x2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bible Section */}
        <div className="glass p-6 rounded-3xl relative overflow-hidden group border-amber-500/10">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
            </svg>
          </div>
          <h3 className="text-amber-500 font-cinzel text-[10px] tracking-[0.2em] mb-4 uppercase">Sacred Scripture</h3>
          <p className="font-lora text-base leading-relaxed mb-4 italic text-slate-200">
            "{thought.bibleVerse.text}"
          </p>
          <p className="text-slate-500 text-xs font-semibold">— {thought.bibleVerse.reference}</p>
        </div>

        {/* Hermetic Section */}
        <div className="glass p-6 rounded-3xl relative overflow-hidden group border-emerald-500/10">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" />
            </svg>
          </div>
          <h3 className="text-emerald-500 font-cinzel text-[10px] tracking-[0.2em] mb-4 uppercase">Hermetic Wisdom</h3>
          <p className="font-lora text-base leading-relaxed mb-4 text-slate-200">
            "{thought.hermeticWisdom.belief}"
          </p>
          <p className="text-slate-500 text-xs font-semibold">— {thought.hermeticWisdom.source}</p>
        </div>

        {/* Theurgy/Magic Section */}
        <div className="glass p-6 rounded-3xl relative overflow-hidden group border-rose-500/10">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2z M12,15.5l-3.5,1.5l0.8-3.9l-3-2.6l4-0.3L12,6.5l1.7,3.6l4,0.3l-3,2.6 l0.8,3.9L12,15.5z" />
            </svg>
          </div>
          <h3 className="text-rose-400 font-cinzel text-[10px] tracking-[0.2em] mb-4 uppercase">Theurgy & Magic</h3>
          <p className="font-lora text-base leading-relaxed mb-4 text-slate-200">
            {thought.theurgyMagic.reflection}
          </p>
          <p className="text-rose-400/60 text-xs font-bold uppercase tracking-widest">{thought.theurgyMagic.concept}</p>
        </div>

        {/* Astrology Section */}
        <div className="glass p-6 rounded-3xl relative overflow-hidden group border-blue-500/10">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z" />
            </svg>
          </div>
          <h3 className="text-blue-400 font-cinzel text-[10px] tracking-[0.2em] mb-4 uppercase">Astrology Cycle</h3>
          <p className="font-lora text-base leading-relaxed mb-4 text-slate-200">
            {thought.astrology.influence}
          </p>
          <p className="text-blue-400/60 text-xs font-bold uppercase tracking-widest">{thought.astrology.sign}</p>
        </div>
      </div>

      {/* Synthesis Section */}
      <div className="glass p-8 md:p-12 rounded-3xl border-amber-500/20 bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <h3 className="text-amber-400 font-cinzel text-xs tracking-[0.3em] uppercase">
              The Divine Quaternary
            </h3>
            <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
          </div>
        </div>
        
        <p className="text-slate-300 leading-loose text-lg mb-8 first-letter:text-6xl first-letter:font-cinzel first-letter:float-left first-letter:mr-4 first-letter:text-amber-500 first-letter:mt-1">
          {thought.synthesis.content}
        </p>
        
        <div className="mt-10 pt-10 border-t border-white/5 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <div className="md:col-span-1">
             <span className="font-cinzel text-[10px] text-amber-500/60 uppercase tracking-widest block mb-1">Ritual Practice</span>
             <div className="h-px w-full bg-gradient-to-r from-amber-500/30 to-transparent" />
          </div>
          <div className="md:col-span-3">
            <p className="text-slate-400 text-sm italic font-lora">
              {thought.synthesis.practicalApplication}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
