import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Shield, Clock } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-soft" />
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-health-teal/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-health-blue/10 rounded-full blur-3xl" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20 mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-accent-foreground">AI-Powered Healthcare</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
              Your Health,{" "}
              <span className="text-gradient">Intelligently</span>{" "}
              Managed
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
              HealthIQ AI provides instant symptom analysis, connects you with the right specialists, and helps you take control of your healthcare journey — all in one unified platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: "300ms" }}>
              <Button asChild variant="hero" size="xl">
                <Link to="/symptoms">
                  Check Symptoms
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="hero-outline" size="xl">
                <Link to="/doctors">
                  Find Doctors
                </Link>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-12 animate-fade-in" style={{ animationDelay: "400ms" }}>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-5 h-5 text-health-green" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-5 h-5 text-health-blue" />
                <span>24/7 Available</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="w-5 h-5 text-health-purple" />
                <span>AI Powered</span>
              </div>
            </div>
          </div>

          {/* Right content - Hero illustration */}
          <div className="relative animate-fade-in" style={{ animationDelay: "300ms" }}>
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Main card with Spline animation */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-card shadow-card border border-border overflow-hidden group cursor-pointer">
                <iframe 
                  src="https://app.spline.design/file/ed3b52af-7f6b-4fe9-b3dc-d3eedbf00f82?view=preview" 
                  width="100%" 
                  height="100%" 
                  allowFullScreen 
                  title="3D Health Animation"
                  className="absolute inset-0 w-full h-full border-0 pointer-events-auto"
                  style={{ background: 'transparent' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
