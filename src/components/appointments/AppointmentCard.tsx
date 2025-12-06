import { Calendar, Clock, Video, Phone, User, MoreVertical, X, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface Appointment {
  id: string;
  date: Date;
  time: string;
  type: "video" | "phone" | "inperson";
  doctorName: string;
  specialty: string;
  status: "upcoming" | "completed" | "cancelled";
}

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel?: (id: string) => void;
  onReschedule?: (id: string) => void;
}

const typeIcons = {
  video: Video,
  phone: Phone,
  inperson: User,
};

const typeLabels = {
  video: "Video Call",
  phone: "Phone Call",
  inperson: "In-Person",
};

const statusStyles = {
  upcoming: "bg-health-blue-light text-health-blue border-health-blue/20",
  completed: "bg-health-teal-light text-health-green border-health-green/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

export const AppointmentCard = ({ appointment, onCancel, onReschedule }: AppointmentCardProps) => {
  const TypeIcon = typeIcons[appointment.type];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className={cn(
      "p-5 rounded-2xl bg-card border border-border shadow-card transition-all hover:shadow-card-hover",
      appointment.status === "cancelled" && "opacity-60"
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center">
            <TypeIcon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h4 className="font-display font-semibold text-foreground">{appointment.doctorName}</h4>
            <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
          </div>
        </div>
        
        {appointment.status === "upcoming" && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onReschedule?.(appointment.id)}>
                <Edit2 className="w-4 h-4 mr-2" />
                Reschedule
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onCancel?.(appointment.id)}
                className="text-destructive focus:text-destructive"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 text-primary" />
          <span>{formatDate(appointment.date)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4 text-primary" />
          <span>{appointment.time}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className={cn(
          "px-3 py-1 rounded-full text-xs font-medium border capitalize",
          statusStyles[appointment.status]
        )}>
          {appointment.status}
        </span>
        <span className="text-sm text-muted-foreground">{typeLabels[appointment.type]}</span>
      </div>
    </div>
  );
};
