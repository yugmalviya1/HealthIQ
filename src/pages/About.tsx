import { Shield, Heart, Users, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { scrollFadeIn, scrollScale } from "@/lib/animations";

const About = () => {
  const headerAnimation = useScrollAnimation();
  const missionAnimation = useScrollAnimation();
  const visionAnimation = useScrollAnimation();
  const valuesAnimation = useScrollAnimation();
  const teamAnimation = useScrollAnimation();

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          ref={headerAnimation.ref}
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          animate={headerAnimation.isVisible ? "visible" : "hidden"}
          variants={scrollFadeIn}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            About Us
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Revolutionizing Healthcare with{" "}
            <span className="text-gradient">AI Technology</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            HealthIQ AI is your intelligent healthcare companion, making quality healthcare accessible, organized, and personalized for everyone.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div 
            ref={missionAnimation.ref}
            className="p-8 rounded-2xl bg-gradient-card border border-border shadow-card hover:shadow-lg transition-shadow duration-300"
            initial="hidden"
            animate={missionAnimation.isVisible ? "visible" : "hidden"}
            variants={scrollScale}
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To empower individuals with AI-driven healthcare solutions that provide instant symptom analysis, connect them with the right specialists, and help them take control of their health journey.
            </p>
          </motion.div>

          <motion.div 
            ref={visionAnimation.ref}
            className="p-8 rounded-2xl bg-gradient-card border border-border shadow-card hover:shadow-lg transition-shadow duration-300"
            initial="hidden"
            animate={visionAnimation.isVisible ? "visible" : "hidden"}
            variants={scrollScale}
            transition={{ delay: 0.2 }}
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed">
              To create a world where healthcare is accessible to everyone, powered by cutting-edge AI technology that makes health management simple, efficient, and personalized.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <motion.h2 
            ref={valuesAnimation.ref}
            className="font-display text-3xl font-bold text-foreground text-center mb-12"
            initial="hidden"
            animate={valuesAnimation.isVisible ? "visible" : "hidden"}
            variants={scrollFadeIn}
          >
            Our Values
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ValueCard 
              icon={Shield}
              title="Privacy First"
              description="Your health data is protected with enterprise-grade security"
              delay={0}
            />
            <ValueCard 
              icon={Users}
              title="Patient-Centered"
              description="Every feature is designed with your needs in mind"
              delay={0.1}
            />
            <ValueCard 
              icon={Sparkles}
              title="Innovation"
              description="Leveraging the latest AI technology for better healthcare"
              delay={0.2}
            />
          </div>
        </div>

        {/* Team Credit */}
        <motion.div 
          ref={teamAnimation.ref}
          className="text-center p-12 rounded-2xl bg-gradient-hero mb-8"
          initial="hidden"
          animate={teamAnimation.isVisible ? "visible" : "hidden"}
          variants={scrollScale}
        >
          <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">
            Created by Team Dedsec
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-6">
            A passionate team of developers and healthcare enthusiasts dedicated to making healthcare accessible through innovative technology.
          </p>
          <div className="inline-block px-6 py-3 rounded-xl bg-primary-foreground/20 backdrop-blur-sm">
            <p className="text-primary-foreground font-medium">
              Special thanks to <span className="font-bold">Yug Malviya</span>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

function ValueCard({ icon: Icon, title, description, delay }: { icon: any; title: string; description: string; delay: number }) {
  const animation = useScrollAnimation();

  return (
    <motion.div 
      ref={animation.ref}
      className="p-6 rounded-xl bg-secondary text-center hover:bg-secondary/80 transition-colors duration-300"
      initial="hidden"
      animate={animation.isVisible ? "visible" : "hidden"}
      variants={scrollScale}
      transition={{ delay }}
    >
      <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
      <h3 className="font-display font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
}

export default About;
