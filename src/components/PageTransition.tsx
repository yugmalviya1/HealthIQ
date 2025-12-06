import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    // Only animate if the path actually changed
    if (prevPathRef.current !== location.pathname) {
      setIsVisible(false);
      
      const timer = setTimeout(() => {
        setIsVisible(true);
        prevPathRef.current = location.pathname;
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return (
    <div
      className={`transition-opacity duration-300 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
};
