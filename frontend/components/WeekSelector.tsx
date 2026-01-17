'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export default function WeekSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get selected date from URL or default to today
  const selectedDateStr = searchParams.get('date') || '';
  
  // Generate week dates (today + next 6 days)
  const weekDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  }, []);

  // Determine selected date
  const selectedDate = useMemo(() => {
    if (selectedDateStr) {
      const parsed = new Date(selectedDateStr);
      if (!isNaN(parsed.getTime())) {
        return parsed;
      }
    }
    return weekDates[0]; // Default to today
  }, [selectedDateStr, weekDates]);

  const handleDateSelect = (date: Date) => {
    const params = new URLSearchParams(searchParams.toString());
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    
    // If selecting today, remove the date parameter
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    if (dateStr === todayStr) {
      params.delete('date');
    } else {
      params.set('date', dateStr);
    }
    
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const isSelected = (date: Date) => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const selectedStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    return dateStr === selectedStr;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    return dateStr === todayStr;
  };

  return (
    <div className="flex gap-1.5 sm:gap-2 lg:gap-1.5 overflow-x-auto pb-1.5 sm:pb-2 lg:pb-0 -mx-2 px-2 lg:mx-0 lg:px-0 scrollbar-hide">
      {weekDates.map((date, index) => {
        const dayName = date.toLocaleDateString('fr-FR', { weekday: 'short' });
        const dayNumber = date.getDate();
        const month = date.toLocaleDateString('fr-FR', { month: 'short' });
        const selected = isSelected(date);
        const today = isToday(date);

        return (
          <button
            key={index}
            onClick={() => handleDateSelect(date)}
            className={`flex-shrink-0 px-2.5 py-2 sm:px-3 sm:py-2.5 lg:px-3 lg:py-2 rounded-xl text-center transition-all duration-200 min-w-[50px] sm:min-w-[60px] lg:min-w-[64px] ${
              selected
                ? 'bg-primary-600 text-white shadow-md shadow-primary-500/30 hover:bg-primary-700'
                : 'bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-700 hover:border-primary-300 hover:bg-primary-50/50'
            } ${today && !selected ? 'border-primary-200 bg-primary-50/50' : ''}`}
          >
            <div className="text-[10px] sm:text-xs lg:text-xs font-semibold leading-tight">{dayName}</div>
            <div className={`text-sm sm:text-base lg:text-base font-bold leading-tight ${selected ? 'text-white' : 'text-slate-900'}`}>
              {dayNumber}
            </div>
            <div className="hidden sm:block lg:hidden text-[10px] md:text-xs text-slate-500 leading-tight">{month}</div>
          </button>
        );
      })}
    </div>
  );
}
