import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Loading = () => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Smooth progress animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate progress as it gets closer to 100
        const increment = prev < 50 ? 1 : prev < 80 ? 2 : 3;
        return Math.min(prev + increment, 100);
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setFadeOut(true);
      // Mark that user has seen the loading screen
      sessionStorage.setItem('hasSeenLoading', 'true');
      const timeout = setTimeout(() => {
        navigate("/auth", { state: { fromLoading: true } });
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [progress, navigate]);

  return (
    <div 
      className={`min-h-screen w-full relative overflow-hidden bg-black transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-8 gap-8">
        {/* Logo/Title */}
        <div className="text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-white font-display tracking-tight mb-3">
            HealthIQ
          </h1>
          <p className="text-white/70 text-base">Loading your health companion...</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md" style={{ marginTop: '2rem' }}>
          <div className="relative w-full" style={{ marginBottom: '1rem' }}>
            <div 
              style={{
                width: '100%',
                height: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                border: '2px solid rgba(255, 255, 255, 0.4)',
                borderRadius: '9999px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
              }}
            >
              <div 
                style={{ 
                  width: `${progress}%`,
                  height: '100%',
                  background: 'linear-gradient(to right, #2dd4bf, #14b8a6, #06b6d4)',
                  transition: 'width 0.3s ease-out',
                  boxShadow: '0 0 20px rgba(45, 212, 191, 0.6)'
                }}
              />
            </div>
          </div>
          <p style={{ 
            textAlign: 'center', 
            color: 'white', 
            fontSize: '1.125rem',
            fontWeight: '600'
          }}>
            {Math.round(progress)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
