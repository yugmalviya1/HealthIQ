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
      const timeout = setTimeout(() => {
        navigate("/auth");
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
        <div className="w-full max-w-md space-y-3">
          <div className="relative w-full">
            <div className="w-full h-2.5 bg-white/10 border border-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-teal-400 to-teal-500 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <p className="text-center text-white/70 text-sm font-medium">
            {Math.round(progress)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
