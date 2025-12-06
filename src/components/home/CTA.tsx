import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-12 lg:p-20">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl" />
          
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '32px 32px'
            }}
          />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">Start Your Health Journey</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Ready to Take Control of Your Health?
            </h2>

            <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              Join thousands of users who trust HealthIQ AI for their healthcare needs. Get started for free and experience the future of healthcare.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold shadow-lg">
                <Link to="/symptoms">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline" className="border-primary-foreground/50 bg-white/10 text-white hover:bg-white/20 hover:text-white font-semibold shadow-lg backdrop-blur-sm">
                <Link to="/doctors">
                  Explore Doctors
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
