
import React, { useState, useEffect, useCallback } from 'react';
import { DailyThought, LoadingStatus, UserPreferences, UserProfile, HistoryItem } from './types';
import { fetchDailyThought } from './services/geminiService';
import { ThoughtCard } from './components/ThoughtCard';
import { Header } from './components/Header';
import { CalendarStrip } from './components/CalendarStrip';
import { Loader } from './components/Loader';
import { ErrorState } from './components/ErrorState';
import { PreferencesModal } from './components/PreferencesModal';
import { ChatAgent } from './components/ChatAgent';
import { LandingPage } from './components/LandingPage';

const DEFAULT_PREFS: UserPreferences = {
  biblicalBooks: [],
  hermeticTexts: [],
  philosophicalThemes: [],
};

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState<boolean>(() => {
    return !sessionStorage.getItem('logos_entered');
  });
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [thought, setThought] = useState<DailyThought | null>(null);
  const [status, setStatus] = useState<LoadingStatus>(LoadingStatus.IDLE);
  const [error, setError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('logos_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem('logos_preferences');
    return saved ? JSON.parse(saved) : DEFAULT_PREFS;
  });

  const getHistory = useCallback((userId: string): HistoryItem[] => {
    const saved = localStorage.getItem(`logos_history_${userId}`);
    return saved ? JSON.parse(saved) : [];
  }, []);

  const addToHistory = useCallback((userId: string, item: HistoryItem) => {
    const history = getHistory(userId);
    // Only add if not already there
    if (!history.find(h => h.date === item.date)) {
      const newHistory = [item, ...history].slice(0, 365); // Keep a full year max
      localStorage.setItem(`logos_history_${userId}`, JSON.stringify(newHistory));
    }
  }, [getHistory]);

  const loadThought = useCallback(async (date: string, prefs: UserPreferences, currentUser: UserProfile | null) => {
    // Generate a unique cache key
    const prefsHash = btoa(JSON.stringify(prefs));
    const userPart = currentUser ? currentUser.id : 'anon';
    const cacheKey = `thought_${date}_${prefsHash}_${userPart}`;
    
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      setThought(JSON.parse(cached));
      setStatus(LoadingStatus.SUCCESS);
      return;
    }

    setStatus(LoadingStatus.LOADING);
    setError(null);
    try {
      const history = currentUser ? getHistory(currentUser.id) : [];
      const data = await fetchDailyThought(date, prefs, history);
      
      setThought(data);
      sessionStorage.setItem(cacheKey, JSON.stringify(data));
      
      if (currentUser) {
        addToHistory(currentUser.id, {
          date: data.date,
          title: data.synthesis.title,
          reference: data.bibleVerse.reference
        });
      }
      
      setStatus(LoadingStatus.SUCCESS);
    } catch (err) {
      console.error(err);
      setError("The Oracle is silent. Check your connection or try again later.");
      setStatus(LoadingStatus.ERROR);
    }
  }, [getHistory, addToHistory]);

  useEffect(() => {
    loadThought(selectedDate, preferences, user);
  }, [selectedDate, preferences, user, loadThought]);

  const handleLogin = (profile: UserProfile) => {
    setUser(profile);
    localStorage.setItem('logos_user', JSON.stringify(profile));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('logos_user');
  };

  const handleSavePreferences = (newPrefs: UserPreferences) => {
    setPreferences(newPrefs);
    localStorage.setItem('logos_preferences', JSON.stringify(newPrefs));
    setShowSettings(false);
    loadThought(selectedDate, newPrefs, user);
  };

  const handleEnterApp = () => {
    sessionStorage.setItem('logos_entered', 'true');
    setShowLanding(false);
  };

  if (showLanding) {
    return <LandingPage onEnter={handleEnterApp} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center pb-20 px-4 md:px-8 bg-[#0f172a] text-[#f8fafc]">
      <Header 
        user={user} 
        onOpenSettings={() => setShowSettings(true)} 
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      
      <main className="w-full max-w-5xl mt-8">
        <CalendarStrip 
          currentDate={selectedDate} 
          onDateSelect={(date) => setSelectedDate(date)} 
        />

        <div className="mt-12 transition-all duration-500 ease-in-out">
          {status === LoadingStatus.LOADING && <Loader />}
          
          {status === LoadingStatus.ERROR && (
            <ErrorState message={error || "An unknown error occurred"} onRetry={() => loadThought(selectedDate, preferences, user)} />
          )}

          {status === LoadingStatus.SUCCESS && thought && (
            <>
              <ThoughtCard thought={thought} />
              <ChatAgent thought={thought} />
            </>
          )}
        </div>
      </main>

      {showSettings && (
        <PreferencesModal 
          preferences={preferences} 
          onSave={handleSavePreferences} 
          onClose={() => setShowSettings(false)} 
        />
      )}

      <footer className="fixed bottom-0 w-full py-4 glass border-t border-slate-800 text-center text-slate-500 text-[10px] uppercase tracking-widest z-40">
        Copyright Joe LeBoube 2026
      </footer>
    </div>
  );
};

export default App;
