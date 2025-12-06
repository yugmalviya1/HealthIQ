import { Shield, Heart, Users, Sparkles } from "lucide-react";

const About = () => {
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
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
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-2xl bg-gradient-card border border-border shadow-card">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To empower individuals with AI-driven healthcare solutions that provide instant symptom analysis, connect them with the right specialists, and help them take control of their health journey.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-card border border-border shadow-card">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed">
              To create a world where healthcare is accessible to everyone, powered by cutting-edge AI technology that makes health management simple, efficient, and personalized.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-secondary text-center">
              <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-display font-semibold text-foreground mb-2">Privacy First</h3>
              <p className="text-sm text-muted-foreground">Your health data is protected with enterprise-grade security</p>
            </div>
            <div className="p-6 rounded-xl bg-secondary text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-display font-semibold text-foreground mb-2">Patient-Centered</h3>
              <p className="text-sm text-muted-foreground">Every feature is designed with your needs in mind</p>
            </div>
            <div className="p-6 rounded-xl bg-secondary text-center">
              <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-display font-semibold text-foreground mb-2">Innovation</h3>
              <p className="text-sm text-muted-foreground">Leveraging the latest AI technology for better healthcare</p>
            </div>
          </div>
        </div>

        {/* Team Credit */}
        <div className="text-center p-12 rounded-2xl bg-gradient-hero mb-8">
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
        </div>
      </div>
    </main>
  );
};

export default About;
