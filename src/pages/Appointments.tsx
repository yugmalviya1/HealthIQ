import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppointmentCard, Appointment } from "@/components/appointments/AppointmentCard";
import { BookingCalendar } from "@/components/appointments/BookingCalendar";
import { TimeSlotPicker } from "@/components/appointments/TimeSlotPicker";
import { BookingConfirmation } from "@/components/appointments/BookingConfirmation";
import { BookingSuccess } from "@/components/appointments/BookingSuccess";
import { Calendar, List, Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Mock data for existing appointments
const mockAppointments: Appointment[] = [
  {
    id: "1",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    time: "10:00 AM",
    type: "video",
    doctorName: "Dr. Sarah Johnson",
    specialty: "General Practitioner",
    status: "upcoming",
  },
  {
    id: "2",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    time: "2:30 PM",
    type: "inperson",
    doctorName: "Dr. Michael Chen",
    specialty: "Cardiologist",
    status: "upcoming",
  },
  {
    id: "3",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    time: "11:00 AM",
    type: "phone",
    doctorName: "Dr. Emily Williams",
    specialty: "Dermatologist",
    status: "completed",
  },
  {
    id: "4",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    time: "3:00 PM",
    type: "video",
    doctorName: "Dr. James Brown",
    specialty: "Psychiatrist",
    status: "cancelled",
  },
];

const Appointments = () => {
  const [activeTab, setActiveTab] = useState("book");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>("video");
  const [step, setStep] = useState(1);
  const [isBooked, setIsBooked] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [filterStatus, setFilterStatus] = useState<"all" | "upcoming" | "completed" | "cancelled">("all");

  const handleBooking = () => {
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      date: selectedDate,
      time: selectedTime!,
      type: selectedType as "video" | "phone" | "inperson",
      doctorName: "Dr. Available",
      specialty: "General Practitioner",
      status: "upcoming",
    };
    setAppointments([newAppointment, ...appointments]);
    setIsBooked(true);
  };

  const handleBookAnother = () => {
    setIsBooked(false);
    setStep(1);
    setSelectedTime(null);
  };

  const handleViewAppointments = () => {
    setIsBooked(false);
    setStep(1);
    setSelectedTime(null);
    setActiveTab("manage");
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: "cancelled" as const } : apt
    ));
    toast.success("Appointment cancelled successfully");
  };

  const handleRescheduleAppointment = (id: string) => {
    toast.info("Reschedule feature coming soon");
  };

  const filteredAppointments = appointments.filter(apt => 
    filterStatus === "all" ? true : apt.status === filterStatus
  );

  const upcomingCount = appointments.filter(apt => apt.status === "upcoming").length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
              Appointments
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Manage Your{" "}
              <span className="text-gradient">Healthcare</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Book new appointments or manage your existing ones.
            </p>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-14">
              <TabsTrigger value="book" className="gap-2 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Plus className="w-5 h-5" />
                Book New
              </TabsTrigger>
              <TabsTrigger value="manage" className="gap-2 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <List className="w-5 h-5" />
                My Appointments
                {upcomingCount > 0 && (
                  <span className="ml-1 px-2 py-0.5 rounded-full bg-health-orange text-primary-foreground text-xs">
                    {upcomingCount}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            {/* Book New Appointment */}
            <TabsContent value="book">
              {isBooked ? (
                <BookingSuccess
                  selectedDate={selectedDate}
                  selectedTime={selectedTime!}
                  selectedType={selectedType}
                  onBookAnother={handleBookAnother}
                  onViewAppointments={handleViewAppointments}
                />
              ) : (
                <>
                  {/* Progress Steps */}
                  <div className="mb-12">
                    <div className="flex items-center justify-center gap-4">
                      {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center gap-4">
                          <div
                            className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
                              step >= s
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-muted-foreground"
                            )}
                          >
                            {step > s ? <Check className="w-5 h-5" /> : s}
                          </div>
                          {s < 3 && (
                            <div className={cn(
                              "w-16 sm:w-24 h-1 rounded-full transition-colors",
                              step > s ? "bg-primary" : "bg-secondary"
                            )} />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-4 px-4 max-w-md mx-auto">
                      <span className="text-sm text-muted-foreground">Select Date</span>
                      <span className="text-sm text-muted-foreground">Choose Time</span>
                      <span className="text-sm text-muted-foreground">Confirm</span>
                    </div>
                  </div>

                  {/* Booking Steps */}
                  {step === 1 && (
                    <BookingCalendar
                      selectedDate={selectedDate}
                      onDateSelect={setSelectedDate}
                      onContinue={() => setStep(2)}
                    />
                  )}

                  {step === 2 && (
                    <TimeSlotPicker
                      selectedDate={selectedDate}
                      selectedTime={selectedTime}
                      selectedType={selectedType}
                      onTimeSelect={setSelectedTime}
                      onTypeSelect={setSelectedType}
                      onBack={() => setStep(1)}
                      onContinue={() => setStep(3)}
                    />
                  )}

                  {step === 3 && selectedTime && (
                    <BookingConfirmation
                      selectedDate={selectedDate}
                      selectedTime={selectedTime}
                      selectedType={selectedType}
                      onBack={() => setStep(2)}
                      onConfirm={handleBooking}
                    />
                  )}
                </>
              )}
            </TabsContent>

            {/* Manage Appointments */}
            <TabsContent value="manage">
              <div className="space-y-6">
                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2">
                  {(["all", "upcoming", "completed", "cancelled"] as const).map((status) => (
                    <Button
                      key={status}
                      variant={filterStatus === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterStatus(status)}
                      className="capitalize"
                    >
                      {status}
                      {status === "upcoming" && upcomingCount > 0 && (
                        <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-primary-foreground/20 text-xs">
                          {upcomingCount}
                        </span>
                      )}
                    </Button>
                  ))}
                </div>

                {/* Appointments List */}
                {filteredAppointments.length === 0 ? (
                  <div className="text-center py-16">
                    <Calendar className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                      No appointments found
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {filterStatus === "all" 
                        ? "You haven't booked any appointments yet."
                        : `No ${filterStatus} appointments.`}
                    </p>
                    <Button variant="hero" onClick={() => setActiveTab("book")}>
                      <Plus className="w-4 h-4 mr-2" />
                      Book Your First Appointment
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {filteredAppointments.map((appointment) => (
                      <AppointmentCard
                        key={appointment.id}
                        appointment={appointment}
                        onCancel={handleCancelAppointment}
                        onReschedule={handleRescheduleAppointment}
                      />
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Appointments;
