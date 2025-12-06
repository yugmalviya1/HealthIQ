import { useState } from "react";
import { Star, MapPin, Clock, Calendar, GraduationCap, Globe, Video, Phone, User, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Doctor } from "./DoctorCard";
import { toast } from "sonner";

interface DoctorProfileSheetProps {
  doctor: Doctor | null;
  isOpen: boolean;
  onClose: () => void;
}

const consultationTypes = [
  { id: "video", name: "Video", icon: Video },
  { id: "phone", name: "Phone", icon: Phone },
  { id: "inperson", name: "In-Person", icon: User },
] as const;

const quickTimeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", 
  "2:00 PM", "3:00 PM", "4:00 PM"
];

export const DoctorProfileSheet = ({ doctor, isOpen, onClose }: DoctorProfileSheetProps) => {
  const [selectedDate, setSelectedDate] = useState<string>("today");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>("video");
  const [isBooking, setIsBooking] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  if (!doctor) return null;

  const handleBookAppointment = () => {
    if (!selectedTime) {
      toast.error("Please select a time slot");
      return;
    }
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      setIsBooked(true);
      toast.success(`Appointment booked with ${doctor.name}`);
    }, 1000);
  };

  const handleClose = () => {
    setSelectedTime(null);
    setIsBooked(false);
    onClose();
  };

  const getDateLabel = (dateKey: string) => {
    const today = new Date();
    if (dateKey === "today") return { label: "Today", date: today };
    if (dateKey === "tomorrow") {
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return { label: "Tomorrow", date: tomorrow };
    }
    const dayAfter = new Date(today);
    dayAfter.setDate(dayAfter.getDate() + 2);
    return { 
      label: dayAfter.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }), 
      date: dayAfter 
    };
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="mb-6">
          <div className="flex items-start gap-4">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-20 h-20 rounded-2xl object-cover"
            />
            <div className="flex-1">
              <SheetTitle className="font-display text-xl text-left mb-1">
                {doctor.name}
              </SheetTitle>
              <p className="text-primary font-medium">{doctor.specialty}</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-health-orange fill-health-orange" />
                  <span className="text-sm font-medium">{doctor.rating}</span>
                </div>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{doctor.reviews} reviews</span>
              </div>
            </div>
          </div>
        </SheetHeader>

        {isBooked ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-health-green/10 flex items-center justify-center mx-auto mb-4 animate-scale-in">
              <Check className="w-8 h-8 text-health-green" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              Appointment Confirmed!
            </h3>
            <p className="text-muted-foreground mb-6">
              {getDateLabel(selectedDate).label} at {selectedTime} with {doctor.name}
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={handleClose}>
                Close
              </Button>
              <Button variant="hero" className="flex-1" onClick={() => setIsBooked(false)}>
                Book Another
              </Button>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="book" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="book">Book Now</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6">
              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-secondary">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs">Experience</span>
                  </div>
                  <p className="font-semibold text-foreground">{doctor.experience}</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs">Location</span>
                  </div>
                  <p className="font-semibold text-foreground text-sm">{doctor.location}</p>
                </div>
              </div>

              {/* About */}
              <div>
                <h4 className="font-display font-semibold text-foreground mb-2">About</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {doctor.about || `${doctor.name} is a highly experienced ${doctor.specialty} with ${doctor.experience} of clinical practice. Known for patient-centered care and expertise in the latest treatment methods.`}
                </p>
              </div>

              {/* Education */}
              <div>
                <h4 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  Education
                </h4>
                <ul className="space-y-2">
                  {(doctor.education || ["MD, Harvard Medical School", "Residency, Johns Hopkins Hospital", "Fellowship, Mayo Clinic"]).map((edu, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      {edu}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Languages */}
              <div>
                <h4 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Languages
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(doctor.languages || ["English", "Spanish"]).map((lang, index) => (
                    <span key={index} className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Consultation Fee */}
              <div className="p-4 rounded-xl bg-health-teal-light border border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Consultation Fee</p>
                    <p className="font-display text-2xl font-bold text-foreground">${doctor.consultationFee}</p>
                  </div>
                  <Button variant="hero" onClick={() => document.querySelector('[data-state="inactive"][value="book"]')?.dispatchEvent(new Event('click', { bubbles: true }))}>
                    Book Appointment
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="book" className="space-y-6">
              {/* Quick Date Selection */}
              <div>
                <h4 className="font-display font-semibold text-foreground mb-3">Select Date</h4>
                <div className="grid grid-cols-3 gap-2">
                  {["today", "tomorrow", "dayafter"].map((dateKey) => {
                    const { label } = getDateLabel(dateKey);
                    return (
                      <button
                        key={dateKey}
                        onClick={() => setSelectedDate(dateKey)}
                        className={cn(
                          "p-3 rounded-xl text-center transition-all",
                          selectedDate === dateKey
                            ? "bg-primary text-primary-foreground shadow-glow"
                            : "bg-secondary hover:bg-accent"
                        )}
                      >
                        <Calendar className="w-4 h-4 mx-auto mb-1" />
                        <span className="text-sm font-medium">{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <h4 className="font-display font-semibold text-foreground mb-3">Available Slots</h4>
                <div className="grid grid-cols-3 gap-2">
                  {quickTimeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
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
              </div>

              {/* Consultation Type */}
              <div>
                <h4 className="font-display font-semibold text-foreground mb-3">Consultation Type</h4>
                <div className="grid grid-cols-3 gap-2">
                  {consultationTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={cn(
                          "p-3 rounded-xl text-center transition-all",
                          selectedType === type.id
                            ? "bg-accent border-2 border-primary"
                            : "bg-secondary hover:bg-accent border-2 border-transparent"
                        )}
                      >
                        <Icon className={cn(
                          "w-5 h-5 mx-auto mb-1",
                          selectedType === type.id ? "text-primary" : "text-muted-foreground"
                        )} />
                        <span className="text-xs font-medium">{type.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Summary & Book */}
              <div className="p-4 rounded-xl bg-secondary space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Consultation Fee</span>
                  <span className="font-semibold text-foreground">${doctor.consultationFee}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Platform Fee</span>
                  <span className="font-semibold text-foreground">$5</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-medium text-foreground">Total</span>
                  <span className="font-display font-bold text-foreground">${doctor.consultationFee + 5}</span>
                </div>
              </div>

              <Button 
                variant="hero" 
                size="lg" 
                className="w-full" 
                onClick={handleBookAppointment}
                disabled={!selectedTime || isBooking}
              >
                {isBooking ? "Booking..." : "Confirm Booking"}
              </Button>
            </TabsContent>
          </Tabs>
        )}
      </SheetContent>
    </Sheet>
  );
};
