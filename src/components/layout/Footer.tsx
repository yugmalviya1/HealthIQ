import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const footerLinks = {
  product: [
    { name: "Symptom Checker", href: "/symptoms" },
    { name: "Find Doctors", href: "/doctors" },
    { name: "Book Appointment", href: "/appointments" },
  ],
  company: [
    { name: "About Us", href: "/about" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                Health<span className="text-gradient">IQ</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm">
              Your AI-powered healthcare companion. Making quality healthcare accessible, organized, and intelligent for everyone.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 HealthIQ AI Created by Team Dedsec
          </p>
        </div>
      </div>
    </footer>
  );
}
