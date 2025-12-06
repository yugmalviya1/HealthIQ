const SplineBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Background gradient fallback */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      
      {/* Spline iframe */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <iframe
          src="https://app.spline.design/file/c7a0431e-10b4-4966-bbea-4f41ba5d2261?view=preview"
          title="HealthIQ 3D Background"
          loading="lazy"
          className="border-0 absolute"
          style={{ 
            pointerEvents: 'none',
            opacity: 0.7,
            width: '100%',
            height: '100%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(1.2)',
            transition: 'opacity 0.5s ease-in',
          }}
        />
      </div>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
    </div>
  );
};

export default SplineBackground;
