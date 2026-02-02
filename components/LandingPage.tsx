
import React, { useState, useEffect } from 'react';

interface LandingPageProps {
  onEnter: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const [visible, setVisible] = useState(false);
  const [sectionVisible, setSectionVisible] = useState([false, false, false, false]);

  useEffect(() => {
    setVisible(true);
    const timers = sectionVisible.map((_, i) =>
      setTimeout(() => {
        setSectionVisible(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 800 + i * 400)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-[#f8fafc] overflow-hidden relative">
      {/* Animated star field */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="star absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.1,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Floating sacred geometry - outer ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="geo-ring w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full border border-amber-500/5" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="geo-ring-reverse w-[400px] h-[400px] md:w-[550px] md:h-[550px] rounded-full border border-emerald-500/5" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="geo-ring w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full border border-rose-500/5" style={{ animationDuration: '40s' }} />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className={`transition-all duration-[2000ms] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Sun symbol */}
          <div className="mb-8 relative inline-block">
            <svg className="w-20 h-20 md:w-28 md:h-28 text-amber-500 sun-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.8} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
            </svg>
            <div className="absolute inset-0 sun-glow rounded-full" />
          </div>

          <h1 className="font-cinzel text-5xl md:text-7xl lg:text-8xl font-bold tracking-widest gold-gradient mb-6">
            LOGOS & SOPHIA
          </h1>

          <p className="font-lora italic text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
            "As above, so below; as within, so without."
          </p>

          <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto mb-12 leading-relaxed">
            A daily bridge between Sacred Scripture, Hermetic Wisdom, and Celestial Alignment
            &mdash; woven into one unified thought for your spiritual journey.
          </p>

          {/* Scroll indicator */}
          <div className="scroll-indicator">
            <svg className="w-6 h-6 text-amber-500/50 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-20 transition-all duration-1000 ${sectionVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-amber-100/90 mb-4">
              Three Ancient Streams, One Living Water
            </h2>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto mb-6" />
            <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Each day, Logos & Sophia draws from three wellsprings of timeless wisdom &mdash;
              finding the hidden thread that connects them into a single, profound insight
              unique to this moment in time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Bible Pillar */}
            <div className={`glass p-8 rounded-3xl border-amber-500/10 transition-all duration-1000 delay-200 ${sectionVisible[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-cinzel text-xl font-bold text-amber-400 mb-4">Sacred Scripture</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                The Bible contains layer upon layer of spiritual insight &mdash; from the Psalms'
                poetry of divine longing to Ecclesiastes' meditation on time, from the
                prophetic visions of Revelation to the Logos theology of John's Gospel.
              </p>
              <p className="text-slate-500 text-xs italic font-lora">
                "In the beginning was the Word, and the Word was with God, and the Word was God."
              </p>
            </div>

            {/* Hermetic Pillar */}
            <div className={`glass p-8 rounded-3xl border-emerald-500/10 transition-all duration-1000 delay-500 ${sectionVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" />
                </svg>
              </div>
              <h3 className="font-cinzel text-xl font-bold text-emerald-400 mb-4">Hermetic Principles</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                The Hermetic tradition &mdash; from the Corpus Hermeticum to the Kybalion &mdash;
                teaches the seven universal principles that govern reality: Mentalism,
                Correspondence, Vibration, Polarity, Rhythm, Cause and Effect, and Gender.
              </p>
              <p className="text-slate-500 text-xs italic font-lora">
                "The All is Mind; the Universe is Mental."
              </p>
            </div>

            {/* Astrology Pillar */}
            <div className={`glass p-8 rounded-3xl border-blue-500/10 transition-all duration-1000 delay-700 ${sectionVisible[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2" />
                </svg>
              </div>
              <h3 className="font-cinzel text-xl font-bold text-blue-400 mb-4">Celestial Alignment</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                The stars and planets form a cosmic clock. Each day carries the energy
                of its ruling sign, planetary hours, and celestial transits &mdash; shaping
                the spiritual atmosphere in which we seek wisdom and understanding.
              </p>
              <p className="text-slate-500 text-xs italic font-lora">
                "The heavens declare the glory of God; the skies proclaim the work of his hands."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-amber-100/90 mb-4">
            The Divine Quaternary
          </h2>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto mb-12" />

          <div className="glass p-8 md:p-12 rounded-3xl border-amber-500/10">
            <p className="text-slate-300 text-base md:text-lg leading-loose mb-8 font-lora">
              Every day, our AI oracle weaves together a unique synthesis: a Bible verse
              that speaks to the moment, a Hermetic principle that reveals the hidden law at work,
              a reflection on Theurgy and sacred practice, and the astrological energy
              that colors the day's spiritual landscape.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              The result is not a random collection &mdash; it is a carefully interlaced meditation
              where scripture illuminates the Hermetic law, the celestial alignment confirms the timing,
              and the theurgic reflection provides a practical path forward. Each element echoes
              and amplifies the others.
            </p>

            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_12px_rgba(251,191,36,0.5)] animate-pulse" />
              <div className="w-8 h-px bg-gradient-to-r from-amber-500/50 to-emerald-500/50" />
              <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)] animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="w-8 h-px bg-gradient-to-r from-emerald-500/50 to-rose-500/50" />
              <div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.5)] animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="w-8 h-px bg-gradient-to-r from-rose-500/50 to-blue-500/50" />
              <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.5)] animate-pulse" style={{ animationDelay: '1.5s' }} />
            </div>

            <div className="grid grid-cols-4 gap-2 text-[10px] uppercase tracking-widest text-slate-500 font-cinzel">
              <span>Scripture</span>
              <span>Hermetica</span>
              <span>Theurgy</span>
              <span>Astrology</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass p-8 rounded-3xl border-amber-500/5">
              <h3 className="font-cinzel text-lg font-bold text-amber-400 mb-3">Personalized Path</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Choose your preferred biblical books, Hermetic codices, and philosophical
                currents. The oracle adapts its wisdom to resonate with your spiritual focus.
              </p>
            </div>
            <div className="glass p-8 rounded-3xl border-amber-500/5">
              <h3 className="font-cinzel text-lg font-bold text-amber-400 mb-3">Never Repeats</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Each day's thought is unique. The system tracks your history for a full year,
                ensuring fresh revelations with every dawn.
              </p>
            </div>
            <div className="glass p-8 rounded-3xl border-amber-500/5">
              <h3 className="font-cinzel text-lg font-bold text-amber-400 mb-3">Ask the Guide</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Converse with the Guide of the Logos &mdash; an AI scholar versed in theology,
                Hermeticism, and astrology &mdash; to explore each day's wisdom more deeply.
              </p>
            </div>
            <div className="glass p-8 rounded-3xl border-amber-500/5">
              <h3 className="font-cinzel text-lg font-bold text-amber-400 mb-3">Calendar Navigation</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Browse past and future days. Every date has its own celestial signature and
                a thought waiting to be revealed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="font-lora italic text-slate-400 text-lg mb-8">
            "Know thyself, and thou shalt know the Universe and its Gods."
          </p>
          <button
            onClick={onEnter}
            className="group relative inline-flex items-center gap-3 px-10 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-cinzel font-bold text-lg rounded-2xl transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-105 active:scale-95"
          >
            Begin Your Journey
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          <p className="text-slate-600 text-xs mt-6 uppercase tracking-widest font-cinzel">
            Receive today's unified wisdom
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center border-t border-slate-800/50">
        <p className="text-slate-600 text-[10px] uppercase tracking-widest">
          Copyright Joe LeBoube 2026
        </p>
      </footer>

      <style>{`
        .star {
          animation: twinkle ease-in-out infinite alternate;
        }
        @keyframes twinkle {
          from { opacity: 0.1; transform: scale(0.8); }
          to { opacity: 0.8; transform: scale(1.2); }
        }
        .geo-ring {
          animation: geo-spin 60s linear infinite;
        }
        .geo-ring-reverse {
          animation: geo-spin-reverse 45s linear infinite;
        }
        @keyframes geo-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes geo-spin-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .sun-pulse {
          animation: sun-breathe 4s ease-in-out infinite;
        }
        @keyframes sun-breathe {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 8px rgba(251,191,36,0.3)); }
          50% { transform: scale(1.05); filter: drop-shadow(0 0 20px rgba(251,191,36,0.5)); }
        }
        .sun-glow {
          background: radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%);
          animation: sun-breathe 4s ease-in-out infinite;
        }
        .scroll-indicator {
          animation: scroll-bounce 2s ease-in-out infinite;
        }
        @keyframes scroll-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(8px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
