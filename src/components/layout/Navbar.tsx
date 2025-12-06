import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, Stethoscope, Calendar, MessageCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFirebaseAuth } from "@/contexts/FirebaseAuthContext";

const navLinks = [
  { name: "Home", href: "/home", icon: Heart },
  { name: "Symptoms", href: "/symptoms", icon: Stethoscope },
  { name: "Doctors", href: "/doctors", icon: User },
  { name: "Appointments", href: "/appointments", icon: Calendar },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useFirebaseAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              Health<span className="text-gradient">IQ</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
            {user && (
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="ml-2"
              >
                Logout
              </Button>
            )}
          </div>


          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border transition-all duration-300",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {link.name}
                </Link>
              );
            })}
            {user && (
              <Button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                variant="outline"
                className="w-full justify-start"
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
