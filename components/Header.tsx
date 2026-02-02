
import React, { useEffect } from 'react';
import { UserProfile } from '../types';

interface HeaderProps {
  user: UserProfile | null;
  onOpenSettings: () => void;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onOpenSettings, onLogin, onLogout }) => {
  useEffect(() => {
    /* global google */
    if (typeof window !== 'undefined' && (window as any).google) {
      (window as any).google.accounts.id.initialize({
        client_id: process.env.GOOGLE_CLIENT_ID || "",
        callback: (response: any) => {
          // Decode JWT for demo purposes (usually done server-side)
          const payload = JSON.parse(atob(response.credential.split('.')[1]));
          onLogin({
            id: payload.sub,
            name: payload.name,
            email: payload.email,
            picture: payload.picture
          });
        }
      });

      if (!user) {
        (window as any).google.accounts.id.renderButton(
          document.getElementById("google-signin-btn"),
          { theme: "outline", size: "large", shape: "pill", text: "signin_with" }
        );
      }
    }
  }, [user, onLogin]);

  return (
    <header className="w-full pt-10 pb-6 text-center relative px-4">
      <div className="flex justify-between items-start absolute top-10 left-0 right-0 px-4 md:px-8">
        {/* Left: Branding Placeholder/Empty */}
        <div className="w-10 md:w-20" />

        {/* Center: Title is handled by the main layout, but we keep spacer here */}
        
        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {!user ? (
            <div id="google-signin-btn" className="h-10"></div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="hidden md:block text-right">
                <p className="text-[10px] font-cinzel text-amber-500 tracking-tighter uppercase font-bold">{user.name}</p>
                <button onClick={onLogout} className="text-[9px] text-slate-500 hover:text-red-400 uppercase tracking-widest transition-colors">Sign Out</button>
              </div>
              <img src={user.picture} alt={user.name} className="w-10 h-10 rounded-full border border-amber-500/30 shadow-lg shadow-amber-500/10" />
            </div>
          )}
          
          <button 
            onClick={onOpenSettings}
            className="p-2 glass rounded-full hover:bg-slate-700/50 transition-colors group"
            aria-label="Personalization Settings"
          >
            <svg className="w-6 h-6 text-amber-500/70 group-hover:text-amber-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="inline-block mt-4 mb-2">
        <svg className="w-12 h-12 text-amber-500 animate-pulse mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        </svg>
      </div>
      <h1 className="font-cinzel text-4xl md:text-5xl font-bold tracking-widest gold-gradient mb-2">
        LOGOS & SOPHIA
      </h1>
      <p className="font-lora italic text-slate-400 text-sm md:text-base">
        "As above, so below; as within, so without."
      </p>
    </header>
  );
};
