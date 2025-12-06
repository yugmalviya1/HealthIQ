import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme") as Theme;
    return stored || "light";
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setIsTransitioning(true);
    
    // Create overlay element for smooth transition
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: ${theme === 'light' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)'};
      z-index: 9999;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    document.body.appendChild(overlay);
    
    // Fade in overlay
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
    });
    
    // Change theme after brief delay
    setTimeout(() => {
      setTheme((prev) => (prev === "light" ? "dark" : "light"));
      
      // Fade out overlay
      overlay.style.opacity = '0';
      
      setTimeout(() => {
        document.body.removeChild(overlay);
        setIsTransitioning(false);
      }, 300);
    }, 150);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
