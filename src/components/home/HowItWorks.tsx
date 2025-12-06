import { Link } from "react-router-dom";
import { Search, UserCheck, CalendarCheck, HeartPulse } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { scrollFadeIn, scrollSlideLeft, scrollSlideRight } from "@/lib/animations";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Describe Your Symptoms",
    description: "Tell us how you're feeling using our intuitive symptom checker. Our AI analyzes your inputs in real-time.",
    href: "/symptoms",
  },
  {
    number: "02",
    icon: UserCheck,
    title: "Get Matched with Specialists",
    description: "Based on your symptoms, we recommend the most suitable healthcare professionals in your area.",
    href: "/doctors",
  },
  {
    number: "03",
    icon: CalendarCheck,
    title: "Book Your Appointment",
    description: "Choose a convenient time slot and book your appointment instantly with just one click.",
    href: "/appointments",
  },
  {
    number: "04",
    icon: HeartPulse,
    title: "Receive Quality Care",
    description: "Get personalized care from trusted professionals. All your records stay organized in one place.",
    href: "/appointments",
  },
];

export function HowItWorks() {
  const headerAnimation = useScrollAnimation();

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={headerAnimation.ref}
          className="text-center max-w-2xl mx-auto mb-16"
          initial="hidden"
          animate={headerAnimation.isVisible ? "visible" : "hidden"}
          variants={scrollFadeIn}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Healthcare Made{" "}
            <span className="text-gradient">Simple</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Four simple steps to take control of your health journey.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent transform -translate-y-1/2" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <StepCard key={step.number} step={step} Icon={Icon} index={index} />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, Icon, index }: { step: typeof steps[0]; Icon: any; index: number }) {
  const animation = useScrollAnimation();
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={animation.ref}
      initial="hidden"
      animate={animation.isVisible ? "visible" : "hidden"}
      variants={isEven ? scrollSlideLeft : scrollSlideRight}
      transition={{ delay: index * 0.15 }}
      className="relative"
    >
                  {/* Step card */}
                  <Link to={step.href} className="text-center group block cursor-pointer">
                    <div className="relative inline-flex mb-6">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-hero flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-9 h-9 text-primary-foreground" />
                      </div>
                      <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-card border-2 border-primary flex items-center justify-center text-xs font-bold text-primary shadow-md">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                      {step.description}
                    </p>
                  </Link>

      {/* Arrow for desktop */}
      {index < steps.length - 1 && (
        <div className="hidden lg:block absolute top-10 -right-4 transform">
          <svg className="w-8 h-8 text-primary/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </motion.div>
  );
}
