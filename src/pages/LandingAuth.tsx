import AuthCard from "@/components/AuthCard";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const LandingAuth = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigate("/home");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    // Trigger fade-in animation after component mounts
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative min-h-screen w-full overflow-hidden transition-opacity duration-700 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      {/* Main Content */}
      <main className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ zIndex: 10 }}>
        {/* Hero Section */}
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-medium text-white/90 max-w-lg mx-auto drop-shadow-lg">
            Your personal health companion powered by artificial intelligence
          </h2>
        </div>

        {/* Auth Card */}
        <AuthCard />

        {/* Footer */}
        <footer className="mt-12 text-center text-white/70 text-sm animate-fade-in-delay">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </footer>
      </main>
    </div>
  );
};

export default LandingAuth;
