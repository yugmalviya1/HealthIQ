import { Calendar, Clock, Video, Phone, User, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const consultationTypes = {
  video: { name: "Video Call", icon: Video },
  phone: { name: "Phone Call", icon: Phone },
  inperson: { name: "In-Person", icon: User },
};

interface BookingSuccessProps {
  selectedDate: Date;
  selectedTime: string;
  selectedType: string;
  onBookAnother: () => void;
  onViewAppointments: () => void;
}

export const BookingSuccess = ({
  selectedDate,
  selectedTime,
  selectedType,
  onBookAnother,
  onViewAppointments,
}: BookingSuccessProps) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  const TypeIcon = consultationTypes[selectedType as keyof typeof consultationTypes]?.icon || Video;

  return (
    <div className="max-w-lg mx-auto text-center">
      <div className="w-20 h-20 rounded-full bg-health-green/10 flex items-center justify-center mx-auto mb-6 animate-scale-in">
        <Check className="w-10 h-10 text-health-green" />
      </div>
      <h1 className="font-display text-3xl font-bold text-foreground mb-4 animate-fade-in">
        Appointment Confirmed!
      </h1>
      <p className="text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
        Your appointment has been successfully booked. You'll receive a confirmation email shortly.
      </p>

      <div className="p-6 rounded-2xl bg-card border border-border shadow-card mb-8 text-left animate-fade-in" style={{ animationDelay: "200ms" }}>
        <h3 className="font-display font-semibold text-foreground mb-4">Appointment Details</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-5 h-5 text-primary" />
            <span className="text-foreground">{formatDate(selectedDate)}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-foreground">{selectedTime}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <TypeIcon className="w-5 h-5 text-primary" />
            <span className="text-foreground">
              {consultationTypes[selectedType as keyof typeof consultationTypes]?.name}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
        <Button variant="hero" className="flex-1" onClick={onBookAnother}>
          Book Another
        </Button>
        <Button variant="outline" className="flex-1" onClick={onViewAppointments}>
          View My Appointments
        </Button>
      </div>
    </div>
  );
};
