import { Calendar, Clock, Video, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const consultationTypes = {
  video: { name: "Video Call", icon: Video },
  phone: { name: "Phone Call", icon: Phone },
  inperson: { name: "In-Person", icon: User },
};

interface BookingConfirmationProps {
  selectedDate: Date;
  selectedTime: string;
  selectedType: string;
  onBack: () => void;
  onConfirm: () => void;
}

export const BookingConfirmation = ({
  selectedDate,
  selectedTime,
  selectedType,
  onBack,
  onConfirm,
}: BookingConfirmationProps) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  const TypeIcon = consultationTypes[selectedType as keyof typeof consultationTypes]?.icon || Video;

  return (
    <div className="animate-fade-in">
      <div className="p-6 rounded-2xl bg-card border border-border shadow-card mb-6">
        <h3 className="font-display font-semibold text-foreground mb-6">Confirm Your Appointment</h3>

        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between p-4 rounded-xl bg-secondary">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-foreground">Date</span>
            </div>
            <span className="font-medium text-foreground">{formatDate(selectedDate)}</span>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-secondary">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-foreground">Time</span>
            </div>
            <span className="font-medium text-foreground">{selectedTime}</span>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-secondary">
            <div className="flex items-center gap-3">
              <TypeIcon className="w-5 h-5 text-primary" />
              <span className="text-foreground">Type</span>
            </div>
            <span className="font-medium text-foreground">
              {consultationTypes[selectedType as keyof typeof consultationTypes]?.name}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-health-teal-light border border-primary/20">
          <p className="text-sm text-muted-foreground">
            By confirming, you agree to our cancellation policy. You can reschedule or cancel up to 24 hours before your appointment.
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" size="lg" onClick={onBack}>
          Back
        </Button>
        <Button variant="hero" size="lg" className="flex-1" onClick={onConfirm}>
          Confirm Booking
        </Button>
      </div>
    </div>
  );
};
