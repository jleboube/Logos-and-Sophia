
import React, { useRef, useEffect } from 'react';

interface CalendarStripProps {
  currentDate: string;
  onDateSelect: (date: string) => void;
}

export const CalendarStrip: React.FC<CalendarStripProps> = ({ currentDate, onDateSelect }) => {
  const activeRef = useRef<HTMLButtonElement>(null);
  const hasMounted = useRef(false);

  const getDays = () => {
    const days = [];
    const baseDate = new Date();
    for (let i = -15; i <= 15; i++) {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() + i);
      days.push(d.toISOString().split('T')[0]);
    }
    return days;
  };

  const days = getDays();

  useEffect(() => {
    if (!activeRef.current) return;
    const el = activeRef.current;

    if (!hasMounted.current) {
      // First mount: wait for Tailwind CDN to process styles, then scroll instantly
      hasMounted.current = true;
      const timer = setTimeout(() => {
        el.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'instant' as ScrollBehavior });
      }, 150);
      return () => clearTimeout(timer);
    } else {
      // Subsequent date changes: smooth scroll
      el.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
    }
  }, [currentDate]);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return {
      day: d.getDate(),
      month: d.toLocaleString('default', { month: 'short' }).toUpperCase(),
      full: d.toLocaleDateString('default', { weekday: 'short' })
    };
  };

  return (
    <div className="w-full overflow-x-auto scroll-hide pb-4 flex gap-4 px-4 mask-edges">
      {days.map((date) => {
        const { day, month, full } = formatDate(date);
        const isActive = date === currentDate;
        return (
          <button
            key={date}
            ref={isActive ? activeRef : undefined}
            onClick={() => onDateSelect(date)}
            className={`flex-shrink-0 w-16 h-20 rounded-xl flex flex-col items-center justify-center transition-all ${
              isActive
                ? 'bg-amber-500 text-slate-900 scale-110 shadow-lg shadow-amber-500/20'
                : 'glass text-slate-400 hover:border-amber-500/50'
            }`}
          >
            <span className="text-[10px] font-bold opacity-70">{month}</span>
            <span className="text-xl font-cinzel font-bold">{day}</span>
            <span className="text-[10px] uppercase">{full}</span>
          </button>
        );
      })}
    </div>
  );
};
