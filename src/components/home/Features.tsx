import { Stethoscope, Users, Calendar, MessageCircle, FileText, Bell } from "lucide-react";

const features = [
  {
    icon: Stethoscope,
    title: "AI Symptom Analyzer",
    description: "Describe your symptoms and get instant, AI-powered analysis with potential conditions and recommended specialists.",
    color: "health-teal",
  },
  {
    icon: Users,
    title: "Doctor Discovery",
    description: "Find the right healthcare professional based on specialty, location, ratings, and availability.",
    color: "health-blue",
  },
  {
    icon: Calendar,
    title: "Easy Scheduling",
    description: "Book appointments with just one click. Manage your healthcare calendar effortlessly.",
    color: "health-purple",
  },
  {
    icon: MessageCircle,
    title: "AI Health Chatbot",
    description: "Get instant answers to your health questions 24/7 with our intelligent assistant.",
    color: "health-orange",
  },
  {
    icon: FileText,
    title: "Centralized Records",
    description: "Store and access all your medical reports, prescriptions, and health history in one secure place.",
    color: "health-green",
  },
  {
    icon: Bell,
    title: "Personalized Checkups",
    description: "Receive tailored health checkup recommendations based on your profile and medical history.",
    color: "health-teal",
  },
];

export function Features() {
  return (
    <section className="py-24 bg-gradient-soft relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-health-teal/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-health-blue/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Everything You Need for{" "}
            <span className="text-gradient">Better Health</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A comprehensive suite of tools designed to make healthcare accessible, organized, and intelligent.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative p-6 lg:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 shadow-card hover:shadow-card-hover transition-all duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-14 h-14 rounded-2xl bg-${feature.color}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-7 h-7 text-${feature.color}`} />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover decoration */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
