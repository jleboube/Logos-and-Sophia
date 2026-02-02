
import React from 'react';
import { UserPreferences } from '../types';

interface PreferencesModalProps {
  preferences: UserPreferences;
  onSave: (prefs: UserPreferences) => void;
  onClose: () => void;
}

const BIBLICAL_OPTIONS = ['Gospel of John', 'Psalms', 'Proverbs', 'Revelation', 'Genesis', 'Ecclesiastes', 'Job'];
const HERMETIC_OPTIONS = ['Corpus Hermeticum', 'The Kybalion', 'Emerald Tablet', 'Asclepius', 'Pistis Sophia'];
const THEME_OPTIONS = ['Alchemy', 'Neoplatonism', 'Kabbalah', 'Gnosticism', 'Sacred Geometry', 'Planetary Magic'];

export const PreferencesModal: React.FC<PreferencesModalProps> = ({ preferences, onSave, onClose }) => {
  const [localPrefs, setLocalPrefs] = React.useState<UserPreferences>(preferences);

  const toggleOption = (category: keyof UserPreferences, option: string) => {
    setLocalPrefs(prev => {
      const current = prev[category];
      const next = current.includes(option)
        ? current.filter(item => item !== option)
        : [...current, option];
      return { ...prev, [category]: next };
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass w-full max-w-2xl rounded-3xl p-8 border-amber-500/20 shadow-2xl animate-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-cinzel text-2xl font-bold gold-gradient tracking-widest">PERSONALIZATION</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-8 max-h-[60vh] overflow-y-auto scroll-hide pr-2">
          {/* Biblical Section */}
          <div>
            <h3 className="font-cinzel text-xs text-amber-500/80 mb-4 uppercase tracking-[0.2em]">Sacred Scrolls</h3>
            <div className="flex flex-wrap gap-2">
              {BIBLICAL_OPTIONS.map(opt => (
                <button
                  key={opt}
                  onClick={() => toggleOption('biblicalBooks', opt)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
                    localPrefs.biblicalBooks.includes(opt)
                      ? 'bg-amber-500 text-slate-900 border-amber-500 shadow-[0_0_10px_rgba(251,191,36,0.3)]'
                      : 'border-slate-700 text-slate-400 hover:border-amber-500/50'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Hermetic Section */}
          <div>
            <h3 className="font-cinzel text-xs text-emerald-500/80 mb-4 uppercase tracking-[0.2em]">Hermetic Codices</h3>
            <div className="flex flex-wrap gap-2">
              {HERMETIC_OPTIONS.map(opt => (
                <button
                  key={opt}
                  onClick={() => toggleOption('hermeticTexts', opt)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
                    localPrefs.hermeticTexts.includes(opt)
                      ? 'bg-emerald-500 text-slate-900 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                      : 'border-slate-700 text-slate-400 hover:border-emerald-500/50'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Section */}
          <div>
            <h3 className="font-cinzel text-xs text-rose-400/80 mb-4 uppercase tracking-[0.2em]">Philosophical Currents</h3>
            <div className="flex flex-wrap gap-2">
              {THEME_OPTIONS.map(opt => (
                <button
                  key={opt}
                  onClick={() => toggleOption('philosophicalThemes', opt)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
                    localPrefs.philosophicalThemes.includes(opt)
                      ? 'bg-rose-500 text-slate-900 border-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.3)]'
                      : 'border-slate-700 text-slate-400 hover:border-rose-500/50'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex gap-4">
          <button
            onClick={() => onSave(localPrefs)}
            className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-cinzel font-bold rounded-xl transition-all shadow-lg hover:shadow-amber-500/20"
          >
            ALIGN PREFERENCES
          </button>
        </div>
        <p className="text-[10px] text-slate-500 text-center mt-4 uppercase tracking-widest">
          Changes will apply to newly generated thoughts
        </p>
      </div>
    </div>
  );
};
