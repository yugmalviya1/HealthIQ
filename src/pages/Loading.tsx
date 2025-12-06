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
        // Smooth increment
        const increment = prev < 70 ? 2 : prev < 90 ? 1.5 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setFadeOut(true);
      // Mark that user has seen the loading screen
      sessionStorage.setItem('hasSeenLoading', 'true');
      const timeout = setTimeout(() => {
        navigate("/auth", { state: { fromLoading: true } });
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [progress, navigate]);

  return (
    <div 
      className={`fixed inset-0 z-50 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 gap-8 sm:gap-12">
        {/* Logo/Title with animation */}
        <div className="text-center">
          <h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white font-display tracking-tight mb-4"
            style={{
              animation: 'fadeInScale 1s ease-out, glow 2s ease-in-out infinite',
              textShadow: '0 0 40px rgba(34, 211, 238, 0.5), 0 0 80px rgba(34, 211, 238, 0.3)',
            }}
          >
            HealthIQ
          </h1>
          <p 
            className="text-white/50 text-sm sm:text-base tracking-wide px-4"
            style={{
              animation: 'fadeIn 1.5s ease-out 0.3s both',
            }}
          >
            Initializing your health companion
          </p>
        </div>

        {/* Sleek Progress Bar */}
        <div className="w-full max-w-md">
          <div className="relative w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            {/* Main progress bar */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400"
              style={{
                width: `${progress}%`,
                transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 0 20px rgba(34, 211, 238, 0.7), 0 0 40px rgba(34, 211, 238, 0.4)',
              }}
            />
            
            {/* Sliding shine effect */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
              style={{
                width: '25%',
                left: `${Math.max(0, progress - 25)}%`,
                transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                filter: 'blur(10px)',
              }}
            />
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 40px rgba(34, 211, 238, 0.5), 0 0 80px rgba(34, 211, 238, 0.3);
          }
          50% {
            text-shadow: 0 0 60px rgba(34, 211, 238, 0.7), 0 0 100px rgba(34, 211, 238, 0.5);
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
