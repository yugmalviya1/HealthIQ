import { useState, useEffect } from "react";

const SplineBackground = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Preload the iframe
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Background gradient fallback */}
      <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" style={{ zIndex: 0 }} />
      
      {/* Spline iframe */}
      <div className="fixed inset-0 w-full h-full overflow-hidden" style={{ zIndex: 1 }}>
        {isLoaded && (
          <iframe
            src="https://app.spline.design/file/c7a0431e-10b4-4966-bbea-4f41ba5d2261?view=preview"
            frameBorder="0"
            width="120%"
            height="120%"
            title="HealthIQ 3D Background"
            loading="lazy"
            style={{ 
              pointerEvents: 'none',
              opacity: 0.7,
              position: 'absolute',
              top: '-10%',
              left: '-10%',
              transition: 'opacity 0.5s ease-in',
            }}
          />
        )}
      </div>
      
      {/* Overlay for better text readability with blur effect */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" style={{ zIndex: 2 }} />
    </>
  );
};

export default SplineBackground;
