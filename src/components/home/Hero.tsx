import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Shield, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { slideInVariants, slideInFromLeft, slideInFromRight } from "@/lib/animations";
import { useState, useEffect } from "react";

export function Hero() {
  const [showLoader, setShowLoader] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Preload the Spline iframe domain
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = 'https://app.spline.design';
    document.head.appendChild(preconnect);

    // Start fade out animation
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3000);
    
    // Remove spinner from DOM after fade completes
    const removeTimer = setTimeout(() => {
      setShowLoader(false);
    }, 3300);
    
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      if (preconnect.parentNode) {
        document.head.removeChild(preconnect);
      }
    };
  }, []);
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
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20 mb-6"
              variants={slideInFromLeft}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-accent-foreground">AI-Powered Healthcare</span>
            </motion.div>
            
            <motion.h1 
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
              variants={slideInFromLeft}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              Your Health,{" "}
              <span className="text-gradient">Intelligently</span>{" "}
              Managed
            </motion.h1>
            
            <motion.p 
              className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8"
              variants={slideInFromLeft}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              HealthIQ AI provides instant symptom analysis, connects you with the right specialists, and helps you take control of your healthcare journey — all in one unified platform.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={slideInFromLeft}
              initial="hidden"
              animate="visible"
              custom={3}
            >
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
            </motion.div>

            {/* Trust badges */}
            <motion.div 
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-12"
              variants={slideInFromLeft}
              initial="hidden"
              animate="visible"
              custom={4}
            >
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
            </motion.div>
          </div>

          {/* Right content - Hero illustration */}
          <motion.div 
            className="relative"
            variants={slideInFromRight}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto hidden sm:block group">
              {/* Main card with Spline animation */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-card shadow-card border border-border overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:border-primary/30">
                <iframe 
                  src="https://app.spline.design/file/ed3b52af-7f6b-4fe9-b3dc-d3eedbf00f82?view=preview&autoplay=1" 
                  title="3D Health Animation"
                  className="absolute border-0 transition-opacity duration-500"
                  allow="autoplay"
                  loading="eager"
                  style={{ 
                    background: 'transparent',
                    pointerEvents: 'auto',
                    width: '100%',
                    height: '100%',
                    top: '55%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) scale(1.70)',
                    imageRendering: 'crisp-edges',
                    WebkitFontSmoothing: 'antialiased',
                    zIndex: 1,
                    opacity: showLoader ? 0 : 1,
                    visibility: showLoader ? 'hidden' : 'visible',
                  }}
                />
                {/* Loading Spinner */}
                {showLoader && (
                  <div 
                    className="absolute inset-0 flex items-center justify-center bg-card dark:bg-card z-10 transition-opacity duration-300"
                    style={{
                      opacity: fadeOut ? 0 : 1
                    }}
                  >
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 border-4 border-primary/20 dark:border-primary/30 rounded-full"></div>
                      <div 
                        className="absolute inset-0 border-4 border-transparent border-t-primary dark:border-t-primary rounded-full"
                        style={{
                          animation: 'spin 1s linear infinite'
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
              {/* Interact text */}
              <div className="absolute -bottom-8 left-0 right-0 text-center">
                <p className="text-sm text-muted-foreground italic group-hover:text-primary transition-colors">Click and hover to interact</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
