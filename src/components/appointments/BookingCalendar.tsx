import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BookingCalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onContinue: () => void;
}

export const BookingCalendar = ({ selectedDate, onDateSelect, onContinue }: BookingCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: (Date | null)[] = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="animate-fade-in">
      <div className="p-6 rounded-2xl bg-card border border-border shadow-card mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-semibold text-foreground">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
              className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-accent transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
              className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-accent transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            if (!day) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }
            const isToday = day.toDateString() === new Date().toDateString();
            const isSelected = day.toDateString() === selectedDate.toDateString();
            const isPast = day < today;

            return (
              <button
                key={day.toISOString()}
                onClick={() => !isPast && onDateSelect(day)}
                disabled={isPast}
                className={cn(
                  "aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all",
                  isPast && "text-muted-foreground/50 cursor-not-allowed",
                  isToday && !isSelected && "border-2 border-primary",
                  isSelected && "bg-primary text-primary-foreground shadow-glow",
                  !isPast && !isSelected && "hover:bg-accent"
                )}
              >
                {day.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      <Button variant="hero" size="lg" className="w-full" onClick={onContinue}>
        Continue to Select Time
      </Button>
    </div>
  );
};
