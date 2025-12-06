import { Star, MapPin, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  specialtyId: string;
  rating: number;
  reviews: number;
  experience: string;
  location: string;
  nextAvailable: string;
  image: string;
  consultationFee: number;
  about?: string;
  education?: string[];
  languages?: string[];
  availableSlots?: string[];
}

interface DoctorCardProps {
  doctor: Doctor;
  onViewProfile: (doctor: Doctor) => void;
  onBookNow: (doctor: Doctor) => void;
}

export const DoctorCard = ({ doctor, onViewProfile, onBookNow }: DoctorCardProps) => {
  return (
    <div className="group p-6 rounded-2xl bg-card border border-border shadow-card hover:shadow-card-hover hover:border-primary/30 transition-all duration-300">
      <div className="flex items-start gap-4 mb-4">
        <button 
          onClick={() => onViewProfile(doctor)}
          className="relative overflow-hidden rounded-2xl transition-transform hover:scale-105"
        >
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-16 h-16 object-cover"
          />
        </button>
        <div className="flex-1 min-w-0">
          <button 
            onClick={() => onViewProfile(doctor)}
            className="text-left hover:text-primary transition-colors"
          >
            <h3 className="font-display font-semibold text-foreground truncate">
              {doctor.name}
            </h3>
          </button>
          <p className="text-sm text-primary font-medium">{doctor.specialty}</p>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-4 h-4 text-health-orange fill-health-orange" />
            <span className="text-sm font-medium text-foreground">{doctor.rating}</span>
            <span className="text-sm text-muted-foreground">({doctor.reviews})</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          {doctor.location}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          {doctor.experience} experience
        </div>
      </div>

      <div className="p-3 rounded-xl bg-health-teal-light mb-4">
        <p className="text-xs text-muted-foreground mb-1">Next Available</p>
        <p className="text-sm font-semibold text-health-teal">{doctor.nextAvailable}</p>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs text-muted-foreground">Consultation</span>
          <p className="font-display font-bold text-foreground">${doctor.consultationFee}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onViewProfile(doctor)}>
            View Profile
          </Button>
          <Button variant="hero" size="sm" onClick={() => onBookNow(doctor)}>
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};
