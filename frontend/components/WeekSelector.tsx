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
            className={`flex-shrink-0 px-2 py-1.5 sm:px-3 sm:py-2 lg:px-2.5 lg:py-1.5 rounded-lg text-center transition-all min-w-[44px] sm:min-w-[56px] lg:min-w-[60px] ${
              selected
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white border border-gray-300 text-gray-700 hover:border-blue-300 hover:bg-blue-50'
            } ${today && !selected ? 'border-blue-200 bg-blue-50' : ''}`}
          >
            <div className="text-[10px] sm:text-xs lg:text-xs font-semibold leading-tight">{dayName}</div>
            <div className={`text-sm sm:text-base lg:text-base font-bold leading-tight ${selected ? 'text-white' : 'text-gray-900'}`}>
              {dayNumber}
            </div>
            <div className="hidden sm:block lg:hidden text-[10px] md:text-xs text-gray-500 leading-tight">{month}</div>
          </button>
        );
      })}
    </div>
  );
}
