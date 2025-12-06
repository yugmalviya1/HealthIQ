import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Button } from "@/components/ui/button";
import { DoctorCard, Doctor } from "@/components/doctors/DoctorCard";
import { DoctorProfileSheet } from "@/components/doctors/DoctorProfileSheet";
import { Search, MapPin, Filter, ChevronDown, Heart, Stethoscope, Brain, Bone, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const specialties = [
  { id: "all", name: "All Specialists", icon: Stethoscope },
  { id: "cardiology", name: "Cardiology", icon: Heart },
  { id: "neurology", name: "Neurology", icon: Brain },
  { id: "orthopedics", name: "Orthopedics", icon: Bone },
  { id: "ophthalmology", name: "Ophthalmology", icon: Eye },
];

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    specialtyId: "cardiology",
    rating: 4.9,
    reviews: 284,
    experience: "15+ years",
    location: "San Francisco, CA",
    nextAvailable: "Today, 3:00 PM",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
    consultationFee: 150,
    about: "Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in treating complex heart conditions. She specializes in preventive cardiology, heart failure management, and cardiac imaging.",
    education: ["MD, Stanford University School of Medicine", "Cardiology Fellowship, Cleveland Clinic", "Internal Medicine Residency, UCSF"],
    languages: ["English", "Spanish", "French"],
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    specialtyId: "neurology",
    rating: 4.8,
    reviews: 312,
    experience: "12+ years",
    location: "San Francisco, CA",
    nextAvailable: "Tomorrow, 10:00 AM",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
    consultationFee: 175,
    about: "Dr. Michael Chen is an expert neurologist focusing on movement disorders, epilepsy, and headache medicine. He has published extensively in peer-reviewed journals and is known for his compassionate patient care.",
    education: ["MD, Johns Hopkins University", "Neurology Residency, Massachusetts General Hospital", "Fellowship, UCLA Medical Center"],
    languages: ["English", "Mandarin", "Cantonese"],
  },
  {
    id: 3,
    name: "Dr. Emily Williams",
    specialty: "Orthopedic Surgeon",
    specialtyId: "orthopedics",
    rating: 4.9,
    reviews: 198,
    experience: "18+ years",
    location: "Oakland, CA",
    nextAvailable: "Today, 5:30 PM",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop&crop=face",
    consultationFee: 200,
    about: "Dr. Emily Williams is a fellowship-trained orthopedic surgeon specializing in sports medicine and joint replacement. She has treated professional athletes and is a pioneer in minimally invasive surgical techniques.",
    education: ["MD, Yale School of Medicine", "Orthopedic Surgery Residency, Hospital for Special Surgery", "Sports Medicine Fellowship, Kerlan-Jobe Orthopaedic Clinic"],
    languages: ["English", "German"],
  },
  {
    id: 4,
    name: "Dr. David Park",
    specialty: "Ophthalmologist",
    specialtyId: "ophthalmology",
    rating: 4.7,
    reviews: 156,
    experience: "10+ years",
    location: "San Jose, CA",
    nextAvailable: "Wed, 11:00 AM",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop&crop=face",
    consultationFee: 125,
    about: "Dr. David Park is a highly skilled ophthalmologist with expertise in cataract surgery, LASIK, and retinal diseases. He uses the latest technology to provide the best outcomes for his patients.",
    education: ["MD, Columbia University", "Ophthalmology Residency, Wills Eye Hospital", "Retina Fellowship, Bascom Palmer Eye Institute"],
    languages: ["English", "Korean"],
  },
  {
    id: 5,
    name: "Dr. Rachel Martinez",
    specialty: "Cardiologist",
    specialtyId: "cardiology",
    rating: 4.8,
    reviews: 221,
    experience: "14+ years",
    location: "Palo Alto, CA",
    nextAvailable: "Tomorrow, 2:00 PM",
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&h=300&fit=crop&crop=face",
    consultationFee: 160,
    about: "Dr. Rachel Martinez is a cardiovascular specialist with a focus on women's heart health and preventive cardiology. She is passionate about educating patients and empowering them to take control of their heart health.",
    education: ["MD, Harvard Medical School", "Internal Medicine Residency, Brigham and Women's Hospital", "Cardiology Fellowship, Stanford Medical Center"],
    languages: ["English", "Spanish", "Portuguese"],
  },
  {
    id: 6,
    name: "Dr. James Wilson",
    specialty: "Neurologist",
    specialtyId: "neurology",
    rating: 4.9,
    reviews: 275,
    experience: "20+ years",
    location: "San Francisco, CA",
    nextAvailable: "Today, 4:00 PM",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&h=300&fit=crop&crop=face",
    consultationFee: 190,
    about: "Dr. James Wilson is a renowned neurologist with two decades of experience in treating neurodegenerative diseases, multiple sclerosis, and complex neurological conditions. He leads clinical trials and is a sought-after speaker.",
    education: ["MD, University of Pennsylvania", "Neurology Residency, Mayo Clinic", "Fellowship in Neuroimmunology, UCSF"],
    languages: ["English"],
  },
];

const Doctors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "all" || doctor.specialtyId === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const handleViewProfile = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsProfileOpen(true);
  };

  const handleBookNow = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsProfileOpen(true);
  };

  const handleCloseProfile = () => {
    setIsProfileOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
              Doctor Discovery
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Find the Right{" "}
              <span className="text-gradient">Specialist</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Browse our network of verified healthcare professionals and book your appointment today.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="max-w-5xl mx-auto mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by doctor name or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-card"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Location"
                  defaultValue="San Francisco, CA"
                  className="w-full lg:w-64 h-14 pl-12 pr-4 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-card"
                />
              </div>
              <Button variant="outline" size="lg" className="h-14 px-6 rounded-2xl">
                <Filter className="w-5 h-5 mr-2" />
                Filters
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Specialty Tabs */}
          <div className="max-w-5xl mx-auto mb-8">
            <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
              {specialties.map((specialty) => {
                const Icon = specialty.icon;
                const isSelected = selectedSpecialty === specialty.id;
                return (
                  <button
                    key={specialty.id}
                    onClick={() => setSelectedSpecialty(specialty.id)}
                    className={cn(
                      "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300",
                      isSelected
                        ? "bg-primary text-primary-foreground shadow-glow"
                        : "bg-secondary text-secondary-foreground hover:bg-accent"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {specialty.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Count */}
          <div className="max-w-5xl mx-auto mb-6">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredDoctors.length}</span> doctors
              {selectedSpecialty !== "all" && (
                <span> in <span className="text-primary font-medium">{specialties.find(s => s.id === selectedSpecialty)?.name}</span></span>
              )}
            </p>
          </div>

          {/* Doctors Grid */}
          <div className="max-w-5xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onViewProfile={handleViewProfile}
                  onBookNow={handleBookNow}
                />
              ))}
            </div>

            {filteredDoctors.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No doctors found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <ChatWidget />

      {/* Doctor Profile Sheet */}
      <DoctorProfileSheet
        doctor={selectedDoctor}
        isOpen={isProfileOpen}
        onClose={handleCloseProfile}
      />
    </div>
  );
};

export default Doctors;
