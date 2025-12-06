import { Calendar, Clock, Video, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
];

const consultationTypes = [
  { id: "video", name: "Video Call", icon: Video, description: "Online consultation via video" },
  { id: "phone", name: "Phone Call", icon: Phone, description: "Quick phone consultation" },
  { id: "inperson", name: "In-Person", icon: User, description: "Visit the clinic" },
] as const;

interface TimeSlotPickerProps {
  selectedDate: Date;
  selectedTime: string | null;
  selectedType: string;
  onTimeSelect: (time: string) => void;
  onTypeSelect: (type: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

export const TimeSlotPicker = ({
  selectedDate,
  selectedTime,
  selectedType,
  onTimeSelect,
  onTypeSelect,
  onBack,
  onContinue,
}: TimeSlotPickerProps) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  return (
    <div className="animate-fade-in">
      <div className="p-6 rounded-2xl bg-card border border-border shadow-card mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-5 h-5 text-primary" />
          <span className="font-medium text-foreground">{formatDate(selectedDate)}</span>
        </div>

        <h3 className="font-display font-semibold text-foreground mb-4">Available Time Slots</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-8">
          {timeSlots.map((time) => (
            <button
              key={time}
              onClick={() => onTimeSelect(time)}
              className={cn(
                "p-3 rounded-xl text-sm font-medium transition-all",
                selectedTime === time
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "bg-secondary hover:bg-accent"
              )}
            >
              {time}
            </button>
          ))}
        </div>

        <h3 className="font-display font-semibold text-foreground mb-4">Consultation Type</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {consultationTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => onTypeSelect(type.id)}
                className={cn(
                  "p-4 rounded-xl border text-left transition-all",
                  selectedType === type.id
                    ? "bg-accent border-primary shadow-glow"
                    : "bg-card border-border hover:border-primary/30"
                )}
              >
                <Icon className={cn(
                  "w-6 h-6 mb-2",
                  selectedType === type.id ? "text-primary" : "text-muted-foreground"
                )} />
                <h4 className="font-semibold text-foreground">{type.name}</h4>
                <p className="text-xs text-muted-foreground">{type.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" size="lg" onClick={onBack}>
          Back
        </Button>
        <Button
          variant="hero"
          size="lg"
          className="flex-1"
          onClick={onContinue}
          disabled={!selectedTime}
        >
          Continue to Confirm
        </Button>
      </div>
    </div>
  );
};
